import React from 'react';
import {inject, observer} from "mobx-react";
import SampleStore from "~/sample/SampleStore";
import autoBind from "auto-bind";

interface Props{
    sampleStore?:SampleStore;
}

@inject("sampleStore")
@observer
class Sample extends React.Component<Props> {

    constructor(props: any){
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        this.props.sampleStore?.find();
    }

    render() {
        const {sampleStore} = this.props;

        return (
            <div>sample ----- {sampleStore!.name}</div>
        )
    }
}

export default Sample;
