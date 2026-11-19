import { Component, inject } from '@angular/core';
import { DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { StageRow } from '../../../models/request-details.model';
import { RequestDetailsService } from '../request-details.service';

@Component({
  selector: 'app-rd-stages-tab',
  imports: [DataTableComponent, StatusBadgeComponent],
  template: `
    @if (state.details(); as d) {
      <div class="content-card-body stages-evidence-card">
        <h3 class="stages-evidence-card__title">المراحل والأدلة</h3>
        <div class="card-divider"></div>

        <div class="evidence-box">
          <div class="d-flex justify-content-between align-items-center mb-2" style="font-size:var(--font-size-body-sm);">
            <span>نسبة الإكمال: <strong>20%</strong></span>
            <span>المراحل المكتملة: 1 من 4</span>
          </div>
          <div class="progress" style="height:8px;background:var(--background-muted);">
            <div class="progress-bar" style="width:20%;background:var(--action-primary-default);"></div>
          </div>
        </div>

        <div class="stages-table-wrap">
          <app-data-table [columns]="cols" [rows]="d.stages" trackByKey="id">
            <ng-template #statusCell let-row>
              <app-status-badge [label]="row.status" [tone]="row.statusTone" />
            </ng-template>
            <ng-template #actionsCell let-row>
              <button type="button" class="btn-icon" aria-label="عرض الدليل"><span class="icon-placeholder icon-placeholder--sm"><img class="icon-placeholder__image" alt="" /></span></button>
            </ng-template>
          </app-data-table>
        </div>
      </div>
    }
  `,
  styles: [`
    .stages-evidence-card__title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--teal-500);
    }
    .evidence-box {
      background: var(--background-subtle);
      border: 1px solid var(--border-default);
      border-radius: 8px;
      padding: 12px 16px;
      box-shadow: none;
      margin-bottom: 16px;
    }
    .stages-table-wrap { margin-top: 0; }
  `],
})
export class RdStagesTabComponent {
  readonly state = inject(RequestDetailsService);
  readonly cols: DataTableColumn<StageRow>[] = [
    { key: 'stage', header: 'المرحلة' },
    { key: 'evidenceType', header: 'نوع الدليل' },
    { key: 'status', header: 'الحالة' },
    { key: 'capturedAt', header: 'وقت التصوير' },
    { key: 'actions', header: 'الإجراءات', width: '90px' },
  ];
}
