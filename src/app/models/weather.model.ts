export interface Weather {
    city: City;
    temperature: Temperature;
    humidity: {
        value: number;
        unit: string;
    };
    wind: Wind;
    pressure: {
        value: number;
        unit: string;
    };
    clouds: {
        value: number;
        name: string;
    };
    visibility: {
        value: number;
    };
    precipitation: {
        value: number;
        mode: string;
    };
    weather: {
        value: string;
        number: number;
        icon: string;
    };
    lastUpdate: {
        value: string;
    };
}


interface City {
    id: string;
    name: string;
    coord: {
        lon: number;
        lat: number;
    };
    country: string;
    sun: {
        rise: number;
        set: number;
    };
}

interface Temperature {
    value: number;
    min: number;
    max: number;
    unit: string;
}

interface Wind {
    speed: {
        value: number;
        name: string;
    };
    direction: {
        value: number;
        code: string;
        name: string;
    };
}

