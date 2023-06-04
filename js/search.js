let searchInput = document.getElementById("search-input");
let searchResults = document.getElementById("search-results");
let searchButton = document.getElementById("search-button");

function searchFiles(regex) {
  const files = [
    "https://aibridgecamp.github.io/index.html",
    "https://aibridgecamp.github.io/about.html",
    "https://aibridgecamp.github.io/classes.html",
    "https://aibridgecamp.github.io/photos.html",
    "https://aibridgecamp.github.io/contact.html",
    "https://aibridgecamp.github.io/join.html",
    "https://aibridgecamp.github.io/upcoming/cornell.html",
    "https://aibridgecamp.github.io/upcoming/saratoga.html",
    "https://aibridgecamp.github.io/upcoming/uiuc.html",
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
            searchResult.innerHTML = `<p>...${preview}...<p><a href="${file}">${file}</a>`;
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
