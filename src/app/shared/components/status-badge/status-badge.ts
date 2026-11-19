import { Component, computed, input } from '@angular/core';

export type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary' | 'cyan';

@Component({
  selector: 'app-status-badge',
  template: `<span class="status-badge" [class]="tone()">{{ label() }}</span>`,
})
export class StatusBadgeComponent {
  readonly label = input.required<string>();
  readonly tone = input<BadgeTone>('neutral');
}
