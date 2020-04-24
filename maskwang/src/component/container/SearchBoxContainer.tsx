import React from 'react';
import {inject, observer} from "mobx-react";
import {Button, Input} from "semantic-ui-react";
import SearchStore from "~/component/store/SearchStore";
import MapStore from "~/component/store/MapStore";
import autoBind from "auto-bind";

interface Props{
    searchStore?:SearchStore;
    mapStore?:MapStore;
}

@inject('searchStore', 'mapStore')
@observer
class SearchBoxContainer extends React.Component<Props>{

        constructor(props: any){
            super(props);
            autoBind(this);
        }

        handleChange = (e:any) => {
            this.props.searchStore!.handleInput(e.target.value);
        };

        search(){
            let map = this.props.mapStore!.map;
            let geocoder = new window.kakao.maps.services.Geocoder();

            let input = this.props.searchStore!.searchInput;

            geocoder.addressSearch(input, function(result:any, status:any) {

                // 정상적으로 검색이 완료됐으면
                if (status === window.kakao.maps.services.Status.OK) {

                    var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new window.kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                } else {
                    console.log('search error');
                }
            });
        }

        render(){
            const searchDiv = {
                background: 'steelblue'
            };

            const boxStyle = {
                marginLeft:'40%',
                padding:'10px'
            };

            const searchBtn = {
                marginLeft: '10px'
            };

            return(
                <div style={searchDiv}>
                    <div style={boxStyle}>
                        <Input focus placeholder='Search...' onChange={this.handleChange} />
                        <Button style={searchBtn} onClick={this.search}>Search</Button>
                    </div>
                </div>
            )
    }

}

export default SearchBoxContainer;
