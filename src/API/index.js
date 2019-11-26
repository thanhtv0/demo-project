import axios from "axios"

const HOST = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const ACCESS_TOKEN = "pk.eyJ1IjoidGhhbmh2YW50cmFuMCIsImEiOiJjazNmY2k3MHkwMzczM29wMGhid2U1anFjIn0.u5xup88JnIWH4DQkMfGQlg";

const getPlaces = (place_name) => {
    let url = `${HOST}/${place_name}.json?access_token=${ACCESS_TOKEN}&autocomplete=true&types=address`
    return axios.get(url);
}

export {
    getPlaces,
}