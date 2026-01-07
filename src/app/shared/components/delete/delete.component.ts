import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
@Input() label: string = 'Delete';
@Input( ) disabled: boolean = false;
@Output() confirmDelete= new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onDeleteClick(): void {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      this.confirmDelete.emit();
    }
  }
}
