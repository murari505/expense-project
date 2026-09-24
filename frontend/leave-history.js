const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function loadLeaveHistory() {

    try {

        const response = await fetch("/api/leaves", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const leaves = await response.json();

        const tableBody =
            document.getElementById("leaveTableBody");

        tableBody.innerHTML = "";

        leaves.forEach((leave) => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${leave.id}</td>
                <td>${leave.leave_type}</td>
                <td>${leave.start_date}</td>
                <td>${leave.end_date}</td>
                <td>${leave.reason}</td>
                <td>${leave.status}</td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error("Error loading leave history:", error);

    }

}

loadLeaveHistory();
