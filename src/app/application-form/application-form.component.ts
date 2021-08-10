import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { ApplicationForm, CourseInfo } from "app/training-company.service";
import { TrainingCompanyService } from "app/training-company.service";

@Component({
    selector: 'app-application-form',
    templateUrl: 'application-form.component.html',
    styleUrls: ['application-form.component.scss'],
})

export class ApplicationFormComponent {
    form:ApplicationForm = new ApplicationForm();
    
    constructor(
        private ttc: TrainingCompanyService,
    ){}

    @Input() closeOverlay: () => void;
    @Input() courseInfo: CourseInfo;


    ngOnInit(){
        this.form.topic = this.courseInfo.topic
        this.form.course = this.courseInfo.course
        this.form.training = this.courseInfo.training
        this.form.relevantNodeId = this.courseInfo.nodeId
    }
    
    close = ():void => {this.closeOverlay()}

    sendForm = ():void => {
        this.ttc.sendApplicationForm(this.form)

        this.closeOverlay(); 
        alert("De aanvraag is verzonden. U zult spoedig een bericht ontvangen")
    }
}
