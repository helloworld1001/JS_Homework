import Component from '../component.js';

class Authorization extends Component {
  static async render() {
    return `
            <div class="autorization"> 
                <h1 class="page-title">Authorization</h1>                   
                <p class="autorization__info">
                    Enter login and password:
                </p>
                  <form>
                    <input class="autorization__name" type="text" placeholder="username"> <br />
                    <input class="autorization__pass" type="password" placeholder="password"> <br />
                     <button class="autorization__btn button">Enter</button>
                  </form>
                 
            </div>
        `;
  }

  static afterRender() {
    this.setActions();
  }

  static setActions() {
    const nameField = document.getElementsByClassName('autorization__name')[0],
      passField = document.getElementsByClassName('autorization__pass')[0],
      submit = document.getElementsByClassName('autorization__btn')[0];

    submit.onclick = () => {
      const authorizationData = {
        username: nameField.value,
        password: passField.value,
      };

      this.getUsers();
    };
  }

  static async getUsers() {
    const response = await fetch('http://localhost:3000/auth/users', {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}

export default Authorization;
