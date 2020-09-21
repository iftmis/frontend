import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionIndicatorService } from '../inspection-indicator.service';
import { InspectionIndicatorDeleteComponent } from '../inspection-indicator-delete/inspection-indicator-delete.component';
import { InspectionIndicator } from '../inspection-indicator';
import { InspectionAreaService } from '../../../preparation/inspection-area/inspection-area.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITreeModel, ITreeNode } from 'angular-tree-component/dist/defs/api';
import { InspectionSubArea } from '../../../preparation/inspection-sub-area/inspection-sub-area';
import { InspectionIndicatorDetailComponent } from '../inspection-indicator-detail/inspection-indicator-detail.component';
import { InspectionProcedureDetailComponent } from '../inspection-procedure-detail/inspection-procedure-detail.component';
import { InspectionProcedureDeleteComponent } from '../inspection-procedure-delete/inspection-procedure-delete.component';
import { InspectionProcedureService } from '../inspection-procedure.service';
import { ITreeState } from 'angular-tree-component';
import { InspectionProcedure } from '../inspection-procedure';
import { InspectionWorkDoneDetailComponent } from '../../../inspection-work-done/inspection-work-done-detail/inspection-work-done-detail.component';
import { InspectionWorkDone } from 'src/app/inspection-process/inspection-work-done/inspection-work-done';
import { InspectionWorkDoneService } from 'src/app/inspection-process/inspection-work-done/inspection-work-done.service';

@Component({
  selector: 'app-inspection-indicator-list',
  templateUrl: './inspection-indicator-list.component.html',
  styleUrls: ['./inspection-indicator-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionIndicatorListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'result', 'isOk', 'finding', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  @Input() inspectionId: number;
  nodes: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  treeOptions: {};
  inspectionIndicators: BehaviorSubject<
    InspectionIndicator[]
  > = new BehaviorSubject<InspectionIndicator[]>([]);
  inspectionProcedures: BehaviorSubject<
    InspectionProcedure[]
  > = new BehaviorSubject<InspectionProcedure[]>([]);
  selectedIndicator: any;
  selectedSubArea: any;
  openedId: number;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private inspectionIndicatorService: InspectionIndicatorService,
    private inspectionAreaService: InspectionAreaService,
    private inspectionProcedureService: InspectionProcedureService,
    private workDoneService: InspectionWorkDoneService
  ) {}

  ngOnInit() {
    this.loadInspectionAreasWithSubAreas();
  }

  get state(): ITreeState {
    return localStorage.areaState && JSON.parse(localStorage.areaState);
  }
  set state(state) {
    localStorage.areaState = JSON.stringify(state);
  }
  compareWith(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  loadWorkDone(p: InspectionProcedure) {
    if (p.workDoneLoaded) {
      return;
    }
    this.workDoneService.getByProcedure(p.id!).subscribe(res => {
      p.inspectionWorkDone = res;
      p.workDoneLoaded = true;
    });
  }

  addWorkDone(p: InspectionProcedure, workDone?: InspectionWorkDone): void {
    const data = workDone ? workDone : { procedureId: p.id };
    const dialogRef = this.dialog.open(InspectionWorkDoneDetailComponent, {
      width: '400px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        p.workDoneLoaded = false;
        this.loadWorkDone(p);
      }
    });
  }

  createOrEditFinding(w: InspectionWorkDone, finding?: any): void {}

  loadInspectionAreasWithSubAreas() {
    this.inspectionAreaService
      .getWithSubAreas(this.inspectionId)
      .subscribe(res => {
        this.nodes.next(
          res.map((a: any) => {
            return {
              id: a.id,
              name: a.name,
              expanded: true,
              hasChildren: true,
              isSubArea: false,
              children: a.inspectionSubAreas.map((sa: any) => {
                return {
                  id: sa.id,
                  name: sa.subAreaName,
                  subAreaId: sa.subAreaId,
                  isSubArea: true,
                };
              }),
            };
          })
        );
      });
  }

  loadIndicators(inspectionSubAreaId: number) {
    this.inspectionIndicators.next([]);
    this.inspectionProcedures.next([]);
    this.showLoader = true;

    this.inspectionIndicatorService
      .getByInspectionSubArea(inspectionSubAreaId)
      .subscribe(
        res => {
          this.inspectionIndicators.next(res);
          this.showLoader = false;
        },
        error => {
          this.showLoader = false;
        }
      );
  }

  loadProcedures(inspectionIndicatorId: number) {
    this.inspectionProcedures.next([]);
    if (!inspectionIndicatorId) {
      return;
    }
    this.inspectionProcedureService
      .getByInspectionProcedure(inspectionIndicatorId)
      .subscribe(res => {
        this.inspectionProcedures.next(res);
      });
  }

  getInspectionIndicators(): Observable<InspectionIndicator[]> {
    return this.inspectionIndicators.asObservable();
  }

  getInspectionProcedures(): Observable<InspectionProcedure[]> {
    return this.inspectionProcedures.asObservable();
  }

  onSubAreaSelected(node: ITreeNode) {
    this.selectedSubArea = node.data;
    if (this.selectedSubArea?.isSubArea) {
      this.loadIndicators(this.selectedSubArea.id);
    } else {
      node.toggleExpanded();
    }
    console.log(node);
  }

  delete(id: number, inspectionIndicator: InspectionIndicator) {
    const dialogRef = this.dialog.open(InspectionIndicatorDeleteComponent, {
      data: inspectionIndicator,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionIndicatorService.delete(id).subscribe({
          next: () => this.loadIndicators(this.selectedSubArea.id),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  addProcedure(
    indicator: InspectionIndicator,
    procedure?: InspectionProcedure
  ) {
    const dialogRef = this.dialog.open(InspectionProcedureDetailComponent, {
      data: {
        inspectionProcedure: procedure || {
          inspectionIndicatorId: indicator.id,
        },
        inspectionIndicators: [indicator],
        existingProcedures: this.inspectionProcedures
          .getValue()
          .map((i: any) => i.id),
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.loadProcedures(indicator.id!);
      }
    });
  }

  addIndicator(inspectionIndicator: any) {
    const dialogRef = this.dialog.open(InspectionIndicatorDetailComponent, {
      data: {
        inspectionIndicator: inspectionIndicator || {
          inspectionSubAreaId: this.selectedSubArea.id,
        },
        inspectionSubAreas: [this.selectedSubArea],
        existingIndicators: this.inspectionIndicators
          .getValue()
          .map((i: any) => i.indicatorId),
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.loadIndicators(this.selectedSubArea.id);
      }
    });
  }

  deleteProcedure(id: any, inspectionProcedure: InspectionProcedure) {
    const dialogRef = this.dialog.open(InspectionProcedureDeleteComponent, {
      data: inspectionProcedure,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionProcedureService.delete(id).subscribe({
          next: () =>
            this.loadProcedures(inspectionProcedure.inspectionIndicatorId!),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.state);
    if (this.state && this.state.focusedNodeId) {
      this.selectedSubArea = { id: this.state.focusedNodeId, isSubArea: true };
      // @ts-ignore
      this.loadIndicators(this.state.focusedNodeId);
    }
  }
}
