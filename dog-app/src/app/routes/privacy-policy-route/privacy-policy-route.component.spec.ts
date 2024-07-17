import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyRouteComponent } from './privacy-policy-route.component';

describe('PrivacyPolicyRouteComponent', () => {
  let component: PrivacyPolicyRouteComponent;
  let fixture: ComponentFixture<PrivacyPolicyRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
