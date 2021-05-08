import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CardService } from '../card.service';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {
  i:number
  flag:number=0
  state:boolean=true;
  issueHeading:string='';
  priority:string
  reportedby:string
  sprint:string
  setreportedby= setInterval(()=>{if( this.data.currentUser!=' '){this.reportedby=this.data.currentUser;clearInterval(this.setreportedby)}},1000)
  setsprint=setInterval(()=>{if(this.http.currentsprint!= ' '){this.sprint=this.http.currentsprint;clearInterval(this.setsprint)}},1000)
  storyPoints:string=''
  issueReportedDate:string
  description:string
  assignedTo:string=''
  currentDate=String(this.data.getFormattedDate(' '))
  priorityList:any=['High','Medium','Low']
  prioritySelected:string=''
  status:string="OPEN"
  version:string=''
  constructor(private data:CardService,private http:HttpserviceService) {
    this.sprint=this.http.currentsprint;
    // while(this.sprint==' '){
    //   this.sprint=this.http.currentsprint
    // }
    // console.log(this.sprint)
   }

  createIssueHere(){
    if(this.prioritySelected==''){
      alert('Please select priority')
    }
    else if(this.issueHeading==''){alert('Enter the heading')}
    else if(this.version==''){alert('Enter the fix version')}
    else if(this.storyPoints==''){alert('Enter the story points')}

    else {
      for(this.i=0;this.i<this.data.userlist.length;this.i++){
        if(this.flag!=2){
          if(this.reportedby.toLowerCase()==this.data.userlist[this.i][1].toLowerCase()){
            this.reportedby=this.data.userlist[this.i][0];
            this.flag+=1
          }
          if(this.assignedTo.toLowerCase()==this.data.userlist[this.i][1].toLowerCase()){
            this.assignedTo=this.data.userlist[this.i][0];
            this.flag+=1
          }
        }
      }
      if(this.flag==2){
    this.http.createIssue(this.issueHeading,this.assignedTo,this.prioritySelected,this.status
      ,this.sprint,this.version,this.storyPoints,this.description).subscribe(data=>{
        this.data.getIssues(String(this.data.dsprint),'','');
       // console.log("success")
        //console.log(data),
        error=>{
        this.data.isload=false;  
        console.log(error)}
      })
      this.flag=0
      this.data.isload=true;
      this.closeModal()
      this.data.isload=true;
    }
    else{
      alert('please enter the correct user')
      this.flag=0
    }
  }
   }

   closeModal(){
    this.data.issueToggle(this.state);
    this.issueHeading='',this.assignedTo='',this.prioritySelected='',this.status=''
      ,this.version='',this.storyPoints='',this.description=''
   
  }

  ngOnInit() {
    
  }
  selectedPriority(a:string){
    this.prioritySelected=a
    if(this.prioritySelected=='High'){
      this.prioritySelected = 'HIGH'
    }
    if(this.prioritySelected=='Medium'){
      this.prioritySelected = 'MED'
    }
    if(this.prioritySelected=='Low'){
      this.prioritySelected = 'LOW'
    }
    //onsole.log(this.prioritySelected)
  }
  
  }
 



//sprint initialsiation to be decided


