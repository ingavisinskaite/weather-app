import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../models/weather.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  weather: string;
  temp: number;

  selectedCity: string;

  cities = ['Vilnius', 'Praha', 'Barcelona', 'Amsterdam', 'London', 'Paris', 'Tokyo', 'Moscow', 'Riga', 'Dubai'];


  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
  }

  getConfig(city: string): Promise<any> {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3e430d76f0074ce63575d48b7fd38db7';
    return this._http.get(url).toPromise();
  }

  showWeather(event: string) {
    console.log(event);
    this.getConfig(event)
    .then(data => {
      console.log(data);
      this.weather = data.weather[0].main;
    });
  }

}
