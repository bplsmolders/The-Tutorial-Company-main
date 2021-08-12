import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "@alfresco/adf-core";
import { Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { ApplicationForm, getProcessInstanceResponse, FormJSONBody} from "./ts-interfaces.service";

// put services in the whole app. 

@Injectable ({
    providedIn: 'root',
})

export class TrainingCompanyService {
    constructor (
        private auth: AuthenticationService,
        private http: HttpClient
        ) {}

    /**
     * @param taskId 
     * @returns observable that gets the processId so it can be used in the function "getProcessInstance"
     */
    getNodeIdFromTask(taskId:string): Observable<any> {
        let headers= new HttpHeaders()
        .append("Authorization", this.auth.getTicketBpm())
        .append("Content-Type","application/json")

    return this.http.get <any> (`https://demo.incentro.digital/activiti-app/api/enterprise/tasks/${taskId}`, { headers: headers }) 
        .pipe( 
        concatMap(res => 
            this.getProcessInstance(res.processInstanceId)
        )
        )
    }

    /**
     * 
     * @param processInstanceId 
     * @returns observable that gets the current NodeId wich is ten used to call te relevant document with the adf-document-list.
     */

    getProcessInstance ( processInstanceId:string ): Observable<any> {
    let headers= new HttpHeaders()
    .append("Authorization", this.auth.getTicketBpm())
    .append("Content-Type","application/json")

    return this.http.get <getProcessInstanceResponse> (`https://demo.incentro.digital/activiti-app/api/enterprise/process-instances/${processInstanceId}`, {headers:headers})
        .pipe(
        map(res => res.variables.find(variable => variable.name == "relevantNodeId").value)
        )
    }

    sendApplicationForm = (form:ApplicationForm):void => {
        let headers= new HttpHeaders()
            .append("Authorization", this.auth.getTicketBpm())
            .append("Content-Type","application/json")
        
        let body: FormJSONBody = 
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
        
        console.log(body);

        this.http.post(
            "https://demo.incentro.digital/activiti-app/api/enterprise/process-instances", 
            JSON.stringify(body), {headers: headers}
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

