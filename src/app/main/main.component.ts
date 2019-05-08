import { Country } from './../models/country.model';
import { Weather } from './../models/weather.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaxLengthValidator } from '@angular/forms';
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
  date: string;

  cities: Array<Country> = [];

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    this.loadTimezones();
    this.loadCities();
  }

  getConfig(city: string): Promise<any> {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=13cd124dd1a95c93145cc3367c2358a1';
    return this._http.get(url).toPromise();
  }

  loadTimezones() {
    const timeZoneJsonUrl = '../../assets/timezones.json';
    this._http.get(timeZoneJsonUrl).subscribe((data: Array<string>) => {
      data.forEach(x => {
        moment.tz.add(x);
      });
    });
  }

  loadCities() {
    const citiesJsonUrl = '../../assets/city.continent.model.json';
    const weatherApiCitiesJsonUrl = '../../assets/city.list.model.json';
    this._http.get(citiesJsonUrl).subscribe((countryData: Array<Country>) => {
      this._http.get(weatherApiCitiesJsonUrl).subscribe((apiData: Array<any>) => {
        countryData.forEach(country => {
          if (apiData.some(apiCity => apiCity.capital === country.capital)) {
            this.cities.push(country);
          }
        });
      });
    });
    return this.cities;
  }

  showWeather(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        console.log(data);
        this.weather = data.weather[0].main;
      });
      return this.weather;
  }

  showTemperature(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        this.temperature = `${Math.round(data.main.temp)}°C`;
      });
      return this.temperature;
  }

  showMinTemp(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        this.minTemp = `${Math.round(data.main.temp_min)}°C / `;
      });
      return this.minTemp;
  }

  showMaxTemp(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        this.maxTemp = `${Math.round(data.main.temp_max)}°C`;
      });
      return this.maxTemp;
  }

  showWind(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        this.windSpeed = `Speed: ${data.wind.speed} m/s`;
      });
      return this.windSpeed;
  }

  showWindDirection(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        if (data.wind.deg > 348.75 || (data.wind.deg < 78.75)) {
          this.windDirection = 'Direction: North';
        } else if (data.wind.deg < 168.75) {
          this.windDirection = 'Direction: East';
        } else if (data.wind.deg < 258.75) {
          this.windDirection = 'Direction: South';
        } else {
          this.windDirection = 'Direction: West';
        }
      });
      return this.windDirection;
  }

  showHumidity(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        this.humidity = `${data.main.humidity}%`;
      });
      return this.humidity;
  }

  showSunrise(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        const x = data.sys.sunrise;
        this.sunrise = `${this.getTimeStringFromMiliseconds(x, event)} / `;
      });
      return this.sunrise;
  }

  showSunset(event: string) {
    this.getConfig(event)
      .then((data: Weather) => {
        const x = data.sys.sunset;
        this.sunset = this.getTimeStringFromMiliseconds(x, event);
      });
      return this.sunset;
  }

  getTimeStringFromMiliseconds(x: number, city: string) {
    const country = this.cities.find(y => y.capital === city);
    const formattedContinent = this.getFormattedContinentForMoment(country.continentName);
    city = city.split(' ').join('_');
    const localTime = moment.unix(x).tz(`${formattedContinent}/${city}`);
    const hours = localTime.hours();
    const mins = localTime.minutes();
    const hoursString = `${hours < 10 ? '0' : ''}${hours}`; // add 0 if hrs < 10
    const minsString = `${mins < 10 ? '0' : ''}${mins}`;
    return `${hoursString}:${minsString}`;
  }

  getFormattedContinentForMoment(continent: string) {
    if (continent.indexOf('America') > -1) {
      return 'America';
    }
    return continent;
  }

  showDate() {
    this.date = `${new Date()}`;
    return this.date;
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
    this.showDate();
  }
}
