import { Component, input } from '@angular/core';

export type IconPlaceholderSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Reusable icon placeholder. No icon libraries/external sources.
 * Actual image `src` will be provided later via assets/styles or future input extension.
 */
@Component({
  selector: 'app-icon-placeholder',
  template: `
    <span class="icon-placeholder" [class]="'icon-placeholder icon-placeholder--' + size()" [attr.aria-hidden]="decorative() ? 'true' : null">
      <img class="icon-placeholder__image" [class.is-visible]="!!src()" [src]="src() || null" alt="" />
    </span>
  `,
  styles: [`
    :host { display: inline-flex; vertical-align: middle; }
    .icon-placeholder {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    }
    .icon-placeholder__image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      border: 0;
      opacity: 0; /* no broken-image icon; placeholder reserves space */
    }
    .icon-placeholder__image.is-visible { opacity: 1; }
    .icon-placeholder--sm { width: 16px; height: 16px; }
    .icon-placeholder--md { width: 20px; height: 20px; }
    .icon-placeholder--lg { width: 24px; height: 24px; }
    .icon-placeholder--xl { width: 32px; height: 32px; }
  `],
})
export class IconPlaceholderComponent {
  readonly size = input<IconPlaceholderSize>('md');
  readonly decorative = input(true);
  /** When provided, renders the actual image (local asset). */
  readonly src = input<string | null | undefined>(null);
}
