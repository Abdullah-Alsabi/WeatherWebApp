window.onload = function () {
  console.log("page is fully loaded");
  // localStorage.clear();

  let defaultCitiesData = [
    "Riyadh",
    "London",
    "Qatar",
    "Bali",
    "Muscat",
    "Abu Dhabi",
    "Kuwait City",
    "Manama",
  ];

  // To return default cities turn the code below or if u want to delete and see the cities you add turn it off.
  // localStorage.setItem("defaultCitiesData", JSON.stringify(defaultCitiesData));

  let key = "1918a46e259f1a69fceda2acae7f0ceb"; //Add City function.
  let cityFromUser = document.getElementById("cityInput");

  let searchCityBtn = document.getElementById("searchCity");

  searchCityBtn.addEventListener("click", function () {
    let city = cityFromUser.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    defaultCitiesData = JSON.parse(localStorage.getItem("defaultCitiesData"));
    if (!checkExistence(defaultCitiesData, city)) {
      defaultCitiesData.push(city);
      localStorage.setItem(
        "defaultCitiesData",
        JSON.stringify(defaultCitiesData)
      );
      getDataFromApi(url);
    } else alert("City you are trying to add are already exists");
  });
  function checkExistence(arr, val) {
    return arr.some(function (arrVal) {
      return val === arrVal;
    });
  }

  //fetch the weather
  defaultCitiesData = JSON.parse(localStorage.getItem("defaultCitiesData"));
  for (let i = 0; i < defaultCitiesData.length; i++) {
    const city = defaultCitiesData[i];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    getDataFromApi(url);
  }

  function getDataFromApi(url) {
    fetch(url, {
      method: "GET",
    })
      .then(function (serverPromise) {
        serverPromise
          .json()
          .then(function (j) {
            // citiesData = [...j.d];
            console.log(j);
            let weatherCards = document.getElementById("weatherCards");
            const element = j;
            let dt = new Date(j.dt * 1000); //timestamp * 1000
            weatherCards.innerHTML += `
            <div
            class="card"
            style="max-width: 18rem"
            id="card"
          >
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title fw-bolder">${Math.round(
                  j.main.temp
                )}°</h5>
                <h5 class="card-title fw-bolder">${j.name}</h5>
              </div>
      
              <img
                src="http://openweathermap.org/img/wn/${
                  j.weather[0].icon
                }@2x.png"
                alt="${j.weather[0].description}"
              />
              <h5 class="card-title">${j.weather[0].main}</h5>
      
              <h5 class="card-title">
                H:${Math.round(j.main.temp_max)}° /
                L:${Math.round(j.main.temp_min)}°
              </h5>
              <h5 class="card-title p-2">${dt.toDateString()}</h5>
           
              <button  class="removeCity  btn mt-3" type="button" name="${
                j.name
              }">
              <i  height: 3vh;
              width: 3vw;
               class="bi redColor bi-x-circle"></i>
              </button>
            </div>
          </div>
                          `;

            let allRemoveButtons =
              document.getElementsByClassName("removeCity");
            console.log(allRemoveButtons);
            for (let i = 0; i < allRemoveButtons.length; i++) {
              allRemoveButtons[i].addEventListener("click", function () {
                defaultCitiesData = JSON.parse(
                  localStorage.getItem("defaultCitiesData")
                );
                let indexOfCity = defaultCitiesData.indexOf(
                  allRemoveButtons[i].name
                );
                defaultCitiesData.splice(indexOfCity, 1);

                localStorage.clear();
                localStorage.setItem(
                  "defaultCitiesData",
                  JSON.stringify(defaultCitiesData)
                );
                location.reload();
              });
            }
          })
          .catch(function (e) {
            // alert("There is some thing wents wrong, Check The Spelling!");
            console.log(e);
          });
      })
      .catch(function (e) {
        // alert("There is some thing went wrong, Check The Spelling!");
        console.log(e);
      });
  }

  let darkModBtn = document.getElementById("darkMod");

  darkModBtn.addEventListener("click", function () {
    const aboutUs = document.getElementById("aboutUs");
    const weatherCardColor = document.getElementById("weatherCards");
    const moonImg = document.getElementById("moon");
    const sunImg = document.getElementById("sun");
    const bodyBgColor = document.getElementById("mainDiv");
    const navBgColor = document.getElementById("navbar");
    const colorChangeH1 = document.getElementById("weatherSection");
    const colorChangeP = document.getElementById("colorChange");
    const colorChangeHr = document.getElementById("hrColor");
    const headerImg = document.getElementById("headerImg");

    if (colorChangeH1.style.color == "black") {
      aboutUs.style.color = "white";
      weatherCardColor.style.color = "white";
      moonImg.style.display = "none";
      sunImg.style.display = "block";
      bodyBgColor.style.backgroundColor = "#344648";
      navBgColor.classList.add("navbar-dark");
      navBgColor.classList.add("bg-dark");
      navBgColor.classList.remove("navbar-light");
      navBgColor.classList.remove("bg-light");
      colorChangeH1.style.color = "white";
      colorChangeP.style.color = "white";
      colorChangeHr.style.color = "white";
      headerImg.src = "/images/darkmoodheader2.png";
    } else {
      aboutUs.style.color = "black";
      weatherCardColor.style.color = "black";
      moonImg.style.display = "block";
      sunImg.style.display = "none";
      bodyBgColor.style.backgroundColor = "rgba(255, 255, 255, 0.842)";
      navBgColor.classList.remove("navbar-dark");
      navBgColor.classList.remove("bg-dark");
      navBgColor.classList.add("navbar-light");
      navBgColor.classList.add("bg-light");
      colorChangeH1.style.color = "black";
      colorChangeP.style.color = "black";
      colorChangeHr.style.color = "black";
      headerImg.src = "/images/header-final.jpg";
    }
  });
};

// <button type="button" class="btn btn-primary moreDetils mt-3" data-bs-toggle="modal" data-bs-target="#modal0">
// +
// </button>
// const modal = document.getElementById("modals");
// defaultCitiesData = JSON.parse(
//   localStorage.getItem("defaultCitiesData")
// );
// for (let i = 0; i < defaultCitiesData.length; i++) {
//   const item = defaultCitiesData[i];

//   modal.innerHTML += `
//       <!-- Modal code -->
// <div
// class="modal fade"
// id="Modal0"
// tabindex="-1"
// role="dialog"
// aria-labelledby="exampleModalLabel"
// aria-hidden="true"
// >
// <!-- Modal content -->

// <div class="modal-dialog" role="document">
// <div class="modal-content">
// <div class="modal-header">
// <h5 class="modal-title" id="headerForModal${i}">${item.j.name}</h5>
// <button
// type="button"
// class="close"
// data-dismiss="modal"
// aria-label="Close"
// >
// <span aria-hidden="true">&times;</span>
// </button>
// </div>
// <div class="modal-body">
// <ul id=ul${i} type="square">

// </ul>
// <h6 class="text-center mt-3">temp: ${Math.round(
// item.j.main.temp
// )}$</h6>

// </div>
// <div class="modal-footer">

// <button type="button" class="btn btn-danger" data-dismiss="modal">
// Close
// </button>
// </div>
// </div>
// </div>
// </div>

// `;
// }
