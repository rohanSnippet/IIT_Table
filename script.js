const data = [];
const displayData = [];
fetch("./index.json")
  .then((res) => res.json())
  .then((res) => {
    res.map((item) => data.push(item));
    displayData.push(...data);
    display(displayData);
    //sessionStorage.setItem("chemicals", JSON.stringify(displayData));
  });

//const storedChemicals = sessionStorage.getItem("chemicals");
//console.log(storedChemicals);
// display data
function display(data) {
  const tableBody = document.querySelector("#table tbody");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="py-2">${item.ChemicalName}</td>
      <td class="py-2">${item.Vender}</td>
      <td class="py-2">${item.Density}</td>
      <td class="py-2">${item.Viscosity}</td>
      <td class="py-2">${item.Packaging}</td>
      <td class="py-2">${item.PackSize}</td>
      <td class="py-2">${item.Unit}</td>
      <td class="py-2">${item.Quantity}</td>
    `;
    row.addEventListener("click", function () {
      tableBody
        .querySelectorAll("tr")
        .forEach((r) => r.classList.remove("selected"));

      row.classList.add("selected");
      //console.log("Selected Row Data:", item);
      row.addEventListener("dblclick", function (e) {
        if (e.target.tagName === "TD") {
          const clickedCell = e.target;
          const originalContent = clickedCell.textContent;
          const input = document.createElement("input");
          input.style.width = "80px";
          input.style.outlineColor = "gray";

          input.value = originalContent;

          clickedCell.textContent = "";
          clickedCell.appendChild(input);
          input.focus();

          input.addEventListener("blur", function () {
            if (input.value === originalContent) {
              clickedCell.textContent = originalContent;
            } else {
              clickedCell.textContent = input.value;
            }
          });

          input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              input.blur();
            }
          });
        }
      });
    });
    tableBody.appendChild(row);
  });
}

//add rows input
const addRowButton = document.querySelector("#add");
const tableBody = document.querySelector("#table tbody");
addRowButton.addEventListener("click", function () {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
   <td><input type="text" placeholder="Chemical Name" name="chemicalName" class="border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></td>
<td><input type="text" placeholder="Vender" name="Vender" class="border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></td>
<td><input type="text" placeholder="Density" name="Density" class="border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></td>
<td><input type="text" placeholder="Viscosity" name="Viscosity" class="border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></td>
<td><input type="text" placeholder="Packaging" name="Packaging" class="border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></td>
<td><input type="text" placeholder="PackSize" name="PackSize" class="border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></td>
<td><input type="text" placeholder="Unit" name="Unit" class="border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></td>
<td><input type="text" placeholder="Quantity" name="Quantity" class="border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></td>

  `;
  tableBody.appendChild(newRow);
});

// Save the rows
const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", function () {
  const newRow = tableBody.querySelectorAll("tr");

  newRow.forEach((row) => {
    const input = row.querySelectorAll("input");
    if (input.length > 0) {
      const newData = {
        id: displayData.length + 1,
        ChemicalName: input[0]?.value,
        Vender: input[1]?.value,
        Density: input[2]?.value,
        Viscosity: input[3]?.value,
        Packaging: input[4]?.value,
        PackSize: input[5]?.value,
        Unit: input[6]?.value,
        Quantity: input[7]?.value,
      };

      displayData.push(newData);
    }
  });
  tableBody.innerHTML = "";

  display(displayData);
});

//delete rows
const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", function () {
  const selectedRow = document.querySelector(".selected");
  if (selectedRow) {
    const rowIdx = Array.from(selectedRow.parentNode.children).indexOf(
      selectedRow
    );
    if (rowIdx > -1) {
      displayData.splice(rowIdx, 1);
      display(displayData);
    }
    console.log(data);
  } else {
    console.log("no row selected");
  }
});

//sort manually
function moveRow(selectedRow, direction) {
  const parent = selectedRow.parentNode;
  const rowIdx = Array.from(parent.children).indexOf(selectedRow);

  if (direction === "up" && rowIdx > 0) {
    parent.insertBefore(selectedRow, parent.children[rowIdx - 1]);
    [displayData[rowIdx - 1], displayData[rowIdx]] = [
      displayData[rowIdx],
      displayData[rowIdx - 1],
    ];
  } else if (direction === "down" && rowIdx < parent.children.length - 1) {
    parent.insertBefore(selectedRow, parent.children[rowIdx + 2]);
    [displayData[rowIdx], displayData[rowIdx + 1]] = [
      displayData[rowIdx + 1],
      displayData[rowIdx],
    ];
  }
}
//movie up
const moveUpButton = document.querySelector("#up");
moveUpButton.addEventListener("click", function () {
  const selectedRow = document.querySelector(".selected");
  if (selectedRow) {
    moveRow(selectedRow, "up");
  }
});
//move down
const moveDownButton = document.querySelector("#down");
moveDownButton.addEventListener("click", function () {
  const selectedRow = document.querySelector(".selected");
  if (selectedRow) {
    moveRow(selectedRow, "down");
  }
});

//sort lexicographically
//function
let ascending = true;
function sortChemicals(feild) {
  displayData.sort((a, b) => {
    if (typeof a[feild] === "string") {
      return ascending
        ? a[feild].localeCompare(b[feild])
        : b[feild].localeCompare(a[feild]);
    } else {
      return ascending ? a[feild] - b[feild] : b[feild] - a[feild];
    }
  });
  ascending = !ascending;
  display(displayData);
}

const chemicalName = document.querySelector("#Chemical");
const vender = document.querySelector("#Vender");
const density = document.querySelector("#Density");
const viscosity = document.querySelector("#Viscosity");
const packaging = document.querySelector("#Packaging");
const packSize = document.querySelector("#PackSize");
const unit = document.querySelector("#Unit");
const quantity = document.querySelector("#Quantity");

const tableHeads = document.querySelector("#table-header");

tableHeads.addEventListener("click", function (e) {
  const target = e.target;
  const field = target.dataset.field;

  if (field) {
    sortChemicals(field);
  }
});

//refresh
const refresh = document.querySelector("#refresh");
refresh.addEventListener("click", function () {
  window.location.reload();
});

//styling
document.querySelector("#download").addEventListener("click", function () {
  var table = document.getElementById("table");

  var wb = XLSX.utils.book_new();

  var ws = XLSX.utils.table_to_sheet(table);

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, "RohanTable.xlsx");
});
