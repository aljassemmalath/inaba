import { Component } from '@angular/core';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { CLIENTS_MOCK } from '../../data/mock-clients';
import { ClientRow } from '../../models/client.model';

@Component({
  selector: 'app-clients-page',
  imports: [PageBannerComponent, DataTableComponent],
  template: `
    <app-page-banner title="العملاء" description="عرض بيانات العملاء المسجلين." />
    <div class="content-card-body table-card">
      <app-data-table [columns]="columns" [rows]="rows" trackByKey="id" />
    </div>
  `,
})
export class ClientsPageComponent {
  readonly rows = CLIENTS_MOCK;
  readonly columns: DataTableColumn<ClientRow>[] = [
    { key: 'clientName', header: 'اسم العميل' },
    { key: 'mobile', header: 'الجوال' },
  ];
}
