import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionMember } from '../../preparation/inspection-member/inspection-member';
import { InspectionMemberService } from '../../preparation/inspection-member/inspection-member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InspectionMemberDeleteComponent } from '../../preparation/inspection-member/inspection-member-delete/inspection-member-delete.component';
import { CourtesyDetailComponent } from './courtesy-detail/courtesy-detail.component';
import { FormGroup } from '@angular/forms';
import { JhiDataUtils, JhiFileLoadError } from 'ng-jhipster';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-courtesy',
  templateUrl: './courtesy.component.html',
  styleUrls: ['./courtesy.component.scss'],
})
export class CourtesyComponent implements OnInit {
  form: FormGroup;
  displayedColumns = ['userFullName', 'email', 'role', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;
  @Input() inspectionId: number;
  members: BehaviorSubject<InspectionMember[]> = new BehaviorSubject<
    InspectionMember[]
  >([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    protected dataUtils: JhiDataUtils,
    protected elementRef: ElementRef,
    private inspectionMemberService: InspectionMemberService
  ) {}

  ngOnInit(): void {}
  loadMembers() {
    this.inspectionMemberService
      .getByInspection(this.inspectionId)
      .subscribe(res => {
        this.members.next(res.body || []);
      });
  }

  getMembers(): Observable<InspectionMember[]> {
    return this.members.asObservable();
  }
  delete(id: number, inspectionMember: InspectionMember) {
    const dialogRef = this.dialog.open(InspectionMemberDeleteComponent, {
      data: inspectionMember,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionMemberService.delete(id).subscribe({
          next: () => this.loadMembers(),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  createOrEdit(inspectionMember?: InspectionMember) {
    const dialogRef = this.dialog.open(CourtesyDetailComponent, {
      data: { inspectionMember, inspectionId: this.inspectionId },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadMembers();
      if (result) {
        this.showLoader = true;
      }
    });
  }
}
