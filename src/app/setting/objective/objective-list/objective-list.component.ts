import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ObjectiveService } from '../objective.service';
import { ObjectiveDeleteComponent } from '../objective-delete/objective-delete.component';
import { Objective } from '../objective';

@Component({
  selector: 'app-objective-list',
  templateUrl: './objective-list.component.html',
  styleUrls: ['./objective-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveListComponent implements OnInit {
  displayedColumns = ['code', 'description', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private objectiveService: ObjectiveService
  ) {}

  ngOnInit() {}

  delete(id: number, objective: Objective) {
    const dialogRef = this.dialog.open(ObjectiveDeleteComponent, {
      data: objective,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.objectiveService.delete(id).subscribe({
          next: () => this.router.navigate(['/settings/objectives']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
