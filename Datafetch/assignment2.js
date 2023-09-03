
function fetchFromAPI(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Fetched data: ${data}`);
      resolve(data);
    }, 3000); 
  });
}


function processData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const processedData = data.toUpperCase();
      console.log(`Processed data: ${processedData}`);
      resolve(processedData);
    }, 500);
  });
}


async function performSequentialOperations() {
  try {
    const data1 = "Data 1";
    const fetchedData1 = await fetchFromAPI(data1);
    const processedData1 = await processData(fetchedData1);
    updateUI(1, processedData1);

    const data2 = "Data 2";
    const fetchedData2 = await fetchFromAPI(data2);
    const processedData2 = await processData(fetchedData2);
    updateUI(2, processedData2);

    const data3 = "Data 3";
    const fetchedData3 = await fetchFromAPI(data3);
    const processedData3 = await processData(fetchedData3);
    updateUI(3, processedData3);

    console.log("All operations completed:", processedData1, processedData2, processedData3);
  } catch (error) {
    console.error("Error:", error);
  }
}
function updateUI(dataIndex, processedData) {
  const dataElement = document.getElementById(`data${dataIndex}`);
  dataElement.textContent = processedData;
}

const fetchButon = document.getElementById("fetchBtn");
document.getElementById("assignment2Button").addEventListener("click", () => {
performSequentialOperations();
fetchButon.style.display = "none";
});
