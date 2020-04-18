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
        console.log(m);

        // MapApi.findMask(lat, lng).then(data => {
        //     console.log(data);
        // });
    }

    @action
    zoomControl(level:any){
        this.level = level;
    }

    getM(map:any){
        let proj = map.getProjection();

        let center = map.getCenter();
        let level = map.getLevel();

        let centerPoint = proj.pointFromCoords(center);

        let scale = 1 / Math.pow(2, level - 3);

        let len = 25;

        let pixelForHalfLen = len / 2 * scale;

        return pixelForHalfLen;
    }

}

export default MapStore;
