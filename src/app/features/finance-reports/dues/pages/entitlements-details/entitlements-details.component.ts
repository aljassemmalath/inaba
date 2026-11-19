import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataTableComponent, DataTableColumn } from '../../../../../shared/components/data-table/data-table.component';
import { IconPlaceholderComponent } from '../../../../../shared/components/icon-placeholder/icon-placeholder.component';
import { GenericFormDialogComponent } from '../../../../../shared/components/modal/dialogs';
import { DUES_MOCK } from '../../data/mock-dues';
import { DueRow, SettlementRow } from '../../models/due.model';

@Component({
  selector: 'app-entitlements-details-page',
  imports: [DataTableComponent, IconPlaceholderComponent],
  templateUrl: './entitlements-details.component.html',
  styleUrl: './entitlements-details.component.scss',
})
export class EntitlementsDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(Dialog);
  readonly due = signal<DueRow | null>(null);

  readonly settlementColumns: DataTableColumn<SettlementRow>[] = [
    { key: 'amount', header: 'المبلغ' },
    { key: 'type', header: 'نوع التسوية' },
  ];

  readonly settlements = computed(() => this.due()?.settlements ?? []);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((p) => {
      const id = p.get('id') ?? '';
      const found = DUES_MOCK.find((d) => d.id === id) ?? DUES_MOCK[0];
      this.due.set(found ?? null);
    });
  }

  amountSign(amount: string): 'positive' | 'negative' | 'neutral' {
    const s = (amount || '').trim();
    if (s.startsWith('-')) return 'negative';
    if (s.startsWith('+')) return 'positive';
    const num = s.replace(/[^0-9.\-]/g, '');
    const n = Number(num);
    if (!isNaN(n) && n === 0) return 'neutral';
    if (!isNaN(n) && n > 0) return 'positive';
    return 'neutral';
  }

  amountNumber(amount: string): string {
    return (amount || '').replace('₪', '').replace(/\s+/g, ' ').trim();
  }

  exportExcel(): void {
    // No existing Excel export functionality found; do not create a fake export interaction.
  }

  addSettlement(): void {
    const d = this.due();
    this.dialog.open(GenericFormDialogComponent, {
      panelClass: 'app-modal-panel',
      data: {
        title: 'إضافة تسوية',
        description: 'إضافة تسوية مالية. (واجهة فقط — لا يوجد حفظ/تحديث خلفي حالياً)',
        context: d ? { label: 'المنفذ', value: d.executor } : undefined,
        submitLabel: 'حفظ التسوية',
        fields: [
          { key: 'amount', label: 'المبلغ', type: 'number', placeholder: 'مثال: 50 أو -50', required: true, hint: 'استخدم قيمة موجبة للإضافة وسالبة للخصم.' },
          { key: 'type', label: 'نوع التسوية', type: 'text', placeholder: 'مثال: مكافأة أداء، خصم تأخير...', required: true },
          { key: 'note', label: 'ملاحظات', type: 'textarea', placeholder: 'اكتب تفاصيل التسوية' },
        ],
        note: 'لا يوجد نموذج إضافة تسوية مخصص حالياً؛ تم توفير نموذج قابل للتعديل عبر نظام النوافذ الحالي. لن يتم تحديث الجدول/الملخص بدون تكامل.',
      },
    });
  }
}