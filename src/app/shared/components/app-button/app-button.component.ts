import { Component, booleanAttribute, computed, input, output } from '@angular/core';

type BtnVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'inverse' | 'outline' | 'ghost' | 'subtle' | 'neutral';
type BtnType = 'button' | 'submit' | 'reset';
type BtnSize = 'lg' | 'md' | 'sm';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [class]="classes()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel() || null"
      (click)="onClick($event)"
    >
      <ng-content />
    </button>
  `,
  styles: [
    `:host { display: inline-flex; vertical-align: middle; }
     :host(.full) { display: flex; width: 100%; }
     :host(.full) button { width: 100%; }
     button { gap: 8px; }`,
  ],
})
export class AppButtonComponent {
  readonly variant = input<BtnVariant>('primary');
  readonly type = input<BtnType>('button');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input('');
  /** lg = 40px (default), md = 36px. 'sm' kept as alias for md. */
  readonly size = input<BtnSize>('lg');
  readonly pressed = output<MouseEvent>();

  private readonly resolvedSize = computed(() => (this.size() === 'sm' ? 'md' : this.size()));

  classes(): string {
    const v = this.variant();
    const variantClass =
      v === 'primary' ? 'btn-primary btn-brand'
      : v === 'secondary' || v === 'outline' ? 'btn-secondary btn-brand-outline'
      : v === 'tertiary' || v === 'ghost' ? 'btn-tertiary btn-brand-ghost'
      : v === 'danger' ? 'btn-danger'
      : v === 'inverse' ? 'btn-inverse'
      : v === 'subtle' ? 'btn-primary btn-subtle'
      : v === 'neutral' ? 'btn-neutral'
      : 'btn-primary btn-brand';
    const sizeClass = this.resolvedSize() === 'md' ? 'btn-md' : 'btn-lg';
    return `btn ${variantClass} ${sizeClass}`;
  }

  onClick(e: MouseEvent): void {
    if (this.disabled()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.pressed.emit(e);
  }
}
