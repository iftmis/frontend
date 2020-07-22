import {
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

@Component({
  selector: 'app-inspection-indicator-list',
  templateUrl: './inspection-indicator-list.component.html',
  styleUrls: ['./inspection-indicator-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionIndicatorListComponent implements OnInit {
  displayedColumns = ['name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;
  @Input() inspectionId: number;
  nodes: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  treeOptions: {};
  inspectionIndicators: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  openedId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionIndicatorService: InspectionIndicatorService,
    private inspectionAreaService: InspectionAreaService
  ) {}

  ngOnInit() {
    this.loadInspectionAreasWithSubAreas();
  }

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
                  isSubArea: true,
                };
              }),
            };
          })
        );
      });
  }

  loadIndicatorsWithProcedure(inspectionSubAreaId: number) {
    this.inspectionIndicatorService
      .getByInspectionSubArea(inspectionSubAreaId)
      .subscribe(res => {
        this.inspectionIndicators.next(res);
      });
  }

  getInspectionIndicators(): Observable<any> {
    return this.inspectionIndicators.asObservable();
  }

  onSubAreaSelected(node: ITreeNode) {
    const data = node.data;
    if (data?.isSubArea) {
      this.loadIndicatorsWithProcedure(data.id);
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
          next: () => this.router.navigate(['/inspection-indicators']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  addProcedure(i: any) {}
}
