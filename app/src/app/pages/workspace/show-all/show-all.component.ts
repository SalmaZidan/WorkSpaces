import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';


@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {

  allWorkSpaces:any
  server = "http://localhost:3000/"
  defaultImage = 'assets/default/Organize-Workspace.png'
  img :any
  constructor(private workspace:WorkspaceService, private router:Router) { }

  ngOnInit(): void {
     this.workspace.getAll().subscribe(data=>
      { 
        this.allWorkSpaces = data.data;
        console.log( data.data);
      })
  }

}
