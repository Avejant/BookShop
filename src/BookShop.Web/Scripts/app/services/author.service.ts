import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Author } from "../models/author";

@Injectable()
export class AuthorService {
    constructor(private http: Http) { }

    private baseUrl = "api/authors/";

    get(id: string) {
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
