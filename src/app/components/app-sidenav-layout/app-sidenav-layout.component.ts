import { Component } from '@angular/core';
import { BpmUserService, BpmUserModel } from '@alfresco/adf-core';

@Component({
  selector: 'app-root',
  templateUrl: './app-sidenav-layout.component.html',
  styleUrls: ['./app-sidenav-layout.component.css']
})
export class AppSidenavLayoutComponent {
  currentUser: Node;

  // constructor for service injection
  constructor(private userService: BpmUserService){}

  ngOnInit() {
    this.userService.getCurrentUserInfo()
      .subscribe((response: BpmUserModel) => {
        response
      })
  }

}
