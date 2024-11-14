// Felhasználói adatok regisztrációjának tárolása
function registerUser(username, password) {
    // Ellenőrizzük, hogy már létezik-e a felhasználónév
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.username === username)) {
        alert("Ez a felhasználónév már foglalt!");
        return false;
    }
    // Új felhasználó hozzáadása
    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sikeres regisztráció! Most már bejelentkezhet.");
    return true;
}

// Belépés a felhasználónév és jelszó ellenőrzésével
function loginUser(username, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Sikeres bejelentkezés!");
        // További kódok a belépés kezeléséhez
        return true;
    } else {
        alert("Hibás felhasználónév vagy jelszó!");
        return false;
    }
}
