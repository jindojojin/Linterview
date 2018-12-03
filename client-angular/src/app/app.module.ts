import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComputerComponent } from './list-computer/list-computer.component';
import { ComputerDetailComponent } from './computer-detail/computer-detail.component';
import { ComputerCardComponent } from './list-computer/computer-card/computer-card.component';
import { AdminManagerService } from './_services/admin-manager.service';
import { LimitTextPipe } from './pipe/limit.pipe';
import { OverviewComponent } from './overview/overview.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannedWebsiteComponent } from './banned-website/banned-website.component';
import { TimeVietNamPipe } from './pipe/time-viet-nam.pipe';
import { TotalOnlineTimePipe } from './pipe/total-online-time.pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { IsLoginPipe } from './pipe/is-login.pipe';
import { UserService } from './_services/user.service';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider,LoginOpt} from "angularx-social-login";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("934005979402-999m42b5gf5vek9og551g9hqpvbartu8.apps.googleusercontent.com",googleLoginOptions)
   }
  //  ,
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider("Facebook-App-Id")
  // },
]);

export function provideConfig() {
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ListComputerComponent,
    ComputerDetailComponent,
    ComputerCardComponent,
    LimitTextPipe,
    OverviewComponent,
    BannedWebsiteComponent,
    TimeVietNamPipe,
    TotalOnlineTimePipe,
    IsLoginPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgbModule,
    FormsModule,ReactiveFormsModule,
    ClipboardModule,
    SocialLoginModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AdminManagerService,UserService,{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
