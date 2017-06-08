import { Component } from "@angular/core";

@Component({
    selector: "home",
    template: `        
       <category-list></category-list>
       <div class="col-md-8">
       <div class="panel panel-default">
        <div class="panel-body">
            There will be book lists soon... Sooooooon<br>
            So look at this cute kitten instead.
            <img src="http://cs6.pikabu.ru/post_img/2014/08/04/7/1407143850_156873582.jpg">
        </div>
       </div>
        </div>
    `
})

export class HomeComponent { }