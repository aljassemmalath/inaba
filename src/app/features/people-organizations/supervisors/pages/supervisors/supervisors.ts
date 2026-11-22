import { Component } from '@angular/core';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { SUPERVISORS_MOCK } from '../../data/mock-supervisors';
import { SupervisorRow } from '../../models/supervisor.model';

@Component({
  selector: 'app-supervisors-page',
  imports: [PageBannerComponent, DataTableComponent],
  template: `
    <app-page-banner title="المشرفون" description="إدارة المشرفين ومتابعة المنفذين المرتبطين بهم." />
    <div class="content-card-body table-card">
      <app-data-table [columns]="columns" [rows]="rows" trackByKey="id">
        <ng-template #actionsCell let-row>
          <button type="button" class="btn-icon" aria-label="عرض تفاصيل المشرف" title="عرض">
            <span class="icon-placeholder icon-placeholder--sm"><img class="icon-placeholder__image is-visible" src="assets/images/svg/Buttons/view.svg" alt="" /></span>
          </button>
        </ng-template>
      </app-data-table>
    </div>
  `,
})
export class SupervisorsPageComponent {
  readonly rows = SUPERVISORS_MOCK;
  readonly columns: DataTableColumn<SupervisorRow>[] = [
    { key: 'supervisor', header: 'المشرف' },
    { key: 'mobile', header: 'الجوال' },
    { key: 'executorsCount', header: 'عدد المنفذين المرتبطين' },
    { key: 'actions', header: 'الإجراءات', width: '160px' },
  ];
}
