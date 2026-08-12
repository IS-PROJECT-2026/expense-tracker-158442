import { useState } from 'react'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'transactions':
  return (
    <div className="transaction-page">

      <form className="transaction-form">
        <div className="transaction-header">
        <h2>Add Transaction</h2>
        <p>Record a new income or expense.</p>
      </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="e.g. Lunch"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="e.g. 200"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category">
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Rent</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
          />
        </div>

        <div className="form-group">
          <label>Transaction Type</label>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="type"
                value="expense"
                defaultChecked
              />
              Expense
            </label>

            <label>
              <input
                type="radio"
                name="type"
                value="income"
              />
              Income
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </form>
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