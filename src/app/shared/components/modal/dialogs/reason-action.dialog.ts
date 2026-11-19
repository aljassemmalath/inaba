import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal.component';

export interface ReasonActionData { title: string; description: string; reasonLabel: string; reasonPlaceholder: string; confirmLabel: string; size?: 'small'|'medium'|'large'; note?: string; }

@Component({
  standalone: true,
  imports: [ModalComponent, FormsModule],
  template: `
    <app-modal modalType="right" [modalSize]="data.size || 'medium'" [title]="data.title" [description]="data.description">
      <div class="form-stack">
        <div>
          <label class="form-label" [attr.for]="id">{{ data.reasonLabel }} <span class="text-danger">*</span></label>
          <textarea [id]="id" class="form-control" rows="4" [placeholder]="data.reasonPlaceholder" [(ngModel)]="reason"></textarea>
        </div>
        @if (data.note) { <p class="hint-note">{{ data.note }}</p> }
      </div>
      <ng-container modal-footer>
        <button type="button" class="btn btn-brand" (click)="ref.close({ confirmed: true, reason })">{{ data.confirmLabel }}</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close()">إلغاء</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`.form-stack{display:flex;flex-direction:column;gap:12px}.hint-note{margin:0;font-size:var(--font-size-body-sm);color:var(--text-tertiary)}`],
})
export class ReasonActionDialogComponent {
  readonly id = 'reason-' + Math.random().toString(36).slice(2);
  reason = '';
  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: ReasonActionData) {}
}
