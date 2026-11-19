import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal.component';

export interface ConfirmSuccessData { title: string; description?: string; closeLabel?: string; }

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="center" modalSize="small" [title]="data.title" [description]="data.description || ''" [showCloseButton]="true">
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close(true)">{{ data.closeLabel || 'إغلاق' }}</button>
      </ng-container>
    </app-modal>
  `,
})
export class ConfirmSuccessDialogComponent {
  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: ConfirmSuccessData) {}
}
