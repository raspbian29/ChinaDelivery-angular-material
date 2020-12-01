import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {TablesComponent} from './components/tables/tables.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {FormsComponent} from './components/forms/forms.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './guards/router/router-guard.service';
import {AuthComponent} from './components/auth/auth.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseRestInterceptor} from './interceptors/BaseRestInterceptor';
import {DeclarationsComponent} from './components/declarations/declarations.component';
import {AuthInterceptor} from './interceptors/AuthInterceptor';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { PackageRequestsComponent } from './components/package-requests/package-requests.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'declarations',
    component: DeclarationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forms',
    component: FormsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tables',
    component: TablesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'package-requests',
    component: PackageRequestsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    TablesComponent,
    FormsComponent,
    AuthComponent,
    DeclarationsComponent,
    AccountSettingsComponent,
    PackageRequestsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BaseRestInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
