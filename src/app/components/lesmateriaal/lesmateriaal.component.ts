import { Component, ViewChild, Input } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { DocumentListComponent } from '@alfresco/adf-content-services';
import { PreviewService } from '../../services/preview.service';
import { NodeEntry } from '@alfresco/js-api';

@Component({
  selector: 'app-lesmateriaal',
  templateUrl: './lesmateriaal.component.html',
  styleUrls: ['./lesmateriaal.component.scss']
})
export class LesmateriaalComponent {

  @Input()
  showViewer: boolean = false;
  rootNodeId = '30e12cbb-1481-46ef-840d-6724239e3a2b';
  selectedNodeId = '30e12cbb-1481-46ef-840d-6724239e3a2b';

  @ViewChild('documentList', { static: true })
  documentList: DocumentListComponent;

  constructor(
    private notificationService: NotificationService, 
    private preview: PreviewService) {
  }

  getInput(node:NodeEntry[]){
    this.selectedNodeId=node[0].entry.id
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

  onGoBack(event: any) {
    this.showViewer = false;
    this.selectedNodeId = null;
  }

}
