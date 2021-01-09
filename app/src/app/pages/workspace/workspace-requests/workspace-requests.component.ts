import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-workspace-requests',
  templateUrl: './workspace-requests.component.html',
  styleUrls: ['./workspace-requests.component.css']
})
export class WorkspaceRequestsComponent implements OnInit {

  myReq:any
  myUserData:any= []
  index = 0 

  s = {
    status:''
  }
  

  constructor(private _re:RequestService, private _route:ActivatedRoute, private _user:UserService) { }

  getData(){
    this._re.getAllForworkspace(this._route.snapshot.paramMap.get('id')).subscribe(data =>{
      this.myReq = data.data

      for( this.index ; this.index < this.myReq.length ; this.index ++){
        this._user.getUserBy(this.myReq[this.index].user_id).subscribe(singleUser=>{
        this.myUserData.push(singleUser.data.user_name)
      })}

    })
  }


  ngOnInit(): void {
    this.getData()
  }

  acceptreq(id:any){
    console.log(id)
    this.s.status= "accepted"
    this._re.editStatus(id,this.s).subscribe(data=>{ 
      console.log(data); 
      this.getData()
    })
    
  }

rejectreq(id:any){
  console.log(id)
    this.s.status= "rejected"
    this._re.editStatus(id,this.s).subscribe(data=>{ 
      console.log(data); 
      this.getData()
    })
    
}

}
