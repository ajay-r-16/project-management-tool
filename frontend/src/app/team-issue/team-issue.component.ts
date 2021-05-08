import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-team-issue',
  templateUrl: './team-issue.component.html',
  styleUrls: ['./team-issue.component.css']
})
export class TeamIssueComponent implements OnInit {
    teamlist:any=[];
    teamidlist:any={};
    team_id:string='';
    issueModalState:boolean=true;
    i:number;
    isload:boolean=true;
    team:string='';

constructor(private data:CardService,private http:HttpserviceService) {
  this.data.getIssues(String(this.http.currentsprint),'','');  
  this.teamlist=this.data.teamlist;
  this.teamidlist=this.data.teamidlist;
  this.isload=false;
}

 
selectteam(teams:string){
  this.team=teams;
  this.data.isload=true;
  for(this.i=0;this.i<this.teamlist.length;this.i++){
    if(teams==this.teamlist[this.i][1]){
      this.team_id=this.teamlist[this.i][0];
      break;
    }
  }
   // console.log(this.data.teamidlist);
   // console.log(this.team_id);
    this.data.getIssues(String(this.http.currentsprint),'',String(this.team_id));
}
ngOnInit() {
  this.data.issueState.subscribe(state=> this.issueModalState= state);

}

issueModal(){
  this.issueModalState=!this.issueModalState;
  this.data.issueToggle(this.issueModalState);
}
}
