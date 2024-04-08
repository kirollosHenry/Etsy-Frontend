import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CartService } from "../../Services/Cart/cart.service";
import { Subscription, interval } from "rxjs";
import { GetAllCartDTO, ICartAPI } from "../../Models/cart";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Payment } from "../../Models/payment";
import { OrderService } from "../../Services/Order/order.service";
import { Order } from "../../Models/order";
import { PaymentService } from "../../Services/Payment/payment.service";
import { DatePipe } from '@angular/common';
import { error } from "jquery";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmComponent } from "../PayPal/confirm/confirm.component";
import { UnsuccesfullyComponent } from "../PayPal/unsuccesfully/unsuccesfully.component";

declare var paypal: any;
@Component({
  selector: "app-cart",
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, DatePipe],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})


export class CartComponent implements OnInit , AfterViewInit {

  @ViewChild('paypalButtonContainer', { static: false }) paypalButtonContainer!: ElementRef;

  constructor(
    private translateService: TranslateService,
    private _CartService: CartService,
    private route: ActivatedRoute,
    private _OrderService: OrderService,
    private _PaymentService: PaymentService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.deliverTime = new Date(this.currentTime);
    this.deliverTime.setDate(this.currentTime.getDate() + 5);
  }
  

  CustomerId: string = "da679192-b569-458e-a077-452761c0e30a";

  sub!: Subscription;

  //Deliever Time : 
  currentTime: Date = new Date();
  deliverTime!: Date;

