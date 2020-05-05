import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { GenaralService } from '../service/genaral.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert2';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-criminal-case',
  templateUrl: './criminal-case.component.html',
  styleUrls: ['./criminal-case.component.css']
})
export class CriminalCaseComponent implements OnInit {

  criminalCase: any = [];
  officerList: any = [];
  isAddOffcer: boolean;
  caseID: any;
  officerId: any;

  constructor(
    private globalService: GenaralService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.isAddOffcer = false;
    if (environment.isLogin && environment.isLoginRole == 'ADMIN') {

      this.globalService.getCriminalCases().subscribe(
        res => this.criminalCase = res
      );

      this.globalService.getOfficer().subscribe(
        res => {
          if (res) {
            this.officerList = res['user_data']
          }
        }
      );
    } else {
      this.router.navigate(['/']);

    }


  }

  setOfficer(id) {
    let data = {
      id: id,
      officer_id: this.officerId
    }

    this.globalService.addOfficerCriminalCases(data).subscribe(
      res => {
        if (res) {
          swal.fire(
            'ADD OFFICER!',
            '',
            'success'
          ).then((result) => {
            if (result.value) {
              this.isAddOffcer = !this.isAddOffcer;
              this.caseID = '';
              this.ngOnInit();
              this.router.navigate(['/criminal-case']);
            }
          })
        }

      }
    );
  }

  addOfficerCheck(id) {
    this.caseID = id;
    this.isAddOffcer = !this.isAddOffcer;
  }

}
