import { Component, inject, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Role } from '../../../core/enums/role.enum';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgTemplateOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private offcanvasService = inject(NgbOffcanvas);
  private authService = inject(AuthService);

  role: Role | null = null;

  readonly allMenuItems: {
    label: string;
    link: string;
    allowedRole?: Role[];
  }[] = [
    { label: 'Home', link: '' },
    { label: 'Manage Users', link: '/userManagement', allowedRole: [Role.Admin] },
    { label: 'Manage Products', link: '/productManagement', allowedRole: [Role.Admin, Role.Seller] },
    { label: 'Work', link: '#work' },
    { label: 'Contact', link: '#contact' },
  ];

  menuItems: typeof this.allMenuItems = [];

  constructor() {
    this.authService.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.role = user?.role ?? null;
      console.log('logged in role', this.role);
      this.updateMenuItems();
    });
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvasNavbar' });
  }

  updateMenuItems() {
    this.menuItems = this.allMenuItems.filter(
      item => !item.allowedRole || (this.role && item.allowedRole.includes(this.role))
    );
  }
}
