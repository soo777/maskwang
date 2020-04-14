import {action, observable} from 'mobx';
import autoBind from 'auto-bind';

class MapStore {

    constructor(){
        autoBind(this); // 이상없음
    }

    @observable
    map:string ='';

}

export default MapStore;
