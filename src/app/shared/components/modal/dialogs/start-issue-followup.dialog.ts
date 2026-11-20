import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="right" modalSize="small" title="بدء متابعة المشكلة">
      <div class="issue-box">
        <p class="issue-box__title">ISS-1048 · ازدحام</p>
        <p class="issue-box__line">الطلب المرتبط: INA-10482</p>
        <p class="issue-box__line">المنفذ: أحمد العتيبي</p>
      </div>
      <ng-container modal-footer>
        <button type="button" class="btn btn-brand" (click)="ref.close(true)">بدء المتابعة</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إلغاء</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .issue-box {
      padding: 16px; border: 1px solid var(--border-default); border-radius: var(--radius-md);
      background: #FFFFFF; display: flex; flex-direction: column; gap: 6px;
    }
    .issue-box p { margin: 0; }
    .issue-box__title { font-weight: 600; color: var(--text-primary); }
    .issue-box__line { font-size: var(--font-size-body-sm); color: var(--text-secondary); }
  `],
})
export class StartIssueFollowupDialogComponent {
  constructor(public ref: DialogRef) {}
}
