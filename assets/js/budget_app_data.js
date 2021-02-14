/**
 * Helper function to load data from the local store.
 * @param key Key for the data to retrieve.
 * @returns {""|any} JSON data or null (if non-existent).
 */
function getData(key) {
    let value = window.localStorage.getItem(key)
    return value && JSON.parse(value)
}

/**
 * Helper function to set data in the local store.
 * @param key Key for the data to store.
 * @param value Value to store for the given key.
 */
function setData(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}


/**
 * Loads a user's BudgetData from the local store. Username is forced to lower case to make it case insensitive.
 * Creates the user's BudgetData if the user doesn't exist.
 * @param username String name of the user.
 * @returns {BudgetData} for the user.
 */
function loadUserData(username) {
    username = username.toLowerCase()

    if (!getData(username)) {
        createUser(username)
    }
    return new BudgetData(username, getData(username))
}


/**
 * Saves a user's BudgetData to the local store. Username is forced to lower case to make it case insensitive.
 * @param username String name of the user.
 * @param data BudgetData data.
 */
function saveUserData(username, data) {
    username = username.toLowerCase()
    setData(username, data)
}


/**
 * New user must be created. Creates local store for user's data. Username is forced to lower case to make it
 * case insensitive.
 * @param username String name of the user.
 */
function createUser(username) {
    username = username.toLowerCase()

    const userData = getData(username)
    if (!userData) {
        setData(username, {})
    } else {
        throw `User ${username} already exists!`
    }
}


/**
 * Deletes a user's BudgetData from the local store.
 * @param username Username (not case sensitive) to delete from local store.
 */
function deleteUser(username) {
    username = username.toLowerCase()
    setData(username, null)
}


/**
 * Class to store and interact with a user's Budget App data.
 */
class BudgetData {
    /**
     * Creates BudgetData for a given user with the given data.
     * @param username Budget App username (alwoys cast to lower case)
     * @param data Dictionary format data for the user.
     */
    constructor(username, data) {
        if (!data) {
            this.data = {}
        } else {
            this.data = data
        }
        this.username = username.toLowerCase()
    }

    /**
     * Saves the user's BudgetData to the local store.
     */
    saveData() {
        saveUserData(this.username, this.data)

    }

    /**
     * Add an income category and an associated value. If the income category is already defined, it is overwritten.
     * @param incomeCategory Category for the income (e.g., "stocks", "job"). Forced to lowercase to make case
     * insensitive.
     * @param value Value to associate with the incomeCategory.
     */
    addIncome(incomeCategory, value) {
        if (!this.data["incomes"]) {
            this.data["incomes"] = {}
        }
        this.data["incomes"][incomeCategory.toLowerCase()] = parseFloat(value)

        this.saveData()
    }

    /**
     * IOterates through all incomeCategories to sum all incomes.
     * @returns {number} The total of all incomes for the user.
     */
    getTotalIncomes() {
        let totalIncome = 0
        for (let category in this.data["incomes"]) {
            totalIncome += this.data["incomes"][category]
        }
        return totalIncome
    }

    /**
     * Add an expense name and an associated value under an expense category. In the Budget App, expenses are organized
     * in categories (e.g., "essentials", "end game").  expenseNames refer to the specific type of expense (e.g.,
     * "electricity", "mortgage").  If the expense category and name pair is already defined it is overwritten.
     * @param expenseCategory Category for the expense (e.g., "essentials", "end game"). Forced to lowercase to make
     * case insensitive.
     * @param expenseName Name for the expense (e.g., "electricity", "mortgage"). Forced to lowercase to make
     * case insensitive.
     * @param value Value to associate with the expenseCategory/expenseName pair.
     */
    addExpense(expenseCategory, expenseName, value) {
        if (!this.data["expenses"]) {
            this.data["expenses"] = {}
        }
        if (!this.data["expenses"][expenseCategory.toLowerCase()]) {
            this.data["expenses"][expenseCategory.toLowerCase()] = {}
        }
        this.data["expenses"][expenseCategory.toLowerCase()][expenseName.toLowerCase()] = parseFloat(value)

        this.saveData()
    }

    /**
     * IOterates through all expenseCategories and expenseNames to sum all expenses.
     * @returns {number} The total of all expenses for the user.
     */
    getTotalExpenses() {
        let totalExpense = 0
        for (let expenseCategory in this.data["expenses"]) {
            for (let category in this.data["expenses"][expenseCategory]) {
                totalExpense += this.data["expenses"][expenseCategory][category]
            }
            return totalExpense
        }
    }

    /**
     * String representation of the BudgetData instance.
     * @returns {string} username and data for the user.
     */
    toStr() {
        return `${this.username} data: ${JSON.stringify(this.data)}`
    }
}

/**
 * Test method used in conjunction with budget_app_data_demo.html to show saving, loading, and updating BudgetData with
 * local storage.
 * @param username Username of the BudgetData user.
 */
function testUser(username) {
    alert(`Creating/Loading ${username} data and updating income and expenses`)

    let user = loadUserData(username)
    alert(user.toStr())
    user.addIncome("Stocks", 1000)
    user.addIncome("Job", 999)
    user.addExpense("Essentials", "Electricity", 50)
    user.addExpense("Essentials", "Food", 250)
    alert(`After updates: ${user.toStr()}`)
    alert(`Total income: ${user.getTotalIncomes()}.  Total expenses: ${user.getTotalExpenses()}`)
}
