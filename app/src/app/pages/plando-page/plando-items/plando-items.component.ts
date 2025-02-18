import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { InputFilterService } from "src/app/services/inputfilter.service";
import { escapeRegexChars, pascalToVerboseString } from "src/app/utilities/stringFunctions";
import { CHECK_TYPES_DISPLAY_MAPPING, CheckType, LEGAL_MASS_FILL_ITEMS, Location, LOCATIONS_LIST, PLANDO_ITEMS_LIST, VANILLA_ITEMS } from "../plando-constants";
import { manualTrapRegex } from "../plando-page.component";

const possessiveRegex = /(Mario|Peach|Boo|Guy|Troopa|King|Bowser|Rowf|Merlow|Merluvlee|Tubba|Kolorado|Bow|Lily|Petunia|Rosie)s /g;
const displayStringReplacements = {
  "B L U": "BLU",
  "P N K": "PNK",
  "G R N": "GRN",
  "R E D": "RED",
  "P- ": "P-",
  "D- ": "D-",
  "( ": "(",
  "N W": "NW",
  "N E": "NE",
  "S W": "SW",
  "S E": "SE",
  "Bros": "Bros.",
  "Non Progression": "Non-Progression Item",
  "Consumable": "Random Consumable",
}
const replacementRegEx = new RegExp(Object.keys(displayStringReplacements).map(escapeRegexChars).join('|'), "g");
const displayStrings: Map<string, string> = new Map<string, string>();


@Component({
  selector: 'app-plando-items',
  templateUrl: './plando-items.component.html',
  styleUrls: ['../plando-page.component.scss', './plando-items.component.scss']
})
export class PlandoItemsComponent {
  @Input() itemsFormGroup: FormGroup;
  public readonly CHECK_TYPES = CheckType;
  public readonly LOCATIONS: Array<Location> = LOCATIONS_LIST;
  public readonly PLANDO_ITEMS: Array<string> = PLANDO_ITEMS_LIST.slice();
  public readonly MASS_FILL_ITEMS: Set<string> = LEGAL_MASS_FILL_ITEMS;
  public readonly CHECK_TYPES_DISPLAY_MAP: Record<CheckType, string> = CHECK_TYPES_DISPLAY_MAPPING;
  constructor(public inputFilters: InputFilterService) { };
  // Multicoin and super blocks not supported yet. Always filter them for now.
  // Remove these and add toggles (if desired) when support is added.
  public filteredTypes: Array<CheckType> = [CheckType.MULTICOIN_BLOCK, CheckType.SUPER_BLOCK];
  // For mass fill, don't show unsupported check types, or "Normal".
  public massFillCheckTypes = Object.values(CheckType).filter(val => !this.filteredTypes.includes(val) && val !== CheckType.NORMAL);
  public filteredItems: string[] = this.PLANDO_ITEMS.slice();
  public searchText: FormControl;

  public updateAutoCompleteFilter($event: InputEvent) {
    this._filter(this.PLANDO_ITEMS.slice(), ($event.target as HTMLInputElement).value);
  }

  public updateMassFillAutoCompleteFilter($event: any) {
    this._filter(Array.from(this.MASS_FILL_ITEMS), ($event.target as HTMLInputElement).value);
  }

