var button = document.querySelector('button');
var tabsDiv = document.querySelector('.users-tabs');
var infoDiv = document.querySelector('.info-blocks');

button.onclick = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://reqres.in/api/users?page=2');
  xhr.send();

  xhr.onload = function () {
    var statusType = Math.round(this.status / 100);
    if (statusType === 2) {
      var data = JSON.parse(this.response).data;
      data.forEach(function (item, i) {
        var user = 'User ' + (i + 1);
        var tab = document.createElement('a');
        tab.href = '#tab' + (i + 1);
        tab.className = 'tab';
        tab.innerText = user;
        tabsDiv.appendChild(tab);
      });
      button.disabled = true;

      var activeTab = document.getElementsByClassName('tab')[0];
      activeTab.classList.add('active-tab');

      var img = document.createElement('img');
      img.src = data[0].avatar;
      infoDiv.appendChild(img);

      var firstName = document.createElement('p');
      firstName.innerText = 'First Name: ' + data[0].first_name;
      infoDiv.appendChild(firstName);

      var lastName = document.createElement('p');
      lastName.innerText = 'Last Name: ' + data[0].last_name;
      infoDiv.appendChild(lastName);

      var tabs = document.querySelector('.users-tabs');
      tabs.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.className == 'tab') {
          var activeElement = document.getElementsByClassName('active-tab')[0];
          activeElement.classList.remove('active-tab');
          target.classList.add('active-tab');
          var numberUser = parseInt(target.innerText.match(/\d+/));

          infoDiv.innerHTML = '';

          var img = document.createElement('img');
          img.src = data[numberUser - 1].avatar;
          infoDiv.appendChild(img);

          var firstName = document.createElement('p');
          firstName.innerText =
            'First Name: ' + data[numberUser - 1].first_name;
          infoDiv.appendChild(firstName);

          var lastName = document.createElement('p');
          lastName.innerText = 'Last Name: ' + data[numberUser - 1].last_name;
          infoDiv.appendChild(lastName);
        }
      });
    } else {
      infoDiv.innerHTML = 'Data not received ' + '(' + this.status + ')';
    }
  };
};
