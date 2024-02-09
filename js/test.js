/// 

// window.addEventListener("load", () => {
// $(function () {
const allMeals = document.querySelector("#defaultMeals .row");
const mealDetails = document.querySelector("#mealDetails .row");

// Navbar Content
const barsIcon = $("#barsIcon i");
const navbarWidth = $(".navbar-left-links").outerWidth();
const navbarLeft = $(".navbar-left");
const navbarLeftLinks = $(".navbar-left-links");
const navbarLinksList = $(".nav-links-list li");

// Search Form Inputs
const searchByName = document.querySelector("#searchByName");
const searchByFirstLet = document.querySelector("#searchByFirstLet");

let recipeLayer;

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

// TODO: Load Screen
function loaderLayerOnNavLinks() {
  if ($(".item").css("display") != "block") {
    if ($(".item").css("display") != "block") {
      $(".loaderLayer").css("display", "flex");
      $(".loaderLayer").css("backgroundColor", "rgba(0, 0, 0, 0.411)");
      $(".loader").css("display", "block");
      $("body").css("overflow", "hidden");
      $(".loader").fadeOut(600, () => {
        $("body").css("overflow", "auto");
        $(".loaderLayer").fadeOut(800);
      });
    }
  }
}

// TODO: Toggle  the  Navbar
function toggleNav() {
  barsIcon.on("click", function () {
    navbarLeft.animate({ left: navbarWidth }, 500);
    navbarLeftLinks.animate({ left: 0 }, 500);
    navbarLinksList.show(500);
    barsIcon.eq(0).addClass("d-none");
    barsIcon.eq(1).removeClass("d-none");
    // barsIcon.removeClass("fa-bars");
    // barsIcon.addClass("fa-x");
    closeNav();
  });
}
toggleNav();

function closeNav() {
  if (navbarLeftLinks.css("left") == "0px") {
    navbarLeftLinks.animate({ left: -navbarWidth }, 500);
    navbarLeft.animate({ left: 0 }, 500);
    setTimeout(() => {
      navbarLinksList.hide(500);
      barsIcon.eq(0).removeClass("d-none");
      barsIcon.eq(1).addClass("d-none");
      // barsIcon.removeClass("fa-x");
      // barsIcon.addClass("fa-bars");
    }, 500);
  }
}

// TODO: Display Search Form
$("#searchLink").on("click", function () {
  closeNav();
  $("#defaultMeals").addClass("d-none");
  $("#contactForm").addClass("d-none");
  $("#searchForm").removeClass("d-none");
});

