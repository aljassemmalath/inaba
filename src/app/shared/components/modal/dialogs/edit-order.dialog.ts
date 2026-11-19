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
        <div><label class="form-label">اسم المستفيد</label><input class="form-control" [(ngModel)]="model.beneficiary" /></div>
        <div><label class="form-label">حالة المستفيد</label><input class="form-control" [(ngModel)]="model.beneficiaryStatus" /></div>
        <div><label class="form-label">اسم العميل</label><input class="form-control" [(ngModel)]="model.customer" /></div>
        <div><label class="form-label">جوال العميل</label><input class="form-control" [(ngModel)]="model.mobile" /></div>
        <div><label class="form-label">المنتج / الوكالة</label><input class="form-control" [(ngModel)]="model.productAgency" /></div>
        <div><label class="form-label">السعر</label><input class="form-control" [value]="model.price" disabled /></div>
        <div><label class="form-label">المستحق</label><input class="form-control" [value]="model.due" disabled /></div>
        <div class="full"><label class="form-label">طلب خاص من العميل</label><textarea class="form-control" rows="3" [(ngModel)]="model.special"></textarea></div>
      </div>
      <p class="hint-note">وقت الإنشاء والسعر والمستحق ثابتان.</p>
      <ng-container modal-footer>
        <button type="button" class="btn btn-brand" (click)="ref.close(model)">حفظ التعديلات</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إلغاء</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .edit-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px}
    .full{grid-column:1 / -1}
    .hint-note{margin:12px 0 0;font-size:var(--font-size-body-sm);color:var(--text-tertiary)}
    @media (max-width:575.98px){.edit-grid{grid-template-columns:1fr}}
  `],
})
export class EditOrderDialogComponent {
  constructor(public ref: DialogRef) {}
  model = { beneficiary: 'فاطمة', beneficiaryStatus: 'متوفى', customer: 'محمد', mobile: '512345678', productAgency: 'عمرة بالإنابة - مناسك', price: '350', due: '200', special: 'دعاء معين للمتوفاة' };
}
