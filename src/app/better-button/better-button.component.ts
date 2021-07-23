import { Component, Input, Output, EventEmitter } from "@angular/core";



@Component({
    selector: 'app-better-button',
    templateUrl: 'better-button.component.html',
    styleUrls: ['better-button.component.scss'],
})
export class BetterButtonComponent {

    @Input() 
    counter = 0;

    @Output()
    counterChange: EventEmitter<number>= new EventEmitter()

    plusOne(){
        this.counter ++;
        this.counterChange.emit(this.counter)
    }

    minusOne(){
        this.counter --;
        this.counterChange.emit(this.counter)
    }
}
