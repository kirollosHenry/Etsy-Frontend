import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../Models/category';
import { CategoryService } from '../../../../Services/Category/category.service';
import { Subscription } from 'rxjs';
import { ProductListComponent } from '../../../Products/product-list/product-list.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-allcategories',
  standalone: true,
  imports: [ProductListComponent , RouterModule],
  templateUrl: './allcategories.component.html',
  styleUrl: './allcategories.component.css'
})
export class AllcategoriesComponent implements OnInit {

  TitleCategory!: string;
  BaseCategoryId: number =0;
  CategoryList: Category[] = [];
  showRemainCategories: boolean = false;

  constructor(private _CategoryService: CategoryService,private route: ActivatedRoute) { }
  sub!:Subscription;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.BaseCategoryId = params['categoryId'];

      this.sub = this._CategoryService.GetAllCategoriesByBaseCategoryId(this.BaseCategoryId).subscribe({
        next : (Categories)=>{
          debugger;
          this.CategoryList = Categories.entities;
          this.TitleCondition(this.BaseCategoryId);
        }
      })
    });
  }

  showMore() {
    this.showRemainCategories = !this.showRemainCategories; 
  }

  TitleCondition(BaseId:number) : void{
    if(BaseId == 1){
      this.TitleCategory = "Accessories";
    }
    else if(BaseId == 2){
      this.TitleCategory = "Art & Collectibles";
    }
    else if(BaseId == 3){
      this.TitleCategory = "Baby";
    }
  }
}
