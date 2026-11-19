import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { AGENCIES_MOCK } from '../../data/mock-agencies';
import { AgencyRow } from '../../models/agency.model';

@Component({
  selector: 'app-agencies-page',
  imports: [PageBannerComponent, DataTableComponent, StatusBadgeComponent],
  template: `
    <app-page-banner title="الوكالات" description="إدارة الوكالات ومتابعة بياناتها وحالة طلباتها." />
    <div class="content-card-body table-card">
      <app-data-table [columns]="columns" [rows]="rows" trackByKey="id">
        <ng-template #statusCell let-row>
          <app-status-badge [label]="row.status" [tone]="row.statusTone" />
        </ng-template>
        <ng-template #actionsCell let-row>
          <button type="button" class="btn-icon" aria-label="عرض تفاصيل الوكالة" title="عرض" (click)="openDetails(row); $event.stopPropagation()">
            <span class="icon-placeholder icon-placeholder--sm"><img class="icon-placeholder__image is-visible" src="/assets/images/svg/Buttons/view.svg" alt="" /></span>
          </button>
        </ng-template>
      </app-data-table>
    </div>
  `,
})
export class AgenciesPageComponent {
  private readonly router = inject(Router);
  readonly rows = AGENCIES_MOCK;
  readonly columns: DataTableColumn<AgencyRow>[] = [
    { key: 'agency', header: 'الوكالة' },
    { key: 'email', header: 'البريد الإلكتروني' },
    { key: 'requestsCount', header: 'عدد الطلبات' },
    { key: 'inProgressCount', header: 'الطلبات قيد التنفيذ' },
    { key: 'status', header: 'الحالة' },
    { key: 'actions', header: 'الإجراءات', width: '90px' },
  ];

  openDetails(row: AgencyRow): void {
    this.router.navigate(['/people-organizations/agencies', row.id]);
  }
}
