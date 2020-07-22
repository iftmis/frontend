import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Finding } from '../../finding';
import { FindingRecommendation } from './recommendation';
import { RecommendationService } from './recommendation.service';
import { ToastService } from '../../../shared/toast.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSelectionListChange } from '@angular/material/list';
import { FindingResponseService } from './finding-response.service';
import { FindingResponse } from './finding-response';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-finding-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  displayedColumns = ['id', 'date', 'response', 'source', 'formActions'];

  totalItems: number;
  size: number;
  pageSizeOptions: number[];
  page: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService,
    private findingRecommendationService: RecommendationService,
    private findingResponseService: FindingResponseService
  ) {
    this.finding = data.finding;
    this.findingId = 0;
    this.totalItems = 0;
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
  }

  ngOnInit(): void {
    if (this.finding) {
      this.findingId = this.finding?.id as number;
    }
    this.loadData(this.findingId);
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

  delete(id: number, row: FindingResponse) {}

  update(row: FindingResponse) {}

  getResponseData(): Observable<FindingResponse[]> {
    return this.findingResponseSubject.asObservable();
  }

  create() {}
}
