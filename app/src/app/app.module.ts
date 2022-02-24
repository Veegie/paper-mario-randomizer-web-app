import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RandomizerPageComponent } from './pages/home/randomizer-page/randomizer-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatCardModule } from '@angular/material/card'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'
import { MatSelectModule } from '@angular/material/select'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatChipsModule } from '@angular/material/chips'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemsComponent } from './pages/home/randomizer-page/items/items.component';
import { PartnersComponent } from './pages/home/randomizer-page/partners/partners.component';
import { GameplayComponent } from './pages/home/randomizer-page/gameplay/gameplay.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OpenWorldSettingsComponent } from './pages/home/randomizer-page/open-world-settings/open-world-settings.component';
import { DifficultySettingsComponent } from './pages/home/randomizer-page/difficulty-settings/difficulty-settings.component';
import { QolSettingsComponent } from './pages/home/randomizer-page/qol-settings/qol-settings.component';
import { PresetSettingsComponent } from './pages/home/randomizer-page/preset-settings/preset-settings.component';
import { PatcherComponent } from './pages/home/randomizer-page/patcher/patcher.component';
import { TooltipSpanComponent } from './common/tooltip-span/tooltip-span.component';
import { SeedPageComponent } from './pages/seed/seed-page/seed-page.component';
import { SettingsInfoComponent } from './pages/seed/seed-page/settings-info/settings-info.component';
import { SpoilerLogComponent } from './pages/seed/seed-page/spoiler-log/spoiler-log.component';
import { LoadingComponent } from './common/loading/loading.component';
import { ErrorComponent } from './common/error/error.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { ChangelogPageComponent } from './pages/changelog-page/changelog-page.component';
import { ColorPalettesComponent } from './pages/home/randomizer-page/color-palettes/color-palettes.component';
import { MarioSettingsComponent } from './pages/home/randomizer-page/mario-settings/mario-settings.component';
import { StartingItemsComponent } from './pages/home/randomizer-page/starting-items/starting-items.component';
import { ItemChiplistComponent } from './pages/home/randomizer-page/starting-items/item-chiplist/item-chiplist.component';


@NgModule({
  declarations: [
    AppComponent,
    RandomizerPageComponent,
    ItemsComponent,
    PartnersComponent,
    GameplayComponent,
    OpenWorldSettingsComponent,
    DifficultySettingsComponent,
    QolSettingsComponent,
    PresetSettingsComponent,
    PatcherComponent,
    TooltipSpanComponent,
    SeedPageComponent,
    SettingsInfoComponent,
    SpoilerLogComponent,
    LoadingComponent,
    ErrorComponent,
    HelpPageComponent,
    ChangelogPageComponent,
    ColorPalettesComponent,
    MarioSettingsComponent,
    StartingItemsComponent,
    ItemChiplistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatChipsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
