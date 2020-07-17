import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionObjectiveService } from '../inspection-objective.service';
import { InspectionObjectiveDeleteComponent } from '../inspection-objective-delete/inspection-objective-delete.component';
import { InspectionObjective } from '../inspection-objective';
import { InspectionAreaService } from '../../inspection-area/inspection-area.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionArea } from '../../inspection-area/inspection-area';
import { InspectionObjectiveDetailComponent } from '../inspection-objective-detail/inspection-objective-detail.component';

@Component({
  selector: 'app-inspection-objective-list',
  templateUrl: './inspection-objective-list.component.html',
  styleUrls: ['./inspection-objective-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionObjectiveListComponent implements OnInit {
  displayedColumns = ['name', 'formActions'];
  inspectionAreaWithObjectives: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  inspectionObjective: BehaviorSubject<
    InspectionObjective[]
  > = new BehaviorSubject<InspectionObjective[]>([]);
  showLoader = false;
  @Input() inspectionId: number;
  selectedArea: InspectionArea;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionObjectiveService: InspectionObjectiveService,
    private inspectionAreaService: InspectionAreaService
  ) {}

  ngOnInit() {
    this.loadAreasWithObjectives();
  }

  loadAreasWithObjectives() {
    this.inspectionAreaService
      .getWithObjectives(this.inspectionId)
      .subscribe(res => {
        this.inspectionAreaWithObjectives.next(res || []);
      });
  }

  getAreaWithObjective(): Observable<any> {
    return this.inspectionAreaWithObjectives.asObservable();
  }

  delete(id: number, inspectionObjective: InspectionObjective) {
    const dialogRef = this.dialog.open(InspectionObjectiveDeleteComponent, {
      data: inspectionObjective,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionObjectiveService.delete(id).subscribe({
          next: () => this.loadAreasWithObjectives(),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  createOrUpdate(
    inspectionAreaId: number,
    inspectionObjective: InspectionObjective | null
  ) {
    const dialogRef = this.dialog.open(InspectionObjectiveDetailComponent, {
      data: {
        inspectionObjective: inspectionObjective || { inspectionAreaId },
        inspectionAreas: this.inspectionAreaWithObjectives.getValue(),
      },
      width: '400px',
      role: 'dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAreasWithObjectives();
      }
    });
  }
}
