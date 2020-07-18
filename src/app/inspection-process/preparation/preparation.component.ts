import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionArea } from './inspection-area/inspection-area';
import { AuditableArea } from '../../setting/auditable-area/auditable-area';
import { AuditableAreaService } from '../../setting/auditable-area/auditable-area.service';
import { InspectionAreaService } from './inspection-area/inspection-area.service';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.scss'],
})
export class PreparationComponent implements OnInit {
  inspectionId: number;
  inspectionAreas: BehaviorSubject<InspectionArea[]> = new BehaviorSubject<
    InspectionArea[]
  >([]);
  auditableAreas: BehaviorSubject<AuditableArea[]> = new BehaviorSubject<
    AuditableArea[]
  >([]);
  allAreasAuditableAreas: AuditableArea[] = [];
  selectedAreas: AuditableArea[] = [];
  selectedInspectionAreas: InspectionArea[] = [];

  constructor(
    private route: ActivatedRoute,
    private auditableAreaService: AuditableAreaService,
    private inspectionAreaService: InspectionAreaService
  ) {
    this.inspectionId = route.snapshot.parent?.parent?.params['id'];
    this.loadAuditableAreas();
  }

  loadAuditableAreas() {
    this.auditableAreaService.getAllUnPaged().subscribe(res => {
      this.allAreasAuditableAreas = res;
      this.loadInspectionAreas();
    });
  }

  loadInspectionAreas() {
    this.inspectionAreaService
      .getByInspection(this.inspectionId)
      .subscribe(res => {
        this.inspectionAreas.next(res);
        this.filterAreas(res);
      });
  }
  saveAll(areas: AuditableArea[]) {
    if (areas === undefined || areas.length === 0) {
      return;
    }
    const inspectionAreasToAdd = areas.map(a => {
      console.log(a);
      return {
        name: a.name,
        auditableAreaId: a.id,
        inspectionId: this.inspectionId,
      };
    });
    // @ts-ignore
    this.inspectionAreaService
      .saveAll(inspectionAreasToAdd)
      .subscribe(res => this.onSuccess());
  }

  removeAll(inAreas: InspectionArea[]) {
    this.inspectionAreaService
      .removeAll(inAreas)
      .subscribe(res => this.onSuccess());
  }

  onSuccess() {
    this.loadInspectionAreas();
    this.selectedAreas = [];
    this.selectedInspectionAreas = [];
  }

  filterAreas(inspectionAreas: any) {
    const ids = inspectionAreas.map((a: any) => a.auditableAreaId || 0);
    // @ts-ignore
    const filtered = this.allAreasAuditableAreas.filter(
      a => ids.indexOf(a.id) === -1
    );
    this.auditableAreas.next(filtered);
  }

  getInspectionAreas(): Observable<InspectionArea[]> {
    return this.inspectionAreas.asObservable();
  }

  getAuditableAreas(): Observable<AuditableArea[]> {
    return this.auditableAreas.asObservable();
  }

  ngOnInit(): void {
    this.inspectionAreas.subscribe(areas => {});
  }
}
