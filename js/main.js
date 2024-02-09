const allMeals = document.querySelector("#defaultMeals .row");
const mealDetails = document.querySelector("#mealDetails .row");

// Navbar Content
const barsIcon = $("#barsIcon i");
const navbarWidth = $(".navbar-left-links").outerWidth();
const navbarLeft = $(".navbar-left");
const navbarLeftLinks = $(".navbar-left-links");
const navbarLinksList = $(".nav-links-list li");

// Search Form Inputs
let searchByName = document.querySelector("#searchByName");
let searchByFirstLet = document.querySelector("#searchByFirstLet");

// Contact Form Inputs
const signNameInput = $("#signNameInput");
const signEmailInput = $("#signEmailInput");
const signPhoneInput = $("#signPhoneInput");
const signAgeInput = $("#signAgeInput");
const signPasswordInput = $("#signPasswordInput");
const signRePasswordInput = $("#signRePasswordInput");

// Wrong Alerts
const wrongName = $(".wrongName");
const wrongEmail = $(".wrongEmail");
const wrongPhone = $(".wrongPhone");
const wrongAge = $(".wrongAge");
const wrongPassword = $(".wrongPassword");
const wrongRePassword = $(".wrongRePassword");

// Regex patterns
const nameRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

// // // Load Screen
function loadLayerIfNoData() {
  if ($(".item").css("display") != "block") {
    $(".loaderLayer").css("display", "flex");
    $(".loader").css("display", "block");
    $("body").css("overflow", "hidden");
    $(".loader").fadeOut(500, () => {
      $("body").css("overflow", "auto");
      $(".loaderLayer").fadeOut(500);
    });
  }
}

function loadLayerBetweenLinks() {
  $(".loaderLayer").css("display", "flex");
  $(".loaderLayer").css("backgroundColor", "rgba(0, 0, 0, 0.688)");
  $(".loader").css("display", "block");
  $("body").css("overflow", "hidden");
  $(".loader").fadeOut(500, () => {
    $("body").css("overflow", "auto");
    $(".loaderLayer").fadeOut(500);
  });
}

// // // Toggle Navbar
function toggleNav() {
  barsIcon.on("click", function () {
    navbarLeft.animate({ left: navbarWidth }, 500);
    navbarLeftLinks.animate({ left: 0 }, 500);
    navbarLinksList.show(500);
    barsIcon.removeClass("fa-bars");
    barsIcon.addClass("fa-x");
    closeNav();
  });
}
toggleNav();

// // Close Navbar
function closeNav() {
  if (navbarLeftLinks.css("left") == "0px") {
    navbarLeftLinks.animate({ left: -navbarWidth }, 500);
    navbarLeft.animate({ left: 0 }, 500);
    setTimeout(() => {
      navbarLinksList.hide(500);
      barsIcon.removeClass("fa-x");
      barsIcon.addClass("fa-bars");
    }, 500);
  }
}

// // Close Search Form
function closeSearchForm() {
  $("#searchForm").addClass("d-none");
  searchByName.value = "";
  searchByFirstLet.value = "";
}

// // // Display Search Form
$("#searchLink").on("click", function () {
  closeNav();
  $("#defaultMeals").addClass("d-none");
  $("#mealDetails").addClass("d-none");
  $("#contactForm").addClass("d-none");
  $("#searchForm").removeClass("d-none");
});

