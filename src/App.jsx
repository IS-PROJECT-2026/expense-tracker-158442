import { useEffect, useState } from 'react'
import './App.css'
import transactions from './data/transactions'
import categories from './data/categories'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [transactionPage, setTransactionPage] = useState('add')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
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

  const totalIncome = transactionList
  .filter((transaction) => transaction.type === 'income')
  .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = transactionList
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalBalance = totalIncome - totalExpenses
  
  const handleDelete = (id) => {
  setTransactionList(
    transactionList.filter((transaction) => transaction.id !== id)
  )
  }
  
  const filteredTransactions = transactionList.filter((transaction) => {
  const matchesSearch =
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())

  const matchesType =
    typeFilter === 'all' || transaction.type === typeFilter

  const matchesCategory =
    categoryFilter === 'all' || transaction.category === categoryFilter

  return matchesSearch && matchesType && matchesCategory
  })

  const renderPage = () => {
    switch (activePage) {
      case 'transactions':
          if (transactionPage === 'history') {
    return (
      <div className="transaction-page">
        <div className="transaction-history">
          <h2>Transaction History</h2>
          
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="search-input"
          />

          <div className="filter-controls">
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          </select>
          </div>

          {filteredTransactions.map((transaction) => (
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
            <option value="all">All Categories</option>
            {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
            ))}
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
                <p>KSh {totalBalance.toLocaleString()}</p>
              </div>

              <div className="card">
                <h3>Total Income</h3>
                <p>KSh {totalIncome.toLocaleString()}</p>
              </div>

              <div className="card">
                <h3>Total Expenses</h3>
                <p>KSh {totalExpenses.toLocaleString()}</p>
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