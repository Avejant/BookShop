import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Category } from "../models/category";

@Injectable()
export class CategoryService {
    constructor(private http: Http) { }

    private baseUrl = "api/categories/";

    get(id?: number) {
        var url = this.baseUrl;
        if (id != null) { url += id; }

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
