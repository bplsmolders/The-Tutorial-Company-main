import { BpmUserService } from '@alfresco/adf-core';

import {  Node } from '@alfresco/js-api';
import { Component } from '@angular/core';
import { TrainingCompanyService } from 'app/services/training-company.service';
import { PersonBodyUpdate } from '@alfresco/js-api';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent  {
  currentUser: Node;
  form: PersonBodyUpdate;



  // constructor for service injection
  constructor(
    private userService: BpmUserService, 
    private ttc:TrainingCompanyService
  ){ }

  ngOnInit() {
    const user$ = this.ttc.getUserInfo()
    user$
      .pipe(
        map(res => {
          this.form.firstName = res.entry.firstName
          this.form.lastName = res.entry.lastName,
          this.form.description = res.entry.description,
          this.form.company = res.entry.company
        })
      )
  }

}
