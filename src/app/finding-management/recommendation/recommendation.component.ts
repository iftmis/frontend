import { Component, OnInit } from '@angular/core';
import { Finding } from '../finding/finding';
import { FindingRecommendation, ImplementationStatus } from './recommendation';
import { BehaviorSubject, Observable } from 'rxjs';
import { FindingResponse } from './finding-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../shared/toast.service';
import { RecommendationService } from './recommendation.service';
import { FindingResponseService } from './finding-response.service';
import { FindingService } from '../finding/finding.service';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../shared/pagination.constants';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent as ResponseFormComponent } from '../recommendation/form/form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent implements OnInit {
  finding: Finding;
  findingId: number;
  showLoader = false;
  selectedRecommendation: FindingRecommendation;
  findingRecommendationSubject: BehaviorSubject<
    FindingRecommendation[]
  > = new BehaviorSubject([]);
  findingResponseSubject: BehaviorSubject<
    FindingResponse[]
  > = new BehaviorSubject([]);
  displayedColumns = [
    'id',
    'date',
    'response',
    'source',
    'createdBy',
    'formActions',
  ];

  totalItems: number;
  size: number;
  pageSizeOptions: number[];
  page: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private findingRecommendationService: RecommendationService,
    private findingResponseService: FindingResponseService,
    private findingService: FindingService,
    private dialog: MatDialog
  ) {
    this.findingId = this.route.snapshot.params.id;
    this.totalItems = 0;
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
  }

  ngOnInit(): void {
    this.loadData(this.findingId);
    this.loadFinding(this.findingId);
  }

  loadFinding(id: number) {
    this.findingService.getById(id).subscribe(response => {
      this.finding = response;
    });
  }

  loadData(findingId: number) {
    this.findingRecommendationService.getAll(findingId).subscribe(response => {
      this.selectedRecommendation = response[0];
      this.loadResponseEntries(
        this.page,
        this.size,
        this.selectedRecommendation?.id as number
      );
      this.findingRecommendationSubject.next(response);
    });
  }

  getData(): Observable<FindingRecommendation[]> {
    return this.findingRecommendationSubject.asObservable();
  }

  loadFindingResponses(event: MatSelectionListChange) {
    this.selectedRecommendation = event.option.value;
    this.loadResponseEntries(this.page, this.size, event.option.value.id);
  }

  loadResponseEntries(
    page: number,
    size: number,
    findingRecommendationId: number
  ) {
    this.findingResponseService
      .getAllPaged(page, size, findingRecommendationId)
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers),
        () => this.onError()
      );
  }

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadResponseEntries(
      this.page,
      this.size,
      this.selectedRecommendation?.id as number
    );
  }

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.findingResponseSubject.next(data);
  }

  onError(): void {}

  getResponseData(): Observable<FindingResponse[]> {
    return this.findingResponseSubject.asObservable();
  }

  create() {
    const data = {
      action: 'create',
      findingRecommendation: this.selectedRecommendation,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(ResponseFormComponent, dialogConfig);

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadResponseEntries(
          this.page,
          this.size,
          this.selectedRecommendation?.id as number
        );
        this.toastService.success(
          'Success!',
          'Response Recorded Successfully!'
        );
      }
    });
  }

  update(row: FindingResponse) {
    const data = {
      action: 'update',
      findingRecommendation: this.selectedRecommendation,
      findingResponse: row,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(ResponseFormComponent, dialogConfig);

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadResponseEntries(
          this.page,
          this.size,
          this.selectedRecommendation?.id as number
        );
        this.toastService.success('Success!', 'Response Updated Successfully!');
      }
    });
  }

  color(implementationStatus: ImplementationStatus) {
    if (implementationStatus.toString() === 'NOT_IMPLEMENTED') {
      return '#FF1744';
    } else if (implementationStatus.toString() === 'PARTIAL_IMPLEMENTED') {
      return '#900C3F';
    } else if (implementationStatus.toString() === 'IMPLEMENTED') {
      return '#43A047';
    } else if (implementationStatus.toString() === 'TAKEN_BY_EVENT') {
      return '#0039cb';
    } else {
      return '#FF1744';
    }
  }

  delete(findingResponse: FindingResponse) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        action: 'delete',
        findingResponse,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.findingResponseService
          .delete(findingResponse.id as number)
          .subscribe({
            next: () => {
              this.loadResponseEntries(
                this.page,
                this.size,
                this.selectedRecommendation?.id as number
              );
              this.toastService.success(
                'Success',
                'Response Deleted Successfully!'
              );
            },
            error: () => (this.showLoader = false),
            complete: () => (this.showLoader = false),
          });
      }
    });
  }
}
