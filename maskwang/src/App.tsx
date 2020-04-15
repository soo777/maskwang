import React from 'react';
import Sample from "~/sample/Sample";
import SampleStore from "~/sample/SampleStore";
import MapContainer from "~/component/container/MapContainer";
import {Provider} from "mobx-react";
import MapStore from "~/component/store/MapStore";

const sampleStore = new SampleStore();
const mapStore = new MapStore();

function App() {
  return (
      <Provider
          sampleStore = {sampleStore}
          mapStore = {mapStore}
      >
        <Sample/>
        <MapContainer/>
      </Provider>
  );
}

export default App;