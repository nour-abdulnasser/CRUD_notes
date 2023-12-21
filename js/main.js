/* ********* function to store bookmark info in table ********* */
// 1. store info in object

// need to grab elements from document for use
let bookmarkName = document.getElementById("bookmarkName");
let bookmarkURL = document.getElementById("bookmarkURL");

// need global array to store objects in
let allBookmarks = [];

// function to store new object in array
const siteNameRegex = /[A-z0-9]{3}/;
const siteURLRegex = /[A-z]\.[A-z]{2}/;

function createBookmark() {
  let newBookmark = {
    name: bookmarkName.value,
    URL: bookmarkURL.value,
  };
  if ( siteNameRegex.test(newBookmark.name) && siteURLRegex.test(newBookmark.URL) ) {
    allBookmarks.push(newBookmark);
    displayBookmarks(allBookmarks);
    clearValues();
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
  } else {
    displayError();
  }
  // console.log(allBookmarks);
}

function clearValues() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
}

// 2. display info in table

//function to create table body html code

function displayBookmarks(arr) {
  // need html string to use with .innerTHML
  // not global bc we iterate anew each time
  let tableBodyString = "";

  for (let i = 0; i < arr.length; i++) {
    tableBodyString += `
    <tr>
      <td>
        ${i + 1}
      </td>
      <td>
        ${arr[i].name}
      </td>
      <td>
        <button id='visitBtn' class="btn btn-warning">
          <a class="text-decoration-none text-black" target='_blank' href="${
            arr[i].URL
          }">Visit</a>
        </button>
      </td>
      <td>
        <button id='visitBtn' class="btn btn-danger" onclick='deleteBookmark(${i})'>Delete</button>
      </td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = tableBodyString;
}

// want to always display whats stored even after refreshing
if (localStorage.getItem("allBookmarks")) {
  // well, what do i have stored?
  allBookmarks = JSON.parse(localStorage.getItem("allBookmarks"));
  // ok, display it
  displayBookmarks(allBookmarks);
} else {
  allBookmarks = [];
}
// the point of this is to display upon refreshing
// the reason i need << displayBookmarks(allBookmarks); >> in createBookmark()
//    is to display new entry after submission
// the table would not be displayed if the condition statement was in createBookmark()

/* ********* function to delete bookmark ********* */
function deleteBookmark(bookmarkIndex) {
  allBookmarks.splice(bookmarkIndex, 1);
  localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
  displayBookmarks(allBookmarks);
}



/* ********* function to display error message ********* */

function displayError(){
  document.getElementById('errorLayer').classList.add('d-block');
  document.getElementById('errorLayer').classList.remove('d-none');
}

function closeMessage(){
  document.getElementById('errorLayer').classList.remove('d-block');
  document.getElementById('errorLayer').classList.add('d-none');
}





















