import React from 'react';
import Sample from "~/sample/Sample";
import SampleStore from "~/sample/SampleStore";
import {Provider} from "mobx-react";

const sampleStore = new SampleStore();

function App() {
  return (
      <Provider
          sampleStore = {sampleStore}
      >
        <Sample/>
      </Provider>
  );
}

export default App;
