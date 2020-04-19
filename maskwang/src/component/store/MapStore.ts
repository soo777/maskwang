import {action, observable} from 'mobx';
import autoBind from 'auto-bind';
import MapApi from "~/component/repository/MapApi";

class MapStore {

    constructor(){
        autoBind(this); // 이상없음
    }

    @observable
    map:any;

    @observable
    level:number = 3;

    @observable
    lat:string = '';

    @observable
    lng:string = '';

    @observable
    maxLevel:number = 8;

    @action
    mapControl(map:any){
        this.map = map;
        // console.log(map.getLevel());
        // console.log(map.getCenter());

        let level = map.getLevel();
        let lat = map.getCenter().getLat();
        let lng = map.getCenter().getLng();
        let m = this.getM(map);
        m = Math.floor(m);
        console.log(m);

        MapApi.findMask(lat, lng, m).then(data => {
            console.log(data);
        });
    }

    @action
    zoomControl(level:any){
        this.level = level;
    }

    getM(map:any){
        let center = map.getCenter();
        let nw = map.getBounds().getNorthEast();

        let centerLat = center.getLat();
        let centerLng = center.getLng();
        let nwLat = nw.getLat();
        let nwLng = nw.getLng();

        // console.log(centerLat);
        // console.log(nwLat);
        // console.log(centerLng);
        // console.log(nwLng);

        let m = this.distance(centerLat, centerLng, nwLat, nwLng);

        return m;
    }

    // 반경 계산
    distance(centerLat:number, centerLng:number, nwLat:number, nwLng:number){
        let theta = centerLng - nwLng;
        let dist = Math.sin(this.deg2rad(centerLat)) * Math.sin(this.deg2rad(nwLat)) + Math.cos(this.deg2rad(centerLat)) * Math.cos(this.deg2rad(nwLat)) * Math.cos(this.deg2rad(theta));

        dist = Math.acos(dist);
        dist = this.rad2deg(dist);
        dist = dist * 60 * 1.1515 * 1609.344;           // meter로 계

        // console.log(dist);

        return dist;
    }

    deg2rad(deg:number) {
        return (deg * Math.PI / 180.0);
    }

    rad2deg(rad:number) {
        return (rad * 180 / Math.PI);
    }

}

export default MapStore;
