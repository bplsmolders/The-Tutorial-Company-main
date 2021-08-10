import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "@alfresco/adf-core";
import { Observable } from "rxjs";

@Injectable ({
    providedIn: 'root',
})

export class TrainingCompanyService {
    constructor (
        private auth: AuthenticationService,
        private http: HttpClient
        ) {}

    sendApplicationForm = (form:ApplicationForm):void => {
        let headers= new HttpHeaders()
            .append("Authorization", this.auth.getTicketBpm())
            .append("Content-Type","application/json")
        
        let body = JSON.stringify(
            {   
                name : "Aanmeldproces trainee 2 - August 10th 2021",
                processDefinitionId:"Aanmeldprocestrainee2:12:20148",
                variables: [
                    {
                        name: "fullName",
                        scope: "string",
                        type: "string",
                        value: `${form.fullName}`
                    },
                    {
                        name: `topic`,
                        scope: "string",
                        type: "string",
                        value: `${form.topic}`
                    },
                    {
                        name: `course`,
                        scope: "string",
                        type: "string",
                        value: `${form.course}`
                    },
                    {
                        name: `training`,
                        scope: "string",
                        type: "string",
                        value: `${form.training}`
                    },
                    {
                        name: `relevantNodeId`,
                        scope: "string",
                        type: "string",
                        value: `${form.relevantNodeId}`
                    },
                    {
                        name: "company",
                        scope: "string",
                        type: "string",
                        value: `${form.company}`
                    },{
                        name: `department`,
                        scope: "string",
                        type: "string",
                        value: `${form.department}`
                    },{
                        name: "position",
                        scope: "string",
                        type: "string",
                        value: `${form.position}`
                    },{
                        name: "phoneNumber",
                        scope: "string",
                        type: "string",
                        value: `${form.phoneNumber}`
                    },
                    {
                        name: "email",
                        scope: "string",
                        type: "string",
                        value: `${form.email}`
                    }
                ]
            }
        )
        console.log(body);

        this.http.post(
            "https://demo.incentro.digital/activiti-app/api/enterprise/process-instances", 
            body, {headers: headers}
        )
            .subscribe(res => console.log(res))

    }

    // getRelevantNodeIdFromTask =  (taskId:string) : string => {
    //     let headers= new HttpHeaders()
    //       .append("Authorization", this.auth.getTicketBpm())
    //       .append("Content-Type","application/json")

    //     let nodeId:string;

    //     this.http.get <getTasksResponse> (`https://demo.incentro.digital/activiti-app/api/enterprise/tasks/${taskId}`, { headers: headers })
    //         .subscribe(res =>{
    //             let processInstanceId:string = res.processInstanceId

    //             this.http.get <getProcessInstanceResponse> (`https://demo.incentro.digital/activiti-app/api/enterprise/process-instances/${processInstanceId}`, {headers:headers})
    //             .subscribe(res => {
    //                 res.variables.forEach(variable => {
    //                     if(variable.name === "relevantNodeId"){
    //                         nodeId = variable.value
    //                         return nodeId
    //                     }
    //                 })
    //             })
    //         })
    // }

}

export class ApplicationForm {
    topic: string;
    course:string;
    training: string;
    relevantNodeId: string;
    fullName: string;
    company: string;
    department: string;
    position: string;
    phoneNumber:string;
    email: string;

    constructor(){}

}

export class CourseInfo {
    topic:string;
    course:string;
    training:string;
    nodeId:string;

    constructor(){}
}

export class getProcessInstanceResponse {
        businessKey: string;
        ended: string;
        graphicalNotationDefined: true;
        id: string;
        name: string;
        processDefinitionCategory: string;
        processDefinitionDeploymentId: string;
        processDefinitionDescription: string;
        processDefinitionId: string;
        processDefinitionKey: string;
        processDefinitionName: string;
        processDefinitionVersion: number;
        startFormDefined: true;
        started: string;
        startedBy: {
          company: string;
          email: string;
          externalId: string;
          firstName: string;
          id: number;
          lastName: string;
          pictureId: number
        };
        suspended: true;
        tenantId: string;
        variables: [
          {
            name: string;
            scope: string;
            type: string;
            value: string
          }
        ]
    
    constructor(){}
}

export class getTasksResponse {
        adhocTaskCanBeReassigned: boolean;
        assignee: {
          company: string,
          email: string,
          externalId: string,
          firstName: string,
          id: number,
          lastName: string,
          pictureId: number
        }
        category: string;
        created: string;
        description: string;
        dueDate: string;
        duration: number;
        endDate: string;
        executionId: string;
        formKey: string;
        id: string;
        initiatorCanCompleteTask: true;
        involvedGroups: [
          {
            externalId: string;
            groups: [
              {}
            ];
            id: number;
            name: string;
            parentGroupId: number;
            status: string
          }
        ];
        involvedPeople: [
          {
            company: string;
            email: string;
            externalId: string;
            firstName: string;
            id: number;
            lastName: string;
            pictureId: number
          }
        ];
        managerOfCandidateGroup: true;
        memberOfCandidateGroup: true;
        memberOfCandidateUsers: true;
        name: string;
        parentTaskId: string;
        parentTaskName: string;
        priority: number;
        processDefinitionCategory: string;
        processDefinitionDeploymentId: string;
        processDefinitionDescription: string;
        processDefinitionId: string;
        processDefinitionKey: string;
        processDefinitionName: string;
        processDefinitionVersion: number;
        processInstanceId: string;
        processInstanceName: string;
        processInstanceStartUserId: string;
        taskDefinitionKey: string;
        variables: [
          {
            name: string;
            scope: string;
            type: string;
            value: object;
          }
        ]

    constructor(){}
}