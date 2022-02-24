import { KeyItems } from './../../../../../entities/enum/keyItems';
import { Items } from './../../../../../entities/enum/items';
import { tap } from 'rxjs';
import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StartingItem } from 'src/app/entities/startingItem';

@Component({
  selector: 'app-item-chiplist',
  templateUrl: './item-chiplist.component.html',
  styleUrls: ['./item-chiplist.component.scss']
})
export class ItemChiplistComponent implements OnInit, OnDestroy {

  @Input() public availableItems: StartingItem[];
  @Input() public startingItemsFormControl: FormControl;
  @Input() public itemType: string;

  public selectedItems: StartingItem[] = [];

  public searchText: FormControl;
  public filteredSearchItems: string[] = [];
  private _searchTextSubscription: any;

  public constructor(private _changeDectector: ChangeDetectorRef) { }
  

  public ngOnInit(): void {
    this.filteredSearchItems = this.availableItems.map(item => item.name);
    this.searchText = new FormControl('');
    this._searchTextSubscription = this.searchText.valueChanges.pipe(
      tap(() => this.filter())
    ).subscribe();

    if(this.itemType == 'Key Item') {
      this.addItem(this.availableItems.find(i => i.name == 'Homeward Shroom'));
    }
  }

  public ngOnDestroy(): void {
    if(this._searchTextSubscription) {
      this._searchTextSubscription.unsubscribe();
    }
  }

  public removeItem(startingItem: StartingItem): void {
    const formControlIndex = this.startingItemsFormControl.value.indexOf(startingItem);

    if (formControlIndex >= 0) {
      this.startingItemsFormControl.value.splice(formControlIndex, 1);

      var selectedItemIndex = this.selectedItems.indexOf(startingItem);
      this.selectedItems.splice(selectedItemIndex, 1);
    }
  }

  public onItemSearchChange() {
    var item = this.availableItems.find(i => i.name == this.searchText.value);
    if(!item) {
      return;
    }

    this.addItem(item);
  }

  public addItem(item: StartingItem) {
    this.startingItemsFormControl.value.push(item)
    this.selectedItems.push(item)
    this.searchText.setValue('');
  }

  public filter() {
    const filterValue = this.searchText.value.toLowerCase();
    // Filter unique items that inclue value
    this.filteredSearchItems =  this.availableItems.filter(item => item.name.toLowerCase().includes(filterValue)).map(item => item.name);
    if(this.itemType == 'Badge' || this.itemType == 'Key Item') {
      this.filteredSearchItems = this.filteredSearchItems.filter(itemName => !this.selectedItems.find(selectedItem => selectedItem.name == itemName))
    }
  }

}
