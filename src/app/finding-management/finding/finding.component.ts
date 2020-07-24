import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganisationUnit } from '../../setting/organisation-unit/organisation-unit';
import { BehaviorSubject } from 'rxjs';
import { ITreeState, TreeComponent } from 'angular-tree-component';
import { OrganisationUnitService } from '../../setting/organisation-unit/organisation-unit.service';

@Component({
  selector: 'app-finding',
  templateUrl: './finding.component.html',
  styleUrls: ['./finding.component.scss'],
})
export class FindingComponent implements OnInit {
  selectedOrganisationUnit: OrganisationUnit;
  nodes: BehaviorSubject<any> = new BehaviorSubject([]);
  options = {
    getChildren: this.getChildren.bind(this),
  };
  parentId: any = 0;
  @ViewChild('tree') tree: TreeComponent;

  constructor(private organisationUnitService: OrganisationUnitService) {}

  ngOnInit(): void {
    this.parentId = this.state?.focusedNodeId;
    this.loadOrganisationUnits();
  }

  getChildren(node: any) {
    return new Promise((resolve, reject) => {
      this.organisationUnitService.getByParent(node.id).subscribe(resp => {
        resolve(this.mapToNode(resp));
      });
    });
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
    /*loadFindings();*/
  }

  get state(): ITreeState {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }

  set state(state) {
    localStorage.treeState = JSON.stringify(state);
  }
}
