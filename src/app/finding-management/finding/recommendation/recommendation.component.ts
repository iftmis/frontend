import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Finding } from '../../finding';
import { FindingRecommendation } from './recommendation';
import { RecommendationService } from './recommendation.service';
import { ToastService } from '../../../shared/toast.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-finding-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationComponent implements OnInit {
  finding: Finding;
  findingId: number;
  showLoader = false;
  selectedRecommendation: FindingRecommendation;
  findingRecommendationSubject: BehaviorSubject<
    FindingRecommendation[]
  > = new BehaviorSubject([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService,
    private findingRecommendationService: RecommendationService
  ) {
    this.finding = data.finding;
    this.findingId = 0;
  }

  ngOnInit(): void {
    if (this.finding) {
      this.findingId = this.finding?.id as number;
    }
    this.loadData(this.findingId);
  }

  loadData(findingId: number) {
    this.findingRecommendationService.getAll(findingId).subscribe(response => {
      this.selectedRecommendation = response[0];
      this.findingRecommendationSubject.next(response);
    });
  }

  getData(): Observable<FindingRecommendation[]> {
    return this.findingRecommendationSubject.asObservable();
  }

  loadResponses(event: MatSelectionListChange) {
    this.selectedRecommendation = (event.source
      ._value as unknown) as FindingRecommendation;
  }
}
