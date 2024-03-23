import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/Products/products.service';
import { IProductAPI, Products } from '../../../Models/products';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StarComponent } from "../../SharedComponents/star/star.component";

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [CommonModule, StarComponent]
})
export class ProductListComponent implements OnInit , OnDestroy{
  ProductsList: Products[]  = [];
  sub!: Subscription;

  constructor(private _ProductsService:ProductsService) {}

  ngOnInit(): void {
    this.sub = this._ProductsService.GetAllProductsPagination(30,1).subscribe({
      next : (ProductDataAPI : IProductAPI) =>{
        this.ProductsList = ProductDataAPI.entities;
        console.log(this.ProductsList);
      },
      error : (response) => {
        console.log(response);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
