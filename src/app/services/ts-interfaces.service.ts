export interface FormJSONBody{
    name: string;
    processDefinitionId: string;
    variables?: (VariablesEntity)[] | null;
}
      
export interface VariablesEntity {
    name: string;
    scope: string;
    type: string;
    value: string;
}

export interface PersonBodyUpdate{
  
    firstName: string,
    lastName: string,
    description: string,
    email: string,
    skypeId: string,
    googleId: string,
    instantMessageId: string,
    jobTitle: string,
    location: string,
    company: {
      organization: string,
      address1: string,
      address2: string,
      address3: string,
      postcode: string,
      telephone: string,
      fax: string,
      email: string
    },
    mobile: string,
    telephone: string,
    userStatus: string,
    enabled: true,
    emailNotificationsEnabled: true,
    password: string,
    oldPassword: string,
    aspectNames: [
      string
    ],
    properties: {}
  
}

export interface getUserResponse {
  
    entry: {
      id: string,
      firstName: string,
      lastName: string,
      displayName: string,
      description: string,
      avatarId: string,
      email: string,
      skypeId: string,
      googleId: string,
      instantMessageId: string,
      jobTitle: string,
      location: string,
      company: {
        organization: string,
        address1: string,
        address2: string,
        address3: string,
        postcode: string,
        telephone: string,
        fax: string,
        email: string
      },
      mobile: string,
      telephone: string,
      statusUpdatedAt: string,
      userStatus: string,
      enabled: true,
      emailNotificationsEnabled: true,
      aspectNames: [string],
      properties: {},
      capabilities: {
        isAdmin: true,
        isGuest: true,
        isMutable: true
      }
    }
  
}
      

export class ApplicationForm {
  topic: string;
  course:string;
  training: string;
  relevantNodeId: string;
  fullName: string;
  company: string;
  department: string;
  position: string;
  phoneNumber:string;
  email: string;

  constructor(){}
}

export interface CourseInfo {
    topic:string;
    course:string;
    training:string;
    nodeId:string;
}

export interface getProcessInstanceResponse {
  businessKey: string;
  ended: string;
  graphicalNotationDefined: true;
  id: string;
  name: string;
  processDefinitionCategory: string;
  processDefinitionDeploymentId: string;
  processDefinitionDescription: string;
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionName: string;
  processDefinitionVersion: number;
  startFormDefined: true;
  started: string;
  startedBy: {
    company: string;
    email: string;
    externalId: string;
    firstName: string;
    id: number;
    lastName: string;
    pictureId: number
  };
  suspended: true;
  tenantId: string;
  variables: [
    {
      name: string;
      scope: string;
      type: string;
      value: string
    }
  ]
}

export interface getTasksResponse {
        adhocTaskCanBeReassigned: boolean;
        assignee: {
          company: string,
          email: string,
          externalId: string,
          firstName: string,
          id: number,
          lastName: string,
          pictureId: number
        }
        category: string;
        created: string;
        description: string;
        dueDate: string;
        duration: number;
        endDate: string;
        executionId: string;
        formKey: string;
        id: string;
        initiatorCanCompleteTask: true;
        involvedGroups: [
          {
            externalId: string;
            groups: [
              {}
            ];
            id: number;
            name: string;
            parentGroupId: number;
            status: string
          }
        ];
        involvedPeople: [
          {
            company: string;
            email: string;
            externalId: string;
            firstName: string;
            id: number;
            lastName: string;
            pictureId: number
          }
        ];
        managerOfCandidateGroup: true;
        memberOfCandidateGroup: true;
        memberOfCandidateUsers: true;
        name: string;
        parentTaskId: string;
        parentTaskName: string;
        priority: number;
        processDefinitionCategory: string;
        processDefinitionDeploymentId: string;
        processDefinitionDescription: string;
        processDefinitionId: string;
        processDefinitionKey: string;
        processDefinitionName: string;
        processDefinitionVersion: number;
        processInstanceId: string;
        processInstanceName: string;
        processInstanceStartUserId: string;
        taskDefinitionKey: string;
        variables: [
          {
            name: string;
            scope: string;
            type: string;
            value: object;
          }
        ]
}