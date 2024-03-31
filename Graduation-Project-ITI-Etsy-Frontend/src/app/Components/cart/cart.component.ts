import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  lang: string = "en";

  constructor(
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
      // Localization
      this.lang = localStorage.getItem("lang") || "en";
      this.translateService.use(this.lang);
    
    }
}
