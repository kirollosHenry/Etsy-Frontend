import { Component, OnInit } from '@angular/core';
import { BaseCategory } from '../../../Models/base-category';
import { BaseCategoryService } from '../../../Services/BaseCategory/base-category.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-base-category',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './base-category.component.html',
  styleUrl: './base-category.component.css'
})
export class BaseCategoryComponent implements OnInit{

  BaseCategoryList: BaseCategory[] = [];

  constructor(private _BaseCategoryService : BaseCategoryService){}
 

  sub!: Subscription;
  ngOnInit(): void {
    this.sub = this._BaseCategoryService.GatAllBaseCategories().subscribe({
      next : (Categories)=>{
        this.BaseCategoryList = Categories.entities;
      }

    })
  }

}

//ddd
