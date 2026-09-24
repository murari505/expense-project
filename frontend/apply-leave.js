const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function loadLeaveTypes() {

    try {

        const response = await fetch("/api/leave-types");

        const leaveTypes = await response.json();

        const select = document.getElementById("leaveType");

        leaveTypes.forEach((type) => {

            const option = document.createElement("option");

            option.value = type.id;
            option.textContent = type.name;

            select.appendChild(option);

        });

    } catch (error) {

        console.error("Error loading leave types:", error);

    }
}

loadLeaveTypes();