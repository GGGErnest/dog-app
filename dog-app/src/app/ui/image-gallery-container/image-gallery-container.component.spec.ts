import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryContainerComponent } from './image-gallery-container.component';

describe('ImageGalleryContainerComponent', () => {
  let component: ImageGalleryContainerComponent;
  let fixture: ComponentFixture<ImageGalleryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGalleryContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageGalleryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
