import { Component, OnInit } from '@angular/core';
import { Finding } from '../finding/finding';
import { FindingRecommendation } from './recommendation';
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

  delete(row: FindingResponse) {}

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
}
