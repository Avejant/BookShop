import { Component } from "@angular/core";

@Component({
    selector: "not-found-page",
    template: `
        <h2>{{title}}</h2>
        <div>
            Sorry, but something goes wrong...
        </div>
    `
})

export class NotFoundPage {
    title = "Page Not Found";
}