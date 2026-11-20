import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal.component';

interface ExecutorOption {
  name: string;
  supervisor: string;
  count: number;
  verb: string;
}

@Component({
  standalone: true,
  imports: [ModalComponent, FormsModule],
  template: `
    <app-modal modalType="right" modalSize="medium" title="إسناد الطلب" description="اختر منفذًا متاحًا لتنفيذ هذا الطلب.">
      <div class="assign-content">
        <div class="assign-filters">
          <div class="filter">
            <label class="form-label" for="assign-search">بحث المنفذ</label>
            <input
              id="assign-search"
              type="search"
              class="form-control"
              placeholder="ابحث باسم المنفذ.."
              [(ngModel)]="search"
            />
          </div>
          <div class="filter">
            <label class="form-label" for="assign-supervisor">المشرف</label>
            <select id="assign-supervisor" class="form-select" [(ngModel)]="supervisor">
              <option value="all">المشرف: الكل</option>
              @for (name of supervisors; track name) {
                <option [value]="name">{{ name }}</option>
              }
            </select>
          </div>
          <div class="filter">
            <label class="form-label" for="assign-sort">الترتيب</label>
            <select id="assign-sort" class="form-select" [(ngModel)]="sort">
              <option value="least">الأقل حملاً أولاً</option>
              <option value="most">الأكثر حملاً أولاً</option>
            </select>
          </div>
        </div>

        <div class="executor-cards" role="radiogroup" aria-label="المنفذون المتاحون">
          @for (executor of filteredExecutors; track executor.name) {
            <label class="executor-card" [class.is-selected]="selected === executor.name">
              <input
                class="executor-radio"
                type="radio"
                name="executor"
                [value]="executor.name"
                [(ngModel)]="selected"
              />
              <span class="executor-card__body">
                <span class="executor-card__name">{{ executor.name }}</span>
                <span class="executor-card__meta">
                  المُشرف: {{ executor.supervisor }} · {{ executor.verb }} [{{ executor.count }} طلبات] هذا الشهر
                </span>
              </span>
            </label>
          } @empty {
            <p class="empty-state">لا يوجد منفذون مطابقون للبحث.</p>
          }
        </div>

        <div class="inline-alert inline-alert--text" role="status">
          <span class="inline-alert__desc">لا يظهر هنا المنفذون المشغولون ولا من هم خارج الدوام.</span>
        </div>
      </div>

      <ng-container modal-footer>
        <button type="button" class="btn btn-brand" [disabled]="!selected" (click)="assign()">إسناد الطلب</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إلغاء</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .assign-content { display: flex; flex-direction: column; gap: 16px; }
    .assign-filters { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
    .filter { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
    .executor-cards {
      display: flex; gap: 12px; overflow: auto; max-height: 260px;
      padding: 2px 2px 8px; scrollbar-width: thin;
    }
    .executor-card {
      flex: 0 0 260px; display: flex; align-items: flex-start; gap: 10px;
      padding: 14px; box-sizing: border-box; cursor: pointer;
      border: 1px solid var(--border-default); border-radius: var(--radius-md);
      background: #FFFFFF; transition: border-color 0.15s ease, background-color 0.15s ease;
    }
    .executor-card:hover { border-color: var(--teal-300); }
    .executor-card.is-selected { border-color: var(--action-primary-default); background: var(--teal-20); }
    .executor-radio { margin-top: 2px; flex-shrink: 0; accent-color: var(--action-primary-default); }
    .executor-card__body { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
    .executor-card__name { font-weight: 600; color: var(--text-primary); }
    .executor-card__meta { font-size: var(--font-size-body-sm); line-height: var(--line-height-body-sm); color: var(--text-secondary); }
    .empty-state { margin: 0; font-size: var(--font-size-body-sm); color: var(--text-tertiary); }
    @media (max-width: 767.98px) {
      .assign-filters { grid-template-columns: 1fr; }
      .executor-card { flex-basis: 230px; }
    }
  `],
})
export class AssignOrderDialogComponent {
  constructor(public ref: DialogRef) {}

  readonly executors: ExecutorOption[] = [
    { name: 'بدر عبدالله', supervisor: 'أحمد الراشد', count: 7, verb: 'قام بتنفيذ' },
    { name: 'علي الحسن', supervisor: 'خالد العلي', count: 5, verb: 'قام بتنفيذ' },
    { name: 'عبدالله العلي', supervisor: 'حسن الصالح', count: 10, verb: 'قامت بتنفيذ' },
    { name: 'محمد عبدالرحمن', supervisor: 'حسن الصالح', count: 10, verb: 'قامت بتنفيذ' },
  ];

  readonly supervisors = [...new Set(this.executors.map((executor) => executor.supervisor))];

  search = '';
  supervisor = 'all';
  sort: 'least' | 'most' = 'least';
  selected = '';

  get filteredExecutors(): ExecutorOption[] {
    const term = this.search.trim();
    return this.executors
      .filter((executor) => !term || executor.name.includes(term))
      .filter((executor) => this.supervisor === 'all' || executor.supervisor === this.supervisor)
      .sort((a, b) => (this.sort === 'least' ? a.count - b.count : b.count - a.count));
  }

  assign(): void {
    if (!this.selected) return;
    this.ref.close({ executor: this.selected });
  }
}
