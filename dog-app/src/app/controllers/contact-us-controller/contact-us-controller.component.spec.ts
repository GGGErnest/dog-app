import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsControllerComponent } from './contact-us-controller.component';

describe('ContactUsControllerComponent', () => {
  let component: ContactUsControllerComponent;
  let fixture: ComponentFixture<ContactUsControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