// TODO: Get Data form API
async function getData(q = "") {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`
  );
  const data = await response.json();
  console.log(data.meals);
  displayData(data.meals);
}
getData();

// TODO: Show Meals on the page
function displayData(list) {
  let content = "";
  for (let i = 0; i < list.length; i++) {
    content += `
          <div class="col-xl-3 col-lg-4 col-md-6 gx-4 gy-5">
            <div onclick="getMealDetails(${list[i].idMeal})" class="item rounded"">
              <figure class="m-0">
                <img src="${list[i].strMealThumb}" class="w-100 rounded " alt="${list[i].strMeal}">
              </figure>
              <div  class="recipe-layer cursor-pointer  display-flex rounded">
                <h2 class="fw-bold mt-3">${list[i].strMeal}</h2>
              </div>
            </div>
          </div>`;
  }
  // FIXME: Load Screen
  if ($(".item").css("display") != "block") {
    $(".loader").fadeOut(600, () => {
      $("body").css("overflow", "auto");
      $(".loaderLayer").fadeOut(800);
    });
  }
  allMeals.innerHTML = content;
}

// TODO: Display Meal Details
async function getMealDetails(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  console.log(data.meals);
  $("#defaultMeals").addClass("d-none");
  $("#mealDetails ").removeClass("d-none");
  let mealIngredient = [...new Map(Object.entries(data.meals[0])).values()]
    .slice(9, 28)
    .filter((el) => el.length > 1);
  let mealMeasure = [...new Map(Object.entries(data.meals[0])).values()]
    .slice(29, 48)
    .filter((el) => el.length > 1);
  console.log("Ingredient");
  console.log(mealIngredient);
  console.log("Measure");
  console.log(mealMeasure);
  displayMealDetails(data.meals, mealIngredient, mealMeasure);
}

function displayMealDetails(list, ingredientsList, measureList) {
  let detailsContent = "";
  let ingredients = "";
  // let measures = "";

  for (let i = 0; i < ingredientsList.length; i++) {
    recipeDesc += `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${ingredientsList[i]} ${measureList[i]}</p>`;
  }
  console.log(recipeDesc);
  // for (let i = 0; i < measureList.length; i++) {
  //   measures += `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${measureList[i]}</p>`;
  // }
  // console.log(measures);

  detailsContent += `
        <div class="col-md-4 ">
        <div id="mealImg" class="text-white ">
            <figure>
                <img src="${list[0].strMealThumb}" class="w-100 rounded" alt="">
            </figure>
            <h2 class="fs-2 ">${list[0].strMeal}</h2>
        </div>
    </div>
    <div class="col-md-8 ">
        <div id="meadDesc" class="text-white">
            <h2 class="fs-2 ">Instructions</h2>
            <p>${list[0].strInstructions} </p>
            <div id="mealArea" class="d-flex align-items-center">
                <h2 class="fs-2 ">Area :</h2>
                <h3 class="fs-3 ms-2">${list[0].strArea}</h3>
            </div>
            <div id="mealCategory" class="d-flex align-items-center">
                <h2 class="fs-2 ">Category :</h2>
                <h3 class="fs-3 ms-2">${list[0].strCategory}</h3>
            </div>
            <div id="mealRecipes">
                <h2 class="fs-2 ">Recipes : </h2>
                <div class="d-flex align-items-center flex-wrap "> ${recipeDesc} </div>
                ${
                  list[0].strMeasure1 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure1} ${list[0].strIngredient1}</p>`
                }
                ${
                  list[0].strMeasure2 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure2} ${list[0].strIngredient2}</p>`
                }
                ${
                  list[0].strMeasure3 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure3} ${list[0].strIngredient3}</p>`
                }
                ${
                  list[0].strMeasure4 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure4} ${list[0].strIngredient4}</p>`
                }
                ${
                  list[0].strMeasure5 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure5} ${list[0].strIngredient5}</p>`
                }
                ${
                  list[0].strMeasure6 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure6} ${list[0].strIngredient6}</p>`
                }
                ${
                  list[0].strMeasure7 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure7} ${list[0].strIngredient7}</p>`
                }
                ${
                  list[0].strMeasure8 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure8} ${list[0].strIngredient8}</p>`
                }
                ${
                  list[0].strMeasure9 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure9} ${list[0].strIngredient9}</p>`
                }
                ${
                  list[0].strMeasure10 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure10} ${list[0].strIngredient10}</p>`
                }
                ${
                  list[0].strMeasure11 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure11} ${list[0].strIngredient11}</p>`
                }
                ${
                  list[0].strMeasure12 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure12} ${list[0].strIngredient12}</p>`
                }
                ${
                  list[0].strMeasure13 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure13} ${list[0].strIngredient13}</p>`
                }
                ${
                  list[0].strMeasure14 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure14} ${list[0].strIngredient14}</p>`
                }
                ${
                  list[0].strMeasure15 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure15} ${list[0].strIngredient15}</p>`
                }
                ${
                  list[0].strMeasure16 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure16} ${list[0].strIngredient16}</p>`
                }
                ${
                  list[0].strMeasure17 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure17} ${list[0].strIngredient17}</p>`
                }
                ${
                  list[0].strMeasure18 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure18} ${list[0].strIngredient18}</p>`
                }
                ${
                  list[0].strMeasure19 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure19} ${list[0].strIngredient19}</p>`
                }
                ${
                  list[0].strMeasure20 == " "
                    ? ""
                    : `<p class="bg-info-subtle text-info-emphasis  rounded me-3">${list[0].strMeasure20} ${list[0].strIngredient19}</p>`
                }
            </div>
    
            <div id="mealTags" class="d-flex">
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
            }" target="_blank" class="btn btn-danger text-white"> Youtube</a>
        </div>
    </div>`;

  // FIXME: Load Screen
  if ($(".item").css("display") != "block") {
    $(".loader").fadeOut(600, () => {
      $("body").css("overflow", "auto");
      $(".loaderLayer").fadeOut(800);
    });
  }
  mealDetails.innerHTML = detailsContent;
}

// TODO: Search By Name
searchByName.addEventListener("keyup", function () {
  getData(searchByName.value);
  $("#defaultMeals").removeClass("d-none");
});

