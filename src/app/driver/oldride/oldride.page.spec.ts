import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OldridePage } from './oldride.page';

describe('OldridePage', () => {
  let component: OldridePage;
  let fixture: ComponentFixture<OldridePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldridePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OldridePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
