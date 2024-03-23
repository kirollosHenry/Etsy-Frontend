import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css'
})
export class StarComponent {
  cropWidth:number =75;
  @Input() rating:number =0;
  ngOnChanges(changes: SimpleChanges): void {
    this.cropWidth = this.rating * 75 / 5;
  }
}
