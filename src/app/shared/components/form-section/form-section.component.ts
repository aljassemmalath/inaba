import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-section',
  template: `
    <section class="content-card-body form-section" [attr.aria-labelledby]="titleId">
      <header class="form-section__header">
        <span class="form-section__number" aria-hidden="true">{{ number() }}</span>
        <h2 class="form-section__title" [id]="titleId">{{ title() }}</h2>
      </header>
      <div class="form-section__body">
        <ng-content />
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .form-section__header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .form-section__number {
      width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0;
      background: rgba(0,160,146,.12); color: var(--text-brand); font-weight: 700; font-size: 14px;
      border: 1px solid rgba(0,160,146,.25);
    }
    .form-section__title { margin: 0; font-size: var(--font-size-section); line-height: var(--line-height-section); font-weight: var(--font-weight-section); color: var(--text-primary); }
  `],
})
export class FormSectionComponent {
  readonly number = input.required<number | string>();
  readonly title = input.required<string>();
  get titleId(): string {
    return 'fs-' + String(this.number()) + '-' + this.title().replace(/\s+/g, '-').slice(0, 20);
  }
}
