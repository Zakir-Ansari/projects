import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/helper/header/header.component';
import { FooterComponent } from './components/helper/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbAccordionModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pick-kart';
}
