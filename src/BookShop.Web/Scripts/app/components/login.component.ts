import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "login",
    templateUrl: "./../templates/login.component.html"
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