import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FooterComponent } from "../Footer/footer/footer.component";
import { CartComponent } from "../../../cart/cart.component";
import { ProductListComponent } from "../../../Products/product-list/product-list.component";
import { ProductDetailsComponent } from "../../../Products/product-details/product-details.component";
import { Router, RouterModule } from "@angular/router";
import { Subject, Subscription, takeUntil } from "rxjs";
import { AuthService } from "../../../../Services/Authentication/auth.service";
import { BaseCategoryService } from "../../../../Services/BaseCategory/base-category.service";
import { BaseCategory } from "../../../../Models/base-category";
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    FooterComponent,
    CartComponent,
    ProductListComponent,
    ProductDetailsComponent,
    RouterModule,
    TranslateModule
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit, OnDestroy {


  lang:string ='';
  // ===============
  // For DownDrops :

  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.getElementById("dropdown-menu");
    if (dropdownMenu) {
      dropdownMenu.style.display = this.isDropdownOpen ? "block" : "none";
    }
  }

  isDropdownOpenForBell: boolean = false;

  toggleDropdownBell() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.getElementById("bellDropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.style.display = this.isDropdownOpen ? "block" : "none";
    }
  }

  isDropdownOpenForProfile: boolean = false;

  toggleDropdownProfile() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.getElementById("profileDropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.style.display = this.isDropdownOpen ? "block" : "none";
    }
  }

  // ====================
  // For checking if it user Or Not :

  private destroySubject = new Subject();
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router,private _BaseCategoryService: BaseCategoryService, private translateService:TranslateService) {
    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
  }

  // ====================
  // Dropdown List in Base Category 
  BaseCategoryList: BaseCategory[] = [];
  sub!: Subscription;

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';

    this.isLoggedIn = this.authService.isAuthenticated();
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



  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
}
