import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionBudgetService } from '../inspection-budget.service';
import { InspectionBudgetDeleteComponent } from '../inspection-budget-delete/inspection-budget-delete.component';
import { InspectionBudget } from '../inspection-budget';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionBudgetDetailComponent } from '../inspection-budget-detail/inspection-budget-detail.component';

@Component({
  selector: 'app-inspection-budget-list',
  templateUrl: './inspection-budget-list.component.html',
  styleUrls: ['./inspection-budget-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionBudgetListComponent implements OnInit {
  displayedColumns = [
    'gfsCodeName',
    'unitPrice',
    'quantity',
    'frequency',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;
  @Input() inspectionId: number;
  budget: BehaviorSubject<InspectionBudget[]> = new BehaviorSubject<
    InspectionBudget[]
  >([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionBudgetService: InspectionBudgetService
  ) {}

  ngOnInit() {
    this.loadBudget();
  }

  loadBudget() {
    this.inspectionBudgetService
      .getByInspection(this.inspectionId)
      .subscribe(res => {
        this.budget.next(res);
      });
  }

  getBudget(): Observable<InspectionBudget[]> {
    return this.budget.asObservable();
  }

  createOrEdit(inspectionBudget?: InspectionBudget) {
    const dialogRef = this.dialog.open(InspectionBudgetDetailComponent, {
      data: inspectionBudget || { inspectionId: this.inspectionId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBudget();
      }
    });
  }

  delete(id: number, inspectionBudget: InspectionBudget) {
    const dialogRef = this.dialog.open(InspectionBudgetDeleteComponent, {
      data: inspectionBudget,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionBudgetService.delete(id).subscribe({
          next: () => this.loadBudget(),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
