import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-action-cell-renderer',
  standalone: true,
  template: `
    <button class="edit-button" (click)="onEdit($event)"></button>
    <button class="delete-button" (click)="onDelete($event)"></button>
  `,
  styles: [
    `
    .delete-button {
    width: 30px;
    height: 30px;
    background-image: url('../../assets/delete.png');
    background-size: cover;
    border-radius: 50%;
}

.edit-button {
    width: 30px;
    height: 30px;
    background-image: url('../../assets/pen.png');
    background-size: cover;
    border-radius: 50%;    
}
  `],
  imports: [HomeComponent],
})
export class ActionCellRendererComponent {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onEdit(event: Event): void {
    event.stopPropagation(); // Satırın tıklama olayını engellemek için
    const id = this.params.data.id;
    this.params.context.componentParent.editContact(id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    const id = this.params.data.id;
    this.params.context.componentParent.deleteContact(id);
  }

}
