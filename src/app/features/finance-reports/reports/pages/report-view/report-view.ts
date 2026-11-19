import { Component, Inject, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { DataTableComponent, DataTableColumn } from '../../../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state';
import {
  AGENCIES_REPORT_ROWS,
  ENTITLEMENTS_REPORT_ROWS,
  EXECUTORS_REPORT_ROWS,
  ORDERS_REPORT_ROWS,
  PRODUCTS_REPORT_ROWS,
  PROFITS_REPORT_ROWS,
  REPORT_META,
  SUPERVISORS_REPORT_ROWS,
} from '../../data/reports.data';
import { AgenciesReportRow, EntitlementsReportRow, ExecutorsReportRow, OrdersReportRow, ProductsReportRow, ProfitsReportRow, SupervisorsReportRow } from '../../models/report.model';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="center" modalSize="large" [title]="'تفاصيل المنتج'" [showCloseButton]="true">
      <div modal-body class="product-modal-grid">
        @for (item of data.items; track item.label) {
          <div class="product-modal-item">
            <span class="product-modal-label">{{ item.label }}</span>
            <span class="product-modal-value" [attr.dir]="item.dir || null">{{ item.value }}</span>
          </div>
        }
      </div>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close()">إغلاق</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .product-modal-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px 12px; }
    .product-modal-item { display: flex; flex-direction: column; gap: 4px; text-align: right; align-items: flex-start; }
    .product-modal-label { font-size: 12px; color: var(--text-secondary); }
    .product-modal-value { font-size: 14px; font-weight: 500; color: var(--text-primary); word-break: break-word; }
    @media (max-width: 767.98px) { .product-modal-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 575.98px) { .product-modal-grid { grid-template-columns: 1fr; } }
  `],
})
class ProductDetailsModalComponent {
  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: { items: { label: string; value: string; dir?: string }[] }) {}
}

@Component({
  selector: 'app-report-view-page',
  imports: [FormsModule, PageBannerComponent, DataTableComponent, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './report-view.html',
  styleUrl: './report-view.scss',
})
export class ReportViewPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(Dialog);

  readonly key = this.route.snapshot.paramMap.get('key') ?? '';
  readonly meta = REPORT_META[this.key] ?? { title: 'عرض التقرير', description: 'التقرير المطلوب غير متوفر.' };
  readonly filterOpen = signal(false);

  // Filter inputs (simple, per available data)
  readonly fQuery = signal('');
  readonly fStatus = signal('');
  readonly fSource = signal('');
  readonly fDuty = signal('');
  readonly fFrom = signal('');
  readonly fTo = signal('');

  // Applied filters
  readonly aQuery = signal('');
  readonly aStatus = signal('');
  readonly aSource = signal('');
  readonly aDuty = signal('');
  readonly aFrom = signal('');
  readonly aTo = signal('');

  // Columns in exact right-to-left visual order as specified
  readonly ordersColumns: DataTableColumn<OrdersReportRow>[] = [
    { key: 'createdAt', header: 'تاريخ إنشاء الطلب' },
    { key: 'source', header: 'مصدر الطلب' },
    { key: 'currentExecutor', header: 'المُنفّذ الحالي' },
    { key: 'status', header: 'الحالة' },
    { key: 'product', header: 'المنتج' },
    { key: 'beneficiary', header: 'المستفيد' },
    { key: 'requestNumber', header: 'رقم الطلب' },
  ];
  readonly productsColumns: DataTableColumn<ProductsReportRow>[] = [
    { key: 'product', header: 'المنتج' },
    { key: 'totalOrders', header: 'إجمالي الطلبات' },
    { key: 'completedOrders', header: 'الطلبات المكتملة' },
    { key: 'delayedOrders', header: 'الطلبات المتأخرة' },
    { key: 'totalSales', header: 'إجمالي المبيعات', currency: true },
    { key: 'executorDues', header: 'مستحقات المنفذين', currency: true },
    { key: 'profit', header: 'الربح', currency: true },
    { key: 'actions', header: 'الإجراءات', width: '90px' },
  ];
  readonly executorsColumns: DataTableColumn<ExecutorsReportRow>[] = [
    { key: 'executor', header: 'المنفذ' },
    { key: 'dutyStatus', header: 'حالة الدوام' },
    { key: 'completedOrders', header: 'الطلبات المكتملة' },
    { key: 'delayedOrders', header: 'الطلبات المتأخرة' },
    { key: 'avgExecutionTime', header: 'متوسط مدة التنفيذ' },
    { key: 'assignmentRejections', header: 'رفض الإسناد' },
    { key: 'netDues', header: 'صافي المستحقات', currency: true },
    { key: 'actions', header: 'الإجراءات', width: '90px' },
  ];
  readonly supervisorsColumns: DataTableColumn<SupervisorsReportRow>[] = [
    { key: 'supervisor', header: 'المشرف' },
    { key: 'linkedExecutors', header: 'عدد المنفذين المرتبطين' },
    { key: 'completed', header: 'المكتملة' },
    { key: 'delayed', header: 'المتأخرة' },
    { key: 'avgExecutionTime', header: 'متوسط مدة التنفيذ' },
  ];
  readonly agenciesColumns: DataTableColumn<AgenciesReportRow>[] = [
    { key: 'agency', header: 'الوكالة' },
    { key: 'totalOrders', header: 'إجمالي الطلبات' },
    { key: 'completedOrders', header: 'الطلبات المكتملة' },
    { key: 'inProgressOrders', header: 'الطلبات قيد التنفيذ' },
    { key: 'delayedOrders', header: 'الطلبات المتأخرة' },
    { key: 'status', header: 'الحالة' },
  ];
  readonly entitlementsColumns: DataTableColumn<EntitlementsReportRow>[] = [
    { key: 'executor', header: 'المنفذ' },
    { key: 'completedOrders', header: 'الطلبات المكتملة' },
    { key: 'orderDues', header: 'مستحقات الطلبات', currency: true },
    { key: 'netAdjustments', header: 'صافي التسويات', currency: true },
    { key: 'finalTotal', header: 'إجمالي المستحقات النهائية', currency: true },
  ];
  readonly profitsColumns: DataTableColumn<ProfitsReportRow>[] = [
    { key: 'product', header: 'المنتج' },
    { key: 'completedOrders', header: 'الطلبات المكتملة' },
    { key: 'totalSales', header: 'إجمالي المبيعات', currency: true },
    { key: 'executorDues', header: 'مستحقات المنفذين', currency: true },
    { key: 'profit', header: 'الربح', currency: true },
  ];

  private includes(v: string, q: string) { return (v || '').toLowerCase().includes(q); }

  readonly ordersRows = computed(() => {
    const q = this.aQuery().trim().toLowerCase();
    const status = this.aStatus();
    const source = this.aSource();
    return ORDERS_REPORT_ROWS.filter((r) =>
      (!q || [r.requestNumber, r.beneficiary, r.product, r.currentExecutor].some((x) => this.includes(String(x), q))) &&
      (!status || r.status === status) &&
      (!source || r.source === source)
    );
  });
  readonly productsRows = computed(() => {
    const q = this.aQuery().trim().toLowerCase();
    return PRODUCTS_REPORT_ROWS.filter((r) => !q || this.includes(r.product, q));
  });
  readonly executorsRows = computed(() => {
    const q = this.aQuery().trim().toLowerCase();
    const duty = this.aDuty();
    return EXECUTORS_REPORT_ROWS.filter((r) =>
      (!q || this.includes(r.executor, q)) && (!duty || r.dutyStatus === duty)
    );
  });
  readonly supervisorsRows = computed(() => {
    const q = this.aQuery().trim().toLowerCase();
    return SUPERVISORS_REPORT_ROWS.filter((r) => !q || this.includes(r.supervisor, q));
  });
  readonly agenciesRows = computed(() => {
    const q = this.aQuery().trim().toLowerCase();
    const status = this.aStatus();
    return AGENCIES_REPORT_ROWS.filter((r) =>
      (!q || this.includes(r.agency, q)) && (!status || r.status === status)
    );
  });
  readonly entitlementsRows = computed(() => {
    const q = this.aQuery().trim().toLowerCase();
    return ENTITLEMENTS_REPORT_ROWS.filter((r) => !q || this.includes(r.executor, q));
  });
  readonly profitsRows = computed(() => {
    const q = this.aQuery().trim().toLowerCase();
    return PROFITS_REPORT_ROWS.filter((r) => !q || this.includes(r.product, q));
  });

  openFilter(): void { this.filterOpen.set(true); }
  closeFilter(): void { this.filterOpen.set(false); }
  applyFilter(): void {
    this.aQuery.set(this.fQuery());
    this.aStatus.set(this.fStatus());
    this.aSource.set(this.fSource());
    this.aDuty.set(this.fDuty());
    this.aFrom.set(this.fFrom());
    this.aTo.set(this.fTo());
    this.filterOpen.set(false);
  }
  resetFilter(): void {
    this.fQuery.set(''); this.fStatus.set(''); this.fSource.set(''); this.fDuty.set(''); this.fFrom.set(''); this.fTo.set('');
    this.aQuery.set(''); this.aStatus.set(''); this.aSource.set(''); this.aDuty.set(''); this.aFrom.set(''); this.aTo.set('');
  }

  exportData(): void {
    // No existing export workflow found; do not create a fake export interaction.
  }

  openProductDetails(row: ProductsReportRow): void {
    const items = [
      { label: 'المنتج', value: row.product },
      { label: 'إجمالي الطلبات', value: String(row.totalOrders) },
      { label: 'الطلبات المكتملة', value: String(row.completedOrders) },
      { label: 'الطلبات المتأخرة', value: String(row.delayedOrders) },
      { label: 'إجمالي المبيعات', value: row.totalSales },
      { label: 'مستحقات المنفذين', value: row.executorDues },
      { label: 'الربح', value: row.profit },
      ...(row.salePrice ? [{ label: 'سعر البيع', value: row.salePrice }] : []),
      ...(row.expectedDuration ? [{ label: 'المدة المتوقعة', value: row.expectedDuration }] : []),
      ...(row.activeStatus ? [{ label: 'حالة المنتج', value: row.activeStatus }] : []),
    ];
    this.dialog.open(ProductDetailsModalComponent, { panelClass: 'app-modal-panel', data: { items } });
  }
}