import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal
      modalType="right"
      modalSize="large"
      title="مراجعة استيراد الطلبات"
      description="راجع بيانات الملف والأخطاء قبل تأكيد الاستيراد."
    >
      <div class="preview-stack">
        <section class="preview-block">
          <h4 class="block-title">معلومات الملف</h4>
          <div class="kv-grid">
            <div><span>اسم الملف</span><strong>orders-october.xlsx</strong></div>
            <div><span>نوع الملف</span><strong>Excel (XLSX)</strong></div>
          </div>
        </section>

        <section class="preview-block">
          <h4 class="block-title">إحصائيات الاستيراد</h4>
          <div class="stat-grid">
            <div class="stat">
              <span>إجمالي الصفوف</span>
              <strong>51</strong>
            </div>
            <div class="stat stat--ok">
              <span>صفوف صالحة</span>
              <strong>48</strong>
            </div>
            <div class="stat stat--bad">
              <span>صفوف غير صالحة</span>
              <strong>3</strong>
            </div>
          </div>
        </section>

        <section class="preview-block">
          <div class="block-heading">
            <h4 class="block-title">الصفوف غير الصالحة</h4>
            <span class="error-count">3 صفوف</span>
          </div>
          <div class="error-table">
            <div class="error-table__head">
              <span>الصف</span>
              <span>اسم المستفيد</span>
              <span>سبب الخطأ</span>
            </div>
            @for (row of invalidRows; track row.row) {
              <div class="error-table__row">
                <span>{{ row.row }}</span>
                <span>{{ row.beneficiary }}</span>
                <span>{{ row.error }}</span>
              </div>
            }
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
    .preview-stack { display: flex; flex-direction: column; gap: 16px; }
    .preview-block {
      padding: 14px 16px; border: 1px solid var(--border-default);
      border-radius: var(--radius-md); background: var(--background-default);
    }
    .block-title { margin: 0; font-size: var(--font-size-body-md); font-weight: 600; color: var(--text-primary); }
    .block-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
    .error-count { font-size: var(--font-size-body-sm); color: var(--error-text); font-weight: 600; }
    .kv-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 16px; margin-top: 10px; }
    .kv-grid > div { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: var(--font-size-body-sm); }
    .kv-grid span { color: var(--text-secondary); }
    .stat-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 10px; }
    .stat {
      display: flex; flex-direction: column; gap: 4px; padding: 12px;
      border: 1px solid var(--border-default); border-radius: var(--radius-md);
      background: var(--background-subtle); font-size: var(--font-size-body-sm);
    }
    .stat span { color: var(--text-secondary); }
    .stat strong { font-size: 20px; color: var(--text-primary); }
    .stat--ok strong { color: var(--success-text); }
    .stat--bad strong { color: var(--error-text); }
    .error-table { margin-top: 4px; border: 1px solid var(--border-default); border-radius: var(--radius-sm); overflow: hidden; }
    .error-table__head, .error-table__row {
      display: grid; grid-template-columns: 56px minmax(120px, 1fr) minmax(0, 2fr);
      gap: 12px; padding: 10px 12px; font-size: var(--font-size-body-sm);
    }
    .error-table__head { background: var(--teal-20); color: var(--teal-700); font-weight: 600; }
    .error-table__row + .error-table__row { border-top: 1px solid var(--border-soft); }
    .error-table__row span:last-child { color: var(--error-text); }
    @media (max-width: 575.98px) {
      .kv-grid, .stat-grid { grid-template-columns: 1fr; }
      .error-table__head, .error-table__row { grid-template-columns: 48px minmax(0, 1fr); }
      .error-table__head span:last-child, .error-table__row span:last-child { grid-column: 1 / -1; }
    }
  `],
})
export class ImportOrdersPreviewDialogComponent {
  constructor(public ref: DialogRef) {}

  readonly invalidRows = [
    { row: 2, beneficiary: 'خالد العتيبي', error: 'رقم جوال غير صالح' },
    { row: 4, beneficiary: '—', error: 'حالة المستفيد فارغة، اسم المستفيد فارغ، رقم الجوال فارغ، الخدمة فارغة' },
    { row: 6, beneficiary: 'سارة القحطاني', error: 'مصدر الطلب فارغ' },
  ];
}
