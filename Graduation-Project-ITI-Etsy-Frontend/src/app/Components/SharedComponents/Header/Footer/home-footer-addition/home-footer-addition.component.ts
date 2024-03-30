import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-home-footer-addition',
  standalone: true,
  imports: [RouterModule,TranslateModule],
  templateUrl: './home-footer-addition.component.html',
  styleUrl: './home-footer-addition.component.css'
})
export class HomeFooterAdditionComponent implements AfterViewInit {

  contentOfToltip : string = `Your purchases on Etsy in 2020 generated nearly $4 billion in income for small businesses.
  We advocate for policy—at the global and local level—that benefits creative entrepreneurs and helps small businesses grow and thrive.
  We are deepening our commitment to a sustainable future and are working towards a new goal to reach net zero emissions by 2030.
  `


  ngAfterViewInit(): void {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new Tooltip(tooltipTriggerEl); 
    });
  }
}
