import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  userregisterForm ={
    "user_name":"",
    'user_email':"",
    'user_password': "",
    'user_phoneNumber': "",
    user_address: {
      "country": "",
      "city": "",
      "detailedAddress": ""
    }
  }

  constructor(private _user:UserService ,private _route:Router) { }

  ngOnInit(): void {
  }

  reg(){
     this._user.registerUser(this.userregisterForm).subscribe(data=>{
        console.log(data);
        localStorage.setItem('token',`Bearer ${data['Token']}`)
 
        this._route.navigate([''])
      },error=>{
        console.log(error)
      })
  
    }
}
