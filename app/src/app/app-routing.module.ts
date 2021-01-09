import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { UserRequestsComponent } from './pages/user/user-requests/user-requests.component';
import { ShowAllComponent } from './pages/workspace/show-all/show-all.component';
import { ShowSingleComponent } from './pages/workspace/show-single/show-single.component';
import { WorkspaceRequestsComponent } from './pages/workspace/workspace-requests/workspace-requests.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignUpComponent},
  {path:'workspaces', component:ShowAllComponent},
  {path:'workspace/:id', component:ShowSingleComponent},
  {path:'profile', component:ProfileComponent},
  {path: 'MyWorkRequest/:id', component:WorkspaceRequestsComponent},
  {path:'myRequest', component:UserRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
