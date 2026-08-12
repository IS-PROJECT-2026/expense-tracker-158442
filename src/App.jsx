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
          <div className="dashboard">
            <div className="dashboard-header">
              <h2>Dashboard - Overview of your finances </h2>
            </div>
            

            <div className="allcards">
              <div className="card">
                <h3>Total Balance</h3>
                <p>KSh 25,000</p>
              </div>

              <div className="card">
                <h3>Total Income</h3>
                <p>KSh 40,000</p>
              </div>

              <div className="card">
                <h3>Total Expenses</h3>
                <p>KSh 15,000</p>
              </div>
            </div>

            <div className="recent-transactions">
              <h3>Recent Transactions</h3>

              <div className="transaction-item">
                <span>Lunch</span>
                <span>- KSh 500</span>
              </div>

              <div className="transaction-item">
                <span>Transport</span>
                <span>- KSh 300</span>
              </div>

              <div className="transaction-item">
                <span>Salary</span>
                <span>+ KSh 40,000</span>
              </div>
            </div>
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