import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent, FormsModule],
  template: `
    <app-modal modalType="right" modalSize="large" title="تعديل الطلب" description="تحديث بيانات الطلب والمستفيد.">
      <div class="edit-grid">
        <div class="field">
          <label class="form-label" for="edit-beneficiary">اسم المستفيد</label>
          <input id="edit-beneficiary" class="form-control" [(ngModel)]="model.beneficiaryName" />
        </div>
        <div class="field">
          <label class="form-label" for="edit-beneficiary-status">حالة المستفيد</label>
          <input id="edit-beneficiary-status" class="form-control" [(ngModel)]="model.beneficiaryStatus" />
        </div>

        <div class="field">
          <label class="form-label" for="edit-customer">اسم العميل</label>
          <input id="edit-customer" class="form-control" [(ngModel)]="model.customerName" />
        </div>
        <div class="field">
          <label class="form-label" for="edit-mobile">جوال العميل</label>
          <input id="edit-mobile" class="form-control" [(ngModel)]="model.customerMobile" />
        </div>

        <div class="field">
          <label class="form-label" for="edit-agency">الوكالة</label>
          <input id="edit-agency" class="form-control" [(ngModel)]="model.agency" />
        </div>
        <div class="field">
          <label class="form-label" for="edit-product">المنتج</label>
          <input id="edit-product" class="form-control" [(ngModel)]="model.product" />
          <p class="field-hint">السعر والمستحق ثابتان من وقت الإنشاء (350 / 200)</p>
        </div>

        <div class="field field--full">
          <label class="form-label" for="edit-special">طلب خاص من العميل</label>
          <textarea id="edit-special" class="form-control form-control--large" rows="4" [(ngModel)]="model.specialRequest"></textarea>
        </div>
      </div>

      <ng-container modal-footer>
        <button type="button" class="btn btn-brand" (click)="ref.close(model)">حفظ التعديلات</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إلغاء</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .edit-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .field { display: flex; flex-direction: column; min-width: 0; }
    .field--full { grid-column: 1 / -1; }
    .field-hint { margin: 6px 0 0; font-size: var(--font-size-body-sm); color: var(--text-tertiary); }
    @media (max-width: 575.98px) { .edit-grid { grid-template-columns: 1fr; } }
  `],
})
export class EditOrderDialogComponent {
  constructor(public ref: DialogRef) {}

  model = {
    beneficiaryName: 'فاطمة أحمد',
    beneficiaryStatus: 'نشط',
    customerName: 'محمد العتيبي',
    customerMobile: '0501234567',
    agency: 'مناسك',
    product: 'عمرة بالإنابة',
    specialRequest: 'يرجى توثيق المراحل بوضوح وإشعار المستفيد عند اكتمال كل مرحلة.',
  };
}
