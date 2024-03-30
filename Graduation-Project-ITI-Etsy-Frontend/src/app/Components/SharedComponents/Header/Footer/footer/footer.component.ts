import { AfterViewChecked, AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import Tooltip from 'bootstrap/js/dist/tooltip'; 
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit { 

  contentOfTooltip : string = "Etsy’s 100% renewable electricity commitment includes the electricity used by the data centers that host Etsy.com, the Sell on Etsy app, and the Etsy app, as well as the electricity that powers Etsy’s global offices and employees working remotely from home in the US." ;
  


  ngAfterViewInit(): void {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new Tooltip(tooltipTriggerEl); 
    });
  }
  

 
  

}
