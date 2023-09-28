import './App.css';
import CreateContact from './components/createcontact';
import Events from './components/events';



function App() {

  return (
    <div className="App">
    <h1>Techtonica Contacts list</h1>
    <Events/>
    <CreateContact/>
   
  </div>

  )
  
}

export default App
