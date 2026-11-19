import {
  booleanAttribute,
  Component,
  computed,
  contentChild,
  ElementRef,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';
import { FormFieldOption, FormFieldSize, FormFieldState, FormFieldType } from './form-field.types';

let nextId = 0;

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [IconPlaceholderComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
})
export class FormFieldComponent implements ControlValueAccessor {
  // Core API
  readonly id = input<string>('');
  readonly label = input('');
  readonly placeholder = input('');
  readonly value = model<string | number | null>('');
  readonly type = input<FormFieldType>('text');
  readonly disabled = model(false);
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly helperText = input('');
  readonly errorMessage = input('');
  readonly successMessage = input('');
  readonly leadingIcon = input(false, { transform: booleanAttribute });
  readonly trailingIcon = input(false, { transform: booleanAttribute });
  readonly showLeadingDivider = input(false, { transform: booleanAttribute });
  readonly showTrailingDivider = input(false, { transform: booleanAttribute });
  readonly size = input<FormFieldSize>('md');
  readonly state = input<FormFieldState>('default');
  readonly autocomplete = input('');
  readonly name = input('');
  readonly options = input<FormFieldOption[]>([]);
  readonly rows = input(4);

  // Backwards-compat aliases
  readonly for = input('');
  readonly hint = input('');
  readonly error = input('');

  private readonly generatedId = `ff-${++nextId}`;
  private readonly focused = signal(false);
  private cvaDisabled = false;
  private onChange: (v: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  readonly fieldId = computed(() => this.id() || this.for() || this.generatedId);
  readonly supportId = computed(() => `${this.fieldId()}-support`);
  readonly isTextarea = computed(() => this.type() === 'textarea');
  readonly isSelect = computed(() => this.type() === 'select');
  readonly normalizedType = computed(() => {
    const t = this.type();
    if (t === 'telephone') return 'tel';
    if (t === 'textarea' || t === 'select') return 'text';
    return t;
  });
  readonly effectiveError = computed(() => this.errorMessage() || this.error());
  readonly effectiveHelper = computed(() => this.helperText() || this.hint());
  readonly showError = computed(() => !!this.effectiveError() || this.state() === 'error');
  readonly showSuccess = computed(() => !this.showError() && (this.state() === 'success' || !!this.successMessage()));
  readonly supportText = computed(() => {
    if (this.showError()) return this.effectiveError();
    if (this.showSuccess()) return this.successMessage() || this.effectiveHelper();
    return this.effectiveHelper();
  });
  readonly isFilled = computed(() => {
    const v = this.value();
    return v !== null && v !== undefined && String(v).length > 0;
  });
  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled || this.state() === 'disabled');
  readonly controlStateClass = computed(() => {
    if (this.isDisabled()) return 'is-disabled';
    if (this.readonly() || this.state() === 'readonly') return 'is-readonly';
    if (this.showError()) return 'is-error';
    if (this.showSuccess()) return 'is-success';
    if (this.focused() || this.state() === 'focus') return 'is-focus';
    if (this.isFilled() || this.state() === 'filled') return 'is-filled';
    return 'is-default';
  });

  // Detect projected content (wrapper mode)
  readonly hasProjected = signal(false);
  // We set this via template check; simpler: allow projection and also render native control when options/type imply it.
  // Wrapper mode is active when consumer projects content and does not rely on native control rendering for radios/custom.
  readonly wrapperMode = input(false, { transform: booleanAttribute });

  onFocus(): void { this.focused.set(true); }
  onBlur(): void { this.focused.set(false); this.onTouched(); }
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const v = target.value;
    this.value.set(v);
    this.onChange(v);
  }

  // ControlValueAccessor
  writeValue(v: string | number | null): void { this.value.set(v ?? ''); }
  registerOnChange(fn: (v: string | number | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.cvaDisabled = isDisabled; }
}
