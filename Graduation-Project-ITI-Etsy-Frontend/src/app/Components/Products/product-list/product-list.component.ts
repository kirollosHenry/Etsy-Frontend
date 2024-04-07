import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ProductsService } from "../../../Services/Products/products.service";
import { IProductAPI, Products } from "../../../Models/products";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { StarComponent } from "../../SharedComponents/star/star.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PaginatorModule } from "primeng/paginator";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-product-list",
  standalone: true,
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.css",
  imports: [
    CommonModule,
    StarComponent,
    RouterModule,
    PaginatorModule,
    TranslateModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit, OnDestroy {
  CategoryId: number = 0;
  ProductsList: Products[] = [];
  FilterProductsListRelevance: Products[] = [];
  FilterProductsListAscending: Products[] = [];
  FilterProductsListDescending: Products[] = [];
  FilterProductsListReviews: Products[] = [];
  sub!: Subscription;
  lang: string = "en";

  constructor(
    private _ProductsService: ProductsService,
    private route: ActivatedRoute,
    private translateService: TranslateService

  ) {}

  ngOnInit(): void {
    // Localization
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);

    this.route.params.subscribe((params) => {
      this.CategoryId = params["id"];
    })

    //Pagination
    this.loadProducts();

  }


  // For Dropdown List :
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Functions for Pagination !
  itemsPerPage: number = 8;
  pageIndex: number = 0;

  paginate(event: any) {
 
    this.pageIndex = event.page +1;
    this.loadProducts(); 
  }
  
  
 // Method to load products based on itemsPerPage and pageIndex
 loadProducts() {
    
  this.sub = this._ProductsService.GetAllProductsByCategory(this.CategoryId,this.itemsPerPage,this.pageIndex).subscribe({
    next: (ProductDataAPI: IProductAPI) => {
          this.ProductsList = ProductDataAPI.entities;
          this.FilterProductsListRelevance = ProductDataAPI.entities;
        },
        error: (response) => {
          console.log(response);
        },
  });
  

  this.sub = this._ProductsService.GetProductsPriceAscending(this.CategoryId,this.itemsPerPage,this.pageIndex).subscribe({
    next: (ProductDataAPI: IProductAPI) => {
      this.FilterProductsListAscending = ProductDataAPI.entities;
      console.log(this.ProductsList);
    },
    error: (response) => {
      console.log(response);
    },
  });

  this.sub = this._ProductsService.GetProductsPriceDescending(this.CategoryId,this.itemsPerPage,this.pageIndex).subscribe({
    next: (ProductDataAPI: IProductAPI) => {
      this.FilterProductsListDescending = ProductDataAPI.entities;
      console.log(this.ProductsList);
    },
    error: (response) => {
      console.log(response);
    },
  });

  this.sub = this._ProductsService.GetProductsCustomerReview(this.CategoryId,this.itemsPerPage,this.pageIndex).subscribe({
    next: (ProductDataAPI: IProductAPI) => {
      this.FilterProductsListReviews = ProductDataAPI.entities;
      console.log(this.ProductsList);
    },
    error: (response) => {
      console.log(response);
    },
  });
}

  //All Filters Products
  FilterProduct(FilterBy: string) {
    if (FilterBy == "Relevance") {
      this.ProductsList = this.FilterProductsListRelevance;
    } else if (FilterBy == "Lowest") {
      this.ProductsList = this.FilterProductsListAscending;
    } else if (FilterBy == "Highest") {
      this.ProductsList = this.FilterProductsListDescending;
    } else if (FilterBy == "Reviews") {
      this.ProductsList = this.FilterProductsListReviews;
    } else if (FilterBy == "Recent") {
      this.ProductsList = this.FilterProductsListRelevance;
    }
  }
  

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}



interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}