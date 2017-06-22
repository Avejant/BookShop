import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "bookshop",
    template: `
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="">{{title}}</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
 <ul class="nav navbar-nav">
                <li [class.active]="isActive([''])">
                    <a class="home" [routerLink]="['']">Home</a>
                </li>
                <li [class.active]="isActive(['search'])">
                    <a class="search" [routerLink]="['search']">Extended Search</a>
                </li>
                <li [class.active]="isActive(['authors'])">
                    <a class="authors" [routerLink]="['authors']">Authors</a>
                </li>
                <li [class.active]="isActive(['about'])">
                    <a class="about" [routerLink]="['about']">About</a>
                </li>
            </ul>
            <search></search>
            <ul class="nav navbar-nav navbar-right">
                <li class="navbar-text"><cart></cart></li>
                <li *ngIf="!authService.isLoggedIn()" [class.active]="isActive(['login'])">
                    <a class="login" [routerLink]="['login']">Login</a>
                </li>
                <li *ngIf="authService.isLoggedIn()">
                    <a class="logout" href="javascript:void(0)" (click)="logout()">Logout</a>
                </li>
            </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<div class="container">
        <router-outlet></router-outlet>
</div>
    `
})

export class AppComponent {
    title = "Book Shop";

    constructor(public router: Router, public authService: AuthService) { }

    isActive(data: any[]): boolean {
        return this.router.isActive(
            this.router.createUrlTree(data),
            true);
    }

    logout(): boolean {
        // logs out the user, then redirects him to Welcome View.
        if (this.authService.logout()) {
            this.router.navigate([""]);
        }
        return false;
    }
}