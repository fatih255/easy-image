import React from 'react';
import './App.css';

//constants
import { selectModes } from './lib/constants';
//components
import Dropzone from './components/Dropzone';
import Button from './components/Button';
import Select from 'react-select'

function App() {


  const onSubmitHandler = () => {

  }

  return (
    <div className="flex w-screen h-screen">
      <div className="m-auto">
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-2">
            <Dropzone />
            <div className="flex flex-col gap-2 cursor-pointer">
              <label htmlFor="image-mode" >Image Mode</label>
              <Select defaultValue={{value: 'normal', label: 'Normal'}} id="image-mode" className="cursor-pointer-all" options={selectModes} />
            </div>
            <div className="flex flex-row gap-4 mt-6">
              <Button>Remove Backgrounds</Button>
              <Button>Combine Images</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
