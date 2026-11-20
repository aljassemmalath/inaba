import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, IconPlaceholderComponent],
  template: `
    <div class="search-wrap" [style.width]="width()" [style.min-width]="minWidth()">
      <span class="search-icon" aria-hidden="true">
        <app-icon-placeholder size="sm" src="assets/images/svg/Header/search.svg" />
      </span>
      <label class="visually-hidden" [attr.for]="inputId()">{{ label() }}</label>
      <input
        [id]="inputId()"
        type="search"
        class="form-control input-search"
        [placeholder]="placeholder()"
        [ngModel]="value()"
        (ngModelChange)="value.set($event)"
      />
    </div>
  `,
  styles: [`:host { display: block; max-width: 100%; } .search-wrap { max-width: 100%; }`],
})
export class SearchBarComponent {
  readonly value = model('');
  readonly placeholder = input('');
  readonly label = input('بحث');
  readonly inputId = input('app-search');
  readonly width = input('min(340px, 100%)');
  readonly minWidth = input('220px');
}
