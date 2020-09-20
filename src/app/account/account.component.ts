import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
    pageTitle: string = "Manage Account";
    emailForm: FormGroup;
    constructor() { }

    ngOnInit(): void {
    }

    changeEmail(): void
    {

    }
}
