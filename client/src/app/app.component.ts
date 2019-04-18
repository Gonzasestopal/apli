import { Component, ViewChild } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('availableChangeOne') availableChangeOne;
  @ViewChild('oneChangeInput') oneChangeInput;
  
  @ViewChild('availableChangeTwo') availableChangeTwo;
  @ViewChild('twoChangeInput') twoChangeInput;

  @ViewChild('availableChangeTen') availableChangeTen;
  @ViewChild('tenChangeInput') tenChangeInput;

  @ViewChild('availableChangeFifty') availableChangeFifty;
  @ViewChild('fiftyChangeInput') fiftyChangeInput;

  @ViewChild('availableChangeHundred') availableChangeHundred;
  @ViewChild('hundredChangeInput') hundredChangeInput;
  
  
  public total_cost : number;
  
  public availableChange: any = {}
  
  public now: Date;
  
  public access_time: Date;
  
  savePayment(oneChangeInput, twoChangeInput, tenChangeInput, fiftyChangeInput, hundredChangeInput) {
    let payment = oneChangeInput.value * 1 + twoChangeInput.value * 2 + tenChangeInput.value * 10 + fiftyChangeInput.value * 50 + hundredChangeInput.value * 100;
    if (payment < this.total_cost) {
      console.log('Not enough')
    } else {
      this.appService.savePayment(oneChangeInput.value, twoChangeInput.value, tenChangeInput.value, fiftyChangeInput.value, hundredChangeInput.value, this.total_cost)
        .subscribe(res => {
          this.availableChangeOne.nativeElement.value = res["oneChange"];
          this.availableChangeTwo.nativeElement.value = res["twoChange"];
          this.availableChangeTen.nativeElement.value = res["tenChange"];
          this.availableChangeFifty.nativeElement.value = res["fiftyChange"];
          this.availableChangeHundred.nativeElement.value = res["hundredChange"];
          
          this.oneChangeInput.nativeElement.value = "";
          this.twoChangeInput.nativeElement.value = "";
          this.tenChangeInput.nativeElement.value = "";
          this.fiftyChangeInput.nativeElement.value = "";
          this.hundredChangeInput.nativeElement.value = "";
          
          this.appService.getChange()
        })
    }
  }
  
  ngOnInit() {
    this.appService.getChange()
      .subscribe(res => {
        this.availableChange = res
      })
    
  }
  
  constructor(private appService: AppService) {
    
    const HOUR_PRICE = 2;
    
    this.now = new Date();
    
    let access_time = new Date()
    
    this.access_time = new Date(access_time.setHours(this.now.getHours() - (Math.floor(Math.random() * 6) + 1) ))

    let diff: number = Math.abs(this.now.getTime() -  this.access_time.getTime()) / 36e5;
    
    this.total_cost =  diff * HOUR_PRICE
    
    setInterval(() => {
      this.now = new Date()
    }, 1000)
  }
  
  title = 'client';
}
