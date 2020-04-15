import {action, observable} from 'mobx';
import autoBind from 'auto-bind';

class MapStore {

    constructor(){
        autoBind(this); // 이상없음
    }

    @observable
    level:number = 4;

    @observable
    lat:string = '';

    @observable
    lng:string = '';

    @action
    zoomIn(){
        this.level = this.level - 1;
    }

    @action
    zoomOut(){
        this.level = this.level + 1;
    }
}

export default MapStore;
