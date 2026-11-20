import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-section',
  template: `
    <section class="content-card-body form-section" [attr.aria-labelledby]="titleId">
      <header class="form-section__header">
        @if (number() !== null) {
          <span class="form-section__number" aria-hidden="true">{{ number() }}</span>
        }
        <div class="form-section__action"><ng-content select="[sectionAction]" /></div>
        <h2 class="form-section__title" [id]="titleId">{{ title() }}</h2>
      </header>
      <div class="card-divider" aria-hidden="true"></div>
      <div class="form-section__body">
        <ng-content />
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .form-section__header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .form-section__number {
      width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0;
      background: transparent; color: var(--text-primary); font-weight: 700; font-size: 12px;
      border: 1px solid var(--border-subtle);
    }
    .form-section__action { display: flex; align-items: center; }
    .form-section__action:empty { display: none; }
    .form-section__title { margin: 0; font-size: var(--font-size-section); line-height: var(--line-height-section); font-weight: var(--font-weight-section); color: var(--text-primary); }
    .form-section .card-divider { margin: 0 0 16px; }
  `],
})
export class FormSectionComponent {
  readonly number = input<number | string | null>(null);
  readonly title = input.required<string>();
  get titleId(): string {
    return 'fs-' + String(this.number()) + '-' + this.title().replace(/\s+/g, '-').slice(0, 20);
  }
}
