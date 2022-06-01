import './App.css';
import DogImagesContainer from './components/DogImagesContainer';

function App() {
  return (
    <div className="App">
      <h1>
        Browse Dog Images{" "}
        <span role="img" aria-label="emoji">
          🐕
        </span>
      </h1>
      <DogImagesContainer />
    </div>
  );
}

export default App;
