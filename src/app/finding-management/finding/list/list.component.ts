import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import { FindingService } from '../../finding.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Finding } from '../../finding';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { PageEvent } from '@angular/material/paginator';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastService } from '../../../shared/toast.service';
import { FormComponent as FindingFormComponent } from '../form/form.component';
import { FindingConfirmationComponent } from '../confirmation/finding-confirmation.component';
import { RecommendationComponent } from '../recommendation/recommendation.component';

@Component({
  selector: 'app-finding-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {
  displayedColumns = [
    'id',
    'code',
    'finding',
    'actionPlanCategory',
    'status',
    'formActions',
  ];
  @Input() source: string;
  @Input() organisationUnit: OrganisationUnit;
  totalItems: number;
  size: number;
  pageSizeOptions: number[];
  page: number;
  organisationUnitId: number;
  findingSubject: BehaviorSubject<Finding[]> = new BehaviorSubject([]);
  showLoader = false;

  constructor(
    private findingService: FindingService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {
    this.totalItems = 0;
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
  }

  ngOnInit(): void {
    if (this.organisationUnit) {
      this.organisationUnitId = this.organisationUnit?.id as number;
    } else {
      this.organisationUnitId = 0;
    }
    this.loadData(this.page, this.size, this.organisationUnitId, this.source);
  }

  loadData(
    page: number,
    size: number,
    organisationUnitId: number,
    source: string
  ) {
    this.findingService
      .getAllPaged(page, size, organisationUnitId, source)
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers),
        () => this.onError()
      );
  }

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadData(this.page, this.size, this.organisationUnitId, this.source);
  }

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.findingSubject.next(data);
  }

  onError(): void {}

  getData(): Observable<Finding[]> {
    return this.findingSubject.asObservable();
  }

  create() {
    const data = {
      organisationUnit: this.organisationUnit,
      source: this.source,
      action: 'create',
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(FindingFormComponent, dialogConfig);

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadData(
          this.page,
          this.size,
          this.organisationUnitId,
          this.source
        );
        this.toastService.success('Success!', 'Finding Recorded Successfully!');
      }
    });
  }

  update(row: Finding) {
    const data = {
      organisationUnit: this.organisationUnit,
      source: this.source,
      action: 'update',
      finding: row,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(FindingFormComponent, dialogConfig);

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadData(
          this.page,
          this.size,
          this.organisationUnitId,
          this.source
        );
        this.toastService.success(
          'Success!',
          'Finding Record Updated Successfully!'
        );
      }
    });
  }

  delete(id: number, finding: Finding) {
    const dialogRef = this.dialog.open(FindingConfirmationComponent, {
      data: {
        action: 'delete',
        finding,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.findingService.delete(id).subscribe({
          next: () => {
            this.loadData(
              this.page,
              this.size,
              this.organisationUnitId,
              this.source
            );
            this.toastService.success(
              'Success',
              'Finding Deleted Successfully!'
            );
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const organisationUnit = changes.organisationUnit
      .currentValue as OrganisationUnit;
    if (organisationUnit) {
      this.organisationUnitId = organisationUnit?.id as number;
      this.organisationUnit = organisationUnit as OrganisationUnit;
    } else {
      this.organisationUnitId = 0;
      this.organisationUnit = {} as OrganisationUnit;
    }
    this.loadData(this.page, this.size, this.organisationUnitId, this.source);
  }

  close(id: number, finding: Finding) {
    const dialogRef = this.dialog.open(FindingConfirmationComponent, {
      data: {
        action: 'close',
        finding,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.findingService.close(id).subscribe({
          next: () => {
            this.loadData(
              this.page,
              this.size,
              this.organisationUnitId,
              this.source
            );
            this.toastService.success(
              'Success',
              'Finding Closed Successfully!'
            );
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  recommendations(row: Finding) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      finding: row,
    };
    this.dialog.open(RecommendationComponent, dialogConfig);
  }
}
