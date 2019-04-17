import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  test;
  
  public pay1: number; pay2: number; pay3: number; pay4: number; pay5: number;
  
  public now: Date =  new Date()
  
  public access_time: Date;
  
  pay(pay1,pay2,pay3,pay4, pay5) {
    console.log(pay1,pay2,pay3,pay4,pay5)
    this.appService.test()
      .subscribe(res => {
        console.log(res)
        this.test = res
      })
  }
  
  constructor(private appService: AppService) {
    
    this.access_time = new Date(this.now.setHours(this.now.getHours() - 2))
    
    setInterval(() => {
      this.now = new Date()
    }, 1000)
  }
  
  title = 'client';
}
