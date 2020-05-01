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

    refresh(){
        let map = this.props.mapStore!.map;

        this.props.mapStore!.mapControl(map);
    };


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
                        <Button style={searchBtn} onClick={this.searchByKeyword}>Search</Button>
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
