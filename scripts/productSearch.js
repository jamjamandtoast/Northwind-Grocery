"use strict";

const searchSelect = document.getElementById("SearchByOption");
const categorySelect = document.getElementById("categorySearch");
const productListingTable = document.getElementById("ViewAllTable");
const productListingTableBody = document.getElementById("viewAllProductsSearchDetails");

window.onload = function () {
  hideCategorySelectRow();
  hideProductListingTable();

  // Go and populate the categories dropdown
  populateCategories();

  searchSelect.onchange = onSearchSelectChange;
  categorySelect.onchange = onCategorySelectChange;
};

// EVENT HANDLER: Do this when Search type changes
function onSearchSelectChange() {
  // if all, then getAllProductsFromApi
  if (searchSelect.value === "3") {
    showProductListingTable();
    showAllProducts();
  } else {
    hideCategorySelectRow();
    hideProductListingTable();
  }
}

// EVENT HANDLER: Do this when Category value changes (This can only happen when the category row is shown/search type is by category)
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
  categorySearch.style.display = "block";
}

function hideCategorySelectRow() {
  categorySearch.style.display = "none";
}

function showProductListingTable() {
  ViewAllTable.style.display = "block";
}

function hideProductListingTable() {
  ViewAllTable.style.display = "none";
}

// HELPER FUNCTION: Populate the Categories Dropdown with all possible categories from the API
function populateCategories() {
  fetch("http://localhost:8081/api/categories")
    .then(response => response.json())
    .then(categories => {
      for (let category of categories) {
        let catOption = document.createElement("option");
        catOption.text = category.name;
        catOption.value = category.categoryId;

        categorySelect.appendChild(catOption);
        console.log(catOption);
      }
    });
}

// HELPER FUNCTION: Show products in the selected category
function showProductsInCategory(categoryId) {
  fetch(`http://localhost:8081/api/categories/${categoryId}`)
    .then(response => response.json())
    .then(data => {
      populateProducts(data);
    });
}

// HELPER FUNCTION: Show all products
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