// // // Get Data form API
async function getData(q = "") {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`
  );
  const data = await response.json();
  displayData(data.meals);
}
getData();

// // // Show Meals on the page
function displayData(list) {
  let content = "";
  for (let i = 0; i < list.length; i++) {
    content += `
      <div class="col-xl-3 col-lg-4 col-md-6 g-4">
        <div onclick="getMealDetails(${list[i].idMeal}),closeSearchForm(),closeNav(),loadLayerBetweenLinks()" class="item rounded"">
          <figure class="m-0">
            <img src="${list[i].strMealThumb}" class="w-100 rounded " alt="${list[i].strMeal}">
          </figure>
          <div  class="recipe-layer cursor-pointer  display-flex rounded">
            <h2 class="fw-bold mt-3 ">${list[i].strMeal}</h2>
          </div>
        </div>
      </div>`;
  }
  // // Load Screen
  loadLayerIfNoData();
  allMeals.innerHTML = content;
}

// // // Get Meal Details
async function getMealDetails(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  $("#defaultMeals").addClass("d-none");
  $("#mealDetails").removeClass("d-none");
  let mealIngredient = [...new Map(Object.entries(data.meals[0])).values()]
    .slice(9, 28)
    .filter((el) => el.length > 1);
  let mealMeasure = [...new Map(Object.entries(data.meals[0])).values()]
    .slice(29, 48)
    .filter((el) => el.length > 1);
  displayMealDetails(data.meals, mealIngredient, mealMeasure);
}

// // Display Meal Details
function displayMealDetails(list, ingredientsList, measureList) {
  // // Load Screen
  loadLayerBetweenLinks();

  let detailsContent = "";
  let recipeDesc = "";

  for (let i = 0; i < ingredientsList.length; i++) {
    recipeDesc += `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${ingredientsList[i]} ${measureList[i]}</p>`;
  }

  detailsContent += `
    <div class="col-md-4 g-4">
      <div id="mealImg" class="text-white ">
        <figure>
            <img src="${list[0].strMealThumb}" class="w-100 rounded" alt="${
    list[0].strMeal
  }">
        </figure>
        <h2  class=" fs-1 ">${list[0].strMeal}</h2>
      </div>
    </div>
    <div class="col-md-8 g-4">
      <div id="meadDesc" class="text-white">
        <h2 class=" fs-2 ">Instructions</h2>
        <p>${list[0].strInstructions} </p>
        <div id="mealArea" class="d-flex align-items-center">
            <h2 class=" fs-2 ">Area :</h2>
            <h3 class="fs-3 pt-1 ms-2">${list[0].strArea}</h3>
        </div>
        <div id="mealCategory" class="d-flex align-items-center">
            <h2 class=" fs-2 ">Category :</h2>
            <h3 class="fs-3 pt-1 ms-2">${list[0].strCategory}</h3>
        </div>
        <div id="mealRecipes">
            <h2 class=" py-1 fs-2 ">Recipes : </h2>
            <div class="d-flex align-items-center flex-wrap "> ${recipeDesc} </div>
        </div>
        <h2 class=" fs-2 mb-2">Tags : </h2>
        <div id="mealTags" class="d-flex mt-3">
            ${
              list[0].strTags == null
                ? ""
                : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                    list[0].strTags.split(",")[0]
                  }</p>`
            } 
            ${
              list[0].strTags == null
                ? ""
                : list[0].strTags.split(",")[1] == undefined
                ? ""
                : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                    list[0].strTags.split(",")[1]
                  }</p>`
            } 
            ${
              list[0].strTags == null
                ? ""
                : list[0].strTags.split(",")[2] == undefined
                ? ""
                : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                    list[0].strTags.split(",")[2]
                  }</p>`
            } 
            ${
              list[0].strTags == null
                ? ""
                : list[0].strTags.split(",")[3] == undefined
                ? ""
                : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                    list[0].strTags.split(",")[3]
                  }</p>`
            } 
        </div>

        <a href="${
          list[0].strSource
        }" target="_blank" class="btn btn-success text-white"> Source</a>
        <a href="${
          list[0].strYoutube
        }" target="_blank" class="btn btn-danger text-white ms-2"> Youtube</a>
    </div>
  </div>`;

  mealDetails.innerHTML = detailsContent;
}

// // // Get Data and Search By Name
searchByName.addEventListener("keyup", function () {
  getData(searchByName.value);
  $("#defaultMeals").removeClass("d-none");
});

// // // Search By First Letter
async function searchLet(fl) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${fl}`
  );
  const data = await response.json();
  displayData(data.meals);
}

// // Get Data By First Letter
searchByFirstLet.addEventListener("keyup", function () {
  searchLet(searchByFirstLet.value);
  $("#defaultMeals").removeClass("d-none");
});

// // // Get Meals Categories
async function getCategory() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await res.json();
  displayCategory(data.categories);
}

// // Display Categories
function displayCategory(list) {
  loadLayerBetweenLinks();
  let categoryContent = "";
  for (let i = 0; i < list.length; i++) {
    categoryContent += `
      <div class="col-xl-3 col-lg-4 col-md-6 g-4">
      <div onclick="displayMealsCategory('${
        list[i].strCategory
      }'),closeNav(),loadLayerBetweenLinks()" class="item rounded mb-4">
        <figure class="m-0">
          <img src="${list[i].strCategoryThumb}" class="w-100 rounded" alt="${
      list[i].strCategory
    }">
        </figure>
        <div  class="recipe-layer cursor-pointer rounded">
          <h2 class="fw-bold text-center ">${list[i].strCategory}</h2>
          <p class=" text-center">${list[i].strCategoryDescription.slice(
            0,
            100
          )}</p>
        
        </div>
      </div>
    </div>`;
  }
  loadLayerIfNoData();
  allMeals.innerHTML = categoryContent;
}

// // Get Meals Categories On Clicking Category Link
$("#categoryLink").on("click", () => {
  getCategory();
  closeNav();
  $("#defaultMeals").removeClass("d-none");
  $("#mealDetails").addClass("d-none");
  $("#contactForm").addClass("d-none");
  $("#searchForm").addClass("d-none");
});

// // Display Meals By Category
async function displayMealsCategory(category) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await response.json();
  displayData(data.meals);
}

// // // Get Meals Areas
async function getArea() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const data = await response.json();
  displayArea(data.meals);
}

