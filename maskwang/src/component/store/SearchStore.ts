import {action, observable} from 'mobx';

class SearchStore{

    @observable
    searchInput:string = '';

    @action
    handleInput(input:string){
        this.searchInput = input;
    }
}

export default SearchStore;