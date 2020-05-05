import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { GenaralService } from '../service/genaral.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { environment } from './../../environments/environment';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

  contactForm: FormGroup;
  category: any[] = [];
  qualifications: any[] = [];
  selectQualifications: any[] = []
  qualificationsId: number;

  constructor(
    private globalService: GenaralService,
    private router: Router
  ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {
    if (environment.isLogin && environment.isLoginRole == 'ADMIN') {

    } else {
      this.router.navigate(['/']);

    }
  }

  createFormGroup() {
    return new FormGroup({
      first_name: new FormControl("", Validators.required),
      nic: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      // gender: new FormControl("", [Validators.required]),
      last_name: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      rank_id: new FormControl("", Validators.required),
      rank: new FormControl("", Validators.required)
    });
  }

  public onSubmit() {
    let data = this.contactForm.value;
    this.globalService.officerRegister(data).subscribe(res => {
      if (res['success']) {
        swal.fire(
          'Officer is register!',
          'success'
        ).then((result) => {
          if (result.value) {
            this.contactForm.reset();
            this.router.navigate(['/criminal-case']);
          }
        })
      } else {
        swal.fire(
          'Register Error!',
          'This email already exists',
          'error'
        )
      }
    })
  }
}