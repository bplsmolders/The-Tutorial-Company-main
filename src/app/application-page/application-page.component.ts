import { NodeEntry, Node, EndpointBasicAuthRepresentation } from '@alfresco/js-api';
import { Component } from '@angular/core';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { EcmUserService } from '@alfresco/adf-core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss']
})
export class ApplicationPageComponent  {
  showOverlay = false;
  nodeId = '20a433ac-cc73-4445-b856-6011d8797121';
  processDefinitionId = 'Aanmeldprocestrainee2:2:19616';
  nodeName:string;
  node:Node;
  nodeDescription:string;
  nodeTitle:string;
  relatedGroups:Array<any>;
  trainers:Array<object>;
  courseInfo:{topic:string, course:string, training:string, nodeId:string} = { topic: '', course: '', training: '', nodeId:''};

  constructor(
    private apiService:AlfrescoApiService,
    private userService: EcmUserService,
  ) { }

  //This function shows the SignUp action on a folder.
  showSignUp = (node: Node): boolean => {
    if(node["entry"].aspectNames[0].includes("training-specificaties:Beschikbaarheid")){
      return true
    }
    return false;
  }

  //This function closes the overlay when pressed the SignUp action on a folder.
  closeOverlay = (): void => {
    console.log("close")
    this.showOverlay = false
  }
  
  startSignUpProces(event:Event) {
    this.showOverlay = true 
  }



  //This function retrieves the selected node on the page.
  getInput(node:NodeEntry[]) {
    // selecting the right node for further use
    this.node=node[0].entry

    // selecting title and description to display on page
    this.nodeTitle = this.node.properties["cm:title"];
    this.nodeDescription = this.node.properties["cm:description"];


    // constructing a courseInfo object to pass down trough the next comoponent
    this.courseInfo.training = this.node.name
    let pathArray = this.node.path.name.split('/')
    this.courseInfo.course= pathArray[pathArray.length-1]
    this.courseInfo.topic= pathArray[pathArray.length-2]
    this.courseInfo.nodeId = this.node.id
    console.log(this.courseInfo)
    

    // Filter out the related Groups found in the metadata of the selected node
    if(this.node.permissions.locallySet){
      this.relatedGroups=this.node.permissions.locallySet
    } else{
      this.relatedGroups = this.node.permissions.inherited
    }

    
    // first filter out the correct group that holds the trainers. this is done by checking if the group includes the name of the folder.
    this.trainers=[];
    this.relatedGroups.forEach(group => {
      if(group.authorityId.toUpperCase().includes(this.node.name.toUpperCase()) || this.relatedGroups.length === 1){
        //if it does, search the members of the group, then get the userinfo and push it on the array.
        this.apiService.groupsApi.listGroupMemberships(group.authorityId)
          .then(res => {
            this.trainers = []
            res.list.entries.forEach(entry => {
              this.apiService.peopleApi.getPerson(entry.entry.id)
                .then(res => {
                  let description = res.entry.description;
                  let profilePic = this.userService.getUserProfileImage(res.entry.avatarId)
                  this.trainers.push({profilePic,description})
                })
            })
          })
      } 
    })
    
  }
}
