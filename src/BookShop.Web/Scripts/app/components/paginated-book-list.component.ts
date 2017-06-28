import { Component } from "@angular/core";
import { Book } from "./../models/book";
import { PageInfo } from "./../models/page-info";
import { BookService } from "./../services/book.service";

@Component({
    selector: "paginated-book-list",
    templateUrl: "./../templates/paginated-book-list.component.html"
})

export class PaginatedBookListComponent {
    page: PageInfo;
    books: Book[];
    pageNumbers: number[];
    errorMessage: string;
    pageSize: number;
    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.pageSize = 10;
        this.updateBookList(this.pageSize, 1);
    }

    goToPage(pageNumber: number) {
        this.updateBookList(this.pageSize, pageNumber);
    }

    previousPage() {
        var previousPage = this.page.currentPage - 1;
        if (previousPage>0) {
            this.updateBookList(this.pageSize, previousPage);
        }
    }

    nextPage() {
        var nextPage = this.page.currentPage + 1;
        if (nextPage <= this.page.totalPageCount) {
            this.updateBookList(this.pageSize, nextPage);
        }
    }

    updateBookList(pageSize: number, currentPage: number) {
        var s = null;
        s = this.bookService.getPage(pageSize, currentPage);
        s.subscribe(
            response => { this.page = response; this.books = response.items; this.pageNumbers = this.generatePagination(this.page.currentPage, this.page.totalPageCount); },
            error => this.errorMessage = <any>error
        );
    }

    generatePagination(currentPage: number, totalCount: number) {
        var paginationLength = totalCount < 5 ? totalCount : 5;
        var startIndex = 1;
        if (paginationLength == 5)
        {
            if (currentPage - 2 < 1) {
                startIndex = 1;
            }
            else if (totalCount - currentPage < 4) {
                startIndex = totalCount - 4;
            }
            else {
                startIndex = currentPage - 2;
            }
        }

        var endIndex = startIndex + paginationLength;
        var resultArray = new Array();
        for (var i = startIndex; i < endIndex; i++) {
            resultArray.push(i);
        }
        return resultArray;
    }
}