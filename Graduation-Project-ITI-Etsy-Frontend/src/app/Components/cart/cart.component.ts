import { Component, OnInit } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CartService } from "../../Services/Cart/cart.service";
import { Subscription } from "rxjs";
import { GetAllCartDTO, ICartAPI } from "../../Models/cart";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [TranslateModule , FormsModule ],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})
export class CartComponent implements OnInit {
  CustomerId: string = "9b1e9185-7f14-4ad0-83b5-69f4c6beb990";
  sub!: Subscription;
  CartsList: GetAllCartDTO[] = [];
  NumberOfCarts!: number;
  lang: string = "en";


  productId !: number ;
  customerIdFromProduct!: string;
  quantity!: number;


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
      this.customerIdFromProduct = params["customerId"]; 
      this.quantity = params["quantity"]; 
    });

    
    //GetAllCarts
    this.sub = this._CartService.GetAllCarts(this.customerIdFromProduct).subscribe({
      next: (CartsDateAPI: ICartAPI) => {
        this.CartsList = CartsDateAPI.entities;
        this.NumberOfCarts = CartsDateAPI.count;
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

  
}
