import { Component, input } from '@angular/core';
import { IconPlaceholderComponent } from '../icon-placeholder/icon-placeholder.component';

@Component({
  selector: 'app-page-placeholder',
  imports: [IconPlaceholderComponent],
  template: `
    <div class="page-header-block">
      <div>
        <h1>{{ title() }}</h1>
        <p class="subtitle">{{ description() }}</p>
      </div>
    </div>
    <div class="content-card-body placeholder-card text-secondary" style="text-align: center; padding: 3rem;">
      <app-icon-placeholder size="xl" />
      <p style="margin: 0.75rem 0 0;">هذه الصفحة قيد الإعداد ضمن هيكل المشروع.</p>
    </div>
  `,
})
export class PagePlaceholderComponent {
  readonly title = input.required<string>();
  readonly description = input('سيتم بناء محتوى هذه الصفحة في مرحلة لاحقة.');
}
