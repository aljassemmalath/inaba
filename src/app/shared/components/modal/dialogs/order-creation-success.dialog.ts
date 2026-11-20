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
      title="تم إنشاء الطلب بنجاح"
      description="تم تسجيل الطلب وإضافته إلى قائمة الطلبات."
    >
      <div class="success-card">
        <div class="success-card__row">
          <span>حالة الطلب</span>
          <span class="status-badge primary">بانتظار الإسناد</span>
        </div>
        <div class="success-card__row">
          <span>رقم الطلب</span>
          <strong>#123456</strong>
        </div>
      </div>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close({ view: true })">عرض الطلب</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إغلاق</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .success-card {
      width: 100%; text-align: start; margin: 4px 0 8px; padding: 4px 12px;
      border: 1px solid var(--border-default); border-radius: var(--radius-md);
      background: var(--background-default);
    }
    .success-card__row {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 10px 0; font-size: var(--font-size-body-sm);
      border-bottom: 1px solid var(--border-soft);
    }
    .success-card__row:last-child { border-bottom: 0; }
    .success-card__row > span:first-child { color: var(--text-secondary); }
  `],
})
export class OrderCreationSuccessDialogComponent {
  constructor(public ref: DialogRef) {}
}
