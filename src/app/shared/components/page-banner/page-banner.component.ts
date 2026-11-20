import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-banner',
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.scss',
})
export class PageBannerComponent {
  private readonly router = inject(Router);

  readonly title = input.required<string>();
  readonly description = input('');
  readonly modifierClass = input('');
  readonly backRoute = input<string | unknown[] | null>(null);

  goBack(): void {
    const route = this.backRoute();
    if (route === null || route === '') return;
    void this.router.navigate(Array.isArray(route) ? route : [route]);
  }
}
