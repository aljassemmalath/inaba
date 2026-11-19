import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap" style="padding: 0.75rem 1rem; border-top: 1px solid var(--border-soft); font-size: var(--font-size-body-sm); color: var(--text-secondary);">
      <span>عرض {{ startItem() }}–{{ endItem() }} من {{ total() }}</span>
      <div class="btn-group" role="group" aria-label="ترقيم الصفحات">
        <button type="button" class="btn btn-sm btn-brand-outline" [disabled]="page() <= 1" (click)="change(page() - 1)">السابق</button>
        <button type="button" class="btn btn-sm btn-brand-outline" disabled style="min-width:72px">صفحة {{ page() }} / {{ totalPages() }}</button>
        <button type="button" class="btn btn-sm btn-brand-outline" [disabled]="page() >= totalPages()" (click)="change(page() + 1)">التالي</button>
      </div>
    </div>
  `,
})
export class PaginationComponent {
  readonly page = input(1);
  readonly pageSize = input(5);
  readonly total = input(0);
  readonly pageChange = output<number>();

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  readonly startItem = computed(() => (this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1));
  readonly endItem = computed(() => Math.min(this.page() * this.pageSize(), this.total()));

  change(next: number): void {
    const clamped = Math.min(Math.max(1, next), this.totalPages());
    this.pageChange.emit(clamped);
  }
}
