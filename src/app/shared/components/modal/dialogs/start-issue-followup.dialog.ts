import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="right" modalSize="small" title="بدء متابعة المشكلة">
      <div class="info-grid">
        <div class="info-row"><span class="lbl">مرجع المشكلة</span><strong>ISS-1048</strong></div>
        <div class="info-row"><span class="lbl">نوع المشكلة</span><span>ازدحام</span></div>
        <div class="info-row"><span class="lbl">الطلب المرتبط</span><span>INA-10482</span></div>
        <div class="info-row"><span class="lbl">المنفذ</span><span>أحمد العتيبي</span></div>
      </div>
      <ng-container modal-footer>
        <button type="button" class="btn btn-brand" (click)="ref.close(true)">بدء المتابعة</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إلغاء</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`.info-grid{display:flex;flex-direction:column;gap:10px}.info-row{display:flex;justify-content:space-between;gap:12px}.lbl{color:var(--text-secondary);font-size:var(--font-size-body-sm)}`],
})
export class StartIssueFollowupDialogComponent {
  constructor(public ref: DialogRef) {}
}
