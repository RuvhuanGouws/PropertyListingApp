import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
    pageTitle: string = "My Seller Profile";
    profileForm: FormGroup;

    message: string = "";
    user: User;
    email: string;
    cellphone: string;
    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

    ngOnInit(): void 
    {
        this.profileForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
            cellphone: ['', [Validators.minLength(10), Validators.maxLength(10)]]
        });

        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.displayAdvert(this.user);
    }

    displayAdvert(userP: User): void 
    {
        if (this.profileForm) 
        {
          this.profileForm.reset();
        }
        if (!userP.cellphone) 
        {
            userP.cellphone = '';
        }
    
        this.profileForm.patchValue({
            email: userP.email,
            cellphone: userP.cellphone
        });
    }

    submit(): void
    {
        this.email = this.profileForm.get('email').value.trim();
        this.cellphone = this.profileForm.get('cellphone').value.trim();
        
        this.user.email = this.email;
        this.user.cellphone = this.cellphone;
        this.userService.updateUser(this.user).subscribe({
            next: () => {
                localStorage.setItem('currentUser', JSON.stringify(this.user));
                this.message = "Contact Details Updated!";
            },
            error: err => {
                console.log(err)
            }
        });
    }   
}
