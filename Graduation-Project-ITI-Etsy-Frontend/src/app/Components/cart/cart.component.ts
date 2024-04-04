import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CartService } from "../../Services/Cart/cart.service";
import { Subscription } from "rxjs";
import { GetAllCartDTO, ICartAPI } from "../../Models/cart";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Payment } from "../../Models/payment";
declare var paypal: any; 
@Component({
  selector: "app-cart",
  standalone: true,
  imports: [TranslateModule , FormsModule ,CommonModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})


export class CartComponent implements OnInit {
  CustomerId: string = "83a1a42e-3e33-482d-843e-5c027bf951ad";
  sub!: Subscription;
  CartsList: GetAllCartDTO[] = [];
  NumberOfCarts!: number;
  lang: string = "en";


  productId !: number ;
  quantityUserChoose!: number;
  totalPrice: number = 0;
  ////// PayPal //////
  @ViewChild('paypalButtonContainer', { static: true }) paypalButtonContainer!: ElementRef;
  amountPrice:number = 10; 
  payment: Payment = {
    totalPrice: this.amountPrice, 
    response: ''
  };

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

    // PayPal //
    paypal.Buttons(
      { style: {
        display: 'inline-block',
        layout:'horizontal',
        color:'blue',
        shape:'rect',
        label:'paypal',
      },
      
        createOrder: (data: any, actions: any) => {
          // console.log("Create Order *********************");
          return actions.order.create({
            purchase_units:[
              {
                amount:{
                  value:this.amountPrice.toString(),
                  currency_code:'USD',
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: "10.00"
                    }
                  }
                }
              }
            ]
          });
        },
        onApprove: (data: any, actions: any) => {
          // console.log("onApprove *********************");
          return actions.order.capture().then((details: any) => {
            // console.log('Payment details:', details);
            // this.router.navigate(['/success']);
          });
        },
        onError: (err: any) => {         
          console.log('Error creating PayPal order:', err);
        }
      }
    ).render(this.paypalButtonContainer.nativeElement);
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
