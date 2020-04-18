import React from 'react';
import {inject, observer} from "mobx-react";
import autoBind from "auto-bind";
import MapStore from "~/component/store/MapStore";

declare global {
    interface Window {
        kakao:any;
    }
}

interface Props{
    mapStore?:MapStore;
}

@inject('mapStore')
@observer
class MapContainer extends React.Component<Props> {

    constructor(props: any){
        super(props);
        autoBind(this);
    }

    componentDidMount(): void {
        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: this.props.mapStore?.level
        };
        let map = new window.kakao.maps.Map(container, options);
        map.setMaxLevel(this.props.mapStore?.maxLevel);

        this.props.mapStore?.mapControl(map);
        this.getLocation(map);

        let zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.Right);

        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
            let level = map.getLevel();

            this.zoomControl(level);
            this.mapControl(map);
        });

        window.kakao.maps.event.addListener(map, 'dragend', () => {
            this.mapControl(map);
        })
    }

    zoomControl(level:number){
        this.props.mapStore?.zoomControl(level);
    }

    mapControl(map:any){
        this.props.mapStore?.mapControl(map);
    }

    getLocation(map:any) {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position => {
                let lat = position.coords.latitude,
                    lon = position.coords.longitude;

                let locPosition = new window.kakao.maps.LatLng(lat,lon), message = '<div style="padding:5px;">여기에 계신가요?!</div>';

                console.log(lat);
                console.log(lon);

                this.displayMarker(map, locPosition, message);
            }))
        } else {
            let locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667), message = 'geolocation을 사용할수 없어요..';

            this.displayMarker(map, locPosition, message);
        }
    }

    displayMarker(map:any, locPosition:any, message:any){
        // 마커를 생성합니다
        let marker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition
        });

        let iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

        let infowindow = new window.kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });

        infowindow.open(map, marker);

        map.setCenter(locPosition);
    }

    render(){
        return(
            <div>
                <div id="map" style={{width:'100vw', height:'100vh'}}></div>;
            </div>
        )
    }

}

export default MapContainer;
