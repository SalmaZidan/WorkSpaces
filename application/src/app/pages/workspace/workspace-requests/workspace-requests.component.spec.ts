import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceRequestsComponent } from './workspace-requests.component';

describe('WorkspaceRequestsComponent', () => {
  let component: WorkspaceRequestsComponent;
  let fixture: ComponentFixture<WorkspaceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
