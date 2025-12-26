import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LeadsComponent } from './features/leads/leads.component';
import { ContactsComponent } from './features/contacts/contacts.component';
import { TasksComponent } from './features/tasks/tasks.component';
import { NotesComponent } from './features/notes/notes.component';
import { NotFoundComponent } from './core/error-pages/not-found/not-found.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AuthGuard } from './core/guards/auth.guard';
const routes: Routes = [
  //when user opens the app, show dashboard page
  {path: '', component: DashboardComponent},
  {path: 'leads', component: LeadsComponent, canActivate: [AuthGuard]},
  {path:'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
  {path:'tasks', component: TasksComponent  , canActivate: [AuthGuard]},
  {path:'notes', component: NotesComponent, canActivate: [AuthGuard]},
    //If user enters any wrong URL, redirect to Dashboard (temporary)
  {path: '**', redirectTo: '', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
