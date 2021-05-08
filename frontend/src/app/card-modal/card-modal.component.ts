import { Component, OnInit, Output, OnChanges, Input, SimpleChanges} from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})

export class CardModalComponent implements OnInit {
  i:number=0;
  flag:number=0;
  dgsprint:any;
  message:boolean=true;
  res:boolean;
  x:any;
  issue_id:string;
  heading: string='def';
  reportedby: string;
  sprintid: string;
  fixversion: string;
  points: string;
  assignedto: string;
  date: string;
  status: string;
  issuepriority: string;
  load:boolean;
  description: string='default';
  //@Output() MessageEvent=new EventEmitter<boolean>();
  constructor(private http: HttpserviceService, private card:CardService) { 
    this.load=true;
    this.x= window.matchMedia("(max-width: 650px)");
    this.myFunction(this.x);
    this.x.addListener(this.myFunction);
    this.timeout();
    
  }

  timeout(){
    setTimeout(()=>{ 
        this.loadissues();
    //  console.log(this.issue_id)
      if(this.card.issueId != ''){
        if(this.issue_id!=this.card.issueId){
          this.issue_id=this.card.issueId
          //console.log(this.issue_id)
          this.getIssueDetails()
      }
      }},100);
      
   } 
   loadissues(){
    if(this.issue_id!=this.card.issueId){
      setTimeout(()=>{
        this.timeout();
      },100)
    }
   }
  
  

  myFunction(x) {
    if (x.matches) { 
      this.res=true;
    }
    else{
      this.res=false;
    }
  }

  change($event){
    this.x= window.matchMedia("(max-width: 650px)");
    this.myFunction(this.x);
    this.x.addListener(this.myFunction);
  }
  
  
  ngOnInit() {
    //console.log('init')
    this.heading=''
  }
  

  close_modal(){
    //console.log('card-modal',this.message);
    this.card.changeState(true,'');
   
    //  this.MessageEvent.emit(this.message);  

}
getIssueDetails(){
this.http.getIssuedetails(this.issue_id).subscribe(data=>{
  this.heading=data["0"]["heading"]
  this.issuepriority=data["0"]["priority"]
  this.sprintid=data["0"]["sprint_id"]
  this.fixversion=data["0"]["version"]
  this.points=data["0"]["points"]
  this.date=data["0"]["date"]
  this.status=data["0"]["status"]
  this.description=data["0"]["description"]
  this.date=this.card.getFormattedDate(data["0"]['date'])
  for(this.i=0;this.i<this.card.userlist.length;this.i++)
  { if(this.flag!=2){
    if(data["0"]["reportedby"]==this.card.userlist[this.i][0])
    {
      this.reportedby=this.card.userlist[this.i][1]
      this.flag+=1
    }
    if(data["0"]["assignedto"]==this.card.userlist[this.i][0])
    {
      this.assignedto=this.card.userlist[this.i][1]
      this.flag+=1
    }}
  }
  this.flag=0
  //console.log(data)
  this.load=false;
  

},error=>console.log('error'))
}

statusassign(param:string){
  this.status=param
 // console.log(param,'status')
}

prior(param:string){
  this.issuepriority=param
 // console.log(param,'issue_prior')
}
updateIssue()
{
  if(this.issuepriority=='High'){
    this.issuepriority = 'HIGH'
  }
  if(this.issuepriority=='Medium'){
    this.issuepriority = 'MED'
  }
  if(this.issuepriority=='Low'){
    this.issuepriority = 'LOW'
  }
    if(this.heading==''){alert('Enter the heading')}
    else if(this.fixversion==''){alert('Enter the fix version')}
    else if(this.points==''){alert('Enter the story points')}
    else{
  for(this.i=0;this.i<this.card.userlist.length;this.i++){
    if(this.flag!=2){
      if(this.reportedby.toLowerCase()==this.card.userlist[this.i][1].toLowerCase()){
        this.reportedby=this.card.userlist[this.i][0];
        this.flag+=1
      }
      if(this.assignedto.toLowerCase()==this.card.userlist[this.i][1].toLowerCase()){
        this.assignedto=this.card.userlist[this.i][0];
        this.flag+=1
      }
    }
  }
  if(this.flag==2){
    this.http.updateIssue(this.issue_id,this.heading,this.assignedto,this.issuepriority,this.status,this.sprintid
      ,this.fixversion,this.points,this.description).subscribe((data)=>{//console.log(data);
        this.card.getIssues(String(this.card.dsprint),'','');},error=>{
          this.card.isload=false;
        console.log(error)}
        )
    this.close_modal()  
    this.card.isload=true;
    }
  else{
    alert('please enter correct user')
    this.flag=0
  }
}
  }
}
