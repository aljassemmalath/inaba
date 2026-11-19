import { Component, input, output } from '@angular/core';
import { IconPlaceholderComponent } from '../../shared/components/icon-placeholder/icon-placeholder.component';

export interface SidebarUserProfile {
  name: string;
  role: string;
}

@Component({
  selector: 'app-user-profile',
  imports: [IconPlaceholderComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  readonly user = input<SidebarUserProfile>({ name: 'مستخدم تجريبي', role: 'مدير النظام' });
  readonly logout = output<void>();

  onLogout(): void {
    // Placeholder: no auth service is wired yet. Do not pretend the user is logged out.
    // TODO: inject/connect AuthService.logout() when authentication is implemented.
    console.info('[UserProfile] Logout requested (placeholder handler; auth not implemented).');
    this.logout.emit();
  }
}
