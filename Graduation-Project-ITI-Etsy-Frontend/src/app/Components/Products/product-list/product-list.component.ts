import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/Products/products.service';
import { Products } from '../../../Models/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit , OnDestroy{
  ProductsList: Products[]  = [];
  sub!: Subscription;

  constructor(private _ProductsService:ProductsService) {}

  ngOnInit(): void {
    this.sub = this._ProductsService.GetAllProductsPagination(10,1).subscribe({
      next : (ProductDataAPI) =>{
        console.log(ProductDataAPI);
        
        this.ProductsList = ProductDataAPI;
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
