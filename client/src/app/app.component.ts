import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public total_cost : number;
  
  public availableChange: any = {}
  
  public pay1: number; pay2: number; pay3: number; pay4: number; pay5: number;
  
  public now: Date;
  
  public access_time: Date;
  
  pay() {
    let total = this.pay1 + this.pay2 + this.pay3 + this.pay4 + this.pay5
    this.appService.save_payment(total)
      .subscribe(res => {
        this.appService.get_change()
      })
  }
  
  ngOnInit() {
    this.appService.get_change()
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
