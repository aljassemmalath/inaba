import { Component, input, model, output } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-filter-toolbar',
  imports: [SearchBarComponent],
  template: `
    <div class="content-card-body filter-toolbar-card" [class.mb-4]="margin()">
      <div class="toolbar-row">
        <div class="toolbar-right">
          @if (showSearch()) {
            <app-search-bar
              [value]="search()"
              (valueChange)="search.set($event)"
              [placeholder]="searchPlaceholder()"
              [inputId]="searchId()"
              [width]="searchWidth()"
            />
          }
          @if (showFilter()) {
            <button type="button" class="btn btn-brand-outline" (click)="filterClick.emit()" [attr.aria-expanded]="filterExpanded()">
              <img src="assets/images/svg/Buttons/filter.svg" alt="" aria-hidden="true" width="16" height="16" />
              <span>{{ filterLabel() }}</span>
            </button>
          }
          <ng-content select="[toolbar-extra]" />
        </div>
        <div class="toolbar-left">
          <ng-content select="[toolbar-actions]" />
          @if (showExport()) {
            <button type="button" class="btn btn-brand-outline" (click)="exportClick.emit()" [attr.aria-expanded]="exportExpanded()">
              <img src="assets/images/svg/Buttons/excel.svg" alt="" aria-hidden="true" width="16" height="16" />
              <span>{{ exportLabel() }}</span>
            </button>
          }
        </div>
      </div>
      <ng-content />
    </div>
  `,
  styles: [`
    :host { display: block; }
    .toolbar-row { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; }
    .toolbar-right, .toolbar-left { display:flex; align-items:flex-start; gap:8px; flex-wrap:wrap; align-items:center; }
  `],
})
export class FilterToolbarComponent {
  readonly search = model('');
  readonly searchPlaceholder = input('بحث...');
  readonly searchId = input('filter-search');
  readonly searchWidth = input('min(340px, 100%)');
  readonly showSearch = input(true);
  readonly showFilter = input(true);
  readonly showExport = input(true);
  readonly filterLabel = input('فلترة');
  readonly exportLabel = input('تصدير البيانات');
  readonly margin = input(true);
  readonly filterExpanded = input<boolean | null>(null);
  readonly exportExpanded = input<boolean | null>(null);
  readonly filterClick = output<void>();
  readonly exportClick = output<void>();
}
