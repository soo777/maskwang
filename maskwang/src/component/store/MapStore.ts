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

    @observable
    stores:string[][] = [];

    @action
    mapControl(map:any){
        this.map = map;

        let level = map.getLevel();
        let lat = map.getCenter().getLat();
        let lng = map.getCenter().getLng();
        let m = this.getM(map);
        m = Math.floor(m);

        MapApi.findMask(lat, lng, m).then(data => {
            let stores = data.data.stores;
            // console.log(stores);

            let positions: { 'title': string; 'latlng': any; 'remain_stat':string }[] = [];

            stores.forEach( (value: any, index: any, element: any) => {
                if(value.remain_stat !== 'break') {
                    positions.push({
                        'title': value.name,
                        'latlng': new window.kakao.maps.LatLng(value.lat, value.lng),
                        'remain_stat': value.remain_stat
                    })
                }
            });

            console.log(positions);

            let imageSize = new window.kakao.maps.Size(35, 35);

            for (let i = 0; i < positions.length; i ++) {
                let imageSrc = this.getMarkerImg(positions[i].remain_stat);
                let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                let marker = new window.kakao.maps.Marker({
                    map: this.map,
                    position: positions[i].latlng,
                    title : positions[i].title,
                    image : markerImage
                });
            }
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

        let m = this.distance(centerLat, centerLng, nwLat, nwLng);

        return m;
    }

    // 반경 계산
    distance(centerLat:number, centerLng:number, nwLat:number, nwLng:number){
        let theta = centerLng - nwLng;
        let dist = Math.sin(this.deg2rad(centerLat)) * Math.sin(this.deg2rad(nwLat)) + Math.cos(this.deg2rad(centerLat)) * Math.cos(this.deg2rad(nwLat)) * Math.cos(this.deg2rad(theta));

        dist = Math.acos(dist);
        dist = this.rad2deg(dist);
        dist = dist * 60 * 1.1515 * 1609.344;           // meter 로 계산

        return dist;
    }

    deg2rad(deg:number) {
        return (deg * Math.PI / 180.0);
    }

    rad2deg(rad:number) {
        return (rad * 180 / Math.PI);
    }

    getMarkerImg(remain_stat:string){
        let imageSrc;
        switch (remain_stat) {
            case 'plenty' : imageSrc = '/images/marker_green.png'; break;
            case 'some' : imageSrc = '/images/marker_yellow.png'; break;
            case 'few' : imageSrc = '/images/marker_red.png'; break;
            case 'empty' : imageSrc = '/images/marker_grey.png'; break;
            default : imageSrc = '/images/marker_black.png'; break;
        }
        return imageSrc;
    }

}

export default MapStore;
