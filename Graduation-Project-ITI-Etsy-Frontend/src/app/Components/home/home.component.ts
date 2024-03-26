import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeProductsComponent } from '../Products/home-products/home-products.component';
import { BaseCategoryComponent } from '../BaseCategory/base-category/base-category.component';
import { HomeSection2BaseCategoryComponent } from '../BaseCategory/home-section2-base-category/home-section2-base-category.component';
import { HomeFooterAdditionComponent } from '../SharedComponents/Header/Footer/home-footer-addition/home-footer-addition.component';
import { HomeFooterAdditionNotLogInComponent } from '../SharedComponents/Header/Footer/home-footer-addition-not-log-in/home-footer-addition-not-log-in.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeFooterAdditionNotLogInComponent, HomeFooterAdditionComponent, RouterModule, HomeProductsComponent ,BaseCategoryComponent, HomeSection2BaseCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
