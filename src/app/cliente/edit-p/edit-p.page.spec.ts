import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPPage } from './edit-p.page';

describe('EditPPage', () => {
  let component: EditPPage;
  let fixture: ComponentFixture<EditPPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
