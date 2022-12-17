import parseCurrentURL from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import Authorization from './views/pages/authorization.js';
import Error404 from './views/pages/error404.js';

import CurrentStuff from './views/pages/employees/currentstaff.js';
import Add from './views/pages/employees/add.js';
import Dismissed from './views/pages/employees/dismissed.js';
import PersonalCard from './views/pages/employees/file.js';

const Routes = {
  '/': Authorization,
  '/employees': CurrentStuff,
  '/addemployee': Add,
  '/dismissed': Dismissed,
  '/employee/:id': PersonalCard,
};

const router = async () => {
  const headerContainer = document.getElementsByClassName('header-container')[0],
    contentContainer = document.getElementsByClassName('content-container')[0];

  const urlParts = parseCurrentURL(),
    pagePath = `/${urlParts.page || ''}${urlParts.id ? '/:id' : ''}${urlParts.action ? `/${urlParts.action}` : ''}`,
    Page = Routes[pagePath] ? Routes[pagePath] : Error404;

  headerContainer.innerHTML = await Header.render();
  const pageData = await Page.getData();
  contentContainer.innerHTML = await Page.render(pageData);
  Page.afterRender();
};

(async () => {
  const footerContainer = document.getElementsByClassName('footer-container')[0];

  footerContainer.innerHTML = await Footer.render();
})();

window.onload = router;
window.onhashchange = router;
