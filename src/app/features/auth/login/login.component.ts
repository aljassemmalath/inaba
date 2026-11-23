import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly email = signal('');
  readonly password = signal('');
  readonly rememberMe = signal(false);
  readonly passwordVisible = signal(false);

  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible) => !visible);
  }

  onSubmit(): void {
    // Authentication will be connected here when the backend endpoint is available.
  }
}
