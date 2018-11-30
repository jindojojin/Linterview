import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedWebsiteComponent } from './banned-website.component';

describe('BannedWebsiteComponent', () => {
  let component: BannedWebsiteComponent;
  let fixture: ComponentFixture<BannedWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannedWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
