import React from 'react';
import './App.css';
import HolidaySearch from './components/HolidaySearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>日本の祝日検索</h1>
        <p>年、月、日を指定して祝日を検索できます</p>
      </header>
      <main className="App-main">
        <HolidaySearch />
      </main>
    </div>
  );
}

export default App;
