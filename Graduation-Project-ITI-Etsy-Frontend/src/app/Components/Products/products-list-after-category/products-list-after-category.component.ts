import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-products-list-after-category',
  standalone: true,
  imports: [RouterModule , ProductListComponent],
  templateUrl: './products-list-after-category.component.html',
  styleUrl: './products-list-after-category.component.css'
})
export class ProductsListAfterCategoryComponent {

}
