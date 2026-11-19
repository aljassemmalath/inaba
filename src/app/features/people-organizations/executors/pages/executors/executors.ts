import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { SummaryContainerComponent } from '../../../../../shared/components/summary-container/summary-container.component';
import { SummaryItemComponent } from '../../../../../shared/components/summary-item/summary-item.component';
import { EXECUTORS_MOCK, EXECUTORS_SUMMARY } from '../../data/mock-executors';
import { ExecutorRow } from '../../models/executor.model';

@Component({
  selector: 'app-executors-page',
  imports: [PageBannerComponent, SummaryContainerComponent, SummaryItemComponent, DataTableComponent, StatusBadgeComponent],
  template: `
    <app-page-banner title="المنفذون" description="إدارة المنفذين ومتابعة حالتهم وطلبات الإسناد والمستحقات." />
    <section class="mb-4">
      <app-summary-container modifierClass="executors-summary">
        @for (s of summary; track s.label) {
          <app-summary-item [label]="s.label" [hint]="s.hint" [value]="s.value" [iconSrc]="s.iconSrc" [modifierClass]="s.modifierClass" />
        }
      </app-summary-container>
    </section>
    <div class="content-card-body table-card">
      <app-data-table [columns]="columns" [rows]="rows" trackByKey="id">
        <ng-template #statusCell let-row>
          <app-status-badge [label]="row.dutyStatus" [tone]="row.dutyTone" />
        </ng-template>
        <ng-template #actionsCell let-row>
          <button type="button" class="btn-icon" aria-label="عرض تفاصيل المنفذ" title="عرض" (click)="openDetails(row); $event.stopPropagation()">
            <span class="icon-placeholder icon-placeholder--sm"><img class="icon-placeholder__image is-visible" src="/assets/images/svg/Buttons/view.svg" alt="" /></span>
          </button>
        </ng-template>
      </app-data-table>
    </div>
  `,
})
export class ExecutorsPageComponent {
  private readonly router = inject(Router);
  readonly summary = EXECUTORS_SUMMARY;
  readonly rows = EXECUTORS_MOCK;
  readonly columns: DataTableColumn<ExecutorRow>[] = [
    { key: 'executor', header: 'المنفذ' },
    { key: 'supervisor', header: 'المشرف' },
    { key: 'dutyStatus', header: 'حالة الدوام' },
    { key: 'currentRequest', header: 'الطلب الحالي' },
    { key: 'completed', header: 'المكتملة' },
    { key: 'dues', header: 'المستحقات', currency: true },
    { key: 'actions', header: 'الإجراءات', width: '90px' },
  ];

  openDetails(row: ExecutorRow): void {
    this.router.navigate(['/people-organizations/executors', row.id]);
  }
}
