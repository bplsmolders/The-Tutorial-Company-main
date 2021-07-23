import { NodeEntry, Node } from '@alfresco/js-api';
import { Component } from '@angular/core';
import { Shine } from '@alfresco/adf-content-services';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.scss']
})
export class TutorialPageComponent  {
  nodeId = 'ea768be7-f245-451d-a95c-c57ce52a2c15'
  node:Node
  relatedGroups:Array<any>;
  constructor(private groupService:GroupService) { }

  getInput(node:NodeEntry[]) {
    this.node=node[0].entry
    if(this.node.permissions.locallySet){
      this.relatedGroups=this.node.permissions.locallySet
    } else{
      this.relatedGroups = this.node.permissions.inherited
    }

    this.relatedGroups.forEach(group => {
      if(group.authorityId.toUpperCase().includes(this.node.name.toUpperCase())){
        console.log(group)
        this.groupService.listAllGroupMembershipsForPerson
      } else {
        console.log("no match")
      }
    })

  }
}
