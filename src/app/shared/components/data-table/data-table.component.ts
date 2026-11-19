import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { EmptyStateComponent } from '../empty-state/empty-state';

export interface DataTableColumn<T = unknown> {
  key: string;
  header: string;
  width?: string;
  /** Primary text resolver. Falls back to row[key]. */
  cell?: (row: T) => string;
  /** Optional description/helper text under the primary value (description cell variant). */
  description?: (row: T) => string | null | undefined;
  /** Row key to read description/helper text from when `description` is not provided. */
  descriptionKey?: string;
  /** When true, the Saudi Riyal icon is shown once in the header (not per cell) and stripped from body values. */
  currency?: boolean;
}

@Component({
  selector: 'app-data-table',
  imports: [NgTemplateOutlet, EmptyStateComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly columns = input.required<DataTableColumn<T>[]>();
  readonly rows = input.required<T[]>();
  readonly trackByKey = input('id');
  readonly emptyTitle = input('لا توجد بيانات');
  readonly emptyMessage = input('');
  readonly rowClass = input<(row: T) => string>(() => '');
  readonly size = input<'default' | 'compact'>('default');
  readonly statusTemplate = contentChild<TemplateRef<{ $implicit: T }>>('statusCell');
  readonly actionsTemplate = contentChild<TemplateRef<{ $implicit: T }>>('actionsCell');
  readonly indicatorsTemplate = contentChild<TemplateRef<{ $implicit: T }>>('indicatorsCell');
  readonly amountTemplate = contentChild<TemplateRef<{ $implicit: T }>>('amountCell');

  trackRow = (_: number, row: T): unknown => (row as Record<string, unknown>)[this.trackByKey()] ?? _;

  text(row: T, col: DataTableColumn<T>): string {
    if (col.cell) return col.cell(row);
    const v = (row as Record<string, unknown>)[col.key];
    return v == null ? '' : String(v);
  }

  description(row: T, col: DataTableColumn<T>): string {
    const v = col.description
      ? col.description(row)
      : col.descriptionKey
        ? (row as Record<string, unknown>)[col.descriptionKey]
        : null;
    return v == null ? '' : String(v);
  }

  hasRiyal(value: string): boolean {
    return value?.includes('₪') ?? false;
  }

  riyalParts(value: string): { prefix: string; suffix: string } {
    const i = value.indexOf('₪');
    if (i === -1) return { prefix: value, suffix: '' };
    return { prefix: value.slice(0, i).trimEnd(), suffix: value.slice(i + 1) };
  }

  displayText(row: T, col: DataTableColumn<T>): string {
    const v = this.text(row, col);
    if (col.currency) return v.replace(/₪/g, '').replace(/\s{2,}/g, ' ').trim();
    return v;
  }

  showInlineRiyal(row: T, col: DataTableColumn<T>): boolean {
    return !col.currency && this.hasRiyal(this.text(row, col));
  }

  hasCustom(key: string): boolean {
    return (this.isStatusKey(key) && !!this.statusTemplate())
      || (key === 'actions' && !!this.actionsTemplate())
      || (key === 'indicators' && !!this.indicatorsTemplate())
      || (key === 'amount' && !!this.amountTemplate());
  }

  tpl(key: string): TemplateRef<{ $implicit: T }> | null {
    if (this.isStatusKey(key)) return this.statusTemplate() ?? null;
    if (key === 'actions') return this.actionsTemplate() ?? null;
    if (key === 'indicators') return this.indicatorsTemplate() ?? null;
    if (key === 'amount') return this.amountTemplate() ?? null;
    return null;
  }

  private isStatusKey(key: string): boolean {
    return key === 'status' || key === 'dutyStatus';
  }
}
