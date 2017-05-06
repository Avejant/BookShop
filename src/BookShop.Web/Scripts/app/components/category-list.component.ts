import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";

@Component({
    selector: "category-list",
    template: `
        <h2>{{title}}</h2>
        <ul class="categories">
            <li *ngFor="let category of categories">
                {{category.Name}}
            </li>
        </ul>
`
})

export class CategoryListComponent {
    title: string;
    categories: Category[];
    errorMessage: string;

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.title = "Categories";
        this.categoryService.get().subscribe(
            categories => { this.categories = categories; },
            error => this.errorMessage = <any>error
        );
       
    }
}