  
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any
  defaultImage = 'assets/default/user.png'
  constructor(private _user:UserService, private router:Router) { }

  ngOnInit(): void {
    this._user.getUser().subscribe(data =>
      {
        this.user = data.data;
        console.log( data.data);
      })
  }

}