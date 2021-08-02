import { Component } from '@angular/core';
import { BpmUserService, BpmUserModel } from '@alfresco/adf-core';

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {
  currentUser: Node;

  // constructor for service injection
  constructor(private userService: BpmUserService){}

  ngOnInit() {
    
    this.userService.getCurrentUserInfo()
      .subscribe((response: BpmUserModel) => {
        console.log(response)
      })
  }

}
