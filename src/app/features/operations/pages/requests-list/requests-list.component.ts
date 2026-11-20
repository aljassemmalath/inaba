import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataTableColumn, DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { FilterToolbarComponent } from '../../../../shared/components/filter-toolbar/filter-toolbar.component';
import { PageBannerComponent } from '../../../../shared/components/page-banner/page-banner.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { SummaryContainerComponent } from '../../../../shared/components/summary-container/summary-container.component';
import { SummaryItemComponent } from '../../../../shared/components/summary-item/summary-item.component';
import { REQUESTS_LIST_MOCK, REQUESTS_SUMMARY } from '../../data/mock-requests-list';
import { RequestListRow } from '../../models/request-list.model';

@Component({
  selector: 'app-requests-list-page',
  imports: [FormsModule, RouterLink, PageBannerComponent, SummaryContainerComponent, SummaryItemComponent, FilterToolbarComponent, DataTableComponent, StatusBadgeComponent, PaginationComponent],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.scss',
})
export class RequestsListComponent {
  constructor(private router: Router) {
    effect(() => {
      this.search();
      this.page.set(1);
    });
  }

  readonly summary = REQUESTS_SUMMARY;
  readonly all = REQUESTS_LIST_MOCK;
  readonly search = signal('');
  readonly filterOpen = signal(false);
  readonly page = signal(1);
  readonly pageSize = signal(8);
  readonly totalRecords = 500;

  readonly columns: DataTableColumn<RequestListRow>[] = [
    { key: 'requestNumber', header: 'رقم الطلب' },
    { key: 'beneficiary', header: 'المستفيد' },
    { key: 'product', header: 'المنتج' },
    { key: 'source', header: 'مصدر الطلب' },
    { key: 'executor', header: 'المنفذ' },
    { key: 'status', header: 'الحالة' },
    { key: 'indicators', header: 'مؤشرات', width: '150px' },
    { key: 'requestDate', header: 'تاريخ الطلب' },
    { key: 'actions', header: 'الإجراءات', width: '90px' },
  ];

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.all;
    return this.all.filter((r) => [r.requestNumber, r.customerName, r.beneficiary].join(' ').toLowerCase().includes(q));
  });
  readonly total = computed(() => this.totalRecords);
  readonly startItem = computed(() => (this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1));
  readonly endItem = computed(() => Math.min(this.page() * this.pageSize(), this.total()));
  readonly rows = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  openDetails(row: RequestListRow) { this.router.navigate(['/operations/requests', row.id]); }
  onPage(p: number) { this.page.set(p); }
  onPageSize(v: string) { this.pageSize.set(Number(v) || 8); this.page.set(1); }
  exportData(): void { /* export hook */ }

}