// // Display Areas
function displayArea(list) {
  loadLayerBetweenLinks();
  let areaContent = "";
  for (let i = 0; i < list.length; i++) {
    areaContent += `
      <div class="col-lg-3 col-md-6 g-4">
      <div onclick="displayMealsArea('${list[i].strArea}'),closeNav(),loadLayerBetweenLinks()" class="item text-center text-white cursor-pointer">
          <i class="fa-solid fa-house-laptop fa-4x "></i>
          <h2 class="fw-bold text-center">${list[i].strArea}</h2>
      </div>
    </div>`;
  }
  allMeals.innerHTML = areaContent;
}

// // Get Meals Areas On Clicking Area Link
$("#AreaLink").on("click", () => {
  getArea();
  closeNav();
  $("#defaultMeals").removeClass("d-none");
  $("#mealDetails").addClass("d-none");
  $("#contactForm").addClass("d-none");
  $("#searchForm").addClass("d-none");
});

// // Display Meals By Area
async function displayMealsArea(area) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const data = await response.json();
  displayData(data.meals);
}

// // // Get Meals Ingredients
async function getIngredients() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const data = await response.json();
  displayIngredients(data.meals.slice(0, 20));
}

// // Display Ingredients
function displayIngredients(list) {
  loadLayerBetweenLinks();
  let ingredientsContent = "";
  for (let i = 0; i < list.length; i++) {
    ingredientsContent += `
      <div class="col-lg-3 col-md-6 g-4">
      <div onclick="displayMealsIngredients('${
        list[i].strIngredient
      }'),closeNav(),loadLayerBetweenLinks()" class="item text-center text-white cursor-pointer">
          <i class="fa-solid fa-drumstick-bite fa-4x "></i>
          <h2 class="fw-bold text-center">${list[i].strIngredient}</h2>
          <p class=" text-center">${list[i].strDescription.slice(0, 120)}</p>
      </div>
    </div>`;
  }
  allMeals.innerHTML = ingredientsContent;
}

// // Get Meals Areas On Clicking Ingredients Link
$("#ingredientsLink").on("click", () => {
  getIngredients();
  closeNav();
  $("#defaultMeals").removeClass("d-none");
  $("#mealDetails").addClass("d-none");
  $("#contactForm").addClass("d-none");
  $("#searchForm").addClass("d-none");
});

// // Display Meals By Category
async function displayMealsIngredients(ingredients) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  const data = await response.json();
  displayData(data.meals);
}

// // // Contact Form Validation
(function () {
  // // Name Input validation
  signNameInput.on("keyup", () => {
    let inputValue = signNameInput.val();
    if (nameRegex.test(inputValue) != true) {
      wrongName.removeClass("d-none");
    } else {
      wrongName.addClass("d-none");
    }
  });

  // // Email Input validation
  signEmailInput.on("keyup", () => {
    let inputValue = signEmailInput.val();
    if (emailRegex.test(inputValue) != true) {
      wrongEmail.removeClass("d-none");
    } else {
      wrongEmail.addClass("d-none");
    }
  });

  // // Phone Input validation
  signPhoneInput.on("keyup", () => {
    let inputValue = signPhoneInput.val();
    if (phoneRegex.test(inputValue) != true) {
      wrongPhone.removeClass("d-none");
    } else {
      wrongPhone.addClass("d-none");
    }
  });

  // // Age Input validation
  signAgeInput.on("keyup", () => {
    let inputValue = signAgeInput.val();
    if (inputValue > 100) {
      wrongAge.removeClass("d-none");
    } else {
      wrongAge.addClass("d-none");
    }
  });

  // // Password, RePassword Input validation
  signPasswordInput.on("keyup", () => {
    let inputPassValue = signPasswordInput.val();
    if (passwordRegex.test(inputPassValue) != true) {
      wrongPassword.removeClass("d-none");
    } else {
      wrongPassword.addClass("d-none");
    }

    signRePasswordInput.on("keyup", () => {
      let inputRePassValue = signRePasswordInput.val();
      if (inputRePassValue != inputPassValue) {
        wrongRePassword.removeClass("d-none");
      } else {
        wrongRePassword.addClass("d-none");
      }
    });
  });

  // // Remove Disabled Attr From Submit Btn
  $("#contactForm input").on("keyup", () => {
    if (
      nameRegex.test(signNameInput.val()) == true &&
      emailRegex.test(signEmailInput.val()) == true &&
      phoneRegex.test(signPhoneInput.val()) == true &&
      signAgeInput.val() < 100 &&
      passwordRegex.test(signPasswordInput.val()) == true &&
      signRePasswordInput.val() == signPasswordInput.val()
    ) {
      $(".submitBtn").removeClass("disabled");
    } else {
      $(".submitBtn").addClass("disabled");
    }
  });

  // // Display Contact Form
  $("#contactLink").on("click", () => {
    closeNav();
    $("#contactForm").removeClass("d-none");
    $("#mealDetails").addClass("d-none");
    $("#searchForm").addClass("d-none");
    $("#defaultMeals").addClass("d-none");
  });
})();
