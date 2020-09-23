import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionSubAreaService } from '../inspection-sub-area.service';
import { InspectionSubAreaDeleteComponent } from '../inspection-sub-area-delete/inspection-sub-area-delete.component';
import { InspectionSubArea } from '../inspection-sub-area';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionSubAreaDetailComponent } from '../inspection-sub-area-detail/inspection-sub-area-detail.component';
import { SubAreaService } from '../../../../setting/sub-area/sub-area.service';
import { InspectionAreaService } from '../../inspection-area/inspection-area.service';
import { groupBy } from 'lodash';
import { InspectionArea } from '../../inspection-area/inspection-area';

@Component({
  selector: 'app-inspection-sub-area-list',
  templateUrl: './inspection-sub-area-list.component.html',
  styleUrls: ['./inspection-sub-area-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionSubAreaListComponent implements OnInit {
  displayedColumns = ['name', 'generalObjective', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;
  @Input() inspectionId: number;
  @Input() stage: any;
  inspectionAreaWithSubAreas: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  subAreas: any;
  openedId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionSubAreaService: InspectionSubAreaService,
    private inspectionAreaService: InspectionAreaService
  ) {}

  ngOnInit() {
    this.loadAreasWithSubAreas();
  }

  loadAreasWithSubAreas() {
    if (this.inspectionId === undefined) {
      return;
    }
    this.inspectionAreaService
      .getWithSubAreas(this.inspectionId)
      .subscribe(res => {
        this.extractSubAreasIds(res);
      });
  }

  extractSubAreasIds(obj: any) {
    const x = obj.map((o: any) => {
      // @ts-ignore
      return {
        ...o,
        selectedSubAreaIds: o.inspectionSubAreas.map(
          (s: InspectionSubArea) => s.subAreaId
        ),
      };
    });
    this.inspectionAreaWithSubAreas.next(x);
  }

  getInspectionAreas(): Observable<any> {
    return this.inspectionAreaWithSubAreas.asObservable();
  }

  delete(id: number, inspectionSubArea: InspectionSubArea) {
    const dialogRef = this.dialog.open(InspectionSubAreaDeleteComponent, {
      data: inspectionSubArea,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionSubAreaService.delete(id).subscribe({
          next: () => this.loadAreasWithSubAreas(),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  createOrUpdate(
    selectedArea: any,
    inspectionSubArea: InspectionSubArea | null
  ) {
    const dialogRef = this.dialog.open(InspectionSubAreaDetailComponent, {
      data: {
        inspectionSubArea: inspectionSubArea || {
          inspectionAreaId: selectedArea.id,
        },
        selectedArea,
      },
      width: '400px',
      role: 'dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAreasWithSubAreas();
      }
    });
  }

  addOrRemove(checked: boolean, subAreaId: number, objId: number) {}

  toggleSubArea($event: any) {
    console.log($event);
  }
}
