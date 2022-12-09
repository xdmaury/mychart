import { Component, OnInit, Input } from '@angular/core';
import { createChart, ColorType, LineStyle  } from 'lightweight-charts';
import { darkTheme, lightTheme, adjustSartingBar, escale } from "./chart.customize";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  @Input() width;
  @Input() height;


  private dataSymbol = 'BTCUSDT';
  private dataInterval = '1m' ;
  //private scale = { width: this.width, height:this.height};

  private chartElement = document.body;
  //private chart = createChart(this.chartElement, this.scale);
  private chart = createChart(this.chartElement, escale);
  private areaSeries:any = this.chart.addAreaSeries();
  private candlestickSeries = this.chart.addCandlestickSeries();
  private drawLineSupportHorizontal = false;
  private drawLineResistanceHorizontal = false;
  private lastPriceLineSupport:any = null;
  private lastPriceLinveResistance:any = null;


  

  private themesData = {
    'Dark': darkTheme,
    'Light': lightTheme,
  };

  private syncToTheme(theme) {
    this.chart.applyOptions(this.themesData[theme].chart);
    this.areaSeries.applyOptions(this.themesData[theme].series);
    this.candlestickSeries.applyOptions(this.themesData[theme].series);
  }

  buttonLight():void {
    this.syncToTheme('Light');
  }

  buttonDark():void {
    this.syncToTheme('Dark');
  }

  private legend = document.createElement('div');
  private firstRow = document.createElement('div');

  defineLengend(){
    
    document.body.style.position = 'relative';
    
    this.legend.classList.add('legend');

    document.body.appendChild(this.legend);

    this.firstRow.style.color = 'black';
    this.legend.appendChild(this.firstRow);


    this.chart.subscribeCrosshairMove(param => {
      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > this.chartElement.clientWidth || param.point.y < 0 || param.point.y > this.chartElement.clientHeight) {
          this.legend.style.display = 'none';
      }else {
        if (this.drawLineResistanceHorizontal || this.drawLineSupportHorizontal){
          const y = param.point.y;
          const x = param.point.x;
          const value = this.candlestickSeries.coordinateToPrice(y);
          const formatValue = value?.toFixed(2);
          this.firstRow.innerText = String(formatValue);

          this.legend.style.display = 'block'; 
          this.legend.style.left = x + 'px';
          this.legend.style.top = y + 'px';
        }
      }

    });

  }

  DrawLineSupport(){
    this.drawLineSupportHorizontal = true;
    //Legend 
    this.defineLengend();
  }

  DrawLineResistance(){
    this.drawLineResistanceHorizontal = true;
    //Legend 
    this.defineLengend();
  }

  fiveMiniut(){
    this.dataInterval = '5m'
    this.getData();

  }

  fifteenMiniut(){
    this.dataInterval = '15m'
    this.getData();
  }

  oneHour(){
    this.dataInterval = '1h'
    this.getData();
  }

  private getData(){
    fetch(`https://api.binance.com/api/v3/klines?symbol=${this.dataSymbol}&interval=${this.dataInterval}&limit=1000`)
    .then(res => res.json())
    .then(data => {
      const cdata = data.map(d => {
        return {
          time:d[0]/1000, 
          open:parseFloat(d[1]), 
          high:parseFloat(d[2]), 
          low:parseFloat(d[3]), 
          close:parseFloat(d[4])
        }});
      

      this.candlestickSeries.setData(cdata);

    }).catch(err => console.log(err))
  }



  ngOnInit(): void {
    

    this.getData();
    

    //Ajusting bar widh horizontal
    //this.chart.timeScale().applyOptions(adjustSartingBar);
    this.chart.timeScale().fitContent();
    
    this.syncToTheme('Dark');

    
    //Click event  monitoring  
    this.chart.subscribeClick(param => {
      if (!param.point) {
          return;
      }
      const y = param.point.y;
      const value = this.candlestickSeries.coordinateToPrice(y);


      if (this.drawLineSupportHorizontal){

        if (this.lastPriceLineSupport != null){
          this.candlestickSeries.removePriceLine(this.lastPriceLineSupport);
        }

        this.lastPriceLineSupport = this.candlestickSeries.createPriceLine({
          price: value !== null ? value : 0,
          color: 'green',
          lineWidth: 2,
          lineStyle: LineStyle.Solid,
          axisLabelVisible: true,
          lineVisible: true,
          title: 'Support',
        });
        
        this.drawLineSupportHorizontal = false;

      }else if(this.drawLineResistanceHorizontal){

        if (this.lastPriceLinveResistance != null){
          this.candlestickSeries.removePriceLine(this.lastPriceLinveResistance);
        }

        this.lastPriceLinveResistance = this.candlestickSeries.createPriceLine({
          price: value !== null ? value : 0,
          color: 'red',
          lineWidth: 2,
          lineStyle: LineStyle.Solid,
          axisLabelVisible: true,
          lineVisible: true,
          title: 'Resistance',
        });

        this.drawLineResistanceHorizontal = false;
      }
      
       
    });

    
    
   
    

    /*
    this.chart.subscribeCrosshairMove(param => {
      const point = JSON.parse(JSON.stringify(param.point));
      const y = point.y;
     //console.log(this.candlestickSeries.coordinateToPrice(y));

      //const price = param.seriesPrices.get(this.candlestickSeries);
      //const value = JSON.parse(JSON.stringify(price));
      //console.log(param.seriesPrices);
        // where series is the ISeriesApi instance that we are interested in.
      //const y = this.candlestickSeries.priceToCoordinate(value.open);
      //console.log(`The data point is at position: ${x}, ${y}`);
      
    });
    */
   
      
  }

}
