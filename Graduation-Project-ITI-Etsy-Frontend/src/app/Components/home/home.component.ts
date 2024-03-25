import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeProductsComponent } from '../Products/home-products/home-products.component';
import { BaseCategoryComponent } from '../BaseCategory/base-category/base-category.component';
import { HomeSection2BaseCategoryComponent } from '../BaseCategory/home-section2-base-category/home-section2-base-category.component';
import { HomeFooterAdditionComponent } from '../SharedComponents/Header/Footer/home-footer-addition/home-footer-addition.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeFooterAdditionComponent, RouterModule, HomeProductsComponent ,BaseCategoryComponent, HomeSection2BaseCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
