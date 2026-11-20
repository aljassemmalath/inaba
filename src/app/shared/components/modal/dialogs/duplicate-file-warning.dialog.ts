import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal
      modalType="center"
      modalSize="small"
      title="الملف المكرر"
      description="تم التعرف على هذا الملف باعتباره ملفًا مكررًا."
    >
      <div class="warning-card">
        <p>لم يتم بدء استيراد جديد.</p>
        <p>تأكد من الملف الذي رفعته. إذا كنت تقصد استيراد بيانات جديدة، فتأكد من اختيار الملف الصحيح.</p>
      </div>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close({ choose: true })">اختيار ملف آخر</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إغلاق</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .warning-card {
      width: 100%; margin: 4px 0 8px; padding: 14px 16px; text-align: start;
      border: 1px solid var(--border-warning); border-radius: var(--radius-md);
      background: var(--warning-background); color: var(--text-warning);
      font-size: var(--font-size-body-sm); line-height: var(--line-height-body-sm);
    }
    .warning-card p { margin: 0; }
    .warning-card p + p { margin-top: 6px; }
  `],
})
export class DuplicateFileWarningDialogComponent {
  constructor(public ref: DialogRef) {}
}
