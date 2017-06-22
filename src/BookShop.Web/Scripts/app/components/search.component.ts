import { Component } from "@angular/core";

@Component({
    selector: "search",
    template: `        
      <form class="navbar-search navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search book...">
        </div>
        <button type="submit" class="btn btn-default"><i class="glyphicon glyphicon-search"></i></button>
      </form>
    `
})

export class SearchComponent { }