import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

export interface SimpleConfirmData { title: string; description?: string; confirmLabel: string; cancelLabel?: string; showCloseButton?: boolean; }

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="center" modalSize="small" [title]="data.title" [description]="data.description || ''" [showCloseButton]="data.showCloseButton ?? true">
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close(true)">{{ data.confirmLabel }}</button>
        <button type="button" class="btn btn-brand-outline" (click)="ref.close(false)">{{ data.cancelLabel || 'إلغاء' }}</button>
      </ng-container>
    </app-modal>
  `,
})
export class SimpleConfirmDialogComponent {
  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: SimpleConfirmData) {}
}
