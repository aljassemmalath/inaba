import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="center" modalSize="small" title="الملف المكرر" description="تم التعرف على هذا الملف باعتباره ملفًا مكررًا.">
      <div class="msg">
        <p>لم يتم بدء استيراد جديد.</p>
        <p>تأكد من الملف الذي رفعته. إذا كنت تقصد استيراد بيانات جديدة، فتأكد من اختيار الملف الصحيح.</p>
      </div>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close({ choose: true })">اختيار ملف آخر</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إغلاق</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`.msg{text-align:start;font-size:var(--font-size-body-sm);color:var(--text-secondary)}.msg p{margin:0 0 6px}`],
})
export class DuplicateFileWarningDialogComponent {
  constructor(public ref: DialogRef) {}
}
