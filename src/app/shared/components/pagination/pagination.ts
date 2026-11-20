import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    @if (detailed()) {
      <nav class="pagination-detailed" aria-label="ترقيم الصفحات">
        <button type="button" class="page-nav" [disabled]="page() <= 1" (click)="change(page() - 1)">
          <img class="page-arrow-icon" src="assets/images/svg/Buttons/previous arrow.svg" alt="" aria-hidden="true" />
          <span>السابق</span>
        </button>
        <div class="page-numbers">
          @for (p of visiblePages(); track $index) {
            @if (p === -1) {
              <span class="page-ellipsis">...</span>
            } @else {
              <button type="button" class="page-number" [class.is-active]="p === page()" (click)="change(p)">{{ p }}</button>
            }
          }
        </div>
        <button type="button" class="page-nav" [disabled]="page() >= totalPages()" (click)="change(page() + 1)">
          <span>التالي</span>
          <img class="page-arrow-icon" src="assets/images/svg/Buttons/next arrow.svg" alt="" aria-hidden="true" />
        </button>
      </nav>
    } @else {
      <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap" style="padding: 0.75rem 1rem; border-top: 1px solid var(--border-soft); font-size: var(--font-size-body-sm); color: var(--text-secondary);">
        <span>عرض {{ startItem() }}–{{ endItem() }} من {{ total() }}</span>
        <div class="btn-group" role="group" aria-label="ترقيم الصفحات">
          <button type="button" class="btn btn-sm btn-brand-outline" [disabled]="page() <= 1" (click)="change(page() - 1)">السابق</button>
          <button type="button" class="btn btn-sm btn-brand-outline" disabled style="min-width:72px">صفحة {{ page() }} / {{ totalPages() }}</button>
          <button type="button" class="btn btn-sm btn-brand-outline" [disabled]="page() >= totalPages()" (click)="change(page() + 1)">التالي</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .pagination-detailed { display: flex; align-items: center; justify-content: center; gap: 6px; }
    .page-numbers { display: flex; align-items: center; gap: 6px; }
    .page-nav {
      display: inline-flex; align-items: center; justify-content: center; gap: 4px;
      min-width: 32px; height: 32px; padding: 0 8px;
      border: 1px solid var(--border-default); border-radius: 4px;
      background: var(--background-default); color: var(--text-secondary);
      font-family: var(--font-family-base); font-size: 13px; cursor: pointer;
    }
    .page-number {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 32px; height: 32px; padding: 0 8px;
      border: none; border-radius: 4px;
      background: transparent; color: var(--text-secondary);
      font-family: var(--font-family-base); font-size: 13px; cursor: pointer;
    }
    .page-nav:disabled { opacity: 0.45; cursor: not-allowed; }
    .page-number.is-active {
      background: var(--neutral-100);
      border: none;
      color: var(--text-primary);
    }
    .page-ellipsis { padding: 0 4px; color: var(--text-secondary); }
    .page-arrow-icon { width: 16px; height: 16px; display: block; }
  `],
})
export class PaginationComponent {
  readonly page = input(1);
  readonly pageSize = input(5);
  readonly total = input(0);
  readonly detailed = input(false);
  readonly pageChange = output<number>();

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  readonly startItem = computed(() => (this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1));
  readonly endItem = computed(() => Math.min(this.page() * this.pageSize(), this.total()));
  readonly visiblePages = computed<number[]>(() => {
    const last = this.totalPages();
    if (last <= 5) {
      return Array.from({ length: last }, (_, i) => i + 1);
    }
    return [1, 2, 3, -1, last];
  });

  change(next: number): void {
    const clamped = Math.min(Math.max(1, next), this.totalPages());
    this.pageChange.emit(clamped);
  }
}
