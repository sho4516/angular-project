import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResipeStartComponent } from './resipe-start.component';

describe('ResipeStartComponent', () => {
  let component: ResipeStartComponent;
  let fixture: ComponentFixture<ResipeStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResipeStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResipeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
