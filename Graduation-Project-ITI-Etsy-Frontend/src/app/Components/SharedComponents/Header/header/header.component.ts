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
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { NgbModal, NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "../../../login/login.component";
import { TranslationLangService } from "../../../../Services/translation/translationLang.service";
import { SearchService } from "../../../../Services/Search/search.service";
import { CommonModule } from "@angular/common";
import { BadgeCartService } from "../../../../Services/Cart/badge-cart.service";
import { ResgisterService } from "../../../../Services/Authentication/resgister.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    FooterComponent,
    CartComponent,
    ProductListComponent,
    ProductDetailsComponent,
    RouterModule,
    TranslateModule,
    NgbModalModule,
    LoginComponent,
    CommonModule 
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit, OnDestroy {
  lang: string = "";

    constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private _BaseCategoryService: BaseCategoryService,
    private translationService: TranslationLangService,
    private _SearchService : SearchService,
    private BadgeCartService:BadgeCartService,
    private register:ResgisterService
    
  ) {
    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
      this.register.authStatus.pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
  }
  // ===============
  // For DownDrops :

    // For Dropdown List :
    isDropdownOpen2: boolean = false;

    toggleDropdown() {
      this.isDropdownOpen2 = !this.isDropdownOpen2;
    }


  selectItemProfile() {
    this.isDropdownOpen2 = false;
    const dropdownMenu = document.getElementById("bellDropdownMenu");
    this.router.navigate(["/userprofile"]);
    if (dropdownMenu) {
      dropdownMenu.style.display = "none";
    }
  }
 
  // ====================
  // For checking if it user Or Not :

  private destroySubject = new Subject();
  isLoggedIn: boolean = false;
  
  // ====================
  // Dropdown List in Base Category
  BaseCategoryList: BaseCategory[] = [];
  sub!: Subscription;

  // Message Saearch
  Message! : string;


  //numberOfCarts
  numberOfCarts!:number;




  onLogout(): void {
    this.router.navigate(["/home"]);
    this.authService.logout();
  }

  ngOnInit(): void {

    this.lang = localStorage.getItem("lang") || "en";

    
   
    this.isLoggedIn = this.authService.isAuthenticated();
    this.isLoggedIn=this.register.isAuthenticated();
    this.sub = this._BaseCategoryService.GatAllBaseCategories().subscribe({
      next: (Categories) => {
        this.BaseCategoryList = Categories.entities;
      },
    });

    //Badge (numberOfCarts):
    this.BadgeCartService.cartCount$.subscribe(count => {
      this.numberOfCarts = count;
    });
  }

  // Localization!!
  ChangeLang(event: any) {
    const selectedLanguage = event?.target?.value;
    if (selectedLanguage) {
      this.lang = selectedLanguage;
      localStorage.setItem('lang', selectedLanguage);
      this.translationService.setLanguage(selectedLanguage);
      window.location.reload();
      
    }
  }
  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  // ====

  openModal() {
    const modalRef = this.modalService.open(LoginComponent);
  }


  // function to get Message search from header
  filterResults(text: string):void {
    
     this._SearchService.changeMessage(text);

     this.router.navigate(['/search']);
  }
}
