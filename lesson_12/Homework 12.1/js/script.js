var container = document.getElementById("container");
var firstPar = document.createElement("p"),
  secondPar = document.createElement("p");

firstPar.innerHTML =
  'Hello, here are <a href="https://www.facebook.com">Link 1</a> and <a href="https://twitter.com">Link 2</a>';
secondPar.innerHTML =
  'Hello, here are <a href="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);

var button = document.getElementsByTagName("button")[0];
var firstParRefs = firstPar.children;
var secondParRefs = secondPar.children;

function changeRefs() {
  for (var i = 0; i < firstParRefs.length; i++) {
    firstParRefs[i].classList.add("changed");
  }
}

button.onclick = changeRefs;

secondParRefs[0].addEventListener("click", function (evt) {
  evt.preventDefault();
  var text = this.textContent;
  if (!localStorage.getItem(text)) {
    var attr = this.getAttribute("href");
    var objAttr = { path: attr };
    localStorage.setItem(text, JSON.stringify(objAttr));
    this.setAttribute("href", "#");
    alert("Информация о ссылке сохранена");
  } else {
    var objAttr = JSON.parse(localStorage.getItem(text));
    alert(objAttr.path);
  }
});

secondParRefs[1].addEventListener("click", function (evt) {
  evt.preventDefault();
  var text = this.textContent;
  if (!localStorage.getItem(text)) {
    var attr = this.getAttribute("href");
    var objAttr = { path: attr };
    localStorage.setItem(text, JSON.stringify(objAttr));
    this.setAttribute("href", "#");
    alert("Информация о ссылке сохранена");
  } else {
    var objAttr = JSON.parse(localStorage.getItem(text));
    alert(objAttr.path);
  }
});

window.addEventListener("unload", function () {
  localStorage.clear();
});
