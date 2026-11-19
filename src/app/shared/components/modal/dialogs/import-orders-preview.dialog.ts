import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="right" modalSize="large" title="مراجعة استيراد الطلبات" description="راجع بيانات الملف والأخطاء قبل تأكيد الاستيراد.">
      <div class="stack">
        <section class="block">
          <h4 class="block-title">معلومات الملف</h4>
          <div class="kv"><span>اسم الملف</span><strong>orders-october.xlsx</strong></div>
          <div class="kv"><span>نوع الملف</span><span>Excel (XLSX)</span></div>
        </section>
        <section class="block">
          <h4 class="block-title">إحصائيات الاستيراد</h4>
          <div class="stats">
            <div class="stat"><span>إجمالي الصفوف</span><strong>120</strong></div>
            <div class="stat ok"><span>صفوف صالحة</span><strong>112</strong></div>
            <div class="stat bad"><span>صفوف غير صالحة</span><strong>8</strong></div>
          </div>
        </section>
      </div>
      <ng-container modal-footer>
        <button type="button" class="btn btn-brand" (click)="ref.close({ confirm: true })">تأكيد الاستيراد</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close({ review: true })">مراجعة الصفوف</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .stack{display:flex;flex-direction:column;gap:16px}
    .block{border:1px solid var(--border-default);border-radius:var(--radius-md);padding:12px}
    .block-title{margin:0 0 10px;font-size:var(--font-size-body-md);font-weight:600}
    .kv,.stat{display:flex;justify-content:space-between;gap:12px;padding:4px 0;font-size:var(--font-size-body-sm)}
    .stats{display:flex;flex-direction:column}
    .ok strong{color:var(--success-text)} .bad strong{color:var(--error-text)}
  `],
})
export class ImportOrdersPreviewDialogComponent {
  constructor(public ref: DialogRef) {}
}
