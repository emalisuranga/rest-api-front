import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { GenaralService } from '../service/genaral.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isOfficer: boolean = true;

  constructor(
    private globalService: GenaralService,
    private router: Router
  ) {
    this.loginForm = this.loginFormGroup();
  }

  ngOnInit() {
  }

  loginFormGroup() {
    return new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  public onSubmit() {

    let rank;

    if (this.isOfficer) {
      rank = 'OFFICER'
    } else {
      rank = 'ADMIN'
    }
    let data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
      rank: rank
    }


    this.globalService.login(data).subscribe(serverResp => {
      if (serverResp['success']) {

        if (serverResp['user_data']['rank'] == 'ADMIN') {
          console.log(serverResp['user_data']['rank'])
          this.router.navigate(['/criminal-case']);
        } else if (serverResp['user_data']['rank'] == 'OFFICER') {
          this.router.navigate(['/officer-dashbord']);
        }


      } else {
        swal.fire(
          'Login Error!',
          'Please check user name and password!',
          'error'
        )
        this.router.navigate(['']);
      }
    });
  }

  checkUser() {
    this.isOfficer = !this.isOfficer;
  }

}