  public massFill(fillTarget: string, fillItem: string) {
    const checksToFill: Array<Array<string>> = [];
    let willOverwrite: boolean = false;
    let confirmType = '';
    if (fillTarget.startsWith('region_')) {
      const targetRegion = fillTarget.slice('region_'.length);
      for (const loc of LOCATIONS_LIST) {
        if (loc.name === targetRegion) {
          for (const check of loc.checks) {
            const formControlKey = [targetRegion, check.name];
            if (check.type === CheckType.SHOP) {
              formControlKey.push('item');
            }
            if (this.itemsFormGroup.get(formControlKey).value) {
              willOverwrite = true;
              confirmType = ' from this region';
            }
            checksToFill.push(formControlKey);
          }
          break;
        }
      }
    } else {
      let targetCheckType = null;
      if (fillTarget.startsWith('checkType_')) {
        targetCheckType = fillTarget.slice('checkType_'.length);
      }
      for (const loc of LOCATIONS_LIST) {
        for (const check of loc.checks) {
          if (!targetCheckType || check.type === targetCheckType) {
            const formControlKey = [loc.name, check.name];
            if (check.type === CheckType.SHOP) {
              formControlKey.push('item');
            }
            if (this.itemsFormGroup.get(formControlKey).value) {
              willOverwrite = true;
              if (targetCheckType) {
                confirmType = ' of this type';
              }
            }
            checksToFill.push(formControlKey);
          }
        }
      }
    }
    if (!willOverwrite || confirm(fillItem === '' ? 'Clear all entries' + confirmType + '?' : 'One or more existing assignments will be overwritten by this fill. Proceed?')) {
      for (const check of checksToFill) {
        if (fillItem === 'Vanilla') {
          if (VANILLA_ITEMS[check[0]][check[1]].endsWith('coins)')) {
            const shopItemParts = VANILLA_ITEMS[check[0]][check[1]].split(' ');
            this.itemsFormGroup.get(check).setValue(shopItemParts[0]);
            this.itemsFormGroup.get([check[0], check[1], 'price']).setValue(shopItemParts[1].slice(1));
          } else {
            this.itemsFormGroup.get(check).setValue(VANILLA_ITEMS[check[0]][check[1]]);
          }
        } else {
          this.itemsFormGroup.get(check).setValue(fillItem);
          if (fillItem === '' && this.itemsFormGroup.get([check[0],check[1],'price'])) {
            this.itemsFormGroup.get([check[0],check[1],'price']).setValue('');
          }
        }
      }
      this.itemsFormGroup.updateValueAndValidity();
    }
  }

  private _filter(initialOptions: Array<string>, value: string): void {
    const regexes = value.toLowerCase().split(/\s/g).filter(s => s.trim() !== '').map(s => new RegExp(escapeRegexChars(s), 'i'));
    this.filteredItems = initialOptions.filter(item => regexes.every(reg => reg.test(item)));
  }

  public resetFilter($event: Event) {
    if ($event.target instanceof HTMLInputElement && $event.target.value) {
      this._filter(this.PLANDO_ITEMS.slice(), $event.target.value.trim());
    } else if (this.filteredItems.length < this.PLANDO_ITEMS.length) {
      this.filteredItems = this.PLANDO_ITEMS.slice();
    }
  }

  public resetMassFillFilter($event: Event) {
    if ($event.target instanceof HTMLInputElement && $event.target.value) {
      this._filter(Array.from(this.MASS_FILL_ITEMS), $event.target.value.trim());
    } else {
      this.filteredItems = Array.from(this.MASS_FILL_ITEMS);
    }
  }

  public massFillSelectionValid(fillTarget: any, fillItem: any): boolean {
    return fillTarget !== '' && (fillItem === '' || this.MASS_FILL_ITEMS.has(fillItem) || manualTrapRegex.test(fillItem));
  }

  public onNameInputBlur(formControlName: string[]) {
    this.itemsFormGroup.get(formControlName).updateValueAndValidity();
  }

  public toggleCheckTypeFilter($event: MatSlideToggleChange, checkType: CheckType) {
    if ($event.checked) {
      this.filteredTypes.push(checkType);
    } else {
      const i = this.filteredTypes.indexOf(checkType);
      if (i > -1) {
        this.filteredTypes.splice(i, 1);
      }
    }
  }

  public toDisplayString = function (s: string): string {
    if (!displayStrings.has(s)) {
      displayStrings.set(s, pascalToVerboseString(s).replace(possessiveRegex, "$1's").replace(replacementRegEx, function (matched) {
        return displayStringReplacements[matched];
      }));
    }
    return displayStrings.get(s);
  }

};
