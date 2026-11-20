import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableCellDirective, DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { SummaryContainerComponent } from '../../../../../shared/components/summary-container/summary-container.component';
import { SummaryItemComponent } from '../../../../../shared/components/summary-item/summary-item.component';
import { EXECUTORS_MOCK, EXECUTORS_SUMMARY } from '../../data/mock-executors';
import { ExecutorRow } from '../../models/executor.model';

@Component({
  selector: 'app-executors-page',
  imports: [PageBannerComponent, SummaryContainerComponent, SummaryItemComponent, DataTableComponent, DataTableCellDirective, StatusBadgeComponent],
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
        <ng-template appDataTableCell="supervisor" let-row>
          <span class="executor-supervisor">{{ row.supervisor }}</span>
        </ng-template>
        <ng-template appDataTableCell="currentRequest" let-row>
          <div class="executor-request-cell">
            @if (row.currentRequest && row.currentRequest !== '—') {
              <span class="executor-request-number">{{ row.currentRequest }}</span>
            } @else {
              <span class="executor-request-empty">—</span>
            }
            <button type="button" class="executor-request-eye" [disabled]="!row.currentRequest || row.currentRequest === '—'"
              [attr.aria-label]="'عرض الطلب الحالي'" [attr.title]="'عرض الطلب الحالي'" (click)="openCurrentRequest(row); $event.stopPropagation()">
              <img src="assets/images/svg/Buttons/view.svg" alt="" aria-hidden="true" width="16" height="16" />
            </button>
          </div>
        </ng-template>
        <ng-template #statusCell let-row>
          <app-status-badge [label]="row.dutyStatus" [tone]="row.dutyTone" />
        </ng-template>
        <ng-template #actionsCell let-row>
          <button type="button" class="btn-icon" aria-label="عرض تفاصيل المنفذ" title="عرض" (click)="openDetails(row); $event.stopPropagation()">
            <span class="icon-placeholder icon-placeholder--sm"><img class="icon-placeholder__image is-visible" src="assets/images/svg/Buttons/view.svg" alt="" /></span>
          </button>
        </ng-template>
      </app-data-table>
    </div>
  `,
  styles: [`
    .executor-supervisor {
      color: var(--teal-700);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .executor-request-cell {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .executor-request-number { direction: ltr; }
    .executor-request-empty { color: var(--text-secondary); }
    .executor-request-eye {
      width: 24px;
      height: 24px;
      padding: 0;
      border: 0;
      border-radius: 4px;
      background: transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .executor-request-eye:hover:not(:disabled) { background: var(--background-muted); }
    .executor-request-eye:disabled { opacity: 0.5; cursor: not-allowed; }
  `],
})
export class ExecutorsPageComponent {
  private readonly router = inject(Router);
  readonly summary = EXECUTORS_SUMMARY;
  readonly rows = EXECUTORS_MOCK;
  readonly columns: DataTableColumn<ExecutorRow>[] = [
    {
      key: 'executor',
      header: 'المنفذ',
      cell: (row) => row.executor,
      description: (row) => row.phone,
    },
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

  openCurrentRequest(row: ExecutorRow): void {
    const requestNumber = String(row.currentRequest ?? '').replace(/^#/, '').trim();
    if (!requestNumber || requestNumber === '—') return;
    this.router.navigate(['/operations/requests', requestNumber]);
  }
}
