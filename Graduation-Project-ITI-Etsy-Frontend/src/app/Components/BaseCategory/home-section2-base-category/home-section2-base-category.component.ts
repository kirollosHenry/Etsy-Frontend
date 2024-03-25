import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseCategory } from '../../../Models/base-category';
import { BaseCategoryService } from '../../../Services/BaseCategory/base-category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-section2-base-category',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './home-section2-base-category.component.html',
  styleUrl: './home-section2-base-category.component.css'
})
export class HomeSection2BaseCategoryComponent implements OnInit{
  BaseCategoryList: BaseCategory[] = [];
  extendedBaseCategoryItems: BaseCategory[] = []; 
  showRemainProducts: boolean = false;


  constructor(private _BaseCategoryService: BaseCategoryService ) {}

  sub!: Subscription;
  ngOnInit(): void {
    this.sub = this._BaseCategoryService.GatAllBaseCategories().subscribe({
      next: (Categories) => {
        this.BaseCategoryList = Categories.entities;

        const itemsToAdd = 5 - this.BaseCategoryList.length;
        this.extendedBaseCategoryItems = [...this.BaseCategoryList];
        for (let i = 0; i < itemsToAdd; i++) {
          const defaultBaseCategory: BaseCategory = {
            id: 232312,
            nameEN: this.BaseCategoryList[0].nameEN,
            nameAR: this.BaseCategoryList[0].nameAR,
            baseCategoryImage: this.BaseCategoryList[0].baseCategoryImage,
          };
          this.extendedBaseCategoryItems.push(defaultBaseCategory);
        }
      },
    });
  }




}
