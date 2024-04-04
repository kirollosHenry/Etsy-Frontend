import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CartService } from "../../Services/Cart/cart.service";
import { Subscription } from "rxjs";
import { GetAllCartDTO, ICartAPI } from "../../Models/cart";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Payment } from "../../Models/payment";
import { OrderService } from "../../Services/Order/order.service";
import { Order } from "../../Models/order";
import { PaymentService } from "../../Services/Payment/payment.service";

declare var paypal: any; 
@Component({
  selector: "app-cart",
  standalone: true,
  imports: [TranslateModule , FormsModule ,CommonModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})


export class CartComponent implements OnInit {
  CustomerId: string = "da679192-b569-458e-a077-452761c0e30a";

  OrderObj: Order = {       // Abanoub: Test Order Object since make it dynamic 
    ordersId : 0,
    address: 'Mitghamer Egypt',
    totalPrice: 200,
    orderedAt: '2024-04-04T22:01:53.290Z',
    arrivedOn: '2024-04-07T22:01:53.290Z',
    customerId:'da679192-b569-458e-a077-452761c0e30a'
  };

  PaymentObj: Payment = {
    paymentId : 0,
    totalPrice: 2000,
    response: 'COMPLETED',
    customerId: 'da679192-b569-458e-a077-452761c0e30a',
    orderId:2
  }


  sub!: Subscription;
  CartsList: GetAllCartDTO[] = [];
  NumberOfCarts!: number;
  lang: string = "en";


  productId !: number ;
  quantityUserChoose!: number;
  totalPrice: number = 0;
  ////// PayPal //////
  @ViewChild('paypalButtonContainer', { static: true }) paypalButtonContainer!: ElementRef;

  @ViewChild('paypalModal') paypalModal: any;

  amountPrice:number = 10; 
  // payment: Payment = {
  //   totalPrice: this.amountPrice, 
  //   response: ''
  // };

  constructor(
    private translateService: TranslateService,
    private _CartService: CartService,
    private route: ActivatedRoute,
    private _OrderService: OrderService,
    private _PaymentService: PaymentService
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
          return actions.order.create({
            purchase_units:[
              {
                amount:{
                  value:this.amountPrice.toString(),
                  currency_code:'USD',
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: this.amountPrice.toString()
                    }
                  }
                }
              }
            ]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if(details.status === "COMPLETED")
            {
              console.log('Payment details:', details);

              //Create Order Services
              this.sub = this._OrderService.CreateOrder(this.OrderObj).subscribe({
                next: (response:any)=>{
                  console.log("Create Order: ",response);
                  this.PaymentObj.orderId = response.ordersId;
                  //Create Payment Services
                }
              })
              debugger;
                  //Create Payment Services
              this.sub = this._PaymentService.CreatePayment(this.PaymentObj).subscribe({
                next: (response)=>{
                  console.log("Create Payment: ",response);
              }
            })
              

              //Delete Cart By CustomerId
              this.sub = this._CartService.DeleteCart(this.CustomerId).subscribe();


              // Go to Confirm Modal
              //this.paypalModal.show();;
              
            }
            
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

//PayPal Confirm Modal Show
openPayPalModal() {
  this.paypalModal.show();
} 



//////////////////////////////////////////////////////// Nada //////////////////////////////////////////////

}
