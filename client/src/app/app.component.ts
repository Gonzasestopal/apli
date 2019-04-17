import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  test;
  
  public availableChange: any = {}
  
  
  public pay1: number; pay2: number; pay3: number; pay4: number; pay5: number;
  
  public now: Date =  new Date()
  
  public access_time: Date = new Date(this.now.getTime() - (1000*60*60));
  
  public diff: number = this.now.getTime() -  this.access_time.getTime();
  
  public total_cost: number = (this.diff % 86400000);
  
  pay() {
    this.appService.save_payment()
      .subscribe(res => {
        console.log(res)
        this.test = res
      })
  }
  
  ngOnInit() {
    
    console.log(this.total_cost)
    this.appService.get_change()
      .subscribe(res => {
        this.availableChange = res
        
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
