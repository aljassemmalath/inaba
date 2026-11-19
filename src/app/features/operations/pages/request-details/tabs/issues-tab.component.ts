import { Component } from '@angular/core';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-rd-issues-tab',
  imports: [EmptyStateComponent],
  template: `
    <div class="content-card-body">
      <h3 style="margin:0 0 16px;font-size:16px;font-weight:600;color:var(--teal-500);">المشاكل المرتبطة</h3>
      <app-empty-state title="لا توجد مشاكل مرتبطة" message="لا توجد مشاكل مسجلة مرتبطة بهذا الطلب حاليًا." />
    </div>
  `,
})
export class RdIssuesTabComponent {}
