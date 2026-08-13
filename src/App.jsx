import { useEffect, useState } from 'react'
import './App.css'
import transactions from './data/transactions'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [transactionPage, setTransactionPage] = useState('add')
  const [transactionList, setTransactionList] = useState(() => {
  const savedTransactions = localStorage.getItem('transactions')
  return savedTransactions
    ? JSON.parse(savedTransactions)
    : transactions
  })
  useEffect(() => {
  localStorage.setItem(
    'transactions',
    JSON.stringify(transactionList)
  )
  }, [transactionList]) 
  
  const [formData, setFormData] = useState({
  description: '',
  amount: '',
  category: '',
  date: '',
  type: 'expense'
  })
  const handleChange = (event) => {
  const { name, value } = event.target
  setFormData({
    ...formData,
    [name]: value
  })
}
const handleSubmit = (event) => {
  event.preventDefault()

  const newTransaction = {
    id: Date.now(),
    description: formData.description,
    amount: Number(formData.amount),
    category: formData.category,
    date: formData.date,
    type: formData.type
  }

  setTransactionList([
    ...transactionList,
    newTransaction
  ])

  setFormData({
    description: '',
    amount: '',
    category: '',
    date: '',
    type: 'expense'
  })
}
  const handleDelete = (id) => {
  setTransactionList(
    transactionList.filter((transaction) => transaction.id !== id)
  )
  }
  const renderPage = () => {
    switch (activePage) {
      case 'transactions':
          if (transactionPage === 'history') {
    return (
      <div className="transaction-page">
        <div className="transaction-history">
          <h2>Transaction History</h2>
           {transactionList.map((transaction) => (
          <div className="history-item" key={transaction.id}>
          <div>
            <strong>{transaction.description}</strong>
            <span>
              {transaction.category} - {transaction.date}
            </span>
          </div>
              <span
            className={
              transaction.type === 'income'
                ? 'income-amount'
                : 'expense-amount'
            }
          >
            {transaction.type === 'income' ? '+' : '-'} KSh{' '}
            {transaction.amount.toLocaleString()}
           </span>
           <button
            className="delete-button"
            onClick={() => handleDelete(transaction.id)}>
            Delete
          </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
          
  return (
    <div className="transaction-page">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="transaction-header">
        <h2>Add Transaction</h2>
        <p>Record a new income or expense.</p>
      </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="e.g. Lunch"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
         <input
          type="number"
          id="amount"
          name="amount"
          placeholder="e.g. 200"
          min="0"
          value={formData.amount}
          onChange={handleChange}
        />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
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
                checked={formData.type === 'expense'}
                onChange={handleChange}
              />
              Expense
            </label>

            <label>
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleChange}
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

          <div className="nav-section">
          <button
            className="nav-item"
            onClick={() => {
              setActivePage('transactions')
              setTransactionPage('add')
            }}
          >
            <span>Transactions</span>
            <span>&#10095;</span>
          </button>

          {activePage === 'transactions' && (
            <div className="nav-submenu">
              <button
                onClick={() => setTransactionPage('add')}
                className={transactionPage === 'add' ? 'active-subitem' : ''}
              >
                Add Transaction
              </button>

              <button
                onClick={() => setTransactionPage('history')}
                className={transactionPage === 'history' ? 'active-subitem' : ''}
              >
                Transaction History
              </button>
            </div>
          )}
        </div>

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