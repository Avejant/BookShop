import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Book } from "../models/book";
import { Query } from "../models/query";

@Injectable()
export class BookService {
    constructor(private http: Http) { }

    private baseUrl = "api/books/";

    getLatest(num?: number) {
        var url = this.baseUrl + "GetLatest/";
        if (num != null) { url += num; }
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getRandom(num?: number) {
        var url = this.baseUrl + "GetRandom/";
        if (num != null) { url += num; }
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getMostViewed(num?: number) {
        var url = this.baseUrl + "GetMostViewed/";
        if (num != null) { url += num; }
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCustom(query: Query) {
        var url = this.baseUrl + "Search?id=" + query.Id + "&title=" + query.Title + "&author=" + query.Author;
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getByAuthor(authorId: string) {
        var url = this.baseUrl + "author/" + authorId;
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    get(id: number) {
        var url = this.baseUrl + id;
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}