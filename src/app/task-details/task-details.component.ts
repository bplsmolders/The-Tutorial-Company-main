import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormRenderingService } from '@alfresco/adf-core';
import { CustomEditorComponent } from '../stencils.module';
import { PreviewService } from '../services/preview.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from "@alfresco/adf-core";
import { TrainingCompanyService } from 'app/training-company.service';
import { getTasksResponse } from 'app/training-company.service';
import { getProcessInstanceResponse } from 'app/training-company.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  appId: string = null;
  taskId: string = null;
  fileShowed: any = null;
  nodeId:string
  content: any = null;
  contentName: any = null;

  constructor(private route: ActivatedRoute,
              formRenderingService: FormRenderingService,
              private preview: PreviewService,
              private http:HttpClient,
              private auth:AuthenticationService,
              private ttc: TrainingCompanyService
              ) {
    formRenderingService.setComponentTypeResolver('testole_01', () => CustomEditorComponent, true);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.appId && params.appId !== '0') {
          this.appId = params.appId;
      }
      if (params.taskId) {
        this.taskId = params.taskId;
        let headers= new HttpHeaders()
          .append("Authorization", this.auth.getTicketBpm())
          .append("Content-Type","application/json")


        this.http.get <getTasksResponse> (`https://demo.incentro.digital/activiti-app/api/enterprise/tasks/${this.taskId}`, { headers: headers })
            .subscribe(res =>{
                let processInstanceId:string = res.processInstanceId

                this.http.get <getProcessInstanceResponse> (`https://demo.incentro.digital/activiti-app/api/enterprise/process-instances/${processInstanceId}`, {headers:headers})
                .subscribe(res => {
                    res.variables.forEach(variable => {
                        if(variable.name === "relevantNodeId"){
                            this.nodeId = variable.value
                        }
                    })
                })
            })

      }
  })};

  onContentClick(content: any): void {
    if (content.contentBlob) {
      this.preview.showBlob(content.name, content.contentBlob);
    } else {
      this.preview.showResource(content.sourceId.split(';')[0]);
    }
  }

}
