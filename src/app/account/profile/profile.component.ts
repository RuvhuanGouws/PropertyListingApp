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

    message: string = '';
    user: User;
    email: string;
    cellphone: string;
    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

    ngOnInit(): void 
    {
        this.profileForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
            cellphone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
        });

        this.user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.user);
    }

    submit(): void
    {
        this.email = this.profileForm.get('email').value.trim();
        this.cellphone = this.profileForm.get('emailConfirm').value.trim();
        
        this.user.email = this.email;
        this.user.cellphone = this.email;
        this.userService.updateUser(this.user).subscribe({
            next: () => {
                alert('User updated');
                this.profileForm.reset();
                this.router.navigate(['/account']);
            },
            error: err => {
                console.log(err)
            }
        });
    }   
}
