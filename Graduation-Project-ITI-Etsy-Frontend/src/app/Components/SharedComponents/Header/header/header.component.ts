import { Component } from '@angular/core';
import { FooterComponent } from '../Footer/footer/footer.component';
import { CartComponent } from '../../../cart/cart.component';
import { ProductListComponent } from '../../../Products/product-list/product-list.component';
import { ProductDetailsComponent } from '../../../Products/product-details/product-details.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FooterComponent, CartComponent, ProductListComponent, ProductDetailsComponent,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
