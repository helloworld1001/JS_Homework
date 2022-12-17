import Component from '../component.js';

class Header extends Component {
  static async render() {
    const page = this.urlParts.page;

    return `
            <header class="header">                    
                <a class="header__link ${!page ? 'active' : ''}" href="#/">
                    Autorization
                </a>
                <a class="header__link ${page === 'employees' ? 'active' : ''}" href="#/employees">
                    Current Stuff
                </a>    
                </a>    
                    <a class="header__link ${page === 'dismissed' ? 'active' : ''} " href="#/dismissed">
                    Dismissed employees
                </a>                                     
            </header>
        `;
  }
}

export default Header;