  currentTimeForOrder: string = this.currentTime ? this.datePipe.transform(this.currentTime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")! : '';
  DeliveredTimeForOrder: string = this.currentTime ? this.datePipe.transform(this.currentTime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")! : ''; // DeliveredTimeForOrder return undefined

  deliverTimeForShowing: string = '';


  //Add Order 
  OrderObj!: Order 

  PaymentObj!: Payment ;


  CartsList: GetAllCartDTO[] = [];
  NumberOfCarts!: number;
  lang: string = "en";


  productId !: number;
  quantityUserChoose!: number;
  totalPrice: number = 0;


  // ngAfterViewInit(): void {
  //   if (this.paypalButtonContainer) {
  //     this.renderPayPalButton();
  //   } else {
  //     console.error('paypalButtonContainer is not initialized.');
  //   }
  // }

  ngOnInit(): void {
    // Localization
    this.lang = localStorage.getItem("lang") || "en";
    
    this.translateService.use(this.lang);

    // Get parameters From Product Details 
    this.route.queryParams.subscribe((params) => {
      this.productId = params["productId"];
      this.quantityUserChoose = params["quantity"];
    });

    //Time Of Place Order And When It will Arrive
    // Periodically update currentTime every day


    interval(24 * 60 * 60 * 1000).subscribe(() => {
      this.currentTime = new Date();
      this.updateDeliverTimeForShowing();
    });

    this.updateDeliverTimeForShowing();


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
    // paypal.Buttons(
    //   {
    //     style: {
    //       display: 'inline-block',
    //       layout: 'horizontal',
    //       color: 'blue',
    //       shape: 'rect',
    //       label: 'paypal',
    //     },

    //     createOrder: (data: any, actions: any) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               value: this.totalPrice.toString(),
    //               currency_code: 'USD',
    //               breakdown: {
    //                 item_total: {
    //                   currency_code: "USD",
    //                   value: this.totalPrice.toString()
    //                 }
    //               }
    //             }
    //           }
    //         ]
    //       });
    //     },
    //     onApprove: (data: any, actions: any) => {

    //       // For Test Unsuccessful modal !! 
    //       // return Promise.reject('Simulated error');

    //       return actions.order.capture().then((details: any) => {
    //         if (details.status === "COMPLETED") {
    //           console.log('Payment details:', details);

    //           //debugger;
    //           //Create Order Services
    //           this.sub = this._OrderService.CreateOrder(this.OrderObj).subscribe({
    //             next: (response: any) => {
    //               console.log("Create Order: ", response);
    //               this.PaymentObj.orderId = response.ordersId;
    //               //Create Payment Services
    //               debugger;
    //               //Create Payment Services
    //               this.sub = this._PaymentService.CreatePayment(this.PaymentObj).subscribe({
    //                 next: (response) => {
    //                   console.log("Create Payment: ", response);
    //                 }
    //               })
    //             },
    //             error: (error)=>{
    //               console.log("Error in Create Order ",error);
                  
    //             }
    //           })

    //           //Delete Cart By CustomerId
    //           this.sub = this._CartService.DeleteCart(this.CustomerId).subscribe();
              
    //           // When Success , Modal open ^^
    //           this.openModal();
            
    //         }
    //       });
    //     },
    //     onError: (err: any) => {
          
    //       console.log('Error creating PayPal order:', err);
    //       this.openUnsuccessModal();
    //     }
    //   }
    // ).render(this.paypalButtonContainer.nativeElement);
  
  

  }
  ngAfterViewInit(): void {
   paypal.Buttons(
      {
        style: {
          display: 'inline-block',
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },

        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalPrice.toString(),
                  currency_code: 'USD',
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: this.totalPrice.toString()
                    }
                  }
                }
              }
            ]
          });
        },
        onApprove: (data: any, actions: any) => {

          // For Test Unsuccessful modal !! 
          // return Promise.reject('Simulated error');

          return actions.order.capture().then((details: any) => {
            if (details.status === "COMPLETED") {
              console.log('Payment details:', details);

              //Create Order Services
              this.OrderObj = {       // Abanoub: Test Order Object since make it dynamic 
                ordersId: 0,
                address: 'Cairo Egypt',
                totalPrice: this.totalPrice,
                orderedAt: this.currentTime,  //Not Updated Yet
                arrivedOn:this.deliverTime,
                customerId: 'da679192-b569-458e-a077-452761c0e30a'
              };
              this.sub = this._OrderService.CreateOrder(this.OrderObj).subscribe({
                next: (response: any) => {
                  console.log("Create Order: ", response);
                  //this.PaymentObj.orderId = response.ordersId;
                  //Create Payment Services
                  this.PaymentObj = {    // Abanoub: Test Payment Object since make it dynamic 
                    paymentID: 0,
                    totalPrice: response.totalPrice,
                    response: 'COMPLETED',
                    customerId: 'da679192-b569-458e-a077-452761c0e30a',
                    orderId: response.ordersId
                  }
                  //Create Payment Services
                  this.sub = this._PaymentService.CreatePayment(this.PaymentObj).subscribe({
                    next: (response) => {
                      console.log("Create Payment: ", response);
                    },
                    error: (rsponce)=>{
                      console.log("Error in Payment: ",rsponce);
                    }
                  })
                },
                error: (error)=>{
                  console.log("Error in Create Order ",error);
                  
                }
              })

              //Delete Cart By CustomerId
              this.sub = this._CartService.DeleteCart(this.CustomerId).subscribe();
              
              // When Success , Modal open ^^
              this.openModal();
            
            }
          });
        },
        onError: (err: any) => {
          
          console.log('Error creating PayPal order:', err);
          this.openUnsuccessModal();
        }
      }
    ).render(this.paypalButtonContainer.nativeElement);
  }

  // renderPayPalButton(): void {
  //   paypal.Buttons(
  //     {
  //       style: {
  //         display: 'inline-block',
  //         layout: 'horizontal',
  //         color: 'blue',
  //         shape: 'rect',
  //         label: 'paypal',
  //       },

  //       createOrder: (data: any, actions: any) => {
  //         return actions.order.create({
  //           purchase_units: [
  //             {
  //               amount: {
  //                 value: this.totalPrice.toString(),
  //                 currency_code: 'USD',
  //                 breakdown: {
  //                   item_total: {
  //                     currency_code: "USD",
  //                     value: this.totalPrice.toString()
  //                   }
  //                 }
  //               }
  //             }
  //           ]
  //         });
  //       },
  //       onApprove: (data: any, actions: any) => {
  //         return actions.order.capture().then((details: any) => {
  //           if (details.status === "COMPLETED") {
  //             console.log('Payment details:', details);

  //             //debugger;
  //             //Create Order Services
  //             this.sub = this._OrderService.CreateOrder(this.OrderObj).subscribe({
  //               next: (response: any) => {
  //                 console.log("Create Order: ", response);
  //                 this.PaymentObj.orderId = response.ordersId;
  //                 //Create Payment Services
  //                 debugger;
  //                 //Create Payment Services
  //                 this.sub = this._PaymentService.CreatePayment(this.PaymentObj).subscribe({
  //                   next: (response) => {
  //                     console.log("Create Payment: ", response);
  //                   }
  //                 })
  //               },
  //               error: (error)=>{
  //                 console.log("Error in Create Order ",error);
                  
  //               }
  //             })

  //             //Delete Cart By CustomerId
  //             this.sub = this._CartService.DeleteCart(this.CustomerId).subscribe();
              
  //             //debugger;
  //             //this.modalService.open(ConfirmComponent);
  //             this.router.navigate(['/Confirm']);

  //           }
  //         });
  //       },
  //       onError: (err: any) => {
  //         console.log('Error creating PayPal order:', err);
  //       }
  //     }
  //   ).render(this.paypalButtonContainer.nativeElement);
  
  // }


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



  // Delete Cart (Button Delete) ---- Note Not Working as expect , need service deletebyid !!!
  deleteCart(CartId : number): void {
    this.sub = this._CartService.DeleteCartById(CartId).subscribe(() => {
    });
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

  // Function to update deliverTime
  updateDeliverTimeForShowing(): void {
    this.deliverTime = new Date(this.currentTime);
    this.deliverTime.setDate(this.currentTime.getDate() + 5);
    this.deliverTimeForShowing = this.deliverTime ? this.datePipe.transform(this.deliverTime, 'MMM dd yyyy')! : '';
    this.DeliveredTimeForOrder = this.deliverTime ? this.datePipe.transform(this.deliverTime, 'yyyy-MM-ddTHH:mm:ss.SSSZ')! : '';
    console.log('Updated deliverTimeForShowing:', this.deliverTimeForShowing);

  }

  openModal() {
    const modalRef = this.modalService.open(ConfirmComponent);
  }

  openUnsuccessModal() {
    const modalRef = this.modalService.open(UnsuccesfullyComponent);
  }

}
