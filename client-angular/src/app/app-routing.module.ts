import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComputerComponent } from './list-computer/list-computer.component';
import { ComputerDetailComponent } from './computer-detail/computer-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { BannedWebsiteComponent } from './banned-website/banned-website.component';
import { RoutGuardService } from './_services/rout-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Dashboard', component:HomeComponent},
  { path: 'listComputers', component:ListComputerComponent, canActivate:[RoutGuardService]},
  { path: 'computerDetail', component:ComputerDetailComponent, canActivate:[RoutGuardService]},
  { path: 'Thong-ke', component : OverviewComponent, canActivate:[RoutGuardService]},
  { path: 'Cac-website-cam', component : BannedWebsiteComponent, canActivate:[RoutGuardService]},
  { path: 'Thong-tin-nhan-vien/:id', component : ComputerDetailComponent, canActivate:[RoutGuardService]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
