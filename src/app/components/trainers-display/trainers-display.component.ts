import { Component, Input } from "@angular/core";

@Component ({
    selector: 'app-trainers-display',
    templateUrl: './trainers-display.component.html',
    styleUrls: ['./trainers-display.component.scss']
})

export class TrainersDislplayComponent {

    @Input() trainers:Array<object>;

    

}