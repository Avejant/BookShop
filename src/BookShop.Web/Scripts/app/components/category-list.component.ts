import { Component, Input, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";
import { Router } from "@angular/router";

@Component({
    selector: "category-list",
    template: `
        <div class="col-md-3">
        <div class="panel panel-default">
            <div class="panel-heading category-list-header"><span><strong>{{title}}</strong></span></div>
            <ul class="list-group">
                <li class="list-group-item" *ngFor="let category of categories" (click)="onSelect(category)">
                    <div class="category-item">
                    <span>{{category.Name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        </div>
`
})

export class CategoryListComponent {
    @Input() class: string;
    title: string;
    categories: Category[];
    errorMessage: string;
    selectedCategory: Category;

    constructor(private categoryService: CategoryService, private router: Router) { }

    ngOnInit() {
        this.title = "Categories";
        this.categoryService.get().subscribe(
            categories => { this.categories = categories; },
            error => this.errorMessage = <any>error
        );
       
    }

    onSelect(category: Category) {
        this.selectedCategory = category;
        console.log("Item " + this.selectedCategory.Id + " has been clicked: loading item viewer...");
        this.router.navigate(["books/category", this.selectedCategory.Id]);
    }
}