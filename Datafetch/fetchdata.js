const data = { products: [] };


async function fetchDataWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); 
    if (!response.ok) {
      throw new Error(
        `Network response was not ok (${response.status} ${response.statusText})`
      );
    }
    return response.json();
  } catch (error) {
    if (!isOnline()) {
      throw new Error("Network is offline");
    } else if (error.name === "AbortError") {
      throw new Error("Request timed out");
    } else {
      throw error;
    }
  }
}
const assignment2Buton = document.getElementById("assignment2Button");


let currentPage = 1;
const rowsPerPage = 5; 

function populateTable(data) {
  const tableBody = document.querySelector("#data-table tbody");
  tableBody.innerHTML = ""; 

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  currentPageData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.discountPercentage}  %</td>
        `;
    tableBody.appendChild(row);
  });

  
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage >= Math.ceil(data.length / rowsPerPage);

  hideError();
  hideSpinner();
}

document.getElementById("fetchBtn").addEventListener("click", () => {
  const apiUrl = "https://dummyjson.com/products";
  const timeoutDuration = 2000;
  const startingPage = 1;
  assignment2Buton.style.display = "none";
  showSpinner();
  fetchDataWithTimeout(apiUrl, timeoutDuration, startingPage)
    .then((data) => {
      console.log("Data fetched successfully:", data);

      console.log(typeof data);
      const startIndex = 0;
      const slicedproducts = data.products.slice(startIndex);
      populateTable(slicedproducts);
      document.getElementById("data-table").style.display = "block"; 
      document.getElementById("pagination").style.display = "block";
      document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          populateTable(slicedproducts);
        }
      });

      document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentPage < Math.ceil(slicedproducts.length / rowsPerPage)) {
          currentPage++;
          populateTable(slicedproducts);
        }
      });
      hideError();
      hideSpinner();
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      if (error.message === "Network is offline") {
        showOfflineError();
      } else if (error.message === "Request timed out") {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Request timed out. Please try again later.";
        hideSpinner();
      } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "something went wrong";
        hideSpinner();
      }
    });
});

function isOnline() {
  return navigator.onLine;
}

function showOfflineError() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent =
    "You are currently offline. Please check your internet connection.";
  hideSpinner();
}

function hideError() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";
}


function showSpinner() {
  const spinner = document.getElementById("spinner");
  const pleaseWaitMessage = document.querySelector(".please-wait");
  spinner.style.display = "block";
}


function hideSpinner() {
  const spinner = document.getElementById("spinner");
  const pleaseWaitMessage = document.querySelector(".please-wait");
  spinner.style.display = "none";
}

function showError(message) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
  hideSpinner();
}



