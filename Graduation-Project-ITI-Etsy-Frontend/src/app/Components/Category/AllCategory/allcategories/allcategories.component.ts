import { Component, OnInit } from "@angular/core";
import { Category } from "../../../../Models/category";
import { CategoryService } from "../../../../Services/Category/category.service";
import { Subscription } from "rxjs";
import { ProductListComponent } from "../../../Products/product-list/product-list.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-allcategories",
  standalone: true,
  imports: [ProductListComponent, RouterModule, TranslateModule],
  templateUrl: "./allcategories.component.html",
  styleUrl: "./allcategories.component.css",
})
export class AllcategoriesComponent implements OnInit {
  TitleCategory!: string;
  BaseCategoryId: number = 0;
  CategoryList: Category[] = [];
  showRemainCategories: boolean = false;
  lang: string = "en";

  constructor(
    private _CategoryService: CategoryService,
    private route: ActivatedRoute,
    private translateService: TranslateService ,
    private router: Router,

  ) {}
  sub!: Subscription;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Localization
      this.lang = localStorage.getItem("lang") || "en";
      this.translateService.use(this.lang);

      this.BaseCategoryId = params["categoryId"];

      this.sub = this._CategoryService
        .GetAllCategoriesByBaseCategoryId(this.BaseCategoryId)
        .subscribe({
          next: (Categories) => {
            this.CategoryList = Categories.entities;
            this.TitleCondition(this.BaseCategoryId);
          },
        });
    });
  }

  showMore() {
    this.showRemainCategories = !this.showRemainCategories;
  }

  TitleCondition(BaseId: number): void {
    if (BaseId == 1) {
      this.TitleCategory = "Accessories";
    } else if (BaseId == 2) {
      this.TitleCategory = "Art & Collectibles";
    } else if (BaseId == 3) {
      this.TitleCategory = "Baby";
    }
  }


}
