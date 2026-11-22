import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';
import { StatusBadgeComponent } from '../status-badge/status-badge';
import { BadgeTone } from '../status-badge/status-badge';

@Component({
  selector: 'app-report-card',
  imports: [RouterLink, IconPlaceholderComponent, StatusBadgeComponent],
  template: `
    <article class="content-card-body report-card">
      <div class="report-card__badge">
        <app-status-badge [label]="category()" [tone]="categoryTone()" />
      </div>
      <div class="report-card__top">
        <span class="report-card__icon-circle">
          <app-icon-placeholder size="lg" [src]="iconSrc()" />
        </span>
      </div>
      <div class="report-card__body">
        <h3 class="report-card__title">{{ title() }}</h3>
        <p class="report-card__desc">{{ description() }}</p>
      </div>
      <a class="report-card__footer" [routerLink]="link()">
        <span class="report-card__view-label">عرض التقرير</span>
        <span class="report-card__view-circle" aria-hidden="true">
          <img src="assets/images/svg/Buttons/arrow-left.svg" alt="" />
        </span>
      </a>
    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .report-card {
      position: relative;
      height: 100%; display: flex; flex-direction: column; gap: 10px;
      padding: 20px;
      background: var(--background-default);
      border: 1px solid var(--border-default);
      border-inline-start: 2px solid var(--teal-700);
      border-radius: var(--radius-lg);
      box-shadow: none !important;
      box-sizing: border-box;
    }
    .report-card__badge {
      position: absolute;
      top: 20px;
      inset-inline-end: 20px; /* physical top-left in RTL */
    }
    .report-card__top {
      display: flex; align-items: flex-start;
    }
    .report-card__icon-circle {
      width: 48px; height: 48px; flex: 0 0 48px;
      border-radius: 50%;
      border: 1px solid var(--teal-100);
      background: var(--background-default);
      display: inline-flex; align-items: center; justify-content: center;
      box-sizing: border-box;
    }
    .report-card__body { flex: 1 1 auto; }
    .report-card__title {
      margin: 0 0 6px; font-size: var(--font-size-section); line-height: var(--line-height-section);
      font-weight: var(--font-weight-section); color: var(--text-primary);
    }
    .report-card__desc {
      margin: 0; color: var(--text-secondary); font-size: var(--font-size-body-md); line-height: 1.6;
    }
    .report-card__footer {
      margin-top: auto; display: flex; align-items: center; justify-content: flex-end;
      gap: 10px; text-decoration: none;
    }
    .report-card__view-label {
      color: var(--teal-700); font-size: var(--font-size-body-md); font-weight: 600;
    }
    .report-card__view-circle {
      width: 36px; height: 36px; flex: 0 0 36px; border-radius: 50%;
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--teal-700); box-shadow: var(--control-shadow);
    }
    .report-card__view-circle img {
      width: 16px; height: 16px; display: block; filter: brightness(0) invert(1);
    }
    .report-card__footer:hover .report-card__view-label { color: var(--teal-500); }
  `],
})
export class ReportCardComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly category = input.required<string>();
  readonly categoryTone = input<BadgeTone>('neutral');
  readonly iconSrc = input('assets/images/svg/Reports/orders.svg');
  readonly link = input<any[] | string>(['/finance-reports/reports']);
}
