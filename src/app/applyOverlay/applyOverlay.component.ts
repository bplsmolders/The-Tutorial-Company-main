import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from "@alfresco/adf-core";

@Component({
    selector: 'app-apply-overlay',
    templateUrl: 'applyOverlay.component.html',
    styleUrls: ['applyOverlay.component.scss'],
})

export class ApplyOverlayComponent {
    form:{
        course:string,
        fullName: string,
        company: string,
        department: string,
        position: string,
        phoneNumber:string,
        email: string
    } = {course:'', fullName:'', company:'', department: '', position:'', phoneNumber: '', email: ''}
    
    constructor(private HttpClient: HttpClient, private auth: AuthenticationService

        ){}

    @Input() closeOverlay: () => void;
    @Input() titel: string 


    ngOnInit(){
        this.form.course = this.titel
    }
    
    close = ():void => {this.closeOverlay()}

    sendForm = ():void => {
        let headers= new HttpHeaders()
            .append("Authorization", this.auth.getTicketBpm())
            .append("Content-Type","application/json")
        
        let body = JSON.stringify(
            {   
                name : "Aanmeldproces trainee 2 - August 4th 2021",
                processDefinitionId:"Aanmeldprocestrainee2:7:19710",
                variables: [
                    {
                        name: "fullName",
                        scope: "string",
                        type: "string",
                        value: `${this.form.fullName}`
                    },
                    {
                        name: `course`,
                        scope: "string",
                        type: "string",
                        value: `${this.form.course}`
                    },{
                        name: "company",
                        scope: "string",
                        type: "string",
                        value: `${this.form.company}`
                    },{
                        name: `department`,
                        scope: "string",
                        type: "string",
                        value: `${this.form.department}`
                    },{
                        name: "position",
                        scope: "string",
                        type: "string",
                        value: `${this.form.position}`
                    },{
                        name: "phoneNumber",
                        scope: "string",
                        type: "string",
                        value: `${this.form.phoneNumber}`
                    },
                    {
                        name: "email",
                        scope: "string",
                        type: "string",
                        value: `${this.form.email}`
                    }
                ]
            }
        )
        
        this.HttpClient.post(
            "https://demo.incentro.digital/activiti-app/api/enterprise/process-instances", 
            body, {headers: headers}
        )
            .subscribe(res => console.log(res))

        this.closeOverlay(); 
        alert("De aanvraag is verzonden. U zult spoedig een bericht ontvangen")

    }
}
