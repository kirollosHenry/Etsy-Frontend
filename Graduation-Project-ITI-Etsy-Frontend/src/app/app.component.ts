import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/SharedComponents/Header/Footer/footer/footer.component';
import { HeaderComponent } from './Components/SharedComponents/Header/header/header.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductListComponent } from "./Components/Products/product-list/product-list.component";
import { ProductDetailsComponent } from "./Components/Products/product-details/product-details.component";
import { BaseCategoryComponent } from "./Components/BaseCategory/base-category/base-category.component";
import { AllcategoriesComponent } from "./Components/Category/AllCategory/allcategories/allcategories.component";
import { HomeProductsComponent } from './Components/Products/home-products/home-products.component';
import { HomeSection2BaseCategoryComponent } from './Components/BaseCategory/home-section2-base-category/home-section2-base-category.component';
import { HomeComponent } from './Components/home/home.component';
import { HomeFooterAdditionNotLogInComponent } from './Components/SharedComponents/Header/Footer/home-footer-addition-not-log-in/home-footer-addition-not-log-in.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HomeFooterAdditionNotLogInComponent, HomeComponent, RouterOutlet,HomeProductsComponent, FooterComponent, HeaderComponent, CartComponent, ProductListComponent, ProductDetailsComponent, BaseCategoryComponent, AllcategoriesComponent]
})
export class AppComponent {
  title = 'Graduation-Project-ITI-Etsy-Frontend';
  constructor(private router: Router) {}
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
