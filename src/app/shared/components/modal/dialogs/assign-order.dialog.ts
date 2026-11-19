import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="right" modalSize="medium" title="إسناد الطلب" description="اختر منفذًا متاحًا لتنفيذ هذا الطلب.">
      <div class="form-stack">
        <div class="ref-line">رقم الطلب: <strong>#10482</strong></div>
        <div>
          <label class="form-label" for="assign-search">بحث</label>
          <input id="assign-search" type="search" class="form-control" placeholder="ابحث باسم المنفذ" />
        </div>
        <div class="executor-list">
          @for (ex of executors; track ex.name) {
            <button type="button" class="executor-item">
              <div class="executor-name">{{ ex.name }}</div>
              <div class="executor-meta">المشرف: {{ ex.supervisor }} — الطلبات المكتملة هذا الشهر: {{ ex.done }}</div>
            </button>
          }
        </div>
        <p class="hint-note">لا يظهر هنا المنفذون المشغولون ولا من هم خارج الدوام.</p>
      </div>
      <ng-container modal-footer>
        <button type="button" class="btn btn-brand">إسناد الطلب</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إلغاء</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .form-stack { display:flex; flex-direction:column; gap:14px; }
    .ref-line { color: var(--text-secondary); font-size: var(--font-size-body-sm); }
    .executor-list { display:flex; flex-direction:column; gap:8px; max-height:260px; overflow:auto; }
    .executor-item { text-align:start; border:1px solid var(--border-default); background:#fff; border-radius:var(--radius-md); padding:10px 12px; }
    .executor-item:hover { border-color: var(--action-primary-default); }
    .executor-name { font-weight:600; color:var(--text-primary); }
    .executor-meta { font-size:var(--font-size-body-sm); color:var(--text-secondary); margin-top:2px; }
    .hint-note { margin:0; font-size:var(--font-size-body-sm); color:var(--text-tertiary); }
  `],
})
export class AssignOrderDialogComponent {
  constructor(public ref: DialogRef) {}
  readonly executors = [
    { name: 'سعد المالكي', supervisor: 'أحمد السالم', done: 34 },
    { name: 'ماجد الحربي', supervisor: 'سارة الحربي', done: 28 },
    { name: 'عمر القحطاني', supervisor: 'نورة القحطاني', done: 19 },
  ];
}
