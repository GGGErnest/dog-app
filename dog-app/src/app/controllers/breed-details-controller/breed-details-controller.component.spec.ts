import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsControllerComponent } from './breed-details-controller.component';

describe('BreedDetailsControllerComponent', () => {
  let component: BreedDetailsControllerComponent;
  let fixture: ComponentFixture<BreedDetailsControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedDetailsControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreedDetailsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
