import { SharedService } from '../shared/shared.service';
import { TemplateModule } from './template/template.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { TranslatorModule } from './translator/translator.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SefscreenModule } from './sefscreen/sefscreen.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { HomeModule } from './home/home.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ManagerolesModule } from './manageroles/manageroles.module';
import { ManageusersModule } from './manageusers/manageusers.module';
import { ManagecontrolModule } from './managecontrol/managecontrol.module';
import { UserModule } from './user/user.module';
import { VaultadminModule } from './vaultadmin/vaultadmin.module';
import { SefscreenModule } from './sefscreen/sefscreen.module';

@NgModule({
  declarations: [
                                  AppComponent
],
  imports: [
  SefscreenModule,
VaultadminModule,
ManagecontrolModule,
ManageusersModule,
ManagerolesModule,
AuthorizationModule,
  SefscreenModule,
VaultadminModule,
ManagecontrolModule,
ManageusersModule,
ManagerolesModule,
AuthorizationModule,
  SefscreenModule,
VaultadminModule,
ManagecontrolModule,
ManageusersModule,
ManagerolesModule,
AuthorizationModule,
  SefscreenModule,
VaultadminModule,
ManagecontrolModule,
ManageusersModule,
ManagerolesModule,
AuthorizationModule,
  SefscreenModule,
VaultadminModule,
ManagecontrolModule,
ManageusersModule,
ManagerolesModule,
AuthorizationModule,
  SefscreenModule,
VaultadminModule,
ManagecontrolModule,
ManageusersModule,
ManagerolesModule,
AuthorizationModule,
  SefscreenModule,
VaultadminModule,
ManagecontrolModule,
ManageusersModule,
ManagerolesModule,
AuthorizationModule,
      BrowserModule,
BrowserAnimationsModule,
AppRoutingModule,
TranslatorModule,
HeaderModule,
FooterModule,
TemplateModule,
AuthorizationModule,
ManagerolesModule,
ManageusersModule,
ManagecontrolModule,
VaultadminModule,
HttpClientModule,
FormsModule,
  SefscreenModule,
AuthorizationModule,
ManagerolesModule,
ManageusersModule,
ManagecontrolModule,
VaultadminModule,
  SefscreenModule,
AuthorizationModule,
ManagerolesModule,
ManageusersModule,
ManagecontrolModule,
VaultadminModule,
  SefscreenModule,
AuthorizationModule,
ManagerolesModule,
ManageusersModule,
ManagecontrolModule,
VaultadminModule,
  SefscreenModule,
AuthorizationModule,
ManagerolesModule,
ManageusersModule,
ManagecontrolModule,
VaultadminModule,
  SefscreenModule,
AuthorizationModule,
ManagerolesModule,
ManageusersModule,
ManagecontrolModule,
VaultadminModule,
  SefscreenModule,
AuthorizationModule,
ManagerolesModule,
ManageusersModule,
ManagecontrolModule,
VaultadminModule,
  SefscreenModule,
LoginModule,
SignupModule,
HomeModule,
AuthorizationModule,
ManagerolesModule,
ManageusersModule,
ManagecontrolModule,
UserModule,
VaultadminModule,
SefscreenModule
],
  providers: [
                              	SharedService
],
  bootstrap: [
  ]
})
export class AppModule { }