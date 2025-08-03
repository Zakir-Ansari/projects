import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = inject(AuthService);
  user = 'NA';

  login(user: string) {
    this.user = user;
    this.authService.login(user, user).subscribe({ next: response => console.log(response) });
  }

  logout() {
    this.authService.logout();
  }
}
