import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderAddPage } from './order-add.page';

describe('OrderAddPage', () => {
  let component: OrderAddPage;
  let fixture: ComponentFixture<OrderAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
