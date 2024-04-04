import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { GalleriaModule } from "primeng/galleria";
import { ProductsService } from "../../../Services/Products/products.service";
import { Products } from "../../../Models/products";
import { Subscription } from "rxjs";
import { StarComponent } from "../../SharedComponents/star/star.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AddCartDTO, ICartAPI } from "../../../Models/cart";
import { CartService } from "../../../Services/Cart/cart.service";
import { FormsModule } from "@angular/forms";
import { CartComponent } from "../../cart/cart.component";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-product-details",
  standalone: true,
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.css",
  imports: [
    RouterModule,
    GalleriaModule,
    StarComponent,
    TranslateModule,
    FormsModule,
    CartComponent,
  ],
})
export class ProductDetailsComponent implements OnInit {
  ProductId!: number;
  ProductDetails!: Products;
  sub!: Subscription;
  lang: string = "en";
  Stock!: number;

  //Adding Cart
 
  selectedQuantity: number = 1;

  // carousel
  images: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: "1024px",
      numVisible: 12,
    },
    {
      breakpoint: "768px",
      numVisible: 5,
    },
    {
      breakpoint: "560px",
      numVisible: 2,
    },
  ];

  constructor(
    private _ProductsService: ProductsService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private _cartService: CartService,
    private router: Router
  ) {
    this.images.push({
      itemImageSrc: "assets/image/2.jpg",
      thumbnailImageSrc: "assets/image/2.jpg",
    });
    this.images.push({
      itemImageSrc: "assets/image/1.jpg",
      thumbnailImageSrc: "assets/image/1.jpg",
    });
    this.images.push({
      itemImageSrc: "assets/image/3.jpg",
      thumbnailImageSrc: "assets/image/3.jpg",
    });
    this.images.push({
      itemImageSrc: "assets/image/4.jpg",
      thumbnailImageSrc: "assets/image/4.jpg",
    });
    this.images.push({
      itemImageSrc: "assets/image/4.jpg",
      thumbnailImageSrc: "assets/image/4.jpg",
    });
    this.images.push({
      itemImageSrc: "assets/image/4.jpg",
      thumbnailImageSrc: "assets/image/4.jpg",
    });
    this.images.push({
      itemImageSrc: "assets/image/4.jpg",
      thumbnailImageSrc: "assets/image/4.jpg",
    });
  }

  activeItem: any;

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);

    this.route.params.subscribe((params) => {
      this.ProductId = params["ProductId"];

      this.sub = this._ProductsService
        .GetOneProductByID(this.ProductId)
        .subscribe({
          next: (Product) => {
            this.ProductDetails = Product.entity;
            this.Stock = Product.entity.productStock;
            this.list = this.getNumbersArray(this.Stock);
          },
        });

    });

  }

  setActiveItem(item: any): void {
    this.activeItem = item;
  }

  //droplist in down

  toggleDropdown() {
    const dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent) {
      dropdownContent.classList.toggle("show");
    }
  }

  @HostListener("window:click", ["$event"])
  onClick(event: MouseEvent) {
    const dropdownContent = document.getElementById("dropdownContent");
    const target = event.target as HTMLElement;
    if (
      dropdownContent &&
      !target.matches(".dropdown-toggle") &&
      !dropdownContent.contains(target)
    ) {
      dropdownContent.classList.remove("show");
    }
  }

  //Cart

  // Function to make array of 1 to number i put
  getNumbersArray(max: number): number[] {
    return Array.from({ length: max }, (_, index) => index + 1);
  }

  list: number[] = this.getNumbersArray(this.Stock);

  //TO Add Cart and Navigate to Cart Component
  NavigateToCart(productId: number) {
    const cartItem: AddCartDTO = {
      CartID: 0,
      ProductId: productId,
      CustomerId: "da679192-b569-458e-a077-452761c0e30a",
      Quantity: this.selectedQuantity,
    };


    this._cartService.AddToCart(cartItem).subscribe({
      next: () => {
        this.router.navigate(["/Cart"], {
          queryParams: {
            productId: cartItem.ProductId,
            quantity: cartItem.Quantity,
          },
        });
      },
      error: (error) => {
        console.log("Error occurred:", error);
      },
    });
  }
}
