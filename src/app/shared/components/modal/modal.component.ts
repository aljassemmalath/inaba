import { Component, HostListener, inject, input, output } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';
import { MODAL_SIZE_WIDTH, ModalSize, ModalType } from './modal.types';

@Component({
  selector: 'app-modal',
  imports: [IconPlaceholderComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  host: {
    class: 'app-modal-host',
    '[class.app-modal-host--right]': "modalType() === 'right'",
    '[class.app-modal-host--center]': "modalType() === 'center'",
    '[attr.role]': '"dialog"',
    '[attr.aria-modal]': '"true"',
    '[attr.aria-label]': 'ariaLabel() || title() || "نافذة حوار"',
  },
})
export class ModalComponent {
  private readonly dialogRef = inject(DialogRef<unknown>, { optional: true });

  readonly modalType = input<ModalType>('right');
  readonly modalSize = input<ModalSize>('medium');
  readonly title = input('');
  readonly description = input('');
  readonly showCloseButton = input(true);
  readonly showFooter = input(true);
  readonly showPattern = input(true);
  readonly closeOnBackdrop = input(true);
  readonly closeOnEscape = input(true);
  readonly ariaLabel = input('');

  readonly closed = output<void>();

  get width(): string {
    return MODAL_SIZE_WIDTH[this.modalSize()];
  }

  close(): void {
    this.closed.emit();
    this.dialogRef?.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.closeOnEscape()) this.close();
  }
}
