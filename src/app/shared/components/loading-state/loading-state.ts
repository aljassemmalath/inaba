import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `
    <div class="d-flex align-items-center justify-content-center gap-2 text-secondary" style="padding: 2.5rem;">
      <span class="spinner-border spinner-border-sm" style="color: var(--action-primary-default);" aria-hidden="true"></span>
      <span>{{ message() }}</span>
    </div>
  `,
})
export class LoadingStateComponent {
  readonly message = input('جارٍ التحميل...');
}
