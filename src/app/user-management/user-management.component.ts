import { PeopleContentService } from '@alfresco/adf-core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent  {
  constructor(private peopleService:PeopleContentService){}
  
  
}
