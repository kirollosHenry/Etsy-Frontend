import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseCategory } from '../../../Models/base-category';
import { BaseCategoryService } from '../../../Services/BaseCategory/base-category.service';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home-section2-base-category',
  standalone: true,
  imports: [RouterModule, TranslateModule  ],
  templateUrl: './home-section2-base-category.component.html',
  styleUrl: './home-section2-base-category.component.css'
})
export class HomeSection2BaseCategoryComponent implements OnInit{
  BaseCategoryList: BaseCategory[] = [];
  extendedBaseCategoryItems: BaseCategory[] = []; 
  showRemainProducts: boolean = false;


  constructor(private _BaseCategoryService: BaseCategoryService, private translateService:TranslateService ) {}
  lang:string ='';
  sub!: Subscription;


  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';


    this.sub = this._BaseCategoryService.GatAllBaseCategories().subscribe({
      next: (Categories) => {
        this.BaseCategoryList = Categories.entities;
        
      },
    });
  }


  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;

    localStorage.setItem('lang',selectedLanguage);

    this.translateService.use(selectedLanguage);

  }




}
