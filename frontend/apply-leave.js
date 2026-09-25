const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


// Load leave types
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

        document.getElementById("message").textContent =
            "Unable to load leave types.";
    }
}


// Apply leave
const leaveForm = document.getElementById("leaveForm");

leaveForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const leave_type_id =
        document.getElementById("leaveType").value;

    const start_date =
        document.getElementById("startDate").value;

    const end_date =
        document.getElementById("endDate").value;

    const reason =
        document.getElementById("reason").value;


    try {

        const response = await fetch("/api/leaves", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                leave_type_id,
                start_date,
                end_date,
                reason
            })
        });


        const data = await response.json();


        document.getElementById("message").textContent =
            data.message || "Leave application completed";


        if (response.ok) {

            leaveForm.reset();

            setTimeout(() => {

                window.location.href = "leave-history.html";

            }, 1500);
        }

    } catch (error) {

        console.error("Apply leave error:", error);

        document.getElementById("message").textContent =
            "Unable to connect to server.";
    }

});


loadLeaveTypes();
