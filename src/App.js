import './App.css';
import { Route, Routes } from "react-router-dom";

import AddPolicy from './component/AddPolicy';
import ControlledPolicy from './component/ControlledPolicy';

function App() {
    return (
      <div>
                <Routes>
                    <Route path='/' element={<AddPolicy /> } />
                    <Route path='/controll' element={<ControlledPolicy /> } />

                </Routes>


        
      </div>
    );
}

export default App;
