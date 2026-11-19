import { Component, computed, input } from '@angular/core';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';

export interface StepperStep {
  number: number;
  title: string;
}

@Component({
  selector: 'app-form-stepper',
  imports: [IconPlaceholderComponent],
  template: `
    <nav class="form-stepper" aria-label="مراحل النموذج">
      <ol class="form-stepper__list">
        @for (step of steps(); track step.number; let i = $index; let last = $last) {
          <li class="form-stepper__item" [class.is-completed]="isCompleted(step.number)" [class.is-active]="isActive(step.number)" [class.is-pending]="isPending(step.number)">
            <div class="form-stepper__marker" [attr.aria-current]="isActive(step.number) ? 'step' : null">
              @if (isCompleted(step.number)) {
                <app-icon-placeholder size="sm" />
              } @else {
                <span>{{ step.number }}</span>
              }
            </div>
            <div class="form-stepper__body">
              <span class="form-stepper__num">الخطوة {{ step.number }}</span>
              <span class="form-stepper__title">{{ step.title }}</span>
            </div>
            @if (!last) { <div class="form-stepper__line" aria-hidden="true"></div> }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .form-stepper__list { list-style: none; margin: 0; padding: 0; display: flex; align-items: flex-start; gap: 0; }
    .form-stepper__item { display: flex; align-items: flex-start; gap: 10px; flex: 1 1 0; min-width: 0; position: relative; padding-inline-end: 12px; }
    .form-stepper__marker {
      width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0;
      border: 1px solid var(--border-default); background: var(--background-muted);
      color: var(--text-secondary); font-weight: 700; font-size: 14px; z-index: 1;
    }
    .is-completed .form-stepper__marker { background: var(--action-primary-default); border-color: var(--action-primary-default); color: #fff; }
    .is-active .form-stepper__marker { background: rgba(0,160,146,.12); border-color: var(--action-primary-default); color: var(--text-brand); box-shadow: 0 0 0 3px rgba(0,160,146,.12); }
    .is-pending .form-stepper__marker { background: var(--background-muted); border-color: var(--border-default); color: var(--text-tertiary); }
    .form-stepper__body { min-width: 0; }
    .form-stepper__num { display: block; font-size: 12px; color: var(--text-tertiary); }
    .form-stepper__title { display: block; font-size: var(--font-size-body-md); font-weight: 600; color: var(--text-primary); }
    .is-pending .form-stepper__title { color: var(--text-secondary); font-weight: 500; }
    .form-stepper__line { flex: 1; height: 2px; background: var(--border-default); margin-top: 16px; min-width: 12px; }
    .is-completed .form-stepper__line { background: rgba(0,160,146,.45); }
    @media (max-width: 575.98px) {
      .form-stepper__item { flex-direction: column; align-items: center; text-align: center; padding-inline-end: 4px; gap: 6px; }
      .form-stepper__line { display: none; }
    }
  `],
})
export class FormStepperComponent {
  readonly steps = input.required<StepperStep[]>();
  readonly current = input.required<number>();

  isActive = (n: number) => this.current() === n;
  isCompleted = (n: number) => n < this.current();
  isPending = (n: number) => n > this.current();
}
