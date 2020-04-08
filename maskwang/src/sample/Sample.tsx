import * as React from 'react';
import {observer} from "mobx-react";

interface Props{

}

@observer
class Sample extends React.Component<Props> {

    render() {
        return (
            <div>sample</div>
        )
    }
}

export default Sample;
