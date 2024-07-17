import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Breed, Subbreed } from '../../models/breed';
import { MatCardModule } from '@angular/material/card';
import { Dialog } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageGalleryContainerComponent } from '../../ui/image-gallery-container/image-gallery-container.component';
import { GalleryData, ImageGalleryComponent } from '../../ui/image-gallery/image-gallery.component';

function parseSubbreedsToGalleryImages(subbreeds?: Subbreed[]): GalleryData | undefined {
  let galleyData: GalleryData = {};
  if (!subbreeds) {
    return undefined;
  }

  for (let subbreed of subbreeds) {
    const images = subbreed.imagesUrl ? [...subbreed.imagesUrl] : [];
    const mainImage = images.length > 0 ? images[0] : '';
    galleyData[subbreed.id] = {
      mainImage,
      images
    }
  }
  return galleyData;
}

@Component({
  selector: 'app-breed-details-controller',
  standalone: true,
  imports: [ImageGalleryComponent, MatButtonModule, MatIconModule, TitleCasePipe, NgIf, NgFor, MatCardModule],
  templateUrl: './breed-details-controller.component.html',
  styleUrl: './breed-details-controller.component.scss'
})
export class BreedDetailsControllerComponent {
  breed = input.required<Breed>();
  imageGallery = computed<GalleryData | undefined>(() => {
    if (this.breed().imagesUrl) {
      return undefined;
    }

    return parseSubbreedsToGalleryImages(this.breed().subbreeds)
  });
  dialog = inject(Dialog);

  onImageGalleyClick() {
    const imagesUrl = this.breed().imagesUrl?.filter((image: string) => image !== '');
    this.dialog.open<void>(ImageGalleryContainerComponent, {
      width: '100%',
      height: '100%',
      data: {
        imagesUrl: imagesUrl ?? []
      }
    });
  }
}
