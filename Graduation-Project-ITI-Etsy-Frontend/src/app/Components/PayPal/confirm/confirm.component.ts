import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-confirm",
  standalone: true,
  imports: [TranslateModule],
  templateUrl: "./confirm.component.html",
  styleUrl: "./confirm.component.css",
})
export class ConfirmComponent implements OnInit {
  lang: string = "en";

  @ViewChild("paypalModalConfirm") loginFormContent!: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private translateService: TranslateService,
    private router : Router
  ) {}
  ngOnInit(): void {
    // Localization
    this.lang = localStorage.getItem("lang") || "en";
    this.translateService.use(this.lang);

    this.loginFormContent.nativeElement;
  }

  closeModal() {
    this.activeModal.dismiss("Cross click");
    this.router.navigate(['/home']); 
  }
}
