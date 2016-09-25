export class BikeShare {
    stations: Station[];
    pricingPlans: PricingPlans[];

    constructor(public system_id, public name, public langauge, public url, public phone_number, public email, public timezone) { }
}

export class PricingPlans {
    constructor(public price, public is_taxable, public url, public description, public currency, public name, public plan_id) { }
}

export class Station {
    stationInformation: StationInformation;
    stationStatus: StationStatus;
}
export class StationInformation {
    constructor(public lon, public lat, public address, public name, public station_id) { }
}
export class StationStatus {
    constructor(public station_id, public num_bikes_available, ) { }
}