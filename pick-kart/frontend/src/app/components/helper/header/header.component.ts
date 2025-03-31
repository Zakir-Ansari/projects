import { Component, inject, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private offcanvasService = inject(NgbOffcanvas);

  menuItems = [
    { label: 'Home', link: '#home' },
    { label: 'About', link: '#about' },
    { label: 'Experience', link: '#experience' },
    { label: 'Work', link: '#work' },
    { label: 'Contact', link: '#contact' },
  ];

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvasNavbar' });
  }
}
