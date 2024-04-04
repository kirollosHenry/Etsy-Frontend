import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductListComponent } from '../Products/product-list/product-list.component';
import { BaseCategoryComponent } from '../BaseCategory/base-category/base-category.component';
import { AllcategoriesComponent } from '../Category/AllCategory/allcategories/allcategories.component';
import { StarComponent } from '../SharedComponents/star/star.component';
import { BaseCategory } from '../../Models/base-category';
import { Category } from '../../Models/category';
import { Products } from '../../Models/products';
import { Subscription } from 'rxjs';
import { BaseCategoryService } from '../../Services/BaseCategory/base-category.service';
import { CategoryService } from '../../Services/Category/category.service';
import { ProductsService } from '../../Services/Products/products.service';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ProductListComponent, BaseCategoryComponent, AllcategoriesComponent, StarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
@Input() SearchUser!: string;
BaseCategoryobj!:BaseCategory;
CategoryObj!: Category;
ProductObj!: Products;



sub!:Subscription;
constructor(private _BaseCategoryService: BaseCategoryService, private _CategoryService: CategoryService, private _ProductsService: ProductsService){}
  ngOnInit(): void {
    this.sub = this._BaseCategoryService.GatBaseCategoriesByName("baby").subscribe({
      next: (BaseCategory) => {
          this.BaseCategoryobj = BaseCategory.entity;
      }
  })

  this.sub = this._CategoryService.GatCategoriesByName("Sunglasses").subscribe({
      next: (CategoryAPI) => {
          this.CategoryObj = CategoryAPI.entity;
          
      }
  })

  this.sub = this._ProductsService.GatProductsByName("Alleyesonmeeyewear").subscribe({
      next: (Product) => {
          this.ProductObj = Product.entity;
      }
  })
  
  } 
 }



