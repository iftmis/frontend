import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from '../user.service';
import { UserFormService } from './user-form.service';
import { User } from '../user';
import { OrganisationUnitService } from '../../../setting/organisation-unit/organisation-unit.service';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import { ITreeState, TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  user: User;
  form: FormGroup;
  authorities: string[] = [];
  isSaveOrUpdateInProgress = false;
  langKeyOptions: KeyValue<string, string>[] = [
    { key: 'en', value: 'English' },
    { key: 'sw', value: 'Kiswahili' },
  ];
  selectedOrganisationUnit: OrganisationUnit;
  nodes: BehaviorSubject<any> = new BehaviorSubject([]);
  options = {
    getChildren: this.getChildren.bind(this),
  };
  parentId: any = 0;
  @ViewChild('tree') tree: TreeComponent;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: UserFormService,
    private organisationUnitService: OrganisationUnitService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      this.user = user;
      this.form = this.formService.toFormGroup(user);
    });
    this.loadRoles();
    this.parentId = this.state?.focusedNodeId;
    this.loadOrganisationUnits();
    this.error = undefined;
  }

  loadOrganisationUnits() {
    this.organisationUnitService.getByUser().subscribe(resp => {
      this.nodes.next(this.mapToNode(resp));
      const ou = resp[0];
      if (this.parentId === undefined && ou !== undefined) {
        this.parentId = ou.id;
      }
    });
  }

  getChildren(node: any) {
    return new Promise((resolve, reject) => {
      this.organisationUnitService.getByParent(node.id).subscribe(resp => {
        resolve(this.mapToNode(resp));
      });
    });
  }

  mapToNode(ous: OrganisationUnit[]) {
    return ous.map(o => {
      return {
        id: o.id,
        name: o.name,
        organisationUnitLevel: o.organisationUnitLevel,
        hasChildren: true,
      };
    });
  }

  onOuChange($e: any) {
    this.parentId = $e.node.data.id;
    this.selectedOrganisationUnit = $e.node.data;
  }

  get state(): ITreeState {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }

  set state(state) {
    localStorage.treeState = JSON.stringify(state);
  }

  loadRoles() {
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities;
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      const payload = {
        id: this.form.value.id,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        login: this.form.value.login,
        organisationUnit: { id: this.selectedOrganisationUnit.id },
        activated: this.form.value.activated,
        authorities: this.form.value.authorities,
        email: this.form.value.email,
        langKey: this.form.value.langKey,
      } as User;
      this.subscribeToResponse(this.userService.update(payload));
    } else {
      const payload = {
        id: this.form.value.id,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        login: this.form.value.login,
        organisationUnit: { id: this.selectedOrganisationUnit.id },
        activated: this.form.value.activated,
        authorities: this.form.value.authorities,
        email: this.form.value.email,
        langKey: this.form.value.langKey,
      } as User;
      console.log(payload);
      this.subscribeToResponse(this.userService.create(payload));
    }
  }

  private subscribeToResponse(result: Observable<User>) {
    result.subscribe({
      next: () => this.router.navigate(['/user-management/users']),
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
    this.router.navigate(['/user-management/users']);
    return false;
  }
}
