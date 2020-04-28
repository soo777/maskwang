import React from 'react';
import {inject, observer} from "mobx-react";
import {Button, Dimmer, Icon, Input, Loader, Segment} from "semantic-ui-react";
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

        searchByKeyword(){
            let map = this.props.mapStore!.map;
            let input = this.props.searchStore!.searchInput;

            let ps = new window.kakao.maps.services.Places();

            ps.keywordSearch(input, (data:any, status:any, pagination:any) =>{
                if (status === window.kakao.maps.services.Status.OK) {

                    console.log(data);

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    var bounds = new window.kakao.maps.LatLngBounds();

                    for (var i=0; i<data.length; i++) {
                        // displayMarker(data[i]);
                        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
                    }

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
                }
            });
        }

        searchByKeywordAndShowList(){
            let map = this.props.mapStore!.map;
            let input = this.props.searchStore!.searchInput;

            let ps = new window.kakao.maps.services.Places();

            ps.keywordSearch(input, (data:any, status:any, pagination:any) =>{
                if (status === window.kakao.maps.services.Status.OK) {

                     console.log(data);

                    // 정상적으로 검색이 완료됐으면
                    // 검색 목록과 마커를 표출합니다
                    // this.displayPlaces(data, map);

                    // 페이지 번호를 표출합니다
                    // displayPagination(pagination);

                } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {

                    alert('검색 결과가 존재하지 않습니다.');
                    return;

                } else if (status === window.kakao.maps.services.Status.ERROR) {

                    alert('검색 결과 중 오류가 발생했습니다.');
                    return;

                }
            });
        }

    displayPlaces(places:any, map:any) {

        let listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new window.kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        // this.removeAllChildNods(listEl);

        for ( let i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            let placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x),
                // marker = addMarker(placePosition, i),
                itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl!.appendChild(fragment);
        menuEl!.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }

    getListItem(index:number, places:any) {

        let el = document.createElement('li'),
            itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
                '   <span class="jibun gray">' +  places.address_name  + '</span>';
        } else {
            itemStr += '    <span>' +  places.address_name  + '</span>';
        }

        itemStr += '  <span class="tel">' + places.phone  + '</span>' +
            '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    }

    refresh(){
        let map = this.props.mapStore!.map;

        this.props.mapStore!.mapControl(map);
    };

    removeAllChildNods(el:any) {
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
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

            const title = {
                position:'absolute' as 'absolute',
                top:'17px',
                left:'35px',
                fontSize:'large',
                fontWeight:'bold' as 'bold'
            };

            const refresh = {
                position:'absolute' as 'absolute',
                top:'20px',
                right:'5px',
                fontSize:'large'
            };

            const segment = {
                padding: '0px'
            };

            const loading = this.props.mapStore?.loading;

            return(
                <>
                    <div style={searchDiv}>
                        <span style={title}>Maskwang</span>
                        <div style={boxStyle}>
                            <Input focus placeholder='건물, 장소 입력' onChange={this.handleChange} />
                            {/*<Button style={searchBtn} onClick={this.search}>Search</Button>*/}
                            <Button style={searchBtn} onClick={this.searchByKeyword}>Search</Button>
                            {/*<Button style={searchBtn} onClick={this.searchByKeywordAndShowList}>Search</Button>*/}
                        </div>
                        <span style={refresh} onClick={this.refresh}><Icon name='refresh'/></span>
                    </div>
                    <div>
                        <Segment style={segment}>
                            <Dimmer
                                active={loading}
                                page={true}
                                inverted={false}>
                            <Loader content='Loading'/>
                            </Dimmer>
                        </Segment>
                    </div>
                </>
            )
    }

}

export default SearchBoxContainer;
