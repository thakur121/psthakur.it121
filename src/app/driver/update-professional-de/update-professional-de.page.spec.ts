import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateProfessionalDePage } from './update-professional-de.page';

describe('UpdateProfessionalDePage', () => {
  let component: UpdateProfessionalDePage;
  let fixture: ComponentFixture<UpdateProfessionalDePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfessionalDePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProfessionalDePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
