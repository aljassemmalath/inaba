import { Component, computed, signal } from '@angular/core';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { ADMIN_ACCOUNTS_MOCK } from '../../data/mock-admin-accounts';
import { AdminAccountRow } from '../../models/admin-account.model';

@Component({
  selector: 'app-admin-accounts-page',
  imports: [PageBannerComponent, SearchBarComponent, DataTableComponent, StatusBadgeComponent],
  template: `
    <app-page-banner title="الحسابات الإدارية" description="إدارة حسابات مستخدمي الإدارة ومتابعة تسجيل الدخول والنشاطات." />
    <div class="content-card-body mb-4">
      <app-search-bar [(value)]="search" inputId="admin-search" placeholder="ابحث بالاسم أو البريد الإلكتروني أو الدور..." />
    </div>
    <div class="content-card-body table-card">
      <app-data-table [columns]="columns" [rows]="filtered()" trackByKey="id">
        <ng-template #statusCell let-row>
          <app-status-badge [label]="row.status" [tone]="row.statusTone" />
        </ng-template>
      </app-data-table>
    </div>
  `,
})
export class AdminAccountsPageComponent {
  readonly search = signal('');
  readonly rows = ADMIN_ACCOUNTS_MOCK;
  readonly columns: DataTableColumn<AdminAccountRow>[] = [
    { key: 'name', header: 'الاسم' },
    { key: 'email', header: 'البريد الإلكتروني' },
    { key: 'role', header: 'الدور' },
    { key: 'lastLogin', header: 'آخر تسجيل دخول' },
    { key: 'status', header: 'الحالة' },
  ];
  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.rows;
    return this.rows.filter((r) => [r.name, r.email, r.role].join(' ').toLowerCase().includes(q));
  });
}
