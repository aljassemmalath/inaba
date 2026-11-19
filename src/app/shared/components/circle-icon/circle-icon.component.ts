import { Component, input } from '@angular/core';
import { IconPlaceholderComponent, IconPlaceholderSize } from '../icon-placeholder/icon-placeholder.component';

export type CircleIconVariant = 'outlined' | 'filled';

@Component({
  selector: 'app-circle-icon',
  imports: [IconPlaceholderComponent],
  template: `
    <span
      class="circle-icon"
      [class]="'circle-icon circle-icon--' + variant() + ' circle-icon--' + size() + ' ' + modifierClass()"
    >
      <app-icon-placeholder [size]="iconSize()" [src]="iconSrc()" />
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }
    .circle-icon {
      display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
      border-radius: 50%; box-sizing: border-box;
    }
    .circle-icon--outlined { background: transparent; border: 1px solid var(--border-default); }
    .circle-icon--filled { background: var(--background-muted); border: 1px solid transparent; }
    .circle-icon--sm { width: 32px; height: 32px; }
    .circle-icon--md { width: 40px; height: 40px; }
    .circle-icon--lg { width: 44px; height: 44px; }
  `],
})
export class CircleIconComponent {
  readonly variant = input<CircleIconVariant>('outlined');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly iconSize = input<IconPlaceholderSize>('sm');
  readonly iconSrc = input<string | null | undefined>(null);
  readonly modifierClass = input('');
}
