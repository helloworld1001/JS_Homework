import Component from '../../component.js';
import Employees from '../../../models/employees.js';

class Dismissed extends Component {
  static async getData() {
    return await Employees.getDismissedList();
  }

  static async render(dismissedEmployees) {
    return `<h1 class="page-title">List of dismissed employees</h1>
              <div class="employees">
                <div class="employees__additional">
                </div>
                <div class="employees__list">
                    ${dismissedEmployees.map(employee => this.getEmployeeHTML(employee)).join('')}
                </div>
              </div>`;
  }

  static getEmployeeHTML(employee) {
    return `<div class="employee" data-id="${employee.id}">
              <a class="employee__title" data-id="${employee.id}"><span class="employee__label">Full name: </span>${employee.fullname}<br>
                <span class="employee__label">Position:</span> ${employee.position}<br>
              </a>
              <a class="button stuff__btn-delete">Delete</a>
            </div>`;
  }

  static afterRender() {
    this.setActions();
  }

  static setActions() {
    const employesBlock = document.getElementsByClassName('employees')[0];

    employesBlock.onclick = evt => {
      const target = evt.target;
      let id = target.parentNode.dataset.id;
      if (target.classList.contains('stuff__btn-delete')) {
        this.removeEmployee(id);
        target.parentNode.remove();
      }
    };
  }

  static async removeEmployee(id) {
    await Employees.removeEmployee(id);
  }
}

export default Dismissed;
