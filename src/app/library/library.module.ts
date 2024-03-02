import { NgModule } from '@angular/core';
import { BackgroundGraphicsComponent } from './background-graphics/background-graphics.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FormModule } from './form/form.module';
import { ImageUploadEditComponent } from './image-upload-edit/image-upload-edit.component';
import { MultilingualTextDisplayComponent } from './multilingual-text-display/multilingual-text-display.component';
import { MultilingualTextEditComponent } from './multilingual-text-edit/multilingual-text-edit.component';
import { RatingEditComponent } from './rating-edit/rating-edit.component';
import { RootNavigationComponent } from './root-navigation/root-navigation.component';
import { SearchInputLabelDirective } from './search-input/search-input-label.directive';
import { SearchInputSuggestionItemDirective } from './search-input/search-input-suggestion-item.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { SectionedOutletComponent } from './sectioned-outlet/sectioned-outlet.component';
import { OptionDirective } from './segmented-options/option.directive';
import { SegmentedOptionsComponent } from './segmented-options/segmented-options.component';
import { HeaderActionsDirective, HeaderDirective, SimpleHeaderComponent } from './simple-header/simple-header.component';
import { TabBarModule } from './tab-bar/tab-bar.module';
import { TableModule } from './table/table.module';

@NgModule({
  declarations: [
    HeaderDirective,
    HeaderActionsDirective,
  ],
  imports: [
    BackgroundGraphicsComponent,
    SectionedOutletComponent,
    RootNavigationComponent,
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
  ],
  exports: [
    BackgroundGraphicsComponent,
    SectionedOutletComponent,
    RootNavigationComponent,
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
  ]
})
export class LibraryModule { }
