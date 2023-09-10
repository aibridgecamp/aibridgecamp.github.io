let searchInput = document.getElementById("search-input");
let searchResults = document.getElementById("search-results");
let searchButton = document.getElementById("search-button");

function searchFiles(regex) {
  const files = [
    "https://aibridge.us/index.html",
    "https://aibridge.us/about.html",
    "https://aibridge.us/classes.html",
    "https://aibridge.us/photos.html",
    "https://aibridge.us/contact.html",
    "https://aibridge.us/join.html",
    "https://aibridge.us/past/saratoga_march.html",
    "https://aibridge.us/past/cornell.html",
    "https://aibridge.us/upcoming/uiuc.html",
    "https://aibridge.us/upcoming/saratoga_august.html",
  ];

  files.forEach((file) => {
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(data, "text/html");
        let text = htmlDoc.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
        text.forEach((paragraph) => {
          let match;
          while ((match = regex.exec(paragraph.textContent)) !== null) {
            let index = match.index;
            let preview = paragraph.textContent.substring(
              Math.max(0, index - 20),
              Math.min(paragraph.textContent.length, index + match[0].length + 20)
            );
            let searchResult = document.createElement('div');
            searchResult.classList.add('search-result-item');
            searchResult.innerHTML = `<p>...${preview}...<p><a href="${file}">Go To Source ⇒</a>`;
            searchResults.appendChild(searchResult);
          }
        });
      })
      .catch((error) => console.log("Error occurred ", error));
  });
}


searchButton.addEventListener("click", () => {
  searchResults.innerHTML = "";
  searchResults.style.maxHeight = "80vh";
  if (searchInput.value === "" || searchInput.value.length >= 100) return;
  let regex = new RegExp(searchInput.value, "gi");
  searchFiles(regex);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});

document.addEventListener('click', (event) => {
  var isClickInsideElement = searchResults.contains(event.target) || searchInput.contains(event.target) || searchButton.contains(event.target);
  if (!isClickInsideElement && searchResults.style.maxHeight != "0") searchResults.style.maxHeight = "0";
});
