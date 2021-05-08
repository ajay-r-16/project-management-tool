import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  days:string=this.data.daysRemaining;
  sprintlist:any=[1]
  userlist:any=[];
  user:string='';
  sprint:string;
  i:number;
  useridlist:any=[];
  user_id:string='';
  isload:boolean=true;
  issueModalState
  constructor(private data:CardService,private http:HttpserviceService) {
    this.data.isload=true;
    this.sprint=String(this.http.currentsprint);
    this.data.dsprint=this.http.currentsprint;  
   

   this.http.readAllSprints().subscribe((data)=>{
    for(this.i=0;this.i<5;this.i++){
    this.sprintlist.push(data[this.i]["sprint_id"]);}
    this.isload=false;
 }
    )
    

   this.useridlist=this.data.useridlist;
   this.userlist=this.data.userlist;

   setTimeout(()=>{ this.data.getIssues(String(this.sprint),'','');},300);
 

  
  }
  selectsprint(sprints:number){
    this.sprint=String(sprints);
    if(this.sprint!=this.http.currentsprint){
      this.days=String(0);
    }
    this.data.dsprint=this.sprint;
    this.data.isload=true;
    this.data.getIssues(String(this.sprint),String(this.user_id),'');
   
}
  selectuser(users:string){
    this.user=users;
    this.data.isload=true;
    for(this.i=0;this.i<this.userlist.length;this.i++){
      if(users==this.userlist[this.i][1]){
        this.user_id=this.userlist[this.i][0];
        break;
      }
    }
    //console.log(this.data.useridlist);
    //console.log(this.user_id);
    this.data.getIssues(String(this.sprint),String(this.user_id),'');
    

    
  }

  ngOnInit() {
    this.data.issueState.subscribe(state=> this.issueModalState= state);
  
  }
  
  issueModal(){
    this.issueModalState=!this.issueModalState;
    this.data.issueToggle(this.issueModalState);
  }

}
