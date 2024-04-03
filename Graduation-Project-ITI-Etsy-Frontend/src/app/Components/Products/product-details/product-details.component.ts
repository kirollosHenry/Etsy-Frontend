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
  CartSub!: Subscription;
  CartDetails!: AddCartDTO;
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

      //AddCart
      //    const cartItem: AddCartDTO = {
      //     productId: this.ProductId,
      //     customerId: "test",
      //     quantity: this.selectedQuantity,
      //   };

      // this.CartSub = this._cartService.AddToCart(cartItem).subscribe({
      //   next: (CartsDateAPI: AddCartDTO) => {
      //     this.CartDetails = CartsDateAPI;
      //     console.log('Item added to cart:', CartsDateAPI);
      //     this.router.navigate(['/cart'], { queryParams: { cartItem: JSON.stringify(CartComponent) } });

      //   },
      //   error: (response) => {
      //     console.log(response);
      //   },
      // });
    });

    //this.activeItem = this.images[0];
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
  getNumbersArray(max: number): number[] {
    return Array.from({ length: max }, (_, index) => index + 1);
  }

  list: number[] = this.getNumbersArray(this.Stock);

  NavigateToCart(productId: number) {
    const customerId = "8233ab40-de84-4eb6-b478-a7f47c5e73c5";

    const queryParams = {
      productId: productId,
      customerId: customerId,
      quantity: this.selectedQuantity,
    };
  
    this.router.navigate(['/Cart'], { queryParams: queryParams });
  }
  
  
}
