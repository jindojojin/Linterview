import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComputerComponent } from './list-computer/list-computer.component';
import { ComputerDetailComponent } from './computer-detail/computer-detail.component';
import { SettingComponent } from './setting/setting.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component:HomeComponent},
  { path: 'listComputers', component:ListComputerComponent},
  { path: 'computerDetail', component:ComputerDetailComponent},
  { path: 'setting', component:SettingComponent},
  { path: 'overview', component : OverviewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
