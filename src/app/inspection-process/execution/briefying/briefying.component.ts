import { Component, Input, OnInit } from '@angular/core';
import { CourtesyDetailComponent } from '../courtesy/courtesy-detail/courtesy-detail.component';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BriefyingDetailComponent } from './briefying-detail/briefying-detail.component';

@Component({
  selector: 'app-briefying',
  templateUrl: './briefying.component.html',
  styleUrls: ['./briefying.component.scss'],
})
export class BriefyingComponent implements OnInit {
  form: FormGroup;
  routeData$ = this.route.data;
  showLoader = false;
  @Input() inspectionId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  create() {
    const dialogRef = this.dialog.open(BriefyingDetailComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
      }
    });
  }
}
