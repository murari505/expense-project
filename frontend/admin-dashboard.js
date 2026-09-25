const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


async function loadLeaveApplications() {

    try {

        const response = await fetch("/api/admin/leaves", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!response.ok) {

            document.getElementById("message").textContent =
                data.message || "Unable to load leave applications";

            return;
        }

        const tableBody =
            document.getElementById("leaveTableBody");

        tableBody.innerHTML = "";

        if (data.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8">
                        No leave applications found.
                    </td>
                </tr>
            `;

            return;
        }

        data.forEach((leave) => {

            const row = document.createElement("tr");

            let action = "";

            if (leave.status === "Pending") {

                action = `
                    <button onclick="approveLeave(${leave.id})">
                        Approve
                    </button>

                    <button onclick="rejectLeave(${leave.id})">
                        Reject
                    </button>
                `;

            } else {

                action = leave.status;
            }

            row.innerHTML = `
                <td>${leave.id}</td>
                <td>${leave.employee_name}</td>
                <td>${leave.leave_type}</td>
                <td>${leave.start_date}</td>
                <td>${leave.end_date}</td>
                <td>${leave.reason}</td>
                <td>${leave.status}</td>
                <td>${action}</td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error("Error loading leave applications:", error);

        document.getElementById("message").textContent =
            "Unable to connect to server.";
    }
}


async function approveLeave(id) {

    try {

        const response = await fetch(
            `/api/admin/leaves/${id}/approve`,
            {
                method: "PUT",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        alert(data.message || "Leave approved");

        loadLeaveApplications();

    } catch (error) {

        console.error(error);

        alert("Unable to approve leave.");
    }
}


async function rejectLeave(id) {

    try {

        const response = await fetch(
            `/api/admin/leaves/${id}/reject`,
            {
                method: "PUT",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        alert(data.message || "Leave rejected");

        loadLeaveApplications();

    } catch (error) {

        console.error(error);

        alert("Unable to reject leave.");
    }
}


function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}


loadLeaveApplications();

