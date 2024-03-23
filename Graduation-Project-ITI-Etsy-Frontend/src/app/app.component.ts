import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/SharedComponents/Header/Footer/footer/footer.component';
import { HeaderComponent } from './Components/SharedComponents/Header/header/header.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductListComponent } from "./Components/Products/product-list/product-list.component";
import { ProductDetailsComponent } from "./Components/Products/product-details/product-details.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, FooterComponent, HeaderComponent, CartComponent, ProductListComponent, ProductDetailsComponent]
})
export class AppComponent {
  title = 'Graduation-Project-ITI-Etsy-Frontend';
}
