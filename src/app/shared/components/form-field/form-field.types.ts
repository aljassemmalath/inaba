export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'telephone'
  | 'search'
  | 'textarea'
  | 'select';

export type FormFieldState = 'default' | 'hover' | 'focus' | 'filled' | 'disabled' | 'readonly' | 'error' | 'success';

export type FormFieldSize = 'md' | 'lg';

export interface FormFieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
