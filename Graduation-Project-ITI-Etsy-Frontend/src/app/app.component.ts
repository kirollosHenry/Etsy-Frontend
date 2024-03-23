import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/SharedComponents/Header/Footer/footer/footer.component';
import { HeaderComponent } from './Components/SharedComponents/Header/header/header.component';
import { CartComponent } from './Components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,HeaderComponent,CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Graduation-Project-ITI-Etsy-Frontend';
}
