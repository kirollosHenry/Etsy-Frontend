import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home-footer-addition-not-log-in',
  standalone: true,
  imports: [RouterModule, TranslateModule,CommonModule ],
  templateUrl: './home-footer-addition-not-log-in.component.html',
  styleUrl: './home-footer-addition-not-log-in.component.css'
})
export class HomeFooterAdditionNotLogInComponent implements  OnInit{
  lang: string = "en";

  constructor(private translateService: TranslateService){}

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);
    } 

}
