const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function loadProfile() {

    try {

        const response = await fetch("/api/auth/profile", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!response.ok) {

            console.error("Profile error:", data);

            localStorage.removeItem("token");
            window.location.href = "login.html";

            return;
        }

        document.getElementById("userName").textContent =
            data.name;

        document.getElementById("userEmail").textContent =
            data.email;

        document.getElementById("userDepartment").textContent =
            data.department;

    } catch (error) {

        console.error("Error loading profile:", error);

        document.getElementById("userName").textContent =
            "Unable to load";

        document.getElementById("userEmail").textContent =
            "Unable to load";

        document.getElementById("userDepartment").textContent =
            "Unable to load";
    }
}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}

loadProfile();
