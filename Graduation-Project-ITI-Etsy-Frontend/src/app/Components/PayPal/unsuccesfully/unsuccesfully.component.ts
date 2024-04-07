import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-unsuccesfully',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './unsuccesfully.component.html',
  styleUrl: './unsuccesfully.component.css'
})
export class UnsuccesfullyComponent implements OnInit {

  lang: string = "en";

  @ViewChild("paypalModal") loginFormContent!: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private translateService: TranslateService,

  ){}
  
  ngOnInit(): void {

       // Localization
       this.lang = localStorage.getItem("lang") || "en";
       this.translateService.use(this.lang);
   
  }
  
  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  
}
