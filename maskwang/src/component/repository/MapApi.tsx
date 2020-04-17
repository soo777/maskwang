import axios from "axios";

class MapApi {

    findMask = async (lat:string, lng:string) => {
        let data = await axios.get('https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=' + lat + '&lng=' + lng + '&m=500');

        return data;
    };


}

export default new MapApi();