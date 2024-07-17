import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GalleryComponent, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

type ImageGalleryContainerData = {
  imagesUrl: string[]
}

@Component({
  selector: 'app-image-gallery-container',
  standalone: true,
  imports: [GalleryModule, MatButtonModule, MatIconModule],
  templateUrl: './image-gallery-container.component.html',
  styleUrl: './image-gallery-container.component.scss'
})
export class ImageGalleryContainerComponent implements OnInit {
  dialogRef = inject(DialogRef);
  dialogData = inject<ImageGalleryContainerData>(DIALOG_DATA);
  images = signal<GalleryItem[]>([]);
  galleryComponent = viewChild(GalleryComponent)

  ngOnInit(): void {
    this.dialogData.imagesUrl.forEach((image: string) => {
      this.images().push(
        new ImageItem({ src: image, thumb: image }),
      );
    });
  }

  onCloseButton() {
    this.dialogRef.close();
  }
}
