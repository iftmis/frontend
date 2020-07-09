import { Component, OnInit } from '@angular/core';
import { OrganisationUnitService } from '../setting/organisation-unit/organisation-unit.service';
import { OrganisationUnit } from '../setting/organisation-unit/organisation-unit';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss'],
})
export class InspectionComponent implements OnInit {
  nodes: BehaviorSubject<any> = new BehaviorSubject([]);
  options = {
    getChildren: this.getChildren.bind(this),
  };

  constructor(
    private ouService: OrganisationUnitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ouService.getByUser().subscribe(resp => {
      this.nodes.next(this.mapToNode(resp));
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
    this.router.navigate(['/inspections', $e.node.data.id]);
  }
}
