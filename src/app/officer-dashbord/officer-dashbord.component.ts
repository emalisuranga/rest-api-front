import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { GenaralService } from '../service/genaral.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-officer-dashbord',
  templateUrl: './officer-dashbord.component.html',
  styleUrls: ['./officer-dashbord.component.css']
})
export class OfficerDashbordComponent implements OnInit {

  criminalForm: FormGroup;
  suspectForm: FormGroup;
  formType: string = 'criminalForm';
  UserData: any;
  criminalCase: any = [];

  constructor(
    private globalService: GenaralService,
    private router: Router
  ) {
    this.criminalForm = this.createFormGroup();
    this.suspectForm = this.suspectFormGroup();
  }

  ngOnInit() {
    if (environment.isLogin && environment.isLoginRole == 'OFFICER') {
      this.globalService.setUserData.subscribe(
        res => this.UserData = res
      );

      this.globalService.getCriminalCases().subscribe(
        res => this.criminalCase = res
      );
    } else {
      this.router.navigate(['/']);

    }
  }

  createFormGroup() {
    return new FormGroup({
      case_name: new FormControl("", Validators.required),
      case_category: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      // gender: new FormControl("", [Validators.required]),
      case_details: new FormControl("", Validators.required),
      case_place: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required)
    });
  }

  suspectFormGroup() {
    return new FormGroup({
      fist_name: new FormControl("", Validators.required),
      last_name: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      // gender: new FormControl("", [Validators.required]),
      nic: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      case_id: new FormControl("", Validators.required)
    });
  }

  checkForm(formType) {
    if (formType == 'criminalForm') {
      this.formType = 'criminalForm'
    } else if (formType == 'suspectForm') {
      this.formType = 'suspectForm'
    }
  }

  public onSubmitCriminalForm() {
    let data = this.criminalForm.value;
    data['officer_id'] = this.UserData.id

    this.globalService.criminalRegister(data).subscribe(res => {
      if (res['status']) {
        swal.fire(
          'Criminal are register!',
          'go to maneger approed!',
          'success'
        ).then((result) => {
          if (result.value) {
            this.criminalForm.reset();
            this.router.navigate(['/officer-dashbord']);
          }
        })
      }
    })
  }

  public onSubmitSuspectForm() {
    let data = this.suspectForm.value;

    this.globalService.suspectRegister(data).subscribe(res => {
      if (res['status']) {
        swal.fire(
          'Suspect are register!',
          'go to maneger approed!',
          'success'
        ).then((result) => {
          if (result.value) {
            this.suspectForm.reset();
            this.router.navigate(['/officer-dashbord']);
          }
        })
      }
    })
  }

  logOut() {
    environment.token = '';
    environment.isLogin = false;
    this.router.navigate(['/']);
  }

}
