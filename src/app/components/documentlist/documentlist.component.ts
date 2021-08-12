import { Component, ViewChild, Input } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { DocumentListComponent } from '@alfresco/adf-content-services';
import { PreviewService } from '../../services/preview.service';
import { NodePermissionDialogService } from '@alfresco/adf-content-services';

@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.css']
})
export class DocumentlistComponent {

  @Input()
  showViewer: boolean = false;

  nodeId = 'ea768be7-f245-451d-a95c-c57ce52a2c15';

  @ViewChild('documentList', { static: true })
  documentList: DocumentListComponent;

  constructor(
    private notificationService: NotificationService, 
    private preview: PreviewService,
    private nodePermissionService: NodePermissionDialogService) {
  }

  uploadSuccess(event: any) {
    this.notificationService.openSnackMessage('File uploaded');
    this.documentList.reload();
  }

  showPreview(event) {
    const entry = event.value.entry;
    if (entry && entry.isFile) {
      this.preview.showResource(entry.id);
    }
  }

  onGoBack(event: any) {
    this.showViewer = false;
    this.nodeId = null;
  }

}
