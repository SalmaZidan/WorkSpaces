import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { WorkspaceService } from 'src/app/services/workspace.service';


@Component({
  selector: 'app-show-single',
  templateUrl: './show-single.component.html',
  styleUrls: ['./show-single.component.css']
})
export class ShowSingleComponent implements OnInit {

  constructor(private _single:WorkspaceService, private _route:ActivatedRoute , private _user:UserService , private _re:RequestService) { }
  workspace={
    workingSpaceName:'',
  address:{
    country:'',
    city:'',
    detailedAddress:''
  },
  startTime:'',
  endTime:'',
  fullDesc:'',
  Profile_img:'',
  services:[
    {
      _id:'',
      serviceName:'',
      cost:''
    }
  ]
  }

  type:string=""
  showMainContent = ''
  defaultImageService= 'assets/default/s.jpg'

  reqest = {
    user_id:'',
    workspace_id:'',
    service_id:'',
    reservation_date:'',
    guests_number:''
  }
  
  defaultImage = 'assets/default/Organize-Workspace.png'
  ngOnInit(): void {
      this._single.getSingle(this._route.snapshot.paramMap.get('id')).subscribe(singleWorkspace=>{
        this.workspace=singleWorkspace.data
        this.reqest.workspace_id = singleWorkspace.data._id
        this.workspace.services = singleWorkspace.data.services

      console.log(this.workspace)

    })

    this._user.getUser().subscribe(data=>
      { 
        this.type = data.data.user_type;
        this.reqest.user_id = data.data._id
        console.log(this.type)
        
      })

  }

  ShowHideButton(x:any) {
    this.reqest.service_id = x
    this.showMainContent = x

  }

  makeRequest(){
    console.log(this.reqest)
    this._re.addOne(this.reqest).subscribe(data=>{
      console.log(data)
    })

  }

}
