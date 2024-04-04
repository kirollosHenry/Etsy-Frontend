import { Component, OnInit, inject } from '@angular/core';
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
import { ProductsListAfterCategoryComponent } from './Components/Products/products-list-after-category/products-list-after-category.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchComponent } from "./Components/Search/search.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [TranslateModule, ProductsListAfterCategoryComponent, AllcategoriesComponent, HomeFooterAdditionNotLogInComponent, HomeComponent, RouterOutlet, HomeProductsComponent, FooterComponent, HeaderComponent, CartComponent, ProductListComponent, ProductDetailsComponent, BaseCategoryComponent, AllcategoriesComponent, SearchComponent]
})
export class AppComponent implements OnInit {
  title = 'Graduation-Project-ITI-Etsy-Frontend';
  lang: string = "en";

  constructor(private router: Router ) { }

  translateService = inject(TranslateService);
  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);
    
  }


  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
