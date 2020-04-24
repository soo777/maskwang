import React from 'react';
import MapContainer from "~/component/container/MapContainer";
import SearchStore from "~/component/store/SearchStore";
import {Provider} from "mobx-react";
import MapStore from "~/component/store/MapStore";
import SearchBoxContainer from "~/component/container/SearchBoxContainer";

const mapStore = new MapStore();
const searchStore = new SearchStore();

function App() {
  return (
      <Provider
          mapStore = {mapStore}
          searchStore = {searchStore}
      >
        <SearchBoxContainer/>
        <MapContainer/>
      </Provider>
  );
}

export default App;