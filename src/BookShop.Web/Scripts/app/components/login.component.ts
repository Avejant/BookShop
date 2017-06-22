import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "login",
    template: `
        <div class="login-container">
            <h3 class="form-login-heading">Login</h3>
            <div class="alert alert-danger" *ngIf="loginError">
                <p><strong>Warning:</strong> {{errorMessage}}</p>
            </div>
            <form class="form-login" [formGroup]="loginForm" (submit)="performLogin($event)">
                <input formControlName="username" type="text" class="form-control" placeholder="Your username or e-mail address" required autofocus />
                <input formControlName="password" type="password" class="form-control" placeholder="Your password" required />
                <div class="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me">
                        Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>  
            </form>
        </div>
    `
})

export class LoginComponent {
    title = "Login";
    loginForm = null;
    loginError = false;
    errorMessage = "";

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.loginForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    performLogin(e) {
        e.preventDefault();
        var username = this.loginForm.value.username;
        var password = this.loginForm.value.password;
        this.authService.login(username, password).subscribe((data) => {
            this.loginError = false;
            var auth = this.authService.getAuth();
            this.router.navigate([""]);
        },
            (err) => {
                console.log(err);
                this.loginError = true;
                this.errorMessage = err._body;
            });
    }
}