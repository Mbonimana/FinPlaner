 let budget = localStorage.getItem("budget") ? Number(localStorage.getItem("budget")) : 0;
    let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

    // Initialize
    document.getElementById("budget").value = budget;
    updateUI();

    function setBudget() {
      budget = Number(document.getElementById("budget").value);
      localStorage.setItem("budget", budget);
      updateUI();
    }

    function addExpense() {
      const desc = document.getElementById("desc").value;
      const category = document.getElementById("category").value;
      const amount = Number(document.getElementById("amount").value);
      const date = document.getElementById("date").value;

      if (!desc || !amount || !date) {
        alert("Please fill all fields!");
        return;
      }

      const expense = { desc, category, amount, date };
      expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));

      document.getElementById("desc").value = "";
      document.getElementById("amount").value = "";
      document.getElementById("date").value = "";

      updateUI();
    }

    function deleteExpense(index) {
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      updateUI();
    }

    function updateUI() {
      // Update summary
      const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
      const remaining = budget - totalSpent;

      document.getElementById("total-budget").innerText = budget;
      document.getElementById("total-expenses").innerText = totalSpent;
      document.getElementById("remaining").innerText = remaining;

      // Update progress bar
      let percent = budget > 0 ? (totalSpent / budget) * 100 : 0;
      if (percent > 100) percent = 100;
      document.getElementById("progress-bar").style.width = percent + "%";
      document.getElementById("progress-bar").innerText = Math.floor(percent) + "%";

      // Update expense list
      const expenseList = document.getElementById("expense-list");
      expenseList.innerHTML = "";
      expenses.forEach((e, index) => {
        expenseList.innerHTML += `
          <tr>
            <td>${e.desc}</td>
            <td>${e.category}</td>
            <td>${e.amount} Rwf</td>
            <td>${e.date}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
          </tr>
        `;
      });
    }