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

  let key = "508b1b104edabafad4a2b1ca8ca011f3";
  //Add City function.
  let cityFromUser = document.getElementById("cityInput");

  let searchCityBtn = document.getElementById("searchCity");

  searchCityBtn.addEventListener("click", function () {
    let city = cityFromUser.value;
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
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
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
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
            class="card text-center g-col-3"
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
                class="img-fluid"
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
};
