import React from 'react';
import {Button, Input} from "semantic-ui-react";


class SearchBoxContainer extends React.Component{

        render(){
            const searchDiv = {
                background: 'steelblue'
            }

            const boxStyle = {
                marginLeft:'40%',
                padding:'10px'
            };

            const searchBtn = {
                marginLeft: '10px'
            }

            return(
                <div style={searchDiv}>
                    <div style={boxStyle}>
                        <Input focus placeholder='Search...' />
                        <Button style={searchBtn}>Search</Button>
                    </div>
                </div>
            )
    }

}

export default SearchBoxContainer;
