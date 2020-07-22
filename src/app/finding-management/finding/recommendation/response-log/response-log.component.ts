import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FindingRecommendation } from '../recommendation';
import { FindingResponseService } from './finding-response.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FindingResponse } from './finding-response';
import { PageEvent } from '@angular/material/paginator';
import { HttpHeaders } from '@angular/common/http';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../../shared/pagination.constants';

@Component({
  selector: 'app-response-log',
  templateUrl: './response-log.component.html',
  styleUrls: ['./response-log.component.scss'],
})
export class ResponseLogComponent implements OnInit, OnChanges {
  @Input() recommendation: FindingRecommendation;
  findingResponseSubject: BehaviorSubject<
    FindingResponse[]
  > = new BehaviorSubject([]);
  totalItems: number;
  size: number;
  pageSizeOptions: number[];
  page: number;
  recommendationId: number;
  showLoader = false;
  displayedColumns = ['id', 'date', 'response', 'source', 'formActions'];

  constructor(private findingResponseService: FindingResponseService) {
    this.totalItems = 0;
    this.page = 0;
    this.recommendationId = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
  }

  ngOnInit(): void {
    if (this.recommendation) {
      this.recommendationId = this.recommendation?.id as number;
    }
    this.loadData(this.page, this.size, this.recommendationId);
  }

  loadData(page: number, size: number, recommendationId: number) {
    this.findingResponseService
      .getAllPaged(page, size, recommendationId)
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers),
        () => this.onError()
      );
  }

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadData(this.page, this.size, this.recommendationId);
  }

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.findingResponseSubject.next(data);
  }

  onError(): void {}

  getData(): Observable<FindingResponse[]> {
    return this.findingResponseSubject.asObservable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const recommendation = changes.recommendation
      .currentValue as FindingRecommendation;
    if (recommendation) {
      this.recommendationId = recommendation?.id as number;
      this.recommendation = recommendation as FindingRecommendation;
    } else {
      this.recommendationId = 0;
      this.recommendation = {} as FindingRecommendation;
    }
    this.loadData(this.page, this.size, this.recommendationId);
  }

  delete(id: number, row: FindingResponse) {}

  update(row: FindingResponse) {}
}
