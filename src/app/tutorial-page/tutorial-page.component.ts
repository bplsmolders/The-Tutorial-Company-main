import { NodeEntry, Node, EndpointBasicAuthRepresentation } from '@alfresco/js-api';
import { Component } from '@angular/core';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { EcmUserService } from '@alfresco/adf-core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.scss']
})
export class TutorialPageComponent  {
  nodeId = '20a433ac-cc73-4445-b856-6011d8797121'
  processDefinitionId = 'Aanmeldprocestrainee2:2:19616'
  node:Node;
  nodeDescription:string;
  username="bart.smolders@incentro.com"
  passw="1ncentrO"
  nodeTitle:string;
  relatedGroups:Array<any>;
  trainers:Array<object>;
  constructor(
    private apiService:AlfrescoApiService,
    private userService: EcmUserService,
    private HttpClient: HttpClient,
  ) { }

  //This function shows the SignUp action on a folder.
  showSignUp = (node: Node): boolean => {
    if(node["entry"].aspectNames[0].includes("training-specificaties:Beschikbaarheid")){
      return true
    }
    return false;
  }

  startSignUpProces(event:Event) {
    
    // this.HttpClient.get("https://demo.incentro.digital/activiti-app/api/enterprise/process-definitions/Aanmeldprocestrainee2:2:19616/start-form", {headers: {'Authorization' : 'Basic YmFydC5zbW9sZGVyc0BpbmNlbnRyby5jb206MW5jZW50ck8='}})
    //       .subscribe((res : {}) => console.log(res.))
  }



  //This function retrieves the selected node on the page.
  getInput(node:NodeEntry[]) {
    this.node=node[0].entry
    this.nodeTitle = this.node.properties["cm:title"];
    this.nodeDescription = this.node.properties["cm:description"];
    

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
