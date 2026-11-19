import { Component } from '@angular/core';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { ReportCardComponent } from '../../../../../shared/components/report-card/report-card.component';
import { REPORTS_CARDS } from '../../data/reports.data';

@Component({
  selector: 'app-reports-page',
  imports: [PageBannerComponent, ReportCardComponent],
  template: `
    <app-page-banner title="التقارير" description="استعرض التقارير التشغيلية والمالية وتقارير الأداء والشركاء." />
    <div class="row g-3">
      @for (report of reports; track report.key) {
        <div class="col-12 col-md-6 col-lg-4 d-flex">
          <app-report-card
            [title]="report.title"
            [description]="report.description"
            [category]="report.category"
            [categoryTone]="report.categoryTone"
            [link]="['/finance-reports/reports', report.key]"
          />
        </div>
      }
    </div>
  `,
})
export class ReportsPageComponent {
  readonly reports = REPORTS_CARDS;
}
