import { FormGroup } from '@angular/forms';
import { Constants } from './../../../../utilities/constants';
import { RandomizerRepository } from '../../../../repositories/randomizer-repository/randomizer.repository';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {tap, take} from 'rxjs/operators';
import { RandomizerService } from 'src/app/services/randomizer.service';
declare var applyPatch: any; 
declare var MarcFile: any; 
declare var parseBPSFile: any; 
declare var crc32: any;

  
@Component({
  selector: 'app-patcher',
  templateUrl: './patcher.component.html',
  styleUrls: ['./patcher.component.scss']
})
export class PatcherComponent implements OnInit {

  @Input() public formGroup: FormGroup;
  public userRom: any = null;
  public patchFile: any = null;
  public patchedRomBlob: Blob = null;

  public isRomValid = false;
  public isUserRomLoading = false;

  public constructor(private _randomizerService: RandomizerService, private _randomizerRepo: RandomizerRepository) { }

  public ngOnInit(): void {
  }

  public patch() {
    
    this._randomizerService.createSeedWithSettings(this.formGroup)
    .pipe(
      take(1),
      tap(patch => {
        console.log(this.userRom)
        this.patchFile = new MarcFile(new File([patch], 'patch'), () => this.patchFileReadyCallback());
             
      })
    ).subscribe();
  }

  public handleFileInput(files: FileList) {
    this.userRom = null;
    this.isRomValid = false;    
    this.isUserRomLoading = true;
    this.userRom = new MarcFile(files[0], () => this.romFileReadyCallback());
  }

  public patchFileReadyCallback() {
    var bpsPatch = new parseBPSFile(this.patchFile);
    this.patchedRomBlob = new applyPatch(bpsPatch, this.userRom);

    this.serveDownload(this.patchedRomBlob);

  }

  public romFileReadyCallback() {
    var checksum = crc32(this.userRom, 0, false);
    if (checksum == Constants.VALID_ROM_CRC) {
      this.isRomValid = true;
    }
    this.isUserRomLoading = false;
  }

  public serveDownload(blob: Blob) {
    const data = window.URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = data;
    link.download = 'Paper Mario (patched).z64';
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }

}
