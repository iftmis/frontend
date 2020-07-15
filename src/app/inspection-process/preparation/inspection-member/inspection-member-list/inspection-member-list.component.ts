import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { InspectionMemberService } from '../inspection-member.service';
import { InspectionMemberDeleteComponent } from '../inspection-member-delete/inspection-member-delete.component';
import { InspectionMember } from '../inspection-member';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionMemberDetailComponent } from '../inspection-member-detail/inspection-member-detail.component';

@Component({
  selector: 'app-inspection-member-list',
  templateUrl: './inspection-member-list.component.html',
  styleUrls: ['./inspection-member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionMemberListComponent implements OnInit {
  displayedColumns = [
    'userFullName',
    'email',
    'role',
    'letterAttachmentPath',
    'declarationAttachmentName',
    'formActions',
  ];
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
    private inspectionMemberService: InspectionMemberService
  ) {}

  ngOnInit() {
    this.loadMembers();
  }
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
    const dialogRef = this.dialog.open(InspectionMemberDetailComponent, {
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
