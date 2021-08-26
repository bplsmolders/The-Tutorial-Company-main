import {  Node } from '@alfresco/js-api';
import { Component } from '@angular/core';
import { TrainingCompanyService } from 'app/services/training-company.service';
import { PersonBodyUpdate } from '@alfresco/js-api';
import { EcmUserService } from '@alfresco/adf-core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent  {
  currentUser: any;
  currentUserId:string;
  form: PersonBodyUpdate;

  // constructor for service injection
  constructor(
    private userService: EcmUserService, 
    private ttc:TrainingCompanyService,
  ){ }

  ngOnInit() {
    this.ttc.getUserInfo()
    this.userService.getCurrentUserInfo().subscribe(res => this.currentUser = res)
  }

  updateUser(){
    const body = JSON.stringify(this.currentUser)
    this.ttc.updateUser(body, this.currentUserId)
    console.log(body)
  }

}
