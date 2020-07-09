import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoneOrdersPage } from './done-orders.page';

describe('DoneOrdersPage', () => {
  let component: DoneOrdersPage;
  let fixture: ComponentFixture<DoneOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoneOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
