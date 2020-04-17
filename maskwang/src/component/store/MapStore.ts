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

    @action
    mapControl(map:any){
        this.map = map;
        console.log(map.getLevel());
        console.log(map.getCenter());

        let lat = map.getCenter().getLat();
        let lng = map.getCenter().getLng();

        MapApi.findMask(lat, lng).then(data => {
            console.log(data);
        });
    }

    @action
    zoomControl(level:any){
        this.level = level;
    }

}

export default MapStore;
