import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';
import { LoginComponent } from '@app/authentication/login';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
    pageTitle: string = "Manage Account";
    emailForm: FormGroup;
    passwordForm: FormGroup;
    namesForm: FormGroup;
    message: string = '';
    user: User;
    email: string;
    confirmEmail: string;
    password: string;
    newPassword: string; 
    newPasswordConfirm: string;
    name: string;
    surname: string;
    
    constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private userService: UserService) { }

    ngOnInit(): void 
    {
        this.emailForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
            emailConfirm: ['', [Validators.email, Validators.required, Validators.minLength(6)]]
        });
        this.passwordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
            newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
            newPasswordConfirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
        });
        this.namesForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
            surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
        });

        this.user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.user);
    }

    changeEmail(): void
    {
        this.email = this.emailForm.get('email').value.trim();
        this.confirmEmail = this.emailForm.get('emailConfirm').value.trim();
        console.log(this.email + ' ' + this.confirmEmail);
        if(!(this.email == this.confirmEmail))
        {
            return;
        }
        this.user.email = this.email;
        this.userService.updateUser(this.user).subscribe({
            next: () => {
                alert('User updated');
                this.emailForm.reset();
                this.router.navigate(['/account']);
            },
            error: err => {
                console.log(err)
            }
        });
    }

    changePassword(): void
    {
        this.password = this.passwordForm.get('password').value.trim();
        this.newPassword = this.passwordForm.get('newPassword').value.trim();
        this.newPasswordConfirm = this.passwordForm.get('newPasswordConfirm').value.trim();
        if(!(this.newPassword == this.newPasswordConfirm))
        {
            return;
        }
        this.userService.changePw(this.user, this.password, this.newPassword).subscribe({
            next: () => {
                alert('Password changed.');
                this.passwordForm.reset();
                this.router.navigate(['/account']);
            },
            error: err => {
                console.log(err)
            }
        });
    }

    changeNames(): void
    {
        this.name = this.namesForm.get('name').value.trim();
        this.surname = this.namesForm.get('surname').value.trim(); 
        if((this.name) && !(this.name == ''))
        {
            this.user.firstName = this.name;
        }
        if((this.surname) && !(this.surname == ''))
        {
            this.user.lastName = this.surname;
        }
        console.log(this.user);
        
        this.userService.updateUser(this.user).subscribe({
            next: () => {
                alert('Names/Surname chaneged');
                this.namesForm.reset();
                this.router.navigate(['/account']);
            },
            error: err => {
                console.log(err)
            }
        });
    }
}
