import { Component, OnInit } from '@angular/core';
import { OrganisationUnitService } from '../setting/organisation-unit/organisation-unit.service';
import { OrganisationUnit } from '../setting/organisation-unit/organisation-unit';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { FinancialYear } from '../setting/financial-year/financial-year';
import { FinancialYearService } from '../setting/financial-year/financial-year.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss'],
})
export class InspectionComponent implements OnInit {
  nodes: BehaviorSubject<any> = new BehaviorSubject([]);
  financialYears: FinancialYear[] | null = [];
  inspectionType: string = 'PLANNED';
  selectedFinancialYear: FinancialYear;
  organisation: any;

  options = {
    getChildren: this.getChildren.bind(this),
  };

  constructor(
    private ouService: OrganisationUnitService,
    private router: Router,
    private fyService: FinancialYearService
  ) {}

  ngOnInit(): void {
    this.ouService.getByUser().subscribe(resp => {
      this.nodes.next(this.mapToNode(resp));
    });
    this.loadFyrs();
  }

  loadFyrs() {
    this.fyService.getAll().subscribe(res => {
      this.financialYears = res.body;
    });
  }

  getChildren(node: any) {
    return new Promise((resolve, reject) => {
      this.ouService.getByParent(node.id).subscribe(resp => {
        resolve(this.mapToNode(resp));
      });
    });
  }

  mapToNode(ous: OrganisationUnit[]) {
    return ous.map(o => {
      return { id: o.id, name: o.name, hasChildren: true };
    });
  }

  onOuChange($e: any) {
    this.organisation = $e.node.data;
    this.navigate();
  }

  onTypeChange() {
    this.navigate();
  }

  onFyChange() {
    this.navigate();
  }

  navigate() {
    if (
      this.inspectionType === undefined ||
      this.organisation === undefined ||
      this.selectedFinancialYear === undefined
    ) {
      return;
    }
    // Todo if planned check selected Ou if exist in list of plans
    this.router.navigate([
      '/inspections',
      this.selectedFinancialYear.id,
      this.inspectionType,
      this.organisation.id,
    ]);
  }
}
