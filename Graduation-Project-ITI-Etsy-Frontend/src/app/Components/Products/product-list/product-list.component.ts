import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../Services/Products/products.service';
import { IProductAPI, Products } from '../../../Models/products';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StarComponent } from "../../SharedComponents/star/star.component";
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  imports: [CommonModule, StarComponent, RouterModule,
    PaginatorModule
  ]
})
export class ProductListComponent implements OnInit, OnDestroy {
  ProductsList: Products[] = [];
  FilterProductsListRelevance: Products[] = [];
  FilterProductsListAscending: Products[] = [];
  FilterProductsListDescending: Products[] = [];
  FilterProductsListReviews: Products[] = [];
  sub!: Subscription;

  constructor(private _ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.sub = this._ProductsService.GetAllProductsPagination(77, 1).subscribe({
      next: (ProductDataAPI: IProductAPI) => {
        this.ProductsList = ProductDataAPI.entities;
        this.FilterProductsListRelevance = ProductDataAPI.entities;
      },
      error: (response) => {
        console.log(response);
      }
    })

    this.sub = this._ProductsService.GetProductsPriceAscending(1).subscribe({
      next: (ProductDataAPI: IProductAPI) => {
        this.FilterProductsListAscending = ProductDataAPI.entities;
        console.log(this.ProductsList);
      },
      error: (response) => {
        console.log(response);
      }
    })

    this.sub = this._ProductsService.GetProductsPriceDescending(1).subscribe({
      next: (ProductDataAPI: IProductAPI) => {
        this.FilterProductsListDescending = ProductDataAPI.entities;
        console.log(this.ProductsList);
      },
      error: (response) => {
        console.log(response);
      }
    })

    this.sub = this._ProductsService.GetProductsCustomerReview(1).subscribe({
      next: (ProductDataAPI: IProductAPI) => {
        this.FilterProductsListReviews = ProductDataAPI.entities;
        console.log(this.ProductsList);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



  // For Dropdown List :
  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.getElementById("filter-dropdown-menu");
    if (dropdownMenu) {
      dropdownMenu.style.display = this.isDropdownOpen ? "block" : "none";
    }
  }

  // Function for Pagination !
  first: number = 10;
  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  //All Filters Products
  FilterProduct(FilterBy: string) {
    if (FilterBy == 'Relevance') {
      this.ProductsList = this.FilterProductsListRelevance;
    }
    else if (FilterBy == 'Lowest') {
      this.ProductsList = this.FilterProductsListAscending;
    }
    else if (FilterBy == 'Highest') {
      this.ProductsList = this.FilterProductsListDescending;
    }
    else if (FilterBy == 'Reviews') {
      this.ProductsList = this.FilterProductsListReviews;
    }
    else if (FilterBy == 'Recent') {
      this.ProductsList = this.FilterProductsListRelevance;
    }
  }
}

