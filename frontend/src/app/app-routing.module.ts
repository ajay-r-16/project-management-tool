import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { SprintComponent } from './sprint/sprint.component';
import {ProfileComponent} from './profile/profile.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { LoginComponent } from './login/login.component';
import { TeamIssueComponent } from './team-issue/team-issue.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CardComponent } from './card/card.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

const routes: Route[]= [
  {path:'nav',component:NavigationBarComponent},
  {path:'sprint',component:SprintComponent},
  {path:'issue', component:CreateIssueComponent},
  {path:'profile', component: ProfileComponent},
  {path:'login', component:LoginComponent},
  {path:'team-issue', component:TeamIssueComponent},
  {path:'card', component:CardComponent,children:[  {path:'card-modal',component:CardModalComponent}]}
  ]
  // {path:'sprint',component:SprintComponent},
  // {path:'issue', component:CreateIssueComponent},
  // {path:'profile', component: ProfileComponent},
  // {path:'login', component:LoginComponent},
  // {path:'team-issue', component:TeamIssueComponent},
  // {path:'card', component:CardComponent,children:[  {path:'card-modal',component:CardModalComponent}]}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
