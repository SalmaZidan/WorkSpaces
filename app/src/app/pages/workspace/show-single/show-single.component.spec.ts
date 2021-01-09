import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleComponent } from './show-single.component';

describe('ShowSingleComponent', () => {
  let component: ShowSingleComponent;
  let fixture: ComponentFixture<ShowSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
