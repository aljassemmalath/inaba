import { Component, input } from '@angular/core';

export interface StepItem {
  number: number;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'locked';
  statusLabel: string;
}

@Component({
  selector: 'app-progress-stepper',
  template: `
    <div class="content-card-body progress-stepper-card">
      <div class="stepper" role="list" aria-label="مراحل الطلب">
        @for (step of steps(); track step.number; let last = $last) {
          <div class="step" [class]="'step step--' + step.status" role="listitem">
            <div class="step-top">
              <div class="step-head">
                <div class="step-marker">
                  <span class="step-number">{{ step.number }}</span>
                </div>
              </div>
              @if (!last) { <div class="step-line" aria-hidden="true"></div> }
            </div>
            <div class="step-label">{{ step.name }}</div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .progress-stepper-card {
      background: var(--teal-20);
      border: 1px solid var(--teal-50);
      box-shadow: none;
      overflow: visible;
      height: auto;
      max-height: none;
    }
    .stepper {
      display: flex;
      align-items: flex-start;
      gap: 0;
      overflow: visible;
      width: 100%;
      padding: 2px 0; /* room for completed marker outer stroke */
    }
    .step {
      display: flex;
      flex-direction: column;
      flex: 1 1 0;
      min-width: 0;
      position: relative;
    }
    .step-top {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 38px; /* accommodates 34px marker + 2px outer stroke */
    }
    .step-head {
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .step-marker {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      border: 1px solid var(--teal-50);
      background: var(--teal-100);
      color: var(--teal-100);
      font-weight: 700;
      flex-shrink: 0;
      z-index: 1;
      box-sizing: border-box;
    }
    .step-label {
      width: 38px; /* align label centered beneath its circle */
      margin-top: 8px;
      font-size: var(--font-size-body-sm);
      font-weight: 500;
      color: var(--text-secondary);
      text-align: center;
      line-height: 1.4;
      white-space: normal;
    }
    .step-line {
      flex: 1;
      height: 2px;
      background: var(--teal-100);
      margin-inline: 4px;
      min-width: 12px;
    }

    /* Current (in-progress) */
    .step--in-progress .step-marker { border-color: var(--teal-500); background: var(--teal-50); color: var(--teal-500); }
    .step--in-progress .step-label { color: var(--teal-500); }

    /* Completed */
    .step--completed .step-marker {
      background: var(--teal-500);
      border-color: var(--teal-300);
      color: var(--neutral-0);
      box-shadow: 0 0 0 2px var(--teal-300);
    }
    .step--completed .step-label { color: var(--teal-700); }
    .step--completed .step-line { background: var(--teal-500); }

    /* Inactive (pending / locked) */
    .step--pending .step-marker,
    .step--locked .step-marker { background: var(--teal-100); border-color: var(--teal-50); color: var(--teal-100); }
    .step--pending .step-label,
    .step--locked .step-label { color: var(--text-tertiary); }
  `],
})
export class ProgressStepperComponent {
  readonly steps = input.required<StepItem[]>();
}
