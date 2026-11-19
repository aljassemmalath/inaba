import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { GenericFormDialogComponent } from '../../../../../shared/components/modal/dialogs';
import { PRODUCTS_MOCK } from '../../data/mock-products';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-page',
  imports: [PageBannerComponent],
  template: `
    <app-page-banner title="المنتجات" description="إدارة المنتجات والخدمات ومراجعة بيانات التسعير والمدة المتوقعة." />
    <div class="row g-3">
      @for (p of products; track p.id) {
        <div class="col-12 col-md-6 col-xl-4">
          <article class="content-card-body product-card">
            <div class="product-image" aria-hidden="true">
              @if (p.imageUrl) {
                <img [src]="p.imageUrl" [alt]="p.name" />
              } @else {
                <div class="product-image-placeholder">
                  <span class="icon-placeholder icon-placeholder--xl"><img class="icon-placeholder__image" alt="" /></span>
                </div>
              }
            </div>
            <div class="product-body">
              <h3 class="product-title">{{ p.name }}</h3>
              <div class="product-info">
                <div class="info-item"><span class="info-label">مستحق المنفذ</span><span class="info-value">{{ p.executorDue }}</span></div>
                <div class="info-item"><span class="info-label">سعر البيع</span><span class="info-value">{{ p.salePrice }}</span></div>
                <div class="info-item"><span class="info-label">المدة المتوقعة</span><span class="info-value">{{ p.expectedDuration }}</span></div>
                <div class="info-item"><span class="info-label">الربح</span><span class="info-value">{{ p.profit }}</span></div>
              </div>
              <div class="product-actions">
                <button type="button" class="btn btn-brand" (click)="openDetails(p)">عرض التفاصيل</button>
                <button type="button" class="btn btn-brand-outline" (click)="editProduct(p)">تعديل المنتج</button>
              </div>
            </div>
          </article>
        </div>
      }
    </div>
  `,
  styles: [`
    .product-card { padding: 0; overflow: hidden; height: 100%; display: flex; flex-direction: column; }
    .product-image { height: 216px; background: var(--background-muted); }
    .product-image img { width: 100%; height: 216px; object-fit: cover; display: block; }
    .product-image-placeholder { width: 100%; height: 216px; display: grid; place-items: center; }
    .product-body { padding: 16px 20px 20px; display: flex; flex-direction: column; flex: 1; }
    .product-title { margin: 0 0 14px; font-size: var(--font-size-section); line-height: var(--line-height-section); font-weight: var(--font-weight-section); color: var(--text-primary); }
    .product-info { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 16px; margin-bottom: 16px; }
    .info-label { display: block; font-size: var(--font-size-body-sm); color: var(--text-secondary); margin-bottom: 2px; }
    .info-value { display: block; font-size: var(--font-size-body-md); font-weight: 600; color: var(--text-primary); }
    .product-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto; }
    .product-actions .btn { flex: 1 1 auto; min-width: 120px; }
  `],
})
export class ProductsPageComponent {
  private readonly router = inject(Router);
  private readonly dialog = inject(Dialog);
  readonly products: Product[] = PRODUCTS_MOCK;

  openDetails(p: Product): void {
    this.router.navigate(['/services/products', p.id]);
  }

  editProduct(p: Product): void {
    this.dialog.open(GenericFormDialogComponent, {
      panelClass: 'app-modal-panel',
      data: {
        title: 'تعديل المنتج',
        description: 'تعديل بيانات المنتج. (واجهة فقط — لا يوجد حفظ خلفي متاح حالياً)',
        context: { label: 'المنتج', value: p.name },
        submitLabel: 'حفظ',
        size: 'large',
        fields: [
          { key: 'name', label: 'اسم المنتج', type: 'text', value: p.name, required: true },
          { key: 'salePrice', label: 'سعر البيع', type: 'number', value: p.salePrice },
          { key: 'executorDue', label: 'مستحق المنفذ', type: 'number', value: p.executorDue },
          { key: 'profit', label: 'الربح', type: 'number', value: p.profit },
          { key: 'expectedDuration', label: 'المدة المتوقعة', type: 'text', value: p.expectedDuration },
          { key: 'active', label: 'حالة المنتج', type: 'select', value: p.active === false ? 'inactive' : 'active', options: [{ value: 'active', label: 'نشط' }, { value: 'inactive', label: 'غير نشط' }] },
        ],
        note: 'لا يوجد نموذج/تكامل تعديل منتج موجود حالياً؛ تم توفير نموذج قابل للتعديل عبر نظام النوافذ الحالي.',
      },
    });
  }
}
