import { NgModule } from '@angular/core';
import { BackgroundGraphicsComponent } from './background-graphics/background-graphics.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ColorEditComponent } from './color-edit/color-edit.component';
import { DirtyBarModule } from './dirty-bar/dirty-bar.module';
import { FieldModule } from './field/field.module';
import { FormModule } from './form/form.module';
import { GlobalSearchModule } from './global-search/global-search.module';
import { ImageUploadEditComponent } from './image-upload-edit/image-upload-edit.component';
import { LinearProgressDisplayComponent } from './linear-progress-display/linear-progress-display.component';
import { MultilingualTextDisplayComponent } from './multilingual-text-display/multilingual-text-display.component';
import { MultilingualTextEditComponent } from './multilingual-text-edit/multilingual-text-edit.component';
import { RatingDisplayComponent } from './rating-display/rating-display.component';
import { RatingEditComponent } from './rating-edit/rating-edit.component';
import { RootNavigation2Component } from './root-navigation-2/root-navigation-2.component';
import { RootNavigationModule } from './root-navigation/root-navigation.module';
import { SearchInputLabelDirective } from './search-input/search-input-label.directive';
import { SearchInputSuggestionItemDirective } from './search-input/search-input-suggestion-item.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { SectionedOutletComponent } from './sectioned-outlet/sectioned-outlet.component';
import { OptionDirective } from './segmented-options/option.directive';
import { SegmentedOptionsComponent } from './segmented-options/segmented-options.component';
import { HeaderActionsDirective, HeaderDirective, SimpleHeaderComponent } from './simple-header/simple-header.component';
import { SupplementaryPanelModule } from './supplementary-panel/supplementary-panel.module';
import { TabBarModule } from './tab-bar/tab-bar.module';
import { TableModule } from './table/table.module';
import { TimeAgoPipe } from './time-display/time-ago.pipe';
import { TimeDisplayComponent } from './time-display/time-display.component';

@NgModule({
  declarations: [
    HeaderDirective,
    HeaderActionsDirective,
  ],
  imports: [
    BackgroundGraphicsComponent,
    SectionedOutletComponent,
    RootNavigationModule,
    RootNavigation2Component,
    BreadcrumbsComponent,
    SimpleHeaderComponent,
    TableModule,
    MultilingualTextEditComponent,
    MultilingualTextDisplayComponent,
    FormModule,
    SegmentedOptionsComponent,
    OptionDirective,
    SearchInputComponent,
    SearchInputLabelDirective,
    SearchInputSuggestionItemDirective,
    TabBarModule,
    ImageUploadEditComponent,
    RatingEditComponent,
    RatingDisplayComponent,
    ColorEditComponent,
    SupplementaryPanelModule,
    TimeDisplayComponent,
    TimeAgoPipe,
    LinearProgressDisplayComponent,
    GlobalSearchModule,
    DirtyBarModule,
    FieldModule,
  ],
  exports: [
    BackgroundGraphicsComponent,
    SectionedOutletComponent,
    RootNavigationModule,
    RootNavigation2Component,
    BreadcrumbsComponent,
    SimpleHeaderComponent,
    HeaderDirective,
    HeaderActionsDirective,
    TableModule,
    MultilingualTextEditComponent,
    MultilingualTextDisplayComponent,
    FormModule,
    SegmentedOptionsComponent,
    OptionDirective,
    SearchInputComponent,
    SearchInputLabelDirective,
    SearchInputSuggestionItemDirective,
    TabBarModule,
    ImageUploadEditComponent,
    RatingEditComponent,
    RatingDisplayComponent,
    ColorEditComponent,
    SupplementaryPanelModule,
    TimeDisplayComponent,
    TimeAgoPipe,
    LinearProgressDisplayComponent,
    GlobalSearchModule,
    DirtyBarModule,
    FieldModule,
  ]
})
export class LibraryModule { }
