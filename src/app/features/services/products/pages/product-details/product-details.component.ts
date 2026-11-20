import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { IconPlaceholderComponent } from '../../../../../shared/components/icon-placeholder/icon-placeholder.component';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { GenericFormDialogComponent } from '../../../../../shared/components/modal/dialogs';
import { PRODUCTS_MOCK } from '../../data/mock-products';
import { Product, ProductStage } from '../../models/product.model';

@Component({
  standalone: true,
  imports: [ModalComponent, IconPlaceholderComponent],
  template: `
    <app-modal modalType="center" modalSize="small" [title]="data.title" [showCloseButton]="true">
      <div modal-body style="text-align:center; padding:8px 0;">
        <app-icon-placeholder size="xl" src="assets/images/svg/Buttons/view.svg" />
        <p style="margin:12px 0 0; font-weight:500;">{{ data.subtitle }}</p>
        <p style="margin:4px 0 0; color:var(--text-secondary); font-size:13px;">{{ data.message }}</p>
      </div>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close()">إغلاق</button>
      </ng-container>
    </app-modal>
  `,
})
class SimpleInfoDialogComponent {
  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: { title: string; subtitle: string; message: string }) {}
}

@Component({
  selector: 'app-product-details-page',
  imports: [DragDropModule, PageBannerComponent, IconPlaceholderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(Dialog);

  readonly product = signal<Product | null>(null);
  readonly stages = signal<ProductStage[]>([]);
  readonly active = signal(true);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((p) => {
      const id = p.get('id') ?? '';
      const found = PRODUCTS_MOCK.find((x) => x.id === id) ?? PRODUCTS_MOCK[0];
      const copy: Product = { ...found, stages: (found.stages ?? []).map((s) => ({ ...s })) };
      this.product.set(copy);
      this.stages.set([...(copy.stages ?? [])].sort((a, b) => a.order - b.order));
      this.active.set(!!copy.active);
    });
  }

  drop(event: CdkDragDrop<ProductStage[]>): void {
    const arr = [...this.stages()];
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    this.stages.set(arr.map((s, i) => ({ ...s, order: i + 1 })));
  }

  toggleActive(): void {
    // No existing state-management/API workflow found; reflect in local UI state.
    this.active.update((v) => !v);
  }

  addStage(): void {
    this.dialog.open(GenericFormDialogComponent, {
      panelClass: 'app-modal-panel',
      data: {
        title: 'إضافة مرحلة',
        description: 'إضافة مرحلة تنفيذ جديدة. (واجهة فقط — لا يوجد حفظ خلفي حالياً)',
        context: { label: 'المنتج', value: this.product()?.name ?? '' },
        submitLabel: 'إضافة',
        fields: [
          { key: 'title', label: 'عنوان المرحلة', type: 'text', placeholder: 'مثال: الإحرام', required: true },
          { key: 'description', label: 'وصف المرحلة', type: 'textarea', placeholder: 'اكتب وصف المرحلة', required: true },
          { key: 'videoCount', label: 'عدد الفيديوهات المرتبطة', type: 'number', value: 1 },
        ],
        note: 'لا يوجد نموذج إضافة مرحلة مخصص حالياً؛ تم توفير نموذج قابل للتعديل عبر نظام النوافذ الحالي.',
      },
    });
  }

  viewStage(stage: ProductStage): void {
    this.dialog.open(SimpleInfoDialogComponent, {
      panelClass: 'app-modal-panel',
      data: { title: 'معاينة الدليل', subtitle: stage.title, message: `فيديو × ${stage.videoCount} — معاينة الدليل/الفيديو غير متاحة حالياً.` },
    });
  }

  editStage(stage: ProductStage): void {
    this.dialog.open(GenericFormDialogComponent, {
      panelClass: 'app-modal-panel',
      data: {
        title: 'تعديل المرحلة',
        description: 'تعديل بيانات المرحلة. (واجهة فقط — لا يوجد حفظ خلفي حالياً)',
        context: { label: 'المرحلة', value: stage.title },
        submitLabel: 'حفظ',
        fields: [
          { key: 'title', label: 'عنوان المرحلة', type: 'text', value: stage.title, required: true },
          { key: 'description', label: 'وصف المرحلة', type: 'textarea', value: stage.description, required: true },
          { key: 'videoCount', label: 'عدد الفيديوهات المرتبطة', type: 'number', value: stage.videoCount },
        ],
        note: 'لا يوجد نموذج تعديل مرحلة مخصص حالياً؛ تم توفير نموذج قابل للتعديل عبر نظام النوافذ الحالي.',
      },
    });
  }

  editPricing(): void {
    const p = this.product();
    this.dialog.open(GenericFormDialogComponent, {
      panelClass: 'app-modal-panel',
      data: {
        title: 'تعديل التسعير والمدة',
        description: 'تعديل التسعير والمدة المتوقعة. (واجهة فقط — لا يوجد حفظ خلفي حالياً)',
        context: { label: 'المنتج', value: p?.name ?? '' },
        submitLabel: 'حفظ',
        fields: [
          { key: 'salePrice', label: 'سعر البيع', type: 'number', value: p?.salePrice ?? '' },
          { key: 'executorDue', label: 'مستحق المنفذ', type: 'number', value: p?.executorDue ?? '' },
          { key: 'profit', label: 'الربح لكل طلب', type: 'number', value: p?.profit ?? '' },
          { key: 'expectedDuration', label: 'المدة المتوقعة', type: 'text', value: p?.expectedDuration ?? '' },
        ],
        note: 'لا يوجد نموذج تسعير/تعديل منتج مخصص حالياً؛ تم توفير نموذج قابل للتعديل عبر نظام النوافذ الحالي.',
      },
    });
  }
}