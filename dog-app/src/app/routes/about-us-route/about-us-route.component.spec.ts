import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsRouteComponent } from './about-us-route.component';

describe('AboutUsRouteComponent', () => {
  let component: AboutUsRouteComponent;
  let fixture: ComponentFixture<AboutUsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
