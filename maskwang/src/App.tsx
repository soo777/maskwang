import React from 'react';
import Sample from "~/sample/Sample";
import SampleStore from "~/sample/SampleStore";
import MapContainer from "~/component/container/MapContainer";
import SearchStore from "~/component/store/SearchStore";
import {Provider} from "mobx-react";
import MapStore from "~/component/store/MapStore";
import SearchBoxContainer from "~/component/container/SearchBoxContainer";

const sampleStore = new SampleStore();
const mapStore = new MapStore();
const searchStore = new SearchStore();

function App() {
  return (
      <Provider
          sampleStore = {sampleStore}
          mapStore = {mapStore}
          searchStore = {searchStore}
      >
        {/*<Sample/>*/}
        <SearchBoxContainer/>
        <MapContainer/>
      </Provider>
  );
}

export default App;