import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedListControllerComponent } from './breed-list.component';

describe('BreedListComponent', () => {
  let component: BreedListControllerComponent;
  let fixture: ComponentFixture<BreedListControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedListControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
