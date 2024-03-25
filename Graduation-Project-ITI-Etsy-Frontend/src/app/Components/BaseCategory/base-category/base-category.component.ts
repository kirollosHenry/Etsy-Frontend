import { Component, OnInit } from "@angular/core";
import { BaseCategory } from "../../../Models/base-category";
import { BaseCategoryService } from "../../../Services/BaseCategory/base-category.service";
import { Subscription } from "rxjs";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-base-category",
  standalone: true,
  imports: [RouterModule , CommonModule],
  templateUrl: "./base-category.component.html",
  styleUrl: "./base-category.component.css",
})
export class BaseCategoryComponent implements OnInit {


  BaseCategoryList: BaseCategory[] = [];
  extendedBaseCategoryItems: BaseCategory[] = []; 
  showRemainProducts: boolean = false;


  constructor(private _BaseCategoryService: BaseCategoryService ) {}

  sub!: Subscription;
  ngOnInit(): void {
    this.sub = this._BaseCategoryService.GatAllBaseCategories().subscribe({
      next: (Categories) => {
        this.BaseCategoryList = Categories.entities;

        const itemsToAdd = 17 - this.BaseCategoryList.length;
        this.extendedBaseCategoryItems = [...this.BaseCategoryList];
        for (let i = 0; i < itemsToAdd; i++) {
          // Create an object with default values for properties
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



// to show the products after click  showMore
showMore() {
  this.showRemainProducts = !this.showRemainProducts; 
}




}

//ddd
