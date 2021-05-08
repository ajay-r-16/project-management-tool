import { Component, OnInit, AfterContentInit, AfterViewInit, OnChanges, AfterContentChecked, AfterViewChecked } from '@angular/core';
import{DatePipe} from '@angular/common'
import { CardService } from '../card.service';
import { HttpserviceService } from '../httpservice.service';
import { isInteger, toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { stringify } from 'querystring';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  //sprintno:number;
  sprintDays:string='';
  sprintDaysPrev:string;
  sprintEndDate:String;
 // setsprint=setInterval(()=>{if(this.http.currentsprint!= ' '){this.sprintno=toInteger(this.http.currentsprint);clearInterval(this.setsprint)}},1000)
  currentuser:string;
  issueModalState:boolean=true;
  sprintends:string;
  setpsprintends=setInterval(()=>{
    if(this.sprintDaysPrev!=this.sprintDays)
    { this.sprintDaysPrev=this.sprintDays
      this.sprintends=String(this.data.getFormattedDate(' ',toInteger(this.sprintDays)));
  }
  },1000)
  sprint:string='';
  startDate:any='';
  endDate:any='';
  i:number;
  userlist:any=[];
  useridlist:any={};
  teamlist:any=[];
  teamidlist:any={};
  sm:any;
  em:any;
  sd:any;
  ed:any;
  sy:any;
  ey:any;
  isload:boolean=true;
  currentDate=String(this.data.getFormattedDate(' '))
  createEndDate:Date
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  constructor(private data:CardService,private http: HttpserviceService,private date: DatePipe) {
    
    this.data.isload=true;
    this.http.userDetails().subscribe((data)=>{this.data.currentUser=data['fullname'];this.currentuser=data['fullname'];})
    this.http.currentSprint().subscribe((data)=>{
      this.sprint=String(data[0]["sprint_id"])
      this.http.currentsprint=this.sprint
      //this.sprintno=toInteger(this.sprint)+1
      this.startDate= new Date(data[0]["startdate"])
      this.endDate=new Date(JSON.stringify(data[0]["enddate"]))
      this.data.daysRemaining=Math.floor((Date.UTC(this.endDate.getFullYear(),this.endDate.getMonth(),this.endDate.getDate())-Date.UTC(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()))/(1000*60*60*24));
      this.sd=this.startDate.getDate();
      this.ed=this.endDate.getDate();
      this.sm=this.months[this.startDate.getMonth()];
      this.em=this.months[this.endDate.getMonth()];
      this.sy=this.startDate.getFullYear();
      this.ey=this.endDate.getFullYear();
      this.isload=false;
      //console.log(this.sprint,this.startDate,this.endDate)
      this.data.dsprint=this.sprint;
    }
      ,(error)=>console.log('error :',error))
      

    this.http.readAllUsers().subscribe((data)=>{
        for(this.i=0;this.i<data["length"];this.i++){
          this.useridlist[data[this.i]["user_id"]]=data[this.i]["fullname"];
          this.userlist.push([data[this.i]["user_id"],data[this.i]["fullname"]]);
        }
        this.data.userlist=this.userlist;
        this.data.useridlist=this.useridlist;
        //console.log(this.userlist)
        })
    this.http.readAllTeams().subscribe(data=>{
      for(this.i=0;this.i<data["length"];this.i++){
        this.teamidlist[data[this.i]["team_id"]]=data[this.i]["teamname"];
        this.teamlist.push([data[this.i]["team_id"],data[this.i]["teamname"]]);
      }
      this.data.teamlist=this.teamlist;
      this.data.teamidlist=this.teamidlist;
    })
    this.timeout();
    
  
    

  }

  ngOnInit() {
    this.data.issueState.subscribe(state=> this.issueModalState= state);
  }
  
  
   timeout(){
    setTimeout(()=>{ 
        this.loadissues();
        if(this.sprint!=''){
        this.data.getIssues(String(this.sprint),'','');
      }
      },100);
      
   } 
   loadissues(){
    if(this.sprint==''){
      setTimeout(()=>{
        this.timeout();
      },100)
    }
   } 
   

  issueModal(){
    this.issueModalState=!this.issueModalState;
    this.data.issueToggle(this.issueModalState);
  }
  createNewSprint(){
    if(this.sprintDays==''){alert("Please enter the days of the sprint")}
    else{
  // this.sprintEndDate=stringify(this.data.getFormattedDate(' ',toInteger(this.sprintDays),1))
  this.http.createSprint(this.sprintEndDate).subscribe(data=>{//console.log(data);
    this.sprint+=1;this.http.currentsprint=this.sprint},error=>console.log(error));
  
  }}

}
