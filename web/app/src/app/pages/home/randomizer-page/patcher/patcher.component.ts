import { FormGroup } from '@angular/forms';
import { Constants } from './../../../../utilities/constants';
import { RandomizerRepository } from '../../../../repositories/randomizer-repository/randomizer.repository';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import {tap, take, catchError} from 'rxjs/operators';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { getMarcFileFromSource } from 'src/app/utilities/MarcFile';
import { crc32 } from 'src/app/utilities/crc32';

  
@Component({
  selector: 'app-patcher',
  templateUrl: './patcher.component.html',
  styleUrls: ['./patcher.component.scss']
})
export class PatcherComponent implements OnInit, OnDestroy {

  @Input() public formGroup: FormGroup;
  public userRom: any = null;
  public patchFile: any = null;
  public patchedRomBlob: Blob = null;

  public isRomValid = false;
  public isUserRomLoading = false;
  public isRandomizing = false;

  public patchingError: string;

  private _createSeedSubscription: Subscription;

  public constructor(private _randomizerService: RandomizerService, private _randomizerRepo: RandomizerRepository) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    if(this._createSeedSubscription) {
      this._createSeedSubscription.unsubscribe();
    }
  }

  public patch() {
    this.patchingError = null
    this.isRandomizing = true;

    this._createSeedSubscription = this._randomizerService.createSeedWithSettings(this.formGroup, this.userRom)
    .pipe(
      take(1),
      tap(romResult => {
        this.isRandomizing = false;
        this.serveDownload(romResult);     
      }),
      catchError( err => {
        console.log(err)
        this.isRandomizing = false;
        this.patchingError = 'A server error has occured';
        return of(err);
      })
    ).subscribe();
  }

  public handleFileInput(files: FileList) {
    if(!files[0]) {
      return;
    }
    this.userRom = null;
    this.isRomValid = false;    
    this.isUserRomLoading = true;
    getMarcFileFromSource(files[0]).pipe(
      tap(marcFile => {
        this.userRom = marcFile
        var checksum = crc32(this.userRom, 0, false).toString();
        if (checksum == Constants.VALID_ROM_CRC) {
          this.isRomValid = true;
        }
        this.isUserRomLoading = false;
      }) 
    ).subscribe();
  }

  public serveDownload(blob: Blob) {
    const data = window.URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = data;
    link.download = 'Paper Mario (patched).z64';
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }

}
