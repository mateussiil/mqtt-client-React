import React from 'react'
import './App.css'
import HookMqtt from './Hook/Mqtt'

import { NivelController } from './components/NivelController'
import { ControllerComponent } from './components/Controller'
import { NivelTanqueChart } from './components/NivelTanqueChart'

function App() {
  return (
    <div className="App">
      <HookMqtt>
        <NivelController />
        <ControllerComponent/>
        <NivelTanqueChart />
      </HookMqtt>
    </div>
  )
}

export default App
