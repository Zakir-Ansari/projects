import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/helper/header/header.component';
import { FooterComponent } from './components/helper/footer/footer.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pick-kart';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.login('Admin', 'Admin').subscribe({ next: response => console.log('Response', response) });
  }
}
