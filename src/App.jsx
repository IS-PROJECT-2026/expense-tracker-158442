import { useState } from 'react'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'transactions':
        return (
          <div className="page-content">
            <h2>Transactions</h2>
            <p>View and manage your transactions</p>
          </div>
        )

      case 'analytics':
        return (
          <div className="page-content">
            <h2>Analytics</h2>
            <p>View your spending insights</p>
          </div>
        )

      default:
        return (
          <div className="page-content">
            <h2>Dashboard</h2>
            <p>Welcome to your Expense Tracker</p>
          </div>
        )
    }
  }

  return (
    <div className="app">
      <header className="title">
        <h1>Expense Tracker  KE</h1>
      </header>

      <div className="appBody">
        <nav className="sidebar">
          <button
            className={activePage === 'dashboard' ? 'active' : ''}
            onClick={() => setActivePage('dashboard')}
          >
            Dashboard
          </button>

          <button
            className={activePage === 'transactions' ? 'active' : ''}
            onClick={() => setActivePage('transactions')}
          >
            Transactions
          </button>

          <button
            className={activePage === 'analytics' ? 'active' : ''}
            onClick={() => setActivePage('analytics')}
          >
            Analytics
          </button>
        </nav>

        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App