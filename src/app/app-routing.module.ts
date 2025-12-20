import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LeadsComponent } from './features/leads/leads.component';

const routes: Routes = [
  //when user opens the app, show dashboard page
  {path: '', component: DashboardComponent},
  //If user enters any wrong URL, redirect to Dashboard (temporary)
  {path: '**', redirectTo: '', pathMatch: 'full'},
  {path: 'leads', component: LeadsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
