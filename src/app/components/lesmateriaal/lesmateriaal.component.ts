import { Component, ViewChild, Input } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { DocumentListComponent } from '@alfresco/adf-content-services';
import { NodeEntry } from '@alfresco/js-api';
import { MinimalNode } from '@alfresco/js-api';
import { NodesApiService } from '@alfresco/adf-core';


@Component({
  selector: 'app-lesmateriaal',
  templateUrl: './lesmateriaal.component.html',
  styleUrls: ['./lesmateriaal.component.scss']
})
export class LesmateriaalComponent {

  @Input()
  showViewer: boolean = false;
  showVersionManager:boolean = false
  rootNodeId = '30e12cbb-1481-46ef-840d-6724239e3a2b';
  selectedNodeId:string;
  currentNode:MinimalNode;
  currentNodeName:string;
  

  @ViewChild('documentList', { static: true })
  documentList: DocumentListComponent;

  constructor(
    private notificationService: NotificationService, 
    private node:NodesApiService,
  ) {}

  getInput(node:NodeEntry[]){
    this.selectedNodeId=node[0].entry.id
    this.node.getNode(this.selectedNodeId).subscribe((entry:MinimalNode)=> {
      this.currentNode = entry
      this.currentNodeName=entry.name
    })
    console.log(this.currentNode)
  }

  uploadSuccess(event: any) {
    this.notificationService.openSnackMessage('File uploaded');
    this.documentList.reload();
  }

  showPreview() {
    console.log(this.selectedNodeId)
    if(this.showViewer===false){
      this.showViewer = true
    } else { 
      this.showViewer=false
    }
  }

  versionManager(){
    if(this.showVersionManager===false){
      this.showVersionManager = true
    } else { 
      this.showVersionManager=false
    }
  }

  onGoBack(event: any) {
    this.showViewer = false;
    this.selectedNodeId = null;
  }

}
