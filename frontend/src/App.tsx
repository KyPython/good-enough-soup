import React from 'react';
import './App.css';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Good Enough Soup</h1>
        <p className="subtitle">Track your daily wins</p>
      </header>
      <main className="App-main">
        <EntryForm />
        <EntryList />
      </main>
    </div>
  );
}

export default App;

