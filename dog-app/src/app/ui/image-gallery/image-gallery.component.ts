import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { ImageGalleryContainerComponent } from '../image-gallery-container/image-gallery-container.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export type GalleryData = {
  [key: string]: {
    mainImage: string;
    images: string[];
  }
};

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [NgFor, NgIf, ImageGalleryContainerComponent, DialogModule, JsonPipe, TitleCasePipe, MatCardModule, MatButtonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent {
  gallery = input.required<GalleryData>()
  categories = computed<(keyof GalleryData)[]>(() => Object.keys(this.gallery()));
  dialog = inject(Dialog);

  onImageGalleyClick(galleryName: string | number) {
    const imagesUrl = this.gallery()[galleryName].images.filter((image: string) => image !== '');
    this.dialog.open<void>(ImageGalleryContainerComponent, {
      width: '100%',
      height: '100%',
      data: {
        imagesUrl
      }
    });
  }
}
