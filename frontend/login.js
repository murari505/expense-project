const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                
               email: email,
               password: password
            })

        });

        const data = await response.json();

        document.getElementById("message").textContent =
            data.message || "Login completed";

        if (response.ok && data.token) {

            localStorage.setItem("token", data.token);

            window.location.href = "dashboard.html";
        }

    } catch (error) {

        console.error(error);

        document.getElementById("message").textContent =
            "Unable to connect to server.";

    }

});
