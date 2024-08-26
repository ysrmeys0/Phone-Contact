import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-cell-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img [src]="getImageUrl()" [ngClass]="getImageClass()" class="contact-photo" />
  `,
  styleUrls: ['./image-cell-renderer.component.css']
})
export class ImageCellRendererComponent {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  getImageUrl(): string {
    const isFavouriteColumn = this.params.colDef?.headerName === 'Favourite' || this.params.colDef?.headerName === 'Favori';
    const isFavourite = this.params.value;

    if (isFavouriteColumn) {
      return isFavourite
        ? `../assets/fav.png` 
        : `../assets/unfav.png`; 
    } else {
      const profileImageUrl = this.params.value;
      return profileImageUrl
        ? profileImageUrl 
        : `../../assets/profile.png`;
    }
  }

  getImageClass(): string {
    const isFavouriteColumn = this.params.colDef?.headerName === 'Favourite' || this.params.colDef?.headerName === 'Favori';
    return isFavouriteColumn ? 'favourite-icon' : 'profile-image';
  }
}
