// Adapted from https://www.formget.com/javascript-login-form/

/*
loginStorage is a dictionary (Python) where the key is the user name and it contains a dict with:
 - password: clear text password
 - TBD
*/

/**
 * Log in a Budget App user with their user name and password.  Validates that the
 * username and password are valid based on stored user data in the localStorage of
 * the user's browser.
 */
function validate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let loginStorage = window.localStorage.getItem('loginStorage')
    if (!loginStorage) {
        loginStorage = {}
    } else {
        loginStorage = JSON.parse(loginStorage)
    }

    if (loginStorage[username] && password === loginStorage[username]['password']) {
        alert("Login successful")
        window.location = "home.html"
        return false;
    } else {
        alert("Invalid Login");
    }
}
