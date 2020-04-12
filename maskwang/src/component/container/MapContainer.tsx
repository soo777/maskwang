import React from 'react';

declare global {
    interface Window {
        kakao:any;
    }
}

class MapContainer extends React.Component{

    componentDidMount(): void {
        let container = document.getElementById('map');
        let options={
            center : new window.kakao.maps.LatLng(33.450701, 126.570667),
            level : 3
        };
        let map = new window.kakao.maps.Map(container, options);
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
