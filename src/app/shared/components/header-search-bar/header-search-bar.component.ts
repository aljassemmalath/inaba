import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';

@Component({
  selector: 'app-header-search-bar',
  imports: [FormsModule, IconPlaceholderComponent],
  template: `
    <div
      class="header-search"
      [class.is-disabled]="disabled()"
      [class.is-error]="!!error()"
      [style.width.px]="width()">
      <label class="visually-hidden" [attr.for]="inputId()">{{ label() }}</label>
      <input
        [id]="inputId()"
        type="search"
        class="header-search__input"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.aria-invalid]="error() ? 'true' : null"
        [ngModel]="value()"
        (ngModelChange)="value.set($event)"
      />
      <span class="header-search__icon" aria-hidden="true">
        <app-icon-placeholder size="md" src="assets/images/svg/Header/search.svg" />
      </span>
    </div>
    @if (error()) { <div class="header-search__error" role="alert">{{ error() }}</div> }
  `,
  styles: [`
    :host { display: inline-block; max-width: 100%; }
    .header-search {
      position: relative;
      width: 400px;
      max-width: 100%;
    }
    .header-search__input {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      background: var(--background-default);
      color: var(--text-primary);
      font-size: var(--font-size-body-md);
      font-family: var(--font-family-base);
      /* icon on the right (physical) with RTL text alignment */
      padding: 0 40px 0 12px;
      text-align: right;
      box-shadow: var(--control-shadow);
      transition: border-color .15s ease, box-shadow .15s ease, background-color .15s ease;
    }
    .header-search__input::placeholder { color: var(--text-placeholder); }
    .header-search__input:hover:not(:disabled) { border-color: var(--border-strong); }
    .header-search__input:focus {
      outline: none;
      border-color: var(--border-focus);
      box-shadow: var(--control-shadow), var(--focus-ring);
    }
    .header-search__input:disabled {
      background: var(--background-muted);
      color: var(--text-disabled);
      cursor: not-allowed;
    }
    .is-error .header-search__input { border-color: var(--error-border); }
    .is-error .header-search__input:focus { box-shadow: 0 0 0 3px rgba(214, 69, 69, 0.14); }
    .header-search__icon {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      color: var(--icons-tertiary);
    }
    .header-search__error {
      margin-top: 4px;
      font-size: var(--font-size-body-sm);
      color: var(--error-text);
    }
  `],
})
export class HeaderSearchBarComponent {
  readonly value = model('');
  readonly placeholder = input('ابحث بالاسم أو الجوال أو رقم الطلب...');
  readonly label = input('بحث');
  readonly inputId = input('global-header-search');
  readonly width = input(400);
  readonly disabled = input(false);
  readonly error = input('');
}
