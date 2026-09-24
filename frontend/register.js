const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const department = document.getElementById("department").value;

    try {

        const response = await fetch("/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password,
                department
            })

        });

        const data = await response.json();

        document.getElementById("message").textContent =
            data.message || "Registration completed";

        if (response.ok) {
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        }

    } catch (error) {

        console.error(error);

        document.getElementById("message").textContent =
            "Unable to connect to server.";

    }

});