import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() total = 0;
  @Input() limit = 10;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }

  get startItem(): number {
    if (this.total === 0) return 0;
    return (this.page - 1) * this.limit + 1;
  }

  get endItem(): number {
    return Math.min(this.page * this.limit, this.total);
  }

  goToFirst(): void {
    if (this.page === 1) return;
    this.pageChange.emit(1);
  }

  goToLast(): void {
    if (this.page === this.totalPages) return;
    this.pageChange.emit(this.totalPages);
  }
}
