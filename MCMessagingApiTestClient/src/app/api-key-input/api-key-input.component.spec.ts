import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyInputComponent } from './api-key-input.component';

describe('ApiKeyInputComponent', () => {
  let component: ApiKeyInputComponent;
  let fixture: ComponentFixture<ApiKeyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
