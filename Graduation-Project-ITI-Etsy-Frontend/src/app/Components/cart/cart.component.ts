import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CartService } from '../../Services/Cart/cart.service';
import { Subscription } from 'rxjs';
import { GetAllCartDTO, ICartAPI } from '../../Models/cart';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  CustomerId:string = "9b1e9185-7f14-4ad0-83b5-69f4c6beb990";
  sub! : Subscription;
  CartsList:GetAllCartDTO[] = [];
  NumberOfCarts!: number;
  lang: string = "en";

  constructor(
    private translateService: TranslateService,
    private _CartService : CartService
  ) {}

  ngOnInit(): void {
      // Localization
      this.lang = localStorage.getItem("lang") || "en";
      this.translateService.use(this.lang);

      //GetAllCarts
      this.sub = this._CartService.GetAllCarts(this.CustomerId).subscribe({
        next: (CartsDateAPI: ICartAPI) => {
          debugger;
          this.CartsList = CartsDateAPI.entities;
          this.NumberOfCarts = CartsDateAPI.count;
        },
        error: (response) => {
          console.log(response);
        },
      })
    }
}
