import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = {
    // tslint:disable-next-line:quotemark
    user_email: "" ,
    // tslint:disable-next-line:quotemark
    user_password: "" ,
    /*type: client*/
  };

  constructor(private _user: UserService, private _router: Router ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    console.log(this.userModel) ;
    this._user.signIn(this.userModel).subscribe(data => {
      console.log(data);
      localStorage.setItem('token',`Bearer ${data['token']}`)

      this._router.navigateByUrl('')
    }, error => {
      console.log(error);
    });
  }
  
}
