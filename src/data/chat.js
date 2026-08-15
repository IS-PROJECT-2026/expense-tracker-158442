Perfect. ✅ Then we're in the right state to start **Issue #10 — Implement Transaction Search**.

We'll do it in small steps and **not touch the conflict setup yet**.

## Step 1 — Add search state

At the top of `App.jsx`, where you have your other `useState` declarations:

```jsx
const [activePage, setActivePage] = useState('dashboard')
const [transactionPage, setTransactionPage] = useState('add')
const [transactionList, setTransactionList] = useState(transactions)
```

Add:

```jsx
const [searchTerm, setSearchTerm] = useState('')
```

So you have:

```jsx
const [activePage, setActivePage] = useState('dashboard')
const [transactionPage, setTransactionPage] = useState('add')
const [transactionList, setTransactionList] = useState(transactions)
const [searchTerm, setSearchTerm] = useState('')
```

---

## Step 2 — Create the filtered transaction list

Before:

```jsx
const renderPage = () => {
```

add:

```jsx
const filteredTransactions = transactionList.filter((transaction) =>
  transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
)
```

So you'll have something like:

```jsx
const totalBalance = totalIncome - totalExpenses

const handleDelete = (id) => {
  setTransactionList(
    transactionList.filter((transaction) => transaction.id !== id)
  )
}

const filteredTransactions = transactionList.filter((transaction) =>
  transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
)

const renderPage = () => {
```

---

## Step 3 — Add the search box

Find:

```jsx
<h2>Transaction History</h2>
```

Immediately underneath it, add:

```jsx
<input
  type="text"
  placeholder="Search transactions..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  className="search-input"
/>
```

You'll have:

```jsx
<div className="transaction-history">
  <h2>Transaction History</h2>

  <input
    type="text"
    placeholder="Search transactions..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    className="search-input"
  />
```

---

## Step 4 — Change what gets displayed

You currently have:

```jsx
{transactionList.map((transaction) => (
```

Change it to:

```jsx
{filteredTransactions.map((transaction) => (
```

That's important because we're now displaying the **search results**, not the entire transaction list.

---

## Step 5 — Test

Go to:

**Transactions → Transaction History**

You should see your search box.

Try:

```text
Lunch
```

Only transactions containing "Lunch" in their description/category should appear.

Then try:

```text
food
```

It should find transactions whose category is `food`.

Then clear the search box and all transactions should return.

### Don't commit yet

Once you've confirmed the search works, tell me **"search works"**.

Then we'll add the CSS for the search box and test the final appearance before committing Issue #10.
