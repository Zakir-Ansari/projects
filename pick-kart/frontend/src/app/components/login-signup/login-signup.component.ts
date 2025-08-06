import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-signup',
  imports: [],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
})
export class LoginSignupComponent {
  authService = inject(AuthService);

  login() {
    this.authService
      .login('admin@gmail.com', 'admin@123')
      .subscribe({ next: res => console.log('Login Response', res) });
  }

  logout() {
    this.authService.logout();
  }
}
