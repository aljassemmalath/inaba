import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableCellDirective, DataTableColumn, DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { FilterToolbarComponent } from '../../../../shared/components/filter-toolbar/filter-toolbar.component';
import { PageBannerComponent } from '../../../../shared/components/page-banner/page-banner.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { SummaryContainerComponent } from '../../../../shared/components/summary-container/summary-container.component';
import { SummaryItemComponent } from '../../../../shared/components/summary-item/summary-item.component';
import { PROBLEMS_MOCK, PROBLEMS_SUMMARY } from '../../data/mock-problems';
import { ProblemRow } from '../../models/problem.model';

@Component({
  selector: 'app-problems-page',
  imports: [PageBannerComponent, SummaryContainerComponent, SummaryItemComponent, FilterToolbarComponent, DataTableComponent, DataTableCellDirective, StatusBadgeComponent],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
})
export class ProblemsComponent {
  private readonly router = inject(Router);
  readonly summary = PROBLEMS_SUMMARY;
  readonly all = PROBLEMS_MOCK;
  readonly search = signal('');
  readonly filterOpen = signal(false);
  readonly page = signal(1);
  readonly pageSize = signal(10);

  constructor() {
    effect(() => {
      this.search();
      this.page.set(1);
    });
  }

  readonly columns: DataTableColumn<ProblemRow>[] = [
    {
      key: 'problem',
      header: 'المشكلة',
      cell: (row) => row.problem,
      description: (row) => row.problemDetail,
      icon: (row) => row.problemIcon,
    },
    { key: 'requestNumber', header: 'الطلب' },
    { key: 'executor', header: 'المنفذ' },
    { key: 'stage', header: 'المرحلة' },
    {
      key: 'reportedAt',
      header: 'وقت البلاغ',
      cell: (row) => row.reportedAtDate,
      description: (row) => row.reportedAtTime,
    },
    { key: 'status', header: 'الحالة' },
    {
      key: 'lastUpdated',
      header: 'آخر تحديث',
      cell: (row) => row.lastUpdatedDate,
      description: (row) => row.lastUpdatedTime,
    },
    { key: 'actions', header: 'الإجراءات', width: '110px' },
  ];

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.all;
    return this.all.filter((r) => [r.problem, r.requestNumber, r.executor].join(' ').toLowerCase().includes(q));
  });
  readonly total = computed(() => this.filtered().length);
  readonly rows = computed(() => this.filtered().slice((this.page() - 1) * this.pageSize(), this.page() * this.pageSize()));

  toggleFilter() { this.filterOpen.update((v) => !v); }
  exportData(): void { /* export hook */ }
  openDetails(row: ProblemRow): void {
    this.router.navigate(['/operations/issues', row.id]);
  }
}
