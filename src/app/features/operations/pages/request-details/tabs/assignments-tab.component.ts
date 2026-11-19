import { Component, inject } from '@angular/core';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { AssignmentRow } from '../../../models/request-details.model';
import { RequestDetailsService } from '../request-details.service';

@Component({
  selector: 'app-rd-assignments-tab',
  imports: [DataTableComponent, StatusBadgeComponent],
  template: `
    @if (state.details(); as d) {
      <div class="content-card-body table-card">
        <h3 style="margin:16px 24px;font-size:16px;font-weight:600;color:var(--teal-500);">سجل الإسناد</h3>
        <app-data-table [columns]="cols" [rows]="d.assignments" trackByKey="id">
          <ng-template #statusCell let-row>
            <app-status-badge [label]="row.status" [tone]="row.statusTone" />
          </ng-template>
        </app-data-table>
      </div>
    }
  `,
})
export class RdAssignmentsTabComponent {
  readonly state = inject(RequestDetailsService);
  readonly cols: DataTableColumn<AssignmentRow>[] = [
    { key: 'executor', header: 'المنفذ' },
    { key: 'assignedAt', header: 'وقت الإسناد' },
    { key: 'notification', header: 'الإشعار' },
    { key: 'response', header: 'الاستجابة' },
    { key: 'reason', header: 'السبب' },
    { key: 'status', header: 'الحالة' },
  ];
}
