document.addEventListener('DOMContentLoaded', (addExpenseButton) => {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.querySelector('.expense-list');
  const expenseAmountInput = document.getElementById('expenseAmount');
  const expenseDateInput = document.getElementById('expenseDate');
  const savingsSuggestion = document.getElementById('savingsSuggestion');
  const investmentSuggestion = document.getElementById('investmentSuggestion');

  const expensesData = [];

  function generateMonthlyExpenseData() {
    const monthlyExpenses = {};
    expensesData.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (monthlyExpenses[monthYear]) {
        monthlyExpenses[monthYear] += expense.amount;
      } else {
        monthlyExpenses[monthYear] = expense.amount;
      }
    });

    const labels = Object.keys(monthlyExpenses);
    const values = Object.values(monthlyExpenses);

    return { labels, values };
  }

  function createMonthlyExpenseChart() {
    const chartCanvas = document.getElementById('monthlyExpenseChart');
    const ctx = chartCanvas.getContext('2d');

    const monthlyExpenseData = generateMonthlyExpenseData();
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthlyExpenseData.labels,
        datasets: [{
          label: 'Monthly Expenses',
          data: monthlyExpenseData.values,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  function updateSavingsSuggestion() {
    const totalExpenses = expensesData.reduce((total, expense) => total + expense.amount, 0);
    const savingsPercentage = 20;
    const suggestedSavings = (totalExpenses * savingsPercentage) / 100;

    savingsSuggestion.innerText = `Here's a personalized savings suggestion for you: Save $${suggestedSavings.toFixed(2)} (20% of total expenses).`;

    updateInvestmentSuggestion(suggestedSavings);
  }

  function updateInvestmentSuggestion(savingsAmount) {
    let investmentSuggestionText;
    if (savingsAmount > 1000) {
      investmentSuggestionText = "Consider exploring investment options like mutual funds, stocks, or real estate to grow your savings.";
    } else if (savingsAmount > 500) {
      investmentSuggestionText = "You're saving a good amount. Start thinking about investment opportunities.";
    } else {
      investmentSuggestionText = "Focus on building your savings further before considering investments.";
    }

    investmentSuggestion.innerText = investmentSuggestionText;
  }

  function updateExpenseChart() {
    const chartCanvas = document.getElementById('expenseChart');
    const ctx = chartCanvas.getContext('2d');

    const expenseData = expensesData.map(expense => expense.amount);
    const expenseLabels = expensesData.map(expense => expense.date);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: expenseLabels,
        datasets: [{
          label: 'Expenses',
          data: expenseData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  function handleExpenseFormSubmit(event) {
    event.preventDefault();

    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      alert('Please enter a valid expense amount.');
      return;
    }

    const expenseDate = expenseDateInput.value;

    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerText = `Date: ${expenseDate}, Amount: $${expenseAmount.toFixed(2)}`;
    expenseList.appendChild(expenseItem);

    expensesData.push({ date: expenseDate, amount: expenseAmount });
    updateSavingsSuggestion();
    updateExpenseChart();

    expenseDateInput.value = '';
    expenseAmountInput.value = '';
  }

  expenseForm.addEventListener('submit', handleExpenseFormSubmit);

  function handleAddExpense() {
    const expenseDateInput = document.getElementById('expenseDate');
    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      alert('Please enter a valid expense amount.');
      return;
    }

    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerText = `Date: ${expenseDateInput.value}, Amount: $${expenseAmount.toFixed(2)}`;
    expenseList.appendChild(expenseItem);

    expensesData.push({ date: expenseDateInput.value, amount: expenseAmount });
    updateSavingsSuggestion();
    updateExpenseChart();
    updateInvestmentSuggestion(expenseAmount); // Suggestion based on single expense

    expenseDateInput.value = '';
    expenseAmountInput.value = '';
  }

  addExpenseButton.addEventListener('click', handleAddExpense);

  // Navigation
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      link.getAttribute('href');
      window.location.href = 'uusermain.html';
    });
  });

  // Button Event Listeners
  const navButtons = [
    { id: 'savingsBtn', url: 'savings.html' },
    { id: 'adviceBtn', url: 'advice.html' },
    { id: 'investmentsBtn', url: 'investments.html' }
  ];

  navButtons.forEach(button => {
    document.getElementById(button.id).addEventListener('click', () => {
      window.open(button.url, '_blank');
    });
  });

  // Initial chart creation
  updateExpenseChart();
  createMonthlyExpenseChart();
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('LoginServlet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    window.location.href = 'usermain.html';
  } else {
    alert('Invalid username or password. Please try again.');
  }
});

document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;

  const response = await fetch('RegisterServlet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newUsername, newPassword })
  });

  if (response.ok) {
    alert('Registration successful! You can now login.');
  } else {
    alert('Username already taken. Please choose a different username.');
  }
});
