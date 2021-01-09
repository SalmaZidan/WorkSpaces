import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './pages/workspace/add/add.component';
import { AddEmployeeComponent } from './pages/workspace/add-employee/add-employee.component';
import { EditComponent } from './pages/workspace/edit/edit.component';
import { AddServiceComponent } from './pages/workspace/add-service/add-service.component';
import { EditServiceComponent } from './pages/workspace/edit-service/edit-service.component';
import { WorkspaceRequestsComponent } from './pages/workspace/workspace-requests/workspace-requests.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowSingleComponent } from './pages/workspace/show-single/show-single.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { UserRequestsComponent } from './pages/user/user-requests/user-requests.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';
import { ShowAllComponent } from './pages/workspace/show-all/show-all.component';
import { UserService } from './services/user.service';
import { UserInterceptor } from './interceptors/user.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    AddEmployeeComponent,
    EditComponent,
    AddServiceComponent,
    EditServiceComponent,
    WorkspaceRequestsComponent,
    HomeComponent,
    ShowSingleComponent,
    ProfileComponent,
    UserRequestsComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    UserFormComponent,
    LoginComponent,
    SignUpComponent,
    EditProfileComponent,
    ShowAllComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    UserService,
    {
     provide:HTTP_INTERCEPTORS,
     useClass:UserInterceptor,
     multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
