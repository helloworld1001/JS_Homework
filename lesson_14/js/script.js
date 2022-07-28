var body = document.body;
var script = document.querySelector('script');
var form = document.querySelector('form');
var createButton = document.getElementById('create-button');
var inputFirst = document.getElementsByTagName('input')[0];
var inputSecond = document.getElementsByTagName('input')[1];

function checkedInputEmptiness() {
  if (inputFirst.value == '' || inputSecond.value == '') {
    createButton.disabled = true;
  } else if (inputFirst.value !== '' && inputSecond.value !== '') {
    createButton.disabled = false;
  }
}

function createChessField() {
  if (body.querySelector('table')) {
    body.querySelector('table').remove();
  }
  var firstValue = +inputFirst.value;
  var secondValue = +inputSecond.value;
  if (
    isNaN(firstValue) ||
    isNaN(secondValue) ||
    firstValue % 1 !== 0 ||
    secondValue % 1 !== 0 ||
    firstValue > 10 ||
    firstValue < 1 ||
    secondValue > 10 ||
    secondValue < 1
  ) {
    alert('Поля принимают только значения от 1 до 10');
    inputFirst.value = '';
    inputSecond.value = '';
    createButton.disabled = true;
  } else {
    var field = document.createElement('table');
    field.setAttribute('border', 1);
    body.insertBefore(field, script);
    for (var i = 0; i < secondValue; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < firstValue; j++) {
        var td = document.createElement('td');
        if (i % 2 == 0) {
          if (j % 2) {
            td.style.backgroundColor = 'black';
          } else {
            td.style.backgroundColor = 'white';
          }
        } else if (i % 2) {
          if (j % 2 == 0) {
            td.style.backgroundColor = 'black';
          } else {
            td.style.backgroundColor = 'white';
          }
        }
        tr.appendChild(td);
      }
      field.appendChild(tr);
    }
  }
  field.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName == 'TD' && target.style.backgroundColor == 'black') {
      for (var i = 0; i < secondValue; i++) {
        var row = field.children[i];
        for (var j = 0; j < firstValue; j++) {
          var td = row.getElementsByTagName('td')[j];
          if (td.style.backgroundColor == 'black') {
            td.style.backgroundColor = 'white';
          } else {
            td.style.backgroundColor = 'black';
          }
        }
      }
    } else if (
      target.tagName == 'TD' &&
      target.style.backgroundColor == 'white'
    ) {
      for (var i = 0; i < secondValue; i++) {
        var row = field.children[i];
        for (var j = 0; j < firstValue; j++) {
          var td = row.getElementsByTagName('td')[j];
          if (td.style.backgroundColor == 'black') {
            td.style.backgroundColor = 'white';
          } else {
            td.style.backgroundColor = 'black';
          }
        }
      }
    }
  });
}

inputFirst.onkeyup = function () {
  checkedInputEmptiness();
};

inputSecond.onkeyup = function () {
  checkedInputEmptiness();
};

createButton.onclick = function (evt) {
  evt.preventDefault();
  createChessField();
};
