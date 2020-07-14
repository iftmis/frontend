import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { RiskRegisterService } from '../risk-register.service';
import { RiskRegisterFormService } from './risk-register-form.service';
import { RiskRegister } from '../risk-register';
import { FinancialYearService } from '../../../setting/financial-year/financial-year.service';
import { FinancialYear } from '../../../setting/financial-year/financial-year';
import { ToastService } from '../../../shared/toast.service';
import { OrganisationUnitService } from '../../../setting/organisation-unit/organisation-unit.service';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';

@Component({
  selector: 'app-risk-register-detail',
  templateUrl: './risk-register-detail.component.html',
  styleUrls: ['./risk-register-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskRegisterDetailComponent implements OnInit {
  riskRegister: RiskRegister;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  financialYears: FinancialYear[];
  nodes: BehaviorSubject<any> = new BehaviorSubject([]);
  options = { getChildren: this.getChildren.bind(this) };
  currentOrganisationUnit: OrganisationUnit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: RiskRegisterFormService,
    private riskRegisterService: RiskRegisterService,
    private financialYearService: FinancialYearService,
    private toastService: ToastService,
    private ouService: OrganisationUnitService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ riskRegister }) => {
      this.riskRegister = riskRegister;
      this.form = this.formService.toFormGroup(riskRegister);
    });
    this.loadFinancialYears();
    this.ouService.getByUser().subscribe(resp => {
      this.nodes.next(this.mapToNode(resp));
    });
    this.error = undefined;
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
    /*this.router.navigate(['/risk-management/risk-register', $e.node.data.id]);*/
    this.currentOrganisationUnit = $e.node.data;
    console.log(this.currentOrganisationUnit);
  }

  loadFinancialYears() {
    this.financialYearService.getAllUnPaged().subscribe(
      response => {
        this.financialYears = response;
      },
      error => {}
    );
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.riskRegisterService.update(
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.riskRegisterService.create(
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<RiskRegister>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'create') {
          this.toastService.success('Success!', 'Risk Created Successfully!');
        } else {
          this.toastService.success('Success!', 'Risk Updated Successfully!');
        }
        this.router.navigate(['/risk-management/risk-register']);
      },
      error: response => {
        this.isSaveOrUpdateInProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.isSaveOrUpdateInProgress = false),
    });
  }

  cancel() {
    this.router.navigate(['/risk-management/risk-register']);
    return false;
  }
}
