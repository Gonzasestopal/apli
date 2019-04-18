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
  
  
  public totalCost : number;
  
  public validPayment: boolean = true;
  
  public hasChange: boolean;
  
  public accessTime: Date;
  
  public now: Date;
  
  public availableChange: any = {}

  updatePayment() { }
  
  savePayment(oneChangeInput, twoChangeInput, tenChangeInput, fiftyChangeInput, hundredChangeInput) {
    
    let payment = parseInt(this.oneChangeInput.nativeElement.value) * 1 + parseInt(this.twoChangeInput.nativeElement.value) * 2 + parseInt(this.tenChangeInput.nativeElement.value) * 10 + parseInt(this.fiftyChangeInput.nativeElement.value) * 50 + parseInt(this.hundredChangeInput.nativeElement.value) * 100;
    
    if (payment < this.totalCost) {
      this.validPayment = false;
      this.hasChange = false;
      return 
    } else {
      this.validPayment = true;
    }
    
    this.appService.savePayment(oneChangeInput.value, twoChangeInput.value, tenChangeInput.value, fiftyChangeInput.value, hundredChangeInput.value, this.totalCost)
      .subscribe(res => {
        this.availableChangeOne.nativeElement.value = res["oneChange"];
        this.availableChangeTwo.nativeElement.value = res["twoChange"];
        this.availableChangeTen.nativeElement.value = res["tenChange"];
        this.availableChangeFifty.nativeElement.value = res["fiftyChange"];
        this.availableChangeHundred.nativeElement.value = res["hundredChange"];
        
        if (parseInt(res['oneChange']) || parseInt(res['twoChange']) || parseInt(res['tenChange']) || parseInt(res['fiftyChange']) || parseInt(res['hundredChange'])) {
          this.hasChange = true;
        }
      
        
        this.oneChangeInput.nativeElement.value = 0;
        this.twoChangeInput.nativeElement.value = 0;
        this.tenChangeInput.nativeElement.value = 0;
        this.fiftyChangeInput.nativeElement.value = 0;
        this.hundredChangeInput.nativeElement.value = 0;
        
        this.appService.getChange()
      })
    
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
    
    this.accessTime = new Date(new Date().setHours(this.now.getHours() - (Math.floor(Math.random() * 6) + 1) ))

    let diff: number = Math.abs(this.now.getTime() -  this.accessTime.getTime()) / 36e5;
    
    this.totalCost =  diff * HOUR_PRICE
    
    setInterval(() => {
      this.now = new Date()
    }, 1000)
  }
  
  title = 'client';
}
