import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit {
  
  @ViewChild("paypalModalConfirm") loginFormContent!: ElementRef;

  ngOnInit(): void {
    this.loginFormContent.nativeElement;
  }

}
