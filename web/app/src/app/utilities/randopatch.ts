import { MarcFile } from "./MarcFile";

const RANDO_PATCH_ACTION_SEEK=0;
const RANDO_PATCH_ACTION_WRITE=1;
const RANDO_PATCH_FINAL_SEEK=2;

export class RandoPatch {
	public initialRom: MarcFile;

    public apply(romFile: MarcFile, validate){    
    
        var randomizedRom= Object.create(romFile) as MarcFile //deep copy original file
        var finalSeekHit = false;

        //Patch structure: 1byte indicates read or write, then 4bytes data. Repeat
        while(this.initialRom.offset < this.initialRom.fileSize){
            if(finalSeekHit) {
                var data = this.initialRom.readU32();
                randomizedRom.writeU32(data);
            } else {
                var operationType=this.initialRom.readU8();
                if(operationType == RANDO_PATCH_ACTION_SEEK) 
                {
                    var address = this.initialRom.readU32();
                    randomizedRom.seek(address)              
                    
                } else if (operationType == RANDO_PATCH_ACTION_WRITE) 
                {
                    var data = this.initialRom.readU32();
                    randomizedRom.writeU32(data);                 
                }else if (operationType == RANDO_PATCH_FINAL_SEEK) 
                {
                    var address = this.initialRom.readU32();
                    randomizedRom.seek(address)
                    finalSeekHit = true;                    
                }
            }
            
        }   
        this.recalculate_crcs(randomizedRom)
        return randomizedRom
    }

    /*I HAVE NO CLUE WHATS GOING, ADAPTED FROM PYTHON TOOL:
    Patches the two CRC values used by the N64 boot chip to verify the integrity
    of the ROM (0x10 and 0x14). Paper Mario uses the CIC-NUS-6103 boot chip, so
    we must use the corresponding algorithm to calculate the new CRCs.
    Reproducing the correct unsigned integer arithmetic is tricky and leads to
    this ugly, nigh-unreadable code. But it works.
    This function's workings were provided by clover's StarRod crc patching
    functionality.*/
    private recalculate_crcs(randomizedRom: MarcFile){
        var t1 = BigInt(0xA3886759) // 6103 only
        var t2 = BigInt(0xA3886759) // 6103 only
        var t3 = BigInt(0xA3886759) // 6103 only
        var t4 = BigInt(0xA3886759) // 6103 only
        var t5 = BigInt(0xA3886759) // 6103 only
        var t6 = BigInt(0xA3886759) // 6103 only

        randomizedRom.seek(0x1000)
        while (randomizedRom.offset < 0x101000) {

            var d = BigInt(randomizedRom.readU32()) & BigInt(0xFFFFFFFF);
            if (((t6 + d) & BigInt(0xFFFFFFFF)) < (t6 & BigInt(0xFFFFFFFF)))
            {
                t4 += BigInt(1);
            }
                
            t6 += d;
            t3 ^= d;

            var r = (d << (d & BigInt(0x1F))) | (d >> (BigInt(32) - (d & BigInt(0x1F)))) & BigInt(0xFFFFFFFF)

            t5 += r;
            if ((t2 & BigInt(0xFFFFFFFF)) > (d & BigInt(0xFFFFFFFF)))
                t2 ^= r;
            else
                t2 ^= (t6 ^ d);

            t1 += t5 ^ d;
        }

        var crc1 = ((t6 ^ t4) + t3) & BigInt(0xFFFFFFFF);
        var crc2 = ((t5 ^ t2) + t1) & BigInt(0xFFFFFFFF);

        randomizedRom.seek(0x10);
        randomizedRom.writeU32(Number(crc1));
        randomizedRom.writeU32(Number(crc2));   
        
        //Leaving this useful chunk in case crc stops working
        /*
        console.log('t1: ' + t1)        
        console.log('t2: ' + t2)
        console.log('t3: ' + t3)
        console.log('t4: ' + t4)        
        console.log('t5: ' + t5)
        console.log('t6: ' + t6)
        
        console.log('crc1: ' + crc1)
        console.log('crc2: ' + crc2)

        console.log('crc2 UINT: ' + BigInt.asUintN(64, crc1))
        console.log('crc2 UINT: ' + BigInt.asUintN(64, crc2))*/
    }
}

export function parseRandoPatchFile(file: MarcFile){
    
    file.littleEndian=false;
    var patch = new RandoPatch();
    patch.initialRom = file;
    return patch;
}
