import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SkillService } from '../../../../store/skill.service';

@Component({
  selector: 'app-skill-detail',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    RouterLink,
  ],
  templateUrl: './skill-detail.component.html',
  styles: ``
})
export class SkillDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(SkillService);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('skillId')!),
  )
  @ViewChild(CdkVirtualScrollViewport) private scrollViewport?: CdkVirtualScrollViewport;
  data$ = this.id$.pipe(
    switchMap((id) => this.service.getOne(id)),
  )

  onHeaderClick() {
    this.router.navigate(['./'], { relativeTo: this.route });
    this.scrollViewport?.scrollToOffset(0, 'smooth');
  }
}
