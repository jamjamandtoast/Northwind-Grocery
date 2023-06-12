"use strict";

const searchSelect = document.getElementById("SearchByOption");
const categorySelect = document.getElementById("categorySearch");
const productListingTable = document.getElementById("ViewAllTable");
const productListingTableBody = document.getElementById("viewAllProductsSearchDetails");

window.onload = function () {
  hideCategorySelectRow();
  hideProductListingTable();

  searchSelect.onchange = onSearchSelectChange;
  categorySelect.onchange = onCategorySelectChange;
};

// EVENT HANDLER: Do this when Search type changes
function onSearchSelectChange() {
  if (searchSelect.value === "2") {
    showCategorySelectRow();
    hideProductListingTable();
  } else if (searchSelect.value === "3") {
    hideCategorySelectRow();
    showProductListingTable();
    showAllProducts();
  } else {
    hideCategorySelectRow();
    hideProductListingTable();
  }
}

// EVENT HANDLER: Do this when Category value changes
function onCategorySelectChange() {
  const categoryId = categorySelect.value;

  if (categoryId === "") {
    hideProductListingTable();
  } else {
    showProductsInCategory(categoryId);
    showProductListingTable();
  }
}

function showCategorySelectRow() {
  categorySelect.style.display = "block";
}

function hideCategorySelectRow() {
  categorySelect.style.display = "none";
}

function showProductListingTable() {
  productListingTable.style.display = "block";
}

function hideProductListingTable() {
  productListingTable.style.display = "none";
}
function showAllProducts() {
    fetch("http://localhost:8081/api/products")
      .then(response => response.json())
      .then(products => {
        populateProducts(products);
        console.log(products);
      });
  }
// HELPER FUNCTION: Populate the products in the table
function populateProducts(productsArray) {
  productListingTableBody.innerHTML = "";

  for (let product of productsArray) {
    let newRow = productListingTableBody.insertRow(-1);
    let idCell = newRow.insertCell(0);
    idCell.innerHTML = product.productId;

    let cell1 = newRow.insertCell(1);
    let anchor = document.createElement("a");
    anchor.href = `details.html?productid=${product.productId}`;
    anchor.text = product.productName;
    cell1.appendChild(anchor);

    let cell2 = newRow.insertCell(2);
    cell2.innerHTML = product.unitPrice;
  }

  console.log("All products are in the table");
}
