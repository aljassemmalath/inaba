import { Component, input } from '@angular/core';
import { IconPlaceholderComponent, IconPlaceholderSize } from '../icon-placeholder/icon-placeholder.component';

@Component({
  selector: 'app-empty-state',
  imports: [IconPlaceholderComponent],
  template: `
    <div class="text-center text-secondary" style="padding: 2.5rem 1rem;">
      <app-icon-placeholder [size]="iconSize()" />
      <p style="margin: 0.75rem 0 0; font-weight: 500; color: var(--text-primary);">{{ title() }}</p>
      @if (message()) { <p style="margin: 0.25rem 0 0; font-size: var(--font-size-body-sm);">{{ message() }}</p> }
    </div>
  `,
})
export class EmptyStateComponent {
  readonly title = input('لا توجد بيانات');
  readonly message = input('');
  readonly iconSize = input<IconPlaceholderSize>('xl');
}
