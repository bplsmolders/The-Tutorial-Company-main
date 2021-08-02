import { NodeEntry, Node } from '@alfresco/js-api';
import { Component } from '@angular/core';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { EcmUserService } from '@alfresco/adf-core';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.scss']
})
export class TutorialPageComponent  {
  nodeId = 'ea768be7-f245-451d-a95c-c57ce52a2c15'
  node:Node;
  nodeDescription:string;
  nodeTitle:string;
  relatedGroups:Array<any>;
  trainers:Array<object>;
  constructor(
    private apiService:AlfrescoApiService,
    private userService: EcmUserService
  ) { }

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
    console.log(this.relatedGroups)
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