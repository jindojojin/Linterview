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
import { SettingComponent } from './setting/setting.component';
import { OverviewComponent } from './overview/overview.component';
import { NgbModule, NgbDropdownModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    SettingComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgbModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [AdminManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
