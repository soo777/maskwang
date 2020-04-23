import React from 'react';
import {Button, Input} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import SearchStore from "~/component/store/SearchStore";

interface Props{
    searchStore?:SearchStore;
}

@inject('searchStore')
@observer
class SearchBoxContainer extends React.Component<Props>{

        handleChange = (e:any) =>{
            this.props.searchStore?.handleInput(e.target.value);
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

            return(
                <div style={searchDiv}>
                    <div style={boxStyle}>
                        <Input focus placeholder='Search...' onChange={this.handleChange} />
                        {/*<Button style={searchBtn}>Search</Button>*/}
                    </div>
                </div>
            )
    }

}

export default SearchBoxContainer;
