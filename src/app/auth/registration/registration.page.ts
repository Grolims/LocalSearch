import { Component, OnInit } from '@angular/core';
import { UserResponseValue} from 'src/app/models/user';
import { NgForm } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(public httpClient: HttpClient, private authservice: AuthService, private router: Router) { }


 users:UserResponseValue = {

    username: null,
    admin: false,
    password:null,
  };


  errorMsg:string;
  postOK:boolean;

  createUser(form: NgForm){



    if (form.invalid) {
      return;
    }

    this.httpClient.post("https://localsearch-ch.herokuapp.com/users", this.users)
    .subscribe(data => {
      this.router.navigateByUrl("/")

     }, error => {
       console.log(error)
      console.warn(`Post failed: ${error.message}`);
      this.errorMsg = error.error;

    });

    this.postOK = true;

  }

  ngOnInit() {
  }

}
