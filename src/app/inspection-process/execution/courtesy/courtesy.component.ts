import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourtesyDetailComponent } from './courtesy-detail/courtesy-detail.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courtesy',
  templateUrl: './courtesy.component.html',
  styleUrls: ['./courtesy.component.scss'],
})
export class CourtesyComponent implements OnInit {
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
    const dialogRef = this.dialog.open(CourtesyDetailComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
      }
    });
  }
}
