import { Component, Inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal.component';

export interface GenericFormData {
  title: string;
  description?: string;
  submitLabel?: string;
  cancelLabel?: string;
  size?: 'small' | 'medium' | 'large';
  context?: Record<string, unknown>;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'email' | 'tel' | 'password';
    placeholder?: string;
    value?: string | number;
    options?: Array<{ value: string; label: string }>;
    required?: boolean;
    hint?: string;
  }>;
  note?: string;
}

@Component({
  standalone: true,
  imports: [ModalComponent, FormsModule],
  template: `
    <app-modal modalType="right" [modalSize]="data.size || 'medium'" [title]="data.title" [description]="data.description || ''">
      <div class="form-stack">
        @if (data.context && (data.context['label'] || data.context['value'])) {
          <div class="context-line"><span>{{ data.context['label'] }}</span><strong>{{ data.context['value'] }}</strong></div>
        }
        @for (f of data.fields; track f.key) {
          <div class="field">
            <label class="form-label" [attr.for]="f.key">
              {{ f.label }} @if (f.required) { <span class="text-danger">*</span> }
            </label>
            @if (f.type === 'textarea') {
              <textarea class="form-control" [id]="f.key" rows="3" [placeholder]="f.placeholder || ''" [(ngModel)]="model[f.key]"></textarea>
            } @else if (f.type === 'select') {
              <select class="form-select" [id]="f.key" [(ngModel)]="model[f.key]">
                <option value="">{{ f.placeholder || 'اختر...' }}</option>
                @for (o of (f.options || []); track o.value) {
                  <option [value]="o.value">{{ o.label }}</option>
                }
              </select>
            } @else {
              <input class="form-control" [id]="f.key" [type]="f.type" [placeholder]="f.placeholder || ''" [(ngModel)]="model[f.key]" />
            }
            @if (f.hint) { <div class="hint">{{ f.hint }}</div> }
          </div>
        }
        @if (data.note) { <p class="note">{{ data.note }}</p> }
      </div>
      <ng-container modal-footer>
        <button type="button" class="btn btn-brand" (click)="submit()" [disabled]="submitting()">{{ data.submitLabel || 'حفظ' }}</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()" [disabled]="submitting()">{{ data.cancelLabel || 'إلغاء' }}</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .form-stack { display:flex; flex-direction:column; gap:14px; }
    .context-line { display:flex; justify-content:space-between; gap:12px; font-size:var(--font-size-body-sm); color:var(--text-secondary); }
    .field { display:flex; flex-direction:column; gap:6px; }
    .hint { font-size:12px; color:var(--text-tertiary); }
    .note { margin:0; font-size:var(--font-size-body-sm); color:var(--text-tertiary); }
  `],
})
export class GenericFormDialogComponent {
  model: Record<string, any> = {};
  submitting = signal(false);
  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: GenericFormData) {
    for (const f of data.fields || []) this.model[f.key] = f.value ?? '';
  }
  submit(): void {
    // UI/form only; no backend integration assumed.
    this.ref.close({ submitted: true, value: { ...this.model } });
  }
}

export interface GenericInfoData {
  title: string;
  description?: string;
  items?: Array<{ label: string; value: string }>;
  closeLabel?: string;
}

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="center" modalSize="small" [title]="data.title" [description]="data.description || ''" [showCloseButton]="true">
      <div modal-body>
        @if (data.items?.length) {
          <div class="info-list">
            @for (it of data.items; track it.label) {
              <div class="info-row"><span class="lbl">{{ it.label }}</span><strong>{{ it.value }}</strong></div>
            }
          </div>
        }
      </div>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close()">{{ data.closeLabel || 'إغلاق' }}</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`.info-list{display:flex;flex-direction:column;gap:10px}.info-row{display:flex;justify-content:space-between;gap:12px}.lbl{color:var(--text-secondary);font-size:var(--font-size-body-sm)}`],
})
export class GenericInfoDialogComponent {
  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: GenericInfoData) {}
}