// TODO: Search By First Letter
async function searchLet(fl) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${fl}`
  );
  const data = await response.json();
  console.log(data);
  displayData(data.meals);
}

searchByFirstLet.addEventListener("keyup", function () {
  searchLet(searchByFirstLet.value);
  $("#defaultMeals").removeClass("d-none");
});

// TODO: Display Categories
$("#categoryLink").on("click", () => {
  getCategory();
  closeNav();
  $("#defaultMeals").removeClass("d-none");
  $("#contactForm").addClass("d-none");
  $("#searchForm").addClass("d-none");
});

async function getCategory() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await res.json();
  console.log(data.categories);
  displayCategory(data.categories);
}

function displayCategory(list) {
  let categoryContent = "";
  for (let i = 0; i < list.length; i++) {
    categoryContent += `
          <div class="col-lg-3 col-md-6 g-4">
          <div class="item rounded mb-4">
            <figure class="m-0">
              <img src="${
                list[i].strCategoryThumb
              }" class="w-100 rounded " alt="${list[i].strCategory}">
            </figure>
            <div class="recipe-layer cursor-pointer rounded">
              <h2 class="fw-bold text-center">${list[i].strCategory}</h2>
              ${
                list[i].strCategoryDescription.includes(".")
                  ? `<p class=" text-center">${list[i].strCategoryDescription.slice(
                      0,
                      list[i].strCategoryDescription.indexOf(".") + 1 
                    )}</p>`
                  : `<p class=" text-center">${list[i].strCategoryDescription.slice(
                      0,
                      list[i].strCategoryDescription.length
                    )}.</p>`
              }
              
            </div>
          </div>
        </div>`;
  }
  loaderLayerOnNavLinks();
  allMeals.innerHTML = categoryContent;
}

// TODO: Display Area
$("#AreaLink").on("click", () => {
  getArea();
  closeNav();
  $("#defaultMeals").removeClass("d-none");
  $("#contactForm").addClass("d-none");
  $("#searchForm").addClass("d-none");
});

async function getArea() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const data = await response.json();
  console.log(data.meals);
  displayArea(data.meals);
}

function displayArea(list) {
  let areaContent = "";
  for (let i = 0; i < list.length; i++) {
    areaContent += `
          <div class="col-lg-3 col-md-6 g-4">
          <div class="item text-center text-white cursor-pointer">
              <i class="fa-solid fa-house-laptop fa-4x "></i>
              <h2 class="fw-bold text-center">${list[i].strArea}</h2>
          </div>
        </div>`;
  }
  allMeals.innerHTML = areaContent;
}

// TODO: Display Ingredients
$("#ingredientsLink").on("click", () => {
  getIngredients();
  closeNav();
  $("#defaultMeals").removeClass("d-none");
  $("#contactForm").addClass("d-none");
  $("#searchForm").addClass("d-none");
});

async function getIngredients() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const data = await response.json();
  console.log(data.meals.slice(0, 20));
  displayIngredients(data.meals.slice(0, 20));
}

function displayIngredients(list) {
  let ingredientsContent = "";
  for (let i = 0; i < list.length; i++) {
    ingredientsContent += `
          <div class="col-lg-3 col-md-6 g-4">
          <div class="item text-center text-white cursor-pointer">
              <i class="fa-solid fa-drumstick-bite fa-4x "></i>
              <h2 class="fw-bold text-center">${list[i].strIngredient}</h2>
              <p class=" text-center">${list[i].strDescription.slice(
                0,
                120
              )}</p>
          </div>
        </div>`;
  }
  allMeals.innerHTML = ingredientsContent;
}

// TODO: Name Input validation
signNameInput.on("keyup", () => {
  let inputValue = signNameInput.val();
  if (nameRegex.test(inputValue) != true) {
    wrongName.removeClass("d-none");
  } else {
    wrongName.addClass("d-none");
  }
});

// TODO: Email Input validation
signEmailInput.on("keyup", () => {
  let inputValue = signEmailInput.val();
  if (emailRegex.test(inputValue) != true) {
    wrongEmail.removeClass("d-none");
  } else {
    wrongEmail.addClass("d-none");
  }
});

// TODO: Phone Input validation
signPhoneInput.on("keyup", () => {
  let inputValue = signPhoneInput.val();
  if (phoneRegex.test(inputValue) != true) {
    wrongPhone.removeClass("d-none");
  } else {
    wrongPhone.addClass("d-none");
  }
});

// TODO: Age Input validation
signAgeInput.on("keyup", () => {
  let inputValue = signAgeInput.val();
  // console.log(inputValue);
  if (inputValue > 100) {
    wrongAge.removeClass("d-none");
  } else {
    wrongAge.addClass("d-none");
  }
});

// TODO: Password, RePassword Input validation
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

// TODO: Remove Disabled Attr From Submit Btn
$("#contactForm input").on("keyup", () => {
  console.log(nameRegex.test(signNameInput.val()), 0);
  console.log(emailRegex.test(signEmailInput.val()), 1);
  console.log(phoneRegex.test(signPhoneInput.val()), 2);
  console.log(passwordRegex.test(signPasswordInput.val()), 3);
  console.log(signPasswordInput.val(), 3.5);
  console.log(
    signRePasswordInput.val() == passwordRegex.test(signPasswordInput.val()),
    4
  );
  console.log(signRePasswordInput.val(), 4.5);
  console.log("////////////////");

  if (
    nameRegex.test(signNameInput.val()) == true &&
    emailRegex.test(signEmailInput.val()) == true &&
    phoneRegex.test(signPhoneInput.val()) == true &&
    signAgeInput.val() < 100 &&
    passwordRegex.test(signPasswordInput.val()) == true &&
    signRePasswordInput.val() == signPasswordInput.val()
  ) {
    console.log("Not Disable");
    $(".submitBtn").removeClass("disabled");
  } else {
    $(".submitBtn").addClass("disabled");
  }
});

// TODO: Display Contact Form
$("#contactLink").on("click", () => {
  closeNav();
  $("#contactForm").removeClass("d-none");
  $("#searchForm").addClass("d-none");
  $("#defaultMeals").addClass("d-none");
});
// });

// function getMealDetails(id) {
//   console.log(id);
// }
