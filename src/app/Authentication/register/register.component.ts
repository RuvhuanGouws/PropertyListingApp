import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, SelectMultipleControlValueAccessor } from '@angular/forms';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { debounceTime, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/_services';

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
    registerMessage: string = '';

    private validationMessages: { [key: string]: { [key: string]: string } };
    displayMessage: { [key: string]: string } = {};

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authenticationService: AuthenticationService) 
    {
        this.validationMessages = {
            firstName: {
                required: 'You have enter your first name',
                minlength: 'First Name has to be at least 1 characters',
                maxlength: 'First Name cannot be longer than 100 characters'
            },
            lastName: {
                required: 'You have enter your first name',
                minlength: 'Last Name has to be at least 3 characters',
                maxlength: 'Last Name cannot be longer than 100 characters'
            },
            email: {
                required: 'Email is required',
                email: 'Must be a valid email',
            },
            password: {
                required: 'You must enter a password',
                minlength: 'Password must have a length of at least 8 characters',
                pattern: 'Password must contain alphanumeric characters and special characters. No spaces.'
            },
            confirmPassword: {
                required: 'You must enter a password',
                minlength: 'Password must have a length of at least 8 characters',
                pattern: 'Password must contain alphanumeric characters and special characters. No spaces.'
            }
        };
    }

    ngOnInit(): void 
    {
        // this.userService.getAll().subscribe({ // Temp
        //     next: users => {
        //         this.users = users;
        //         console.log(users);
        //     },
        //     error: err => {
        //         console.log(err);
        //     }
        // });

        this.registerForm = this.fb.group({
            email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
            firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"]+$')]],//Check pattern
            confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"]+$')]]
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

        if(!(password === confirmPassword))
        {
            this.errorMessage = 'Passwords do not match.';
            return;
        } 
            
        this.user = {
                
            'firstName': this.registerForm.get('firstName').value.trim(),
            'lastName': this.registerForm.get('lastName').value.trim(),
            'email': email,
            'password': password,
            'admin': false
        };

        this.userService.createUser(this.user).subscribe({
            next: () => {
                this.registerMessage = 'Registration Successful. Redirecting...';
                this.authenticationService.login(this.user.email, this.user.password)
                .pipe(first())
                .subscribe(
                    data => {
                        this.sleep(1500); 
                        this.router.navigate(["/adverts"]);
                    },
                    err => {
                        this.errorMessage = err;
                    });
            },
            error: err => {
                this.errorMessage = err;
            }
        });        
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

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
}
