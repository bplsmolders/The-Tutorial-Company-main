import { BpmUserModel, BpmUserService } from '@alfresco/adf-core';
import { NodeEntry, Node } from '@alfresco/js-api';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent  {
  currentUser: Node;

  // constructor for service injection
  constructor(private userService: BpmUserService, private httpClient: HttpClient){}

  ngOnInit() {
    this.userService.getCurrentUserInfo()
      .subscribe((response: BpmUserModel) => {
        console.log(response)
      })
  }

}
