import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="center" modalSize="small" title="تم إنشاء الطلب بنجاح" description="تم تسجيل الطلب وإضافته إلى قائمة الطلبات.">
      <div class="info">
        <div class="row"><span>حالة الطلب</span><strong>بانتظار الإسناد</strong></div>
        <div class="row"><span>رقم الطلب</span><strong>123456</strong></div>
      </div>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close({ view: true })">عرض الطلب</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إغلاق</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`.info{width:100%;text-align:start;margin:4px 0 8px}.row{display:flex;justify-content:space-between;gap:12px;padding:6px 0;font-size:var(--font-size-body-sm);border-bottom:1px solid var(--border-soft)}.row span{color:var(--text-secondary)}`],
})
export class OrderCreationSuccessDialogComponent {
  constructor(public ref: DialogRef) {}
}
