import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenaralService {

  headers: any;
  private userData = new BehaviorSubject([])
  public setUserData = this.userData.asObservable();
  httpOptions

  constructor(
    private http: HttpClient
  ) {
  }



  // get approed student data
  getCriminalCases() {
    let url = "http://127.0.0.1:8000/api/criminalCases";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + environment.token
      })
    };
    return this.http.get(url, this.httpOptions);
  }

  login(data) {

    let url = "http://127.0.0.1:8000/api/login";
    return this.http.post(url, {
      email: data.email,
      password: data.password,
      rank: data.rank
    }).pipe(tap(resp => {

      if (resp['success']) {
        environment.token = resp['token'];
        environment.isLoginRole = resp['user_data']['rank'];
        environment.isLogin = true
        this.userData.next(resp['user_data'])
      }

    }), catchError((error) => {
      return error.statusText;
    }));

  }

  officerRegister(data) {

    let url = "http://127.0.0.1:8000/api/register";
    return this.http.post(url, data).pipe(tap(resp => {

      if (resp['success']) {
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  criminalRegister(data) {

    let url = "http://127.0.0.1:8000/api/criminalCases";
    return this.http.post(url, data, this.httpOptions).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  suspectRegister(data) {

    let url = "http://127.0.0.1:8000/api/suspect";
    return this.http.post(url, data, this.httpOptions).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  getOfficer() {

    let url = "http://127.0.0.1:8000/api/getOfficer";
    return this.http.get(url, this.httpOptions).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  addOfficerCriminalCases(data) {
    let url = "http://127.0.0.1:8000/api/setOfficer";
    return this.http.post(url, data, this.httpOptions).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }




















  setApprodStudent(id) {
    let url = "http://127.0.0.1:8000/api/approed";
    return this.http.post(url, {
      id: id
    }).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  setRejectStudent(id) {

    let url = "http://127.0.0.1:8000/api/student";
    return this.http.delete(url + "/" + id).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));

  }

  getRegister() {
    let url = "http://127.0.0.1:8000/api/withOutRegister";
    return this.http.get(url);
  }

  updeteStudentDetail(id, data) {

    let url = "http://127.0.0.1:8000/api/student";

    return this.http.put(url + "/" + id, data).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  filterStudent(data) {

    let url = "http://127.0.0.1:8000/api/filter";
    return this.http.post(url, {
      key: data.key,
      value: data.value
    }).pipe(tap(resp => {
      if (resp['status']) {
        console.log(resp)
      }

    }), catchError((error) => {
      return error.statusText;
    }));
  }

  getQualifications() {

    let url = "http://127.0.0.1:8000/api/qualifications";
    return this.http.get(url);

  }

  testMultipleApi1() {
    let url = "http://127.0.0.1:8000/api/testMultApi";
    return this.http.get(url);
  }

  testMultipleApi2() {
    let url = "http://127.0.0.1:8000/api/testMultApi2";
    return this.http.get(url);
  }

}
