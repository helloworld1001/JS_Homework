var table = document.getElementsByTagName('table')[0];
var addRow = document.getElementsByClassName('addrow')[0];
var firstRow = document.getElementsByClassName('firstrow')[0];

addRow.onclick = function () {
  var newRow = document.createElement('tr');
  for (var i = 0; i < 3; i++) {
    var td = document.createElement('td');
    newRow.appendChild(td);
  }

  table.prepend(newRow);
};

table.onclick = function (evt) {
  if (table.getElementsByTagName('input')[0]) {
    var currentInput = table.getElementsByTagName('input')[0];
    var enteredText = currentInput.value;
    currentInput.parentElement.innerHTML = enteredText;
  }
  evt.stopPropagation();
  var target = evt.target;
  if (target == addRow) {
    return;
  } else if (target.tagName == 'TD') {
    var targetInput = document.createElement('input');
    targetInput.value = target.innerHTML;
    target.innerHTML = null;
    target.appendChild(targetInput);
    targetInput.focus();
  }
};

document.body.onclick = function () {
  var currentInput = table.getElementsByTagName('input')[0];
  var enteredText = currentInput.value;
  currentInput.parentElement.innerHTML = enteredText;
};
