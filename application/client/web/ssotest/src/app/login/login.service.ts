import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SharedService } from '../../shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  uploadImgFile(){
    return this.sharedService.UPLOAD_API  + '/addAttachment';
  }
  
  signup(user: any): Observable<any> {
    return this.http.post(this.sharedService.WEB_API + '/signup', user);
  }

  googlelogin(user: any): Observable<any> {
    return this.http.post(this.sharedService.WEB_API + '/googlesignin', user);
  }
  Login(user: any): Observable<any> {
    return this.http.post(this.sharedService.WEB_API + '/login', user);
  }

  Logout(user: any): Observable<any> {
    return this.http.put(this.sharedService.WEB_API + '/logout', user);
  }

  Consent(consent: any): Observable<any> {
    return this.http.put(this.sharedService.WEB_API + '/consent', consent);
  }

  public async loginfb() 
 {
   window.open(this.sharedService.SSO_API + '/auth/facebook');
 }

  public async logingithub() 
 {
   window.open(this.sharedService.SSO_API + '/auth/github');
 }

  public authfacebooklogin(id:any): Observable<any>
 {
   return this.http.get(this.sharedService.WEB_API + '/facebooklogin/' + id);
 }

  public authgithublogin(id:any): Observable<any>
 {
   return this.http.get(this.sharedService.WEB_API + '/githublogin/' + id);
 }
}
