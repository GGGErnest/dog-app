import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedListRouteComponent } from './breed-list.component';

describe('BreedListComponent', () => {
  let component: BreedListRouteComponent;
  let fixture: ComponentFixture<BreedListRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedListRouteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreedListRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
