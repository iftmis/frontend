import { Component, Input, OnInit } from '@angular/core';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import { FindingService } from '../../finding.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Finding, FindingSource } from '../../finding';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { PageEvent } from '@angular/material/paginator';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-finding-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() source: string;
  @Input() organisationUnit: OrganisationUnit;
  totalItems: number;
  size: number;
  pageSizeOptions: number[];
  page: number;
  organisationUnitId: number;
  findingSubject: BehaviorSubject<Finding[]> = new BehaviorSubject([]);

  constructor(private findingService: FindingService) {
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

  create() {}

  update(row: Finding) {}
}
