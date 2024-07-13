import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedDetailRouteComponent } from './breed-detail-route.component';


describe('BreedDetailComponent', () => {
  let component: BreedDetailRouteComponent;
  let fixture: ComponentFixture<BreedDetailRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedDetailRouteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreedDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
