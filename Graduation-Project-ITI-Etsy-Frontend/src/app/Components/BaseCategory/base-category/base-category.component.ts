import { Component, OnInit } from "@angular/core";
import { BaseCategory } from "../../../Models/base-category";
import { BaseCategoryService } from "../../../Services/BaseCategory/base-category.service";
import { Subscription } from "rxjs";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: "app-base-category",
  standalone: true,
  imports: [RouterModule , CommonModule,TranslateModule],
  templateUrl: "./base-category.component.html",
  styleUrl: "./base-category.component.css",
})
export class BaseCategoryComponent implements OnInit {

  lang:string ='';
  
  BaseCategoryList: BaseCategory[] = [];
  extendedBaseCategoryItems: BaseCategory[] = []; 
  showRemainProducts: boolean = false;


  constructor(private _BaseCategoryService: BaseCategoryService,private translateService:TranslateService ) {}

  sub!: Subscription;
  ngOnInit(): void {

    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);

    this.sub = this._BaseCategoryService.GatAllBaseCategories().subscribe({

      next: (Categories) => {
        this.BaseCategoryList = Categories.entities;

        const itemsToAdd = 17 - this.BaseCategoryList.length;
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

  // ChangeLang(lang:any){
  //   const selectedLanguage = lang.target.value;

  //   localStorage.setItem('lang',selectedLanguage);

  //   this.translateService.use(selectedLanguage);

  // }



// to show the products after click  showMore
showMore() {
  this.showRemainProducts = !this.showRemainProducts; 
}




}


