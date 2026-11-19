export type ModalType = 'right' | 'center';
export type ModalSize = 'large' | 'medium' | 'small';

export interface ModalConfig {
  modalType?: ModalType;
  modalSize?: ModalSize;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  showFooter?: boolean;
  showPattern?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
}

export const MODAL_SIZE_WIDTH: Record<ModalSize, string> = {
  large: 'var(--modal-size-lg, 800px)',
  medium: 'var(--modal-size-md, 600px)',
  small: 'var(--modal-size-sm, 540px)',
};
