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
  
  pay() {
    this.appService.get_change()
      .subscribe(res => {
        console.log(res)
        this.test = res
      })
  }
  
  ngOnInit() {
    console.log('aye')
  }
  
  constructor(private appService: AppService) {
    
    this.access_time = new Date(this.now.setHours(this.now.getHours() - 2))
    
    setInterval(() => {
      this.now = new Date()
    }, 1000)
  }
  
  title = 'client';
}
