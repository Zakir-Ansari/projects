import { Component, inject, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private offcanvasService = inject(NgbOffcanvas);
  private authService = inject(AuthService);
  role: string | null = null;

  constructor() {
    this.authService.user$.subscribe(user => {
      this.role = user?.role ?? null;
      console.log('logged in role', this.role);
    });
  }

  menuItems = [
    { label: 'Home', link: '/home' },
    { label: 'Manage Users', allowedRole: ['Admin'], link: '/userManagement' },
    { label: 'Manage Products', allowedRole: ['Admin', 'Seller'], link: '/productManagement' },
    { label: 'Work', link: '#work' },
    { label: 'Contact', link: '#contact' },
  ];

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvasNavbar' });
  }
}
