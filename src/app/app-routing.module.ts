import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { OfficerDashbordComponent } from './officer-dashbord/officer-dashbord.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { CriminalCaseComponent } from './criminal-case/criminal-case.component';


const routes: Routes = [
  // { path: '', component: OfficerDashbordComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: HomeComponent },
  { path: 'maneger', component: ManagerComponent },
  { path: 'officer-dashbord', component: OfficerDashbordComponent },
  { path: 'admin-dashbord', component: AdminDashbordComponent },
  { path: 'criminal-case', component: CriminalCaseComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
