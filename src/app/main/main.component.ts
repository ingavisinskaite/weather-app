import { Weather } from './../models/weather.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaxLengthValidator } from '@angular/forms';
import CitiesJson from '../../assets/city.continent.model.json';
import * as moment from 'moment-timezone';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {

  weather: string;
  temp: number;
  temperature: string;
  selectedCity: string;
  minTemp: string;
  maxTemp: string;
  windSpeed: string;
  humidity: string;
  sunrise: string;
  sunset: string;
  windDirection: string;

  cities: any = CitiesJson;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    console.log(CitiesJson);
  }

  getConfig(city: string): Promise<any> {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=3e430d76f0074ce63575d48b7fd38db7';
    return this._http.get(url).toPromise();
  }

  showWeather(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      console.log(data);
      this.weather = data.weather[0].main;
    });
  }

  showTemperature(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      this.temperature = `${Math.round(data.main.temp)}°C`;
    });
  }

  showMinTemp(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      this.minTemp = `${Math.round(data.main.temp_min)}°C / `;

    });
  }

  showMaxTemp(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      this.maxTemp = `${Math.round(data.main.temp_max)}°C`;
    });
  }

  showWind(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      this.windSpeed = `Speed: ${data.wind.speed} m/s`;
    });
  }

  showWindDirection(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      if (data.wind.deg > 348.75 || (data.wind.deg < 78.75)) {
        this.windDirection = 'Direction: North';
      } else if(data.wind.deg < 168.75) {
        this.windDirection = 'Direction: East';
      } else if(data.wind.deg < 258.75) {
        this.windDirection = 'Direction: South';
      } else {
        this.windDirection = 'Direction: West';
      }
    });
  }

  showHumidity(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      this.humidity = `${data.main.humidity}%`;
    });
  }

  showSunrise(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      const x = data.sys.sunrise;
      this.sunrise = `${this.getTimeStringFromMiliseconds(x)} / `;
    });
  }

  showSunset(event: string) {
    this.getConfig(event)
    .then((data: Weather) => {
      const x = data.sys.sunset;
      this.sunset = this.getTimeStringFromMiliseconds(x);
    });
  }

  getTimeStringFromMiliseconds(x: number) {
    const hours = moment.unix(x).hours();
    const mins = moment.unix(x).minutes();
    const hoursString = `${hours < 10 ? '0' : ''}${hours}`; // add 0 if hrs < 10
    const minsString = `${mins < 10 ? '0' : ''}${mins}`;
    return `${hoursString}:${minsString}`;
  }

  showWeathers(event: string) {
    this.showWeather(event);
    this.showTemperature(event);
    this.showMinTemp(event);
    this.showMaxTemp(event);
    this.showWind(event);
    this.showSunrise(event);
    this.showSunset(event);
    this.showHumidity(event);
    this.showWindDirection(event);
  }
}
