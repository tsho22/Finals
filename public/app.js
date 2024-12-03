document.getElementById('packageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Retrieve form inputs
    const recipientName = document.getElementById('recipientName').value.trim();
    const packageID = document.getElementById('packageID').value.trim();
    const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
    const weight = document.getElementById('weight').value.trim();

    // Validate inputs
    const errors = [];
    if (!/^[a-zA-Z\s]+$/.test(recipientName)) errors.push("Invalid Recipient Name");
    if (!/^\d+$/.test(packageID)) errors.push("Invalid Package ID");
    if (!deliveryAddress) errors.push("Invalid Delivery Address"); // Only check if it's empty
    if (!/^\d+(\.\d+)?$/.test(weight) || parseFloat(weight) <= 0) errors.push("Invalid Weight");

    if (errors.length > 0) {
        alert(`Error: ${errors.join(", ")}.`);
        return;
    }

    // Add package to table
    addPackage(recipientName, parseInt(packageID), deliveryAddress, parseFloat(weight));
});

const packages = [];

function addPackage(recipientName, packageID, deliveryAddress, weight) {
    // Generate tracking code
    const trackingCode = generateTrackingCode(packageID, weight);

    // Add package to array
    packages.push({ recipientName, packageID, deliveryAddress, weight, trackingCode });

    // Sort packages by weight
    packages.sort((a, b) => a.weight - b.weight);

    // Update table
    updateTable();
}

function generateTrackingCode(packageID, weight) {
    return (packageID << 4 | weight).toString(2);
}

function updateTable() {
    const tableBody = document.getElementById('packageTableBody');
    tableBody.innerHTML = ''; // Clear the table

    packages.forEach(pkg => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${pkg.recipientName}</td>
            <td>${pkg.packageID}</td>
            <td>${pkg.deliveryAddress}</td>
            <td>${pkg.weight}</td>
            <td>${pkg.trackingCode}</td>
        `;

        tableBody.appendChild(row);
    });
}
