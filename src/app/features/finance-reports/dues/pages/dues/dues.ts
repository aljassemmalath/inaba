import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { FilterToolbarComponent } from '../../../../../shared/components/filter-toolbar/filter-toolbar.component';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { SummaryContainerComponent } from '../../../../../shared/components/summary-container/summary-container.component';
import { SummaryItemComponent } from '../../../../../shared/components/summary-item/summary-item.component';
import { DUES_MOCK, DUES_SUMMARY } from '../../data/mock-dues';
import { DueRow } from '../../models/due.model';

@Component({
  selector: 'app-dues-page',
  imports: [PageBannerComponent, SummaryContainerComponent, SummaryItemComponent, FilterToolbarComponent, DataTableComponent],
  template: `
    <app-page-banner title="المستحقات" description="متابعة مستحقات المنفذين الناتجة عن الطلبات المكتملة وتصديرها للمراجعة والدفع الخارجي." />
    <section class="mb-4" aria-label="مؤشرات المستحقات">
      <app-summary-container>
        @for (s of summary; track s.label) {
          <app-summary-item [label]="s.label" [value]="s.value" [iconSrc]="s.iconSrc" [modifierClass]="s.modifierClass" />
        }
      </app-summary-container>
    </section>
    <app-filter-toolbar [(search)]="search" searchPlaceholder="ابحث باسم المنفذ أو المنتج..." searchId="dues-search" exportLabel="تصدير البيانات" />
    <div class="content-card-body table-card">
      <app-data-table [columns]="columns" [rows]="filtered()" trackByKey="id">
        <ng-template #actionsCell let-row>
          <button type="button" class="btn-icon" aria-label="عرض المستحقات" title="عرض" (click)="openDetails(row); $event.stopPropagation()">
            <span class="icon-placeholder icon-placeholder--sm"><img class="icon-placeholder__image is-visible" src="assets/images/svg/Buttons/view.svg" alt="" /></span>
          </button>
        </ng-template>
      </app-data-table>
    </div>
  `,
})
export class DuesPageComponent {
  private readonly router = inject(Router);
  readonly summary = DUES_SUMMARY;
  readonly search = signal('');
  readonly rows = DUES_MOCK;
  readonly columns: DataTableColumn<DueRow>[] = [
    { key: 'executor', header: 'المنفذ' },
    { key: 'productStage', header: 'المنتج / المرحلة' },
    { key: 'baseAmount', header: 'المبلغ الأساسي', currency: true },
    { key: 'netAdjustments', header: 'صافي التسويات', currency: true },
    { key: 'finalDue', header: 'المستحق النهائي', currency: true },
    { key: 'actions', header: 'الإجراءات', width: '90px' },
  ];
  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.rows;
    return this.rows.filter((r) => [r.executor, r.productStage].join(' ').toLowerCase().includes(q));
  });

  openDetails(row: DueRow): void {
    this.router.navigate(['/finance-reports/dues', row.id]);
  }
}
