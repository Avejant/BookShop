import { Component, Input, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";
import { Router } from "@angular/router";

@Component({
    selector: "category-list",
    templateUrl: "./../templates/category-list.component.html"
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
        console.log("Category with id= " + this.selectedCategory.Id + " has been clicked: loading category viewer...");
        this.router.navigate(["books/category", this.selectedCategory.Id], {  });
    }
}