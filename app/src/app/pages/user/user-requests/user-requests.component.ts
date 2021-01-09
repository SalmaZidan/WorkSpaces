import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {
  userRequests: any ;
  WorkspaceData:any= []
  index=0
  // tslint:disable-next-line:quotemark
  status = "pendding";
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:variable-name
  constructor(private _userReq: RequestService, private router: Router , private _work: WorkspaceService) { }
  // tslint:disable-next-line:typedef
  getData(){

    this._userReq.getAll().subscribe(data =>
    {
        this.userRequests = data.data;

        for( this.index ; this.index < this.userRequests.length ; this.index ++){
          this._work.getSingle(this.userRequests[this.index].workspace_id).subscribe(singleWorkspace=>{
          
          this.WorkspaceData.push(singleWorkspace.data.workingSpaceName)
        }) 
      }
      console.log(this.WorkspaceData)       

    });
    
  }

  ngOnInit(): void {
    this.getData();

  }

  // tslint:disable-next-line:typedef
  deletereq(id: any){
    this._userReq.deleteOne(id).subscribe(data => {
      this.getData();
      console.log(data);
    });
  }

}