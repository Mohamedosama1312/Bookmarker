//^ #### HTML elements  ####
var siteNameInput = document.querySelector("#siteNameInput");
var siteUrlInput = document.querySelector("#siteUrlInput");
var addBtn = document.querySelector("#addBtn");
var sitesContener = document.querySelector("#sitesContener");
var searchSiteInput = document.querySelector("#searchInput");

// var visitBtn = document.querySelector("#visitBtn");




//& #### App Variables ####
var siteList = JSON.parse(localStorage.getItem("siteListLocal")) || [];
displayAllSites();



var urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,256}\.[a-zA-Z]{2,6})$/;
var nameRegex = /^[A-Z][A-Za-z0-9.]*$/;

//^ #### events ####
addBtn.addEventListener("click", addSite);
searchSiteInput.addEventListener("input", searchSites)

siteNameInput.addEventListener("input", function () {
    validate(nameRegex, siteNameInput);
})
siteUrlInput.addEventListener("input", function () {
    validate(urlRegex, siteUrlInput);
})

// visitBtn.addEventListener("click", function (index) {
//     var ulr = siteList[index].url;

//     window.open(url, "_blank");
// });



//^ #### function ####

function addSite() {
    var isValid = validate(nameRegex, siteNameInput)
        && validate(urlRegex, siteUrlInput);

    if (isValid === true) {
        var site = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        }
        siteList.push(site);
        localStorage.setItem("siteListLocal", JSON.stringify(siteList));
        displaySites(siteList.length - 1);
        clearInput();
        Swal.fire({
            title: "Your Site Added Successfully",
            icon: "success"
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: ` Site name must contain at least 3 characters , Site URL must be a valid one`,
        });
    }

}

function displaySites(index) {
    var sitesMarkup = ` <tr>
                                <th scope="row">  ${index + 1}</th>
                                <td>${siteList[index].name}</td>
                                <td><button class="btn btn-success" onclick="visitSite(${index})"><i class="fa-solid fa-eye"></i>Visit</button></td>
                                <td><button class="btn btn-danger" onclick="deleteSite(${index})"><i class="fa-solid fa-trash"></i>Delete</button></td>
                            </tr>`

    sitesContener.innerHTML += sitesMarkup;
}

function displayAllSites() {
    for (var i = 0; i < siteList.length; i++) {
        displaySites(i);
    }
}

function deleteSite(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete Site!"
    }).then((result) => {
        if (result.isConfirmed) {
            siteList.splice(index, 1);
            localStorage.setItem("siteListLocal", JSON.stringify(siteList));
            sitesContener.innerHTML = "";
            displayAllSites();

            Swal.fire({
                title: "Deleted!",
                text: "Your Site has been deleted.",
                icon: "success"
            });
        }
    });
}

function visitSite(index) {
    var url = siteList[index].url;

    window.open(url, "_blank");
}

function searchSites() {
    sitesContener.innerHTML = "";
    var searchKeyword = searchSiteInput.value;
    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase().includes(searchKeyword.toLowerCase())) {
            displaySites(i);
        }

    }
}


function validate(regex, input) {
    if (regex.test(input.value)) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return true;
    } else {

        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function clearInput() {
    siteNameInput.value = "";
    siteUrlInput.value = "";

    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");

}