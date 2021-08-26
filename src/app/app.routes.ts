/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Routes } from '@angular/router';
import { AuthGuardBpm, AuthGuardEcm } from '@alfresco/adf-core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AppsComponent } from './components/apps/apps.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { LesmateriaalComponent } from './components/lesmateriaal/lesmateriaal.component';
import { StartProcessComponent } from './components/start-process/start-process.component';
import { AppSidenavLayoutComponent } from './components/app-sidenav-layout/app-sidenav-layout.component';
import { FileViewComponent } from './components/file-view/file-view.component';
import { BlobViewComponent } from './components/file-view/blob-view.component';
import { ApplicationPageComponent } from './components/application-page/application-page.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DrawingsComponent } from './components/drawings/drawings.component';

export const appRoutes: Routes = [
  { path: 'files/:nodeId/view', component: FileViewComponent, canActivate: [AuthGuardEcm], outlet: 'overlay' },
  { path: 'preview/blob', component: BlobViewComponent, outlet: 'overlay', pathMatch: 'full' },
  {
    path: '',
    component: AppSidenavLayoutComponent,
    children: [
              {
                  path: '',
                  component: HomeComponent
              },
              {
                path: 'home',
                component: HomeComponent
            },
            {
              path:'application-page',
              component: ApplicationPageComponent,
              canActivate: [ AuthGuardEcm ]
            },
              {
                path: 'apps',
                component: AppsComponent,
                canActivate: [ AuthGuardBpm ]
              },
              {
                path: 'apps/:appId/tasks',
                component: TasksComponent,
                canActivate: [ AuthGuardBpm ]
              },
              {
                path: 'apps/:appId/tasks/:taskId',
                component: TaskDetailsComponent,
                canActivate: [ AuthGuardBpm ]
              },
              {
                path: 'apps/:appId/start-process',
                component: StartProcessComponent,
                canActivate: [ AuthGuardBpm ]
              },
              {
                path: 'lesmateriaal',
                component: LesmateriaalComponent,
                canActivate: [ AuthGuardEcm ]
              },
              {
                path: 'my-profile',
                component: MyProfileComponent,
                canActivate: [ AuthGuardEcm ]
              },
              {
                path: 'user-management',
                component: UserManagementComponent,
                canActivate: [ AuthGuardEcm ]
              },
              {
                path: 'drawings',
                component: DrawingsComponent,
                canActivate: [ AuthGuardEcm ]
              }
          ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
