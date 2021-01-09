import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token:any
  checkLogin : any 
  type:string=""
  workspaceID=''
  
  constructor(private _user: UserService, private _router: Router) { }

  test(){
    this.token = localStorage.getItem('token');
    if(!this.token){this.checkLogin = false}
    else{this.checkLogin = true }

    this._user.getUser().subscribe(data=>
      { 
        this.type = data.data.user_type;
        this.workspaceID = data.data.workspace;
        console.log(this.type)
        
      })
      console.log(this.type)
    }


  ngOnInit(): void {
    this.test()
  }


  logout(){
    this._user.logout().subscribe(data=>{
      localStorage.removeItem('token')
    },(e)=>{
      console.log(e)
    },()=>{
      this.type =''
      this.workspaceID=''
      this.checkLogin = false
      this._router.navigateByUrl('')

    })
  }
}
