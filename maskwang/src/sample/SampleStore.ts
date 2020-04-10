import {action, observable} from 'mobx';
import autoBind from 'auto-bind';

class SampleStore {

    constructor(){
        autoBind(this); // 이상없음
    }

    @observable
    name:string ='';

    @action
    find(){
        this.name = "22";
        console.log('aa');
    }


}

export default SampleStore;
