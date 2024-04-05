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


