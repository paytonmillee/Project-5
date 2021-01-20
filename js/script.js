//$.ajax (JQuery) function calls the Random User Generator API.
$.ajax({
  //the url below will give us the display of 12 users from the Random User Generator API
  url: "https://randomuser.me/api/?results=12",
  dataType: "json",
  success: function (data) {
    console.log(data);
    employeeList = data.results;
    //calls showPage function
    showPage();
    //calls attachEventListeners function
    attachEventListeners();
  },
});
//this function uses string interpolation to put the random user's info into their individual
//cards ('.card' div) and then also will append the div to the gallery div.
function showPage() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let i = 0; i < employeeList.length; i++) {
    const employeeCard = `
      
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src=${employeeList[i].picture.large} alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3${employeeList[i].name.first} ${employeeList[i].name.last}/h3>
              <p class="card-text">${employeeList[i].email}</p>
              <p class="card-text cap">${employeeList[i].location.city}${employeeList[i].location.state}</p>
          </div>
      </div>

      `;

    gallery.insertAdjacentHTML("beforeend", employeeCard);
  }
}
//this function also uses string interpolation to put the random user's info
//in their individual modal div and appends the div to the gallery div
function showModal(i) {
  const body = document.querySelector("body");

  const modal = `
<div class="modal-container">
                <div class="modal">

                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${
                          employeeList[i].picture.large
                        } alt="profile picture">
                        <h3 id="name" class="modal-name cap">${
                          employeeList[i].name.first
                        } ${employeeList[i].name.last}</h3>
                        <p class="modal-text">${employeeList[i].email}</p>
                        <p class="modal-text cap">${
                          employeeList[i].location.city
                        }</p>
                        <hr>
                        <p class="modal-text">${formatPhoneNumber(
                          employeeList[i].cell
                        )}</p>
                        
                        <p class="modal-text">${
                          employeeList[i].location.street.number
                        } ${employeeList[i].location.street.name} ${
    employeeList[i].location.state
  }, ${employeeList[i].location.country} ${
    employeeList[i].location.postcode
  }</p>
                        <p class="modal-text">${employeeList[i].dob.date.slice(
                          5,
                          7
                        )}/${employeeList[i].dob.date.slice(
    8,
    10
  )}/${employeeList[i].dob.date.slice(2, 4)} </p>
                    </div>
                </div>`;
  body.insertAdjacentHTML("afterbegin", modal);
  modalRemove();
}
//this function simply allows you to view the selected random user's card by
//clicking the user of you choice.
function attachEventListeners() {
  let cards = document.querySelectorAll(".card");
  cards.forEach(function (card, index) {
    card.addEventListener("click", function () {
      showModal(index);
    });
  });
}
//this function will "hide" the random user that was selected by your first click
// by simply clciking on the "x" on the top right corner of your screen.
function modalRemove() {
  let closeModalButton = document.getElementById("modal-close-btn");
  let modalContainer = document.querySelector(".modal-container");

  closeModalButton.addEventListener("click", () => {
    modalContainer.hidden = true;
  });
}
function formatPhoneNumber(number) {
  let numbersOnly = number.replace(/[^0-9]+/g, "");
  if (numbersOnly.length < 10) {
    let currentNumberLength = numbersOnly.length;
    while (currentNumberLength < 10) {
      numbersOnly = numbersOnly + "0";
      currentNumberLength++;
    }
  }
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring i used this to get substring function
  return `(${numbersOnly.substring(0, 3)}) ${numbersOnly.substring(
    3,
    6
  )}-${numbersOnly.substring(6, 10)}`;
}
