import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateVehicalDePage } from './update-vehical-de.page';

describe('UpdateVehicalDePage', () => {
  let component: UpdateVehicalDePage;
  let fixture: ComponentFixture<UpdateVehicalDePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVehicalDePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateVehicalDePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
