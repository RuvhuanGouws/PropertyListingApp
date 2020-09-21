import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

    userService: UserService;
    user: User;
    email: string;
    confirmEmail: string;
    password: string;
    newPassword: string; 
    newPasswordConfirm: string;
    name: string;
    surname: string;
    
    constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

    ngOnInit(): void 
    {
        this.emailForm = this.formBuilder.group({
            email: [''],
            emailConfirm: ['']
        });
        this.passwordForm = this.formBuilder.group({
            password: [''],
            newPassword: [''],
            newPasswordConfirm: ['']
        });
        this.namesForm = this.formBuilder.group({
            name: [''],
            surname: ['']
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
                this.namesForm.reset();
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
        if(!this.authService.login(this.user.email, this.password))
        {
            console.log(this.authService.login(this.user.email, this.password));
            console.log('Wrong Password');
            return;
        }
        else
        {
            console.log(this.authService.login(this.user.email, this.password));
            console.log('hit');
        }
        // this.userService.updateUser(this.user).subscribe({
        //     next: () => {
        //         alert('Advert updated successfully!');
        //         this.namesForm.reset();
        //         this.router.navigate(['/adverts']);
        //     },
        //     error: err => {
        //         console.log(err)
        //     }
        // });
    }

    changeNames(): void
    {
        this.name = this.namesForm.get('name').value.trim();
        this.surname = this.namesForm.get('surname').value.trim(); 

        this.userService.updateUser(this.user).subscribe({
            next: () => {
                alert('Advert updated successfully!');
                this.namesForm.reset();
                this.router.navigate(['/adverts']);
            },
            error: err => {
                console.log(err)
            }
        });
    }
}
