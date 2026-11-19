import { Component, input } from '@angular/core';

/**
 * Reusable card container. Base class `content-card-body` is always applied.
 * Use `modifierClass` for variations (e.g. stats-card, financial-card, chart-card).
 * When `title` is set, renders the standard header (right-aligned h3) + divider.
 */
@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
})
export class ContentCardComponent {
  readonly title = input<string | null>(null);
  readonly modifierClass = input('');
  readonly showDivider = input(true);
}
