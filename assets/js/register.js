/**
 * Register a Budget App user with their user name and password.  Validates that the
 * username is not already taken.  Stores user data in the localStorage of the user's
 * browser.
 */
function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve or initialize loginStorage
    let loginStorage = window.localStorage.getItem('loginStorage')
    if (!loginStorage) {
        loginStorage = {}
    } else {
        loginStorage = JSON.parse(loginStorage)
    }

    // if (loginStorage[username]) {
    if (username in loginStorage) {
        alert(`User ${username} already has an account.`)
    } else {
        loginStorage[username] = {}
        loginStorage[username]['password'] = password
        window.localStorage.setItem('loginStorage', JSON.stringify(loginStorage))
        alert("Registration successful!")
        window.location = "index.html"
    }
}