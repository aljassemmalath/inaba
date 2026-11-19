import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-container',
  template: `
    <div class="content-card-body summary-container" [class]="modifierClass()">
      <ng-content />
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .summary-container {
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;
      gap: 0;
    }
    .summary-container ::ng-deep app-summary-item {
      flex: 1 1 160px;
      min-width: 140px;
      position: relative;
    }
    .summary-container ::ng-deep app-summary-item:not(:last-child)::after {
      content: "";
      position: absolute;
      inset-inline-end: 0;
      top: 8px;
      bottom: 8px;
      width: 1px;
      background: var(--border-default);
    }
    @media (max-width: 767.98px) {
      .summary-container ::ng-deep app-summary-item::after { display: none; }
      .summary-container { gap: 8px 0; }
    }
  `],
})
export class SummaryContainerComponent {
  readonly modifierClass = input('');
}
