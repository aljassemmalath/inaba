import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CircleIconComponent } from '../circle-icon/circle-icon.component';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';
import { StatusBadgeComponent } from '../status-badge/status-badge';
import { BadgeTone } from '../status-badge/status-badge';

@Component({
  selector: 'app-report-card',
  imports: [RouterLink, CircleIconComponent, IconPlaceholderComponent, StatusBadgeComponent],
  template: `
    <article class="content-card-body report-card">
      <div class="report-card__top">
        <div class="report-card__icons">
          <app-icon-placeholder size="lg" />
          <app-circle-icon variant="outlined" size="md" iconSize="sm" modifierClass="report-arrow" />
        </div>
        <app-status-badge [label]="category()" [tone]="categoryTone()" />
      </div>
      <div class="report-card__body">
        <h3 class="report-card__title">{{ title() }}</h3>
        <p class="report-card__desc">{{ description() }}</p>
      </div>
      <div class="report-card__footer">
        <a class="btn btn-brand-outline" [routerLink]="link()">عرض التقرير</a>
      </div>
    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .report-card { height: 100%; display: flex; flex-direction: column; }
    .report-card__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
    .report-card__icons { display: inline-flex; align-items: center; gap: 8px; }
    .report-card__body { flex: 1; }
    .report-card__title { margin: 0 0 6px; font-size: var(--font-size-section); line-height: var(--line-height-section); font-weight: var(--font-weight-section); color: var(--text-primary); }
    .report-card__desc { margin: 0; color: var(--text-secondary); font-size: var(--font-size-body-md); line-height: 1.6; }
    .report-card__footer { margin-top: 16px; }
  `],
})
export class ReportCardComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly category = input.required<string>();
  readonly categoryTone = input<BadgeTone>('neutral');
  readonly link = input<any[] | string>(['/finance-reports/reports']);
}
