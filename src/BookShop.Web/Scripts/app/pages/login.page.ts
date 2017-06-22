import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "login-page",
    template: `
        <category-list></category-list>
        <div class="col-md-8">
        <login></login>
        </div>
    `
})

export class LoginPage {
}