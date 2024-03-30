import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { ProductsService } from '../../../Services/Products/products.service';
import { Products } from '../../../Models/products';
import { Subscription } from 'rxjs';
import { StarComponent } from "../../SharedComponents/star/star.component";

@Component({
    selector: 'app-product-details',
    standalone: true,
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
    imports: [RouterModule, GalleriaModule, StarComponent]
})

export class ProductDetailsComponent implements OnInit {

  ProductId!:number;
  ProductDetails! : Products;
  sub!:Subscription;

  // carousel
  images: any[] = []; 


  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 12,
    },
    {
      breakpoint: '768px',
      numVisible: 5,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
    },
  ];

  constructor(private _ProductsService:ProductsService,private route: ActivatedRoute) {
    this.images.push({
      itemImageSrc: 'assets/image/2.jpg',
      thumbnailImageSrc: 'assets/image/2.jpg',
    });
    this.images.push({
      itemImageSrc: 'assets/image/1.jpg',
      thumbnailImageSrc: 'assets/image/1.jpg',
    });
    this.images.push({
      itemImageSrc: 'assets/image/3.jpg',
      thumbnailImageSrc: 'assets/image/3.jpg',
    });
    this.images.push({
      itemImageSrc: 'assets/image/4.jpg',
      thumbnailImageSrc: 'assets/image/4.jpg',
    });
    this.images.push({
      itemImageSrc: 'assets/image/4.jpg',
      thumbnailImageSrc: 'assets/image/4.jpg',
    });
    this.images.push({
      itemImageSrc: 'assets/image/4.jpg',
      thumbnailImageSrc: 'assets/image/4.jpg',
    });
    this.images.push({
      itemImageSrc: 'assets/image/4.jpg',
      thumbnailImageSrc: 'assets/image/4.jpg',
    });
   

  }

  activeItem: any; 

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ProductId = params['ProductId'];
    this.sub = this._ProductsService.GetOneProductByID(this.ProductId).subscribe({
      next : (Product)=>{
        this.ProductDetails = Product.entity;
      }
    })
  });
    //this.activeItem = this.images[0];
  }

  setActiveItem(item: any): void {
    this.activeItem = item;
  }


//droplist in down

  toggleDropdown() {
    const dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent) {
      dropdownContent.classList.toggle("show");
    }
  }
  
  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent) {
    const dropdownContent = document.getElementById("dropdownContent");
    const target = event.target as HTMLElement;
    if (dropdownContent && !target.matches('.dropdown-toggle') && !dropdownContent.contains(target)) {
      dropdownContent.classList.remove("show");
    }
  }
  
  
}
