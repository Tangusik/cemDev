import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
          <div className="App">
              <header>
                  <p>
                      Arena
                  </p>
                  <nav>
                      <ul>
                          <li>
                              <Link to="/trainers">Trainers</Link>
                          </li>
                      </ul>
                  </nav>
              </header>
          </div>
  );
}

export default App;
