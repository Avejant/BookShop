﻿import { Component } from "@angular/core";

@Component({
    selector: "page-not-found",
    template: `
        <h2>{{title}}</h2>
        <div>
            Sorry, but something goes wrong...
        </div>
    `
})

export class PageNotFoundComponent {
    title = "Page Not Found";
}