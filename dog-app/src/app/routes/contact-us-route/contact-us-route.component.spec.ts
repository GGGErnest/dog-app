import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsRouteComponent } from './contact-us-route.component';

describe('ContactUsRouteComponent', () => {
  let component: ContactUsRouteComponent;
  let fixture: ComponentFixture<ContactUsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
