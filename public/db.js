let db;
const request = window.indexedDB.open("budgetApp", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore("records", { autoIncrement: true });
};

request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
};

request.onsuccess = function(event) {
    const db = event.target.result;
    if (navigator.onLine) {
        checkRecords();
    }
};

function storeRecords(data) {
    const transaction = db.transaction(["[records]"], "readwrite");
    const objStore = transaction.objectStore("records");

    objStore.add(data);
}

function checkRecords() {
    const transaction = db.transaction(["records"], "readwrite");
    const objStore = transaction.objectStore("records");
    const getAll = objStore.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": application/json
                }
            }).then(response => response.json()
            ).then(() => {
                const transaction = db.transaction(["records"], "readwrite");
                const objStore = transaction.objectStore("records");
                objStore.clear();
            });
        }
    }
}

function deleteRecords() {
    const transaction = db.transaction(["records"], readwrite);
    const objStore = transaction.objectStore("pending");
    objStore.clear();
}

window.addEventListener("online", checkRecords);
