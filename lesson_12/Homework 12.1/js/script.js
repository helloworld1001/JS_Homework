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

secondPar.addEventListener("click", function (evt) {
  var target = evt.target;
  if (target.tagName == "A") {
    evt.preventDefault();
    var text = target.textContent;
    if (!localStorage.getItem(text)) {
      var attr = target.getAttribute("href");
      var objAttr = { path: attr };
      localStorage.setItem(text, JSON.stringify(objAttr));
      target.setAttribute("href", "#");
      alert("Информация о ссылке сохранена");
    } else {
      var objAttr = JSON.parse(localStorage.getItem(text));
      alert(objAttr.path);
    }
  }
});

window.addEventListener("unload", function () {
  localStorage.clear();
});
