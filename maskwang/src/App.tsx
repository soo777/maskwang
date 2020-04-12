import React from 'react';
import Sample from "~/sample/Sample";
import SampleStore from "~/sample/SampleStore";
import MapContainer from "~/component/container/MapContainer";
import {Provider} from "mobx-react";

const sampleStore = new SampleStore();

function App() {
  return (
      <Provider
          sampleStore = {sampleStore}
      >
        <Sample/>
        <MapContainer/>
      </Provider>
  );
}

export default App;