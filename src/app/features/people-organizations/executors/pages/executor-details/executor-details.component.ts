import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { DataTableCellDirective, DataTableColumn, DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { SummaryContainerComponent } from '../../../../../shared/components/summary-container/summary-container.component';
import { SummaryItemComponent } from '../../../../../shared/components/summary-item/summary-item.component';
import { IconPlaceholderComponent } from '../../../../../shared/components/icon-placeholder/icon-placeholder.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state';
import { SimpleConfirmDialogComponent, GenericFormDialogComponent } from '../../../../../shared/components/modal/dialogs';
import { getExecutorDetails } from '../../data/mock-executor-details';
import { ExecutorDetails, ExecutorOrderRow } from '../../models/executor-details.model';

type ExecutorTab = 'performance' | 'orders' | 'dues';

@Component({
  selector: 'app-executor-details-page',
  imports: [PageBannerComponent, StatusBadgeComponent, DataTableComponent, DataTableCellDirective, SummaryContainerComponent, SummaryItemComponent, IconPlaceholderComponent, EmptyStateComponent],
  templateUrl: './executor-details.component.html',
  styleUrl: './executor-details.component.scss',
})
export class ExecutorDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(Dialog);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly details = signal<ExecutorDetails | null>(null);
  readonly actionsOpen = signal(false);
  readonly activeTab = signal<ExecutorTab>('performance');
  readonly copied = signal(false);

  readonly actions = [
    { id: 'edit', label: 'تعديل بيانات المُنفذ', icon: 'assets/images/svg/Buttons/edit-02.svg', dividerAfter: true, confirm: false },
    { id: 'duty', label: 'تغيير حالة الدوام', icon: 'assets/images/svg/Executers/available.svg', dividerAfter: true, confirm: false },
    { id: 'adjustment', label: 'إضافة تسوية', icon: 'assets/images/svg/Buttons/add.svg', dividerAfter: true, confirm: false },
    { id: 'reset', label: 'إعادة تعيين كلمة المرور', icon: 'assets/images/svg/Buttons/view.svg', dividerAfter: true, confirm: true },
    { id: 'disable', label: 'تعطيل الحساب', icon: 'assets/images/svg/Executers/disabled.svg', dividerAfter: false, confirm: true },
  ];

  readonly orderColumns: DataTableColumn<ExecutorOrderRow>[] = [
    { key: 'actions', header: 'الإجراءات', width: '90px' },
    { key: 'completionDate', header: 'تاريخ الإسناد' },
    { key: 'assignmentDate', header: 'تاريخ الإسناد' },
    { key: 'status', header: 'حالة الطلب' },
    { key: 'assignmentResult', header: 'نتيجة الإسناد' },
    { key: 'product', header: 'المنتج' },
    { key: 'requestNumber', header: 'رقم الطلب' },
  ];

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((p) => {
      const id = p.get('id') ?? 'e1';
      this.details.set(getExecutorDetails(id));
      this.actionsOpen.set(false);
      this.activeTab.set('performance');
    });
  }

  toggleActions(event: MouseEvent): void {
    event.stopPropagation();
    this.actionsOpen.update((v) => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.actionsOpen()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.actionsOpen.set(false);
    }
  }

  selectAction(actionId: string): void {
    this.actionsOpen.set(false);
    const d = this.details();
    if (!d) return;
    const panel = { panelClass: 'app-modal-panel' };
    switch (actionId) {
      case 'edit':
        this.dialog.open(GenericFormDialogComponent, {
          ...panel,
          data: {
            title: 'تعديل بيانات المُنفذ',
            description: 'تعديل بيانات المنفذ. (واجهة فقط — لا يوجد حفظ خلفي حالياً)',
            context: { label: 'المنفذ', value: d.name },
            submitLabel: 'حفظ',
            fields: [
              { key: 'name', label: 'الاسم', type: 'text', value: d.name, required: true },
              { key: 'phone', label: 'الجوال', type: 'tel', value: d.phone },
              { key: 'supervisor', label: 'المشرف', type: 'text', value: d.supervisor },
            ],
            note: 'لا يوجد نموذج تعديل منفذ مخصص حالياً؛ تم توفير نموذج قابل للتعديل ضمن نظام النوافذ الحالي.',
          },
        });
        break;
      case 'duty':
        this.dialog.open(GenericFormDialogComponent, {
          ...panel,
          data: {
            title: 'تغيير حالة الدوام',
            description: 'تحديث حالة دوام المنفذ. (واجهة فقط — لا يوجد حفظ خلفي حالياً)',
            context: { label: 'المنفذ', value: d.name },
            submitLabel: 'تأكيد',
            size: 'small',
            fields: [
              { key: 'dutyStatus', label: 'حالة الدوام', type: 'select', value: d.dutyStatus, required: true, options: [
                { value: 'مُتاح', label: 'مُتاح' },
                { value: 'مشغول', label: 'مشغول' },
                { value: 'خارج الدوام', label: 'خارج الدوام' },
                { value: 'معطل', label: 'معطل' },
              ] },
              { key: 'reason', label: 'سبب التغيير (اختياري)', type: 'textarea', placeholder: 'اكتب السبب إن وجد' },
            ],
          },
        });
        break;
      case 'adjustment':
        this.dialog.open(GenericFormDialogComponent, {
          ...panel,
          data: {
            title: 'إضافة تسوية',
            description: 'إضافة تسوية مالية للمنفذ. (واجهة فقط — لا يوجد حفظ خلفي حالياً)',
            context: { label: 'المنفذ', value: d.name },
            submitLabel: 'حفظ التسوية',
            fields: [
              { key: 'amount', label: 'المبلغ', type: 'number', placeholder: 'مثال: 50 أو -50', required: true, hint: 'استخدم قيمة موجبة للإضافة وسالبة للخصم.' },
              { key: 'type', label: 'نوع التسوية', type: 'text', placeholder: 'مثال: مكافأة، خصم تأخير...', required: true },
              { key: 'note', label: 'ملاحظات', type: 'textarea', placeholder: 'اكتب تفاصيل التسوية' },
            ],
            note: 'لا يوجد نموذج إضافة تسوية مخصص حالياً؛ تم توفير نموذج مناسب قابل للتعديل.',
          },
        });
        break;
      case 'reset':
        this.dialog.open(SimpleConfirmDialogComponent, {
          ...panel,
          data: {
            title: 'إعادة تعيين كلمة المرور',
            description: `هل أنت متأكد من إعادة تعيين كلمة المرور للمنفذ (${d.name})؟ (لن يتم تنفيذ الإجراء بدون تكامل خلفي)`,
            confirmLabel: 'تأكيد إعادة التعيين',
            cancelLabel: 'إلغاء',
            showCloseButton: true,
          },
        });
        break;
      case 'disable':
        this.dialog.open(SimpleConfirmDialogComponent, {
          ...panel,
          data: {
            title: 'تعطيل الحساب',
            description: `هل أنت متأكد من تعطيل حساب المنفذ (${d.name})؟ (لن يتم تنفيذ الإجراء بدون تكامل خلفي)`,
            confirmLabel: 'تعطيل الحساب',
            cancelLabel: 'إلغاء',
            showCloseButton: true,
          },
        });
        break;
    }
  }

  setTab(tab: ExecutorTab): void {
    this.activeTab.set(tab);
  }

  async copyRequestNumber(): Promise<void> {
    const d = this.details();
    const num = d?.currentRequest?.requestNumber;
    if (!num) return;
    try {
      await navigator.clipboard?.writeText(num);
    } catch {
      // fallback ignored
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }

  openRequest(): void {
    const d = this.details();
    if (!d?.currentRequest) return;
    this.router.navigate(['/operations/requests', d.currentRequest.id]);
  }

  openOrder(row: ExecutorOrderRow): void {
    this.router.navigate(['/operations/requests', row.id]);
  }

  progressPercent(): number {
    const cr = this.details()?.currentRequest;
    if (!cr || !cr.totalStages) return 0;
    return Math.round((cr.completedStages / cr.totalStages) * 100);
  }
}