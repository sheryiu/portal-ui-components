import { NgModule } from '@angular/core';
import { AccordionModule } from './accordion/accordion.module';
import { BackgroundGraphicsComponent } from './background-graphics/background-graphics.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ColorEditComponent } from './color-edit/color-edit.component';
import { DirtyBarModule } from './dirty-bar/dirty-bar.module';
import { DividerComponent } from './divider/divider.component';
import { FieldModule } from './field/field.module';
import { GlobalSearchModule } from './global-search/global-search.module';
import { LinearProgressDisplayComponent } from './linear-progress-display/linear-progress-display.component';
import { MultilingualTextDisplayComponent } from './multilingual-text-display/multilingual-text-display.component';
import { MultilingualTextEditComponent } from './multilingual-text-edit/multilingual-text-edit.component';
import { RatingDisplayComponent } from './rating-display/rating-display.component';
import { RatingEditComponent } from './rating-edit/rating-edit.component';
import { RootNavigationModule } from './root-navigation';
import { SearchInputLabelDirective } from './search-input/search-input-label.directive';
import { SearchInputSuggestionItemDirective } from './search-input/search-input-suggestion-item.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { SectionedOutletComponent } from './sectioned-outlet/sectioned-outlet.component';
import { OptionDirective } from './segmented-options/option.directive';
import { SegmentedOptionsComponent } from './segmented-options/segmented-options.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { TabBarModule } from './tab-bar/tab-bar.module';
import { TableModule } from './table/table.module';
import { TimeAgoPipe } from './time-display/time-ago.pipe';
import { TimeDisplayComponent } from './time-display/time-display.component';

@NgModule({
  imports: [
    BackgroundGraphicsComponent,
    SectionedOutletComponent,
    RootNavigationModule,
    BreadcrumbsComponent,
    TableModule,
    MultilingualTextEditComponent,
    MultilingualTextDisplayComponent,
    SegmentedOptionsComponent,
    OptionDirective,
    SearchInputComponent,
    SearchInputLabelDirective,
    SearchInputSuggestionItemDirective,
    TabBarModule,
    RatingEditComponent,
    RatingDisplayComponent,
    ColorEditComponent,
    TimeDisplayComponent,
    TimeAgoPipe,
    LinearProgressDisplayComponent,
    GlobalSearchModule,
    DirtyBarModule,
    FieldModule,
    SidebarModule,
    AccordionModule,
    DividerComponent,
  ],
  exports: [
    BackgroundGraphicsComponent,
    SectionedOutletComponent,
    RootNavigationModule,
    BreadcrumbsComponent,
    TableModule,
    MultilingualTextEditComponent,
    MultilingualTextDisplayComponent,
    SegmentedOptionsComponent,
    OptionDirective,
    SearchInputComponent,
    SearchInputLabelDirective,
    SearchInputSuggestionItemDirective,
    TabBarModule,
    RatingEditComponent,
    RatingDisplayComponent,
    ColorEditComponent,
    TimeDisplayComponent,
    TimeAgoPipe,
    LinearProgressDisplayComponent,
    GlobalSearchModule,
    DirtyBarModule,
    FieldModule,
    SidebarModule,
    AccordionModule,
    DividerComponent,
  ]
})
export class LibraryModule { }
