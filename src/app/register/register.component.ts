import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    //styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Register';
    
    users: User[] = [];
    user: User;
    registerForm: FormGroup;
    subs: Subscription[] = [];
    errorMessage: string = '';

    private validationMessages: { [key: string]: { [key: string]: string } };
    displayMessage: { [key: string]: string } = {};

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) 
    {
        this.validationMessages = {
            firstName: {
                required: 'You have enter your first name',
                minlength: 'First Name has to be at least 2 characters',
                maxlength: 'First Name cannot be longer than 30 characters'
            },
            lastName: {
                required: 'You have enter your first name',
                minlength: 'Last Name has to be at least 2 characters',
                maxlength: 'Last Name cannot be longer than 30 characters'
            },
            email: {
                required: 'Email is required',
                email: 'Must be a valid email',
            },
            password: {
                required: 'You must enter a password',
                minlength: 'Password must have a length of at least 8 characters',
                pattern: 'Password must contain alphanumeric characters and special characters'
            },
            confirmPassword: {
                required: 'You must enter a password',
                minlength: 'Password must have a length of at least 8 characters',
                pattern: 'Password must contain alphanumeric characters and special characters'
            }
        };
    }

    ngOnInit(): void 
    {
        this.userService.getAll().subscribe({
            next: users => {
                this.users = users;
                console.log(users);
            },
            error: err => {
                console.log(err);
            }
        });

        this.registerForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"]+$')]],//Check pattern
            confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"]+$')]]
        });

        const controlNames: string [] = [
            'email',
            'password',
            'confirmPassword',
            'firstName',
            'lastName'
        ];

        this.subs = [];

        for (let index = 0; index < controlNames.length; index++) {
            const control = this.registerForm.get(controlNames[index]);
            this.subs[index] = control.valueChanges.pipe(debounceTime(750)).subscribe(
                value => {
                    this.setMessage(control, controlNames[index]);
                    control.setValue(control.value.trim());
                }
            );
        }
    }
  
    register(): void
    {
        this.errorMessage = '';
        let email: string = this.registerForm.get('email').value.trim();
        let password: string = this.registerForm.get('password').value.trim();
        let confirmPassword: string = this.registerForm.get('confirmPassword').value.trim();

        if (!this.checkUnique(email))
        {
            return;
        }
        if(!(password === confirmPassword))
        {
            this.errorMessage = 'Passwords do not match.';
            return;
        } 
            
        this.user = {
                
            'firstName': this.registerForm.get('firstName').value.trim(),
            'lastName': this.registerForm.get('lastName').value.trim(),
            'email': email,
            'password': password
        };

        this.userService.createUser(this.user).subscribe({
            next: () => {
                alert('Account Created Successfuly! Please proceed to sign in using the details you provided.');
                console.log(this.user);
                console.log(this.users);
                this.router.navigate(['/login']);
            },
            error: err => {
                console.log(err)
            }
        });        
    }

    checkUnique(email: string): boolean
    {
        for (let index = 0; index < this.users.length; index++) {
            if(email === this.users[index].email)
            {
                this.errorMessage = 'Email already registed with an account.';
                return false;
            }      
        }
        return true;
    }

    setMessage(c: AbstractControl, name: string): void 
    {
        this.displayMessage[name] = '';
        if((c.touched || c.dirty) && c.errors)
        {
            this.displayMessage[name] = Object.keys(c.errors).map(
                key => this.validationMessages[name][key]).join(' ');
        }
    }

    ngOnDestroy() : void
    {
        for (let index = 0; index < this.subs.length; index++) {
            this.subs[index].unsubscribe();    
        }
    }
}
