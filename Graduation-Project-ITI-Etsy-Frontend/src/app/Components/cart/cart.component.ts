import { Component, OnInit } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CartService } from "../../Services/Cart/cart.service";
import { Subscription } from "rxjs";
import { GetAllCartDTO, ICartAPI } from "../../Models/cart";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [TranslateModule , FormsModule ,CommonModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})


export class CartComponent implements OnInit {
  CustomerId: string = "c8cc4212-b621-4a65-a363-c9cc677e5bac";
  sub!: Subscription;
  CartsList: GetAllCartDTO[] = [];
  NumberOfCarts!: number;
  lang: string = "en";


  productId !: number ;
  quantityUserChoose!: number;
  totalPrice: number = 0;


  constructor(
    private translateService: TranslateService,
    private _CartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Localization
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);

    
    // Get parameters From Product Details 
    this.route.queryParams.subscribe((params) => {
      this.productId = params["productId"]; 
      this.quantityUserChoose = params["quantity"]; 
    });

    
    //GetAllCarts
    this.sub = this._CartService.GetAllCarts(this.CustomerId).subscribe({
      next: (CartsDateAPI: ICartAPI) => {
        // this.CartsList = CartsDateAPI.entities;
        this.CartsList = CartsDateAPI.entities.map(cart => ({
          ...cart,
          quantity: cart.quantity 
        }));

        this.NumberOfCarts = CartsDateAPI.count;
        this.calculateTotalPrice();

      },
      error: (response) => {
        console.log(response);
      },
    });


  }


  //Select List 
  getNumbersArray(max: number): number[] {
    return Array.from({ length: max }, (_, index) => index + 1);
  }

  //total price
  calculateTotalPrice(): void {
    this.totalPrice = this.CartsList.reduce((total, cartItem) => {
      return total + (cartItem.productPrice * cartItem.quantity);
    }, 0);
  }

  onQuantityChange(): void {
    this.calculateTotalPrice();
  }
  
}
