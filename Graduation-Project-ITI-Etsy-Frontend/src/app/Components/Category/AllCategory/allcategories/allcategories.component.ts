import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../Models/category';
import { CategoryService } from '../../../../Services/Category/category.service';
import { Subscription } from 'rxjs';
import { ProductListComponent } from '../../../Products/product-list/product-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-allcategories',
  standalone: true,
  imports: [ProductListComponent , RouterModule],
  templateUrl: './allcategories.component.html',
  styleUrl: './allcategories.component.css'
})
export class AllcategoriesComponent implements OnInit {

  CategoryList: Category[] = [];
  showRemainCategories: boolean = false;

  constructor(private _CategoryService: CategoryService) { }
  sub!:Subscription;

  ngOnInit(): void {
    this.sub = this._CategoryService.GetAllCategories().subscribe({
      next : (Categories)=>{
        this.CategoryList = Categories.entities;
      }
    })
  }


  showMore() {
    this.showRemainCategories = !this.showRemainCategories; 
  }
  

}
