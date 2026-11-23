import { Component, output, signal } from '@angular/core';
import { IconPlaceholderComponent } from '../../shared/components/icon-placeholder/icon-placeholder.component';
import { HeaderSearchBarComponent } from '../../shared/components/header-search-bar/header-search-bar.component';

@Component({
  selector: 'app-header',
  imports: [IconPlaceholderComponent, HeaderSearchBarComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly toggleSidebar = output<void>();
  readonly logout = output<void>();
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  onLogout(): void {
    this.menuOpen.set(false);
    this.logout.emit();
  }
}
