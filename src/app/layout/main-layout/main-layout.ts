import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent {
  readonly sidebarOpen = signal(false);
  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }
  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
