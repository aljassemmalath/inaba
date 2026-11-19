import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { finalize } from 'rxjs';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { FormStepperComponent, StepperStep } from '../../../shared/components/form-stepper/form-stepper.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { DataTableComponent, DataTableColumn } from '../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { SummaryContainerComponent } from '../../../shared/components/summary-container/summary-container.component';
import { SummaryItemComponent } from '../../../shared/components/summary-item/summary-item.component';
import { SimpleConfirmDialogComponent } from '../../../shared/components/modal/dialogs/simple-confirm.dialog';
import { ConfirmSuccessDialogComponent } from '../../../shared/components/modal/dialogs/confirm-success.dialog';
import { ImportOrdersService } from './import-orders.service';
import { IMPORT_REQUIRED_CHECKLIST, ImportParseResult, ImportRow } from './import-orders.models';

@Component({
  selector: 'app-import-orders',
  imports: [
    PageBannerComponent, FormStepperComponent, FormSectionComponent,
    DataTableComponent, StatusBadgeComponent, SummaryContainerComponent, SummaryItemComponent,
  ],
  templateUrl: './import-orders.component.html',
  styleUrl: './import-orders.component.scss',
})
export class ImportOrdersComponent {
  private readonly router = inject(Router);
  private readonly dialog = inject(Dialog);
  private readonly service = inject(ImportOrdersService);

  readonly step = signal<1 | 2>(1);
  readonly steps: StepperStep[] = [{ number: 1, title: 'رفع الملف' }, { number: 2, title: 'معاينة الملف' }];
  readonly checklist = IMPORT_REQUIRED_CHECKLIST;

  readonly file = signal<File | null>(null);
  readonly dragOver = signal(false);
  readonly parsing = signal(false);
  readonly importing = signal(false);
  readonly fileError = signal('');
  readonly result = signal<ImportParseResult | null>(null);
  readonly page = signal(1);
  readonly pageSize = 6;

  readonly columns: DataTableColumn<ImportRow>[] = [
    { key: 'status', header: 'الحالة', width: '110px' },
    { key: 'beneficiary', header: 'المستفيد' },
    { key: 'mobile', header: 'الجوال', width: '140px' },
    { key: 'product', header: 'المنتج' },
    { key: 'agency', header: 'الوكالة' },
    { key: 'source', header: 'مصدر الطلب' },
  ];
  readonly rowClass = (row: ImportRow) => (row.status === 'invalid' ? 'row-invalid' : '');

  readonly pagedRows = computed(() => {
    const rows = this.result()?.rows ?? [];
    const start = (this.page() - 1) * this.pageSize;
    return rows.slice(start, start + this.pageSize);
  });
  readonly totalRows = computed(() => this.result()?.summary.totalRows ?? 0);
  readonly validCount = computed(() => this.result()?.summary.validCount ?? 0);
  readonly canConfirm = computed(() => !!this.result() && this.validCount() > 0 && !this.importing());

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  onDragOver(e: DragEvent): void { e.preventDefault(); this.dragOver.set(true); }
  onDragLeave(): void { this.dragOver.set(false); }
  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.dragOver.set(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) this.selectFile(f);
  }
  onFileInput(e: Event): void {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.selectFile(f);
    (e.target as HTMLInputElement).value = '';
  }

  selectFile(f: File): void {
    const ok = /\.(xlsx|xls)$/i.test(f.name);
    if (!ok) {
      this.fileError.set('نوع الملف غير مدعوم. يرجى رفع ملف Excel بصيغة .xlsx أو .xls.');
      this.file.set(null);
      this.result.set(null);
      return;
    }
    this.fileError.set('');
    this.file.set(f);
    this.result.set(null); // require re-processing if file replaced
  }

  removeFile(): void { this.file.set(null); this.result.set(null); this.fileError.set(''); }

  next(): void {
    const f = this.file();
    if (!f || this.parsing()) return;
    if (this.result()) { this.step.set(2); return; }
    this.parsing.set(true);
    this.service.parseFile(f).then((res) => {
      this.result.set(res);
      this.page.set(1);
      this.step.set(2);
    }).catch(() => {
      this.fileError.set('تعذر معالجة الملف. تأكد من أنه ملف Excel صالح.');
    }).finally(() => this.parsing.set(false));
  }

  back(): void { this.step.set(1); }

  prevPage(): void { this.page.update((p) => Math.max(1, p - 1)); }
  nextPage(): void {
    const max = Math.max(1, Math.ceil(this.totalRows() / this.pageSize));
    this.page.update((p) => Math.min(max, p + 1));
  }

  downloadTemplate(): void {
    this.service.downloadTemplate();
  }

  downloadErrors(): void {
    const res = this.result();
    if (res) this.service.downloadErrorReport(res);
  }

  cancel(): void {
    if (!this.file() && !this.result()) { this.router.navigate(['/operations/requests']); return; }
    const ref = this.dialog.open(SimpleConfirmDialogComponent, {
      panelClass: 'app-modal-panel',
      data: { title: 'إلغاء الاستيراد', description: 'هل تريد إلغاء عملية الاستيراد والعودة إلى قائمة الطلبات؟', confirmLabel: 'إلغاء', cancelLabel: 'متابعة' },
    });
    ref.closed.subscribe((ok) => { if (ok) this.router.navigate(['/operations/requests']); });
  }

  confirm(): void {
    const res = this.result();
    if (!res || this.validCount() === 0 || this.importing()) return;
    this.importing.set(true);
    this.service.confirmImport(res).pipe(finalize(() => this.importing.set(false))).subscribe((r) => {
      const ref = this.dialog.open(ConfirmSuccessDialogComponent, {
        panelClass: 'app-modal-panel',
        data: { title: 'تم الاستيراد بنجاح', description: `تم استيراد ${r.imported} صفًا صالحًا${r.skipped ? `، وتم تجاهل ${r.skipped} صفوف تحتوي على أخطاء.` : '.'}`, closeLabel: 'العودة إلى قائمة الطلبات' },
      });
      ref.closed.subscribe(() => this.router.navigate(['/operations/requests']));
    });
  }
}
