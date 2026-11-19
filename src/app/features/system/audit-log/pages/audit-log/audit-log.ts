import { Component, computed, signal } from '@angular/core';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { AUDIT_MOCK } from '../../data/mock-audit';
import { AuditRow } from '../../models/audit.model';

@Component({
  selector: 'app-audit-log-page',
  imports: [PageBannerComponent, SearchBarComponent, DataTableComponent],
  template: `
    <app-page-banner title="سجل التدقيق" description="متابعة مستحقات المنفذين الناتجة عن الطلبات المكتملة وتصديرها للمراجعة والدفع الخارجي." />
    <div class="content-card-body mb-4">
      <app-search-bar [(value)]="search" inputId="audit-search" placeholder="ابحث في سجل التدقيق..." />
    </div>
    <div class="content-card-body table-card">
      <app-data-table [columns]="columns" [rows]="filtered()" trackByKey="id" />
    </div>
  `,
})
export class AuditLogPageComponent {
  readonly search = signal('');
  readonly rows = AUDIT_MOCK;
  readonly columns: DataTableColumn<AuditRow>[] = [
    { key: 'event', header: 'الحدث' },
    { key: 'actor', header: 'الفاعل' },
    { key: 'entity', header: 'الكيان' },
    { key: 'time', header: 'الوقت' },
  ];
  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.rows;
    return this.rows.filter((r) => [r.event, r.actor, r.entity].join(' ').toLowerCase().includes(q));
  });
}
