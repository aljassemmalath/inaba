import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state';
import { LoadingStateComponent } from '../../../../shared/components/loading-state/loading-state';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { OperationTab } from '../../models/operations.model';
import { OPERATIONS_MOCK, TAB_LABELS } from '../../services/operations.mock';

interface TabDef {
  key: OperationTab;
  label: string;
}

const TAB_KEYS: OperationTab[] = ['action', 'requests', 'issues'];

function isTab(value: string | null): value is OperationTab {
  return !!value && TAB_KEYS.includes(value as OperationTab);
}

@Component({
  selector: 'app-operations-page',
  imports: [
    FormsModule,
    StatusBadgeComponent,
    PaginationComponent,
    EmptyStateComponent,
    LoadingStateComponent,
  ],
  templateUrl: './operations.html',
  styleUrl: './operations.scss',
})
export class OperationsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly tabs: TabDef[] = [
    { key: 'action', label: TAB_LABELS.action },
    { key: 'requests', label: TAB_LABELS.requests },
    { key: 'issues', label: TAB_LABELS.issues },
  ];

  readonly activeTab = signal<OperationTab>('action');
  readonly query = signal('');
  readonly statusFilter = signal('all');
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly pageSize = 5;
  private initialized = false;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const tab = isTab(params.get('tab')) ? (params.get('tab') as OperationTab) : 'action';
      if (!isTab(params.get('tab'))) {
        void this.router.navigate(['/operations', 'action'], { replaceUrl: true });
        return;
      }
      const changed = tab !== this.activeTab() || !this.initialized;
      this.activeTab.set(tab);
      this.query.set('');
      this.statusFilter.set('all');
      this.page.set(1);
      if (this.initialized && changed) {
        this.loading.set(true);
        setTimeout(() => this.loading.set(false), 250);
      }
      this.initialized = true;
    });
  }

  readonly counts = computed(() => ({
    action: OPERATIONS_MOCK.action.length,
    requests: OPERATIONS_MOCK.requests.length,
    issues: OPERATIONS_MOCK.issues.length,
  }));

  readonly statusOptions = computed(() => {
    const rows = OPERATIONS_MOCK[this.activeTab()];
    const unique = Array.from(new Set(rows.map((r) => r.statusLabel)));
    return [{ value: 'all', label: 'كل الحالات' }, ...unique.map((s) => ({ value: s, label: s }))];
  });

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const status = this.statusFilter();
    return OPERATIONS_MOCK[this.activeTab()].filter((row) => {
      const matchesQuery =
        !q ||
        [row.reference, row.title, row.entity, row.assignee, row.statusLabel]
          .join(' ')
          .toLowerCase()
          .includes(q);
      const matchesStatus = status === 'all' || row.statusLabel === status;
      return matchesQuery && matchesStatus;
    });
  });

  readonly total = computed(() => this.filtered().length);
  readonly rows = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  setTab(tab: OperationTab): void {
    if (tab === this.activeTab()) return;
    void this.router.navigate(['/operations', tab]);
  }

  onSearch(value: string): void {
    this.query.set(value);
    this.page.set(1);
  }

  onStatusChange(value: string): void {
    this.statusFilter.set(value);
    this.page.set(1);
  }

  onPageChange(next: number): void {
    this.page.set(next);
  }

  resetFilters(): void {
    this.query.set('');
    this.statusFilter.set('all');
    this.page.set(1);
  }
}
