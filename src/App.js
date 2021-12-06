import './App.css';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import ToDos from './components/ToDo/ToDos';

function App() {
  return (
    <div className="App">
      <Header />
      <ToDos />
      <Footer />
    </div>
  );
}

export default App;
