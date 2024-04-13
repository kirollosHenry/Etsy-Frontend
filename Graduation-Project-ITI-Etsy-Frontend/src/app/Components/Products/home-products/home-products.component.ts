import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { IProductAPI, Products } from "../../../Models/products";
import { Subject, Subscription, takeUntil } from "rxjs";
import { ProductsService } from "../../../Services/Products/products.service";
import { CommonModule } from "@angular/common";
import { StarComponent } from "../../SharedComponents/star/star.component";
import { AuthService } from "../../../Services/Authentication/auth.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-home-products",
  standalone: true,
  imports: [CommonModule, StarComponent, RouterModule, TranslateModule],
  templateUrl: "./home-products.component.html",
  styleUrl: "./home-products.component.css",
})
export class HomeProductsComponent implements OnInit, OnDestroy {
  lang: string = "en";
  // For products
  ProductsList: Products[] = [];
  sub!: Subscription;
  subForLog!: Subscription;

  // For checking lo in
  private destroySubject = new Subject();
  isLoggedIn: boolean = false;

  userData!: any;

  constructor(
    private _ProductsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.subForLog = this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });

    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);

    this.sub = this._ProductsService.GetAllProductsPagination(77, 1).subscribe({
      next: (ProductDataAPI: IProductAPI) => {
        this.ProductsList = ProductDataAPI.entities;
        console.log(this.ProductsList);
      },
      error: (response) => {
        console.log(response);
      },
    });

    const LocalStorage = localStorage.getItem("userData") as string;
    if (localStorage) {
      this.userData = JSON.parse(LocalStorage);
    }

  }

  // ChangeLang(lang:any){
  //   const selectedLanguage = lang.target.value;

  //   localStorage.setItem('lang',selectedLanguage);

  //   this.translateService.use(selectedLanguage);

  // }
 

  ngOnDestroy(): void {
    this.sub.unsubscribe();

    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
}
