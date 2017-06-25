import { Component } from "@angular/core";

@Component({
    selector: "paginated-book-list",
    template: `        
            There should be list of books of current category...
            But I've lost it!
            So, look at Poirot!
            <img src="http://cdn.images.express.co.uk/img/dynamic/20/590x/poirot1-438388.jpg">
    `
})

export class PaginatedBookListComponent {

    ngOnInit() {
        console.log("Paginated book list was updated");
    }
}