import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkingtypePage } from './workingtype.page';

describe('WorkingtypePage', () => {
  let component: WorkingtypePage;
  let fixture: ComponentFixture<WorkingtypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingtypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkingtypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
