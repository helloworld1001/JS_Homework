import Component from '../../component.js';
import Employees from '../../../models/employees.js';

class CurrentStuff extends Component {
  static async getData() {
    const response = await Employees.getEmployeesList();
    if (response.message == 'User not authorized') {
      alert('Not authorized');
      location.hash = '#/';
    } else {
      return response;
    }
  }

  static async render(currentEmployees) {
    return `<h1 class="page-title">Current list of employees</h1>
            <div class="stuff">
              <a class="button stuff__btn-add" href="#/addemployee">Add employee</a> 
            </div>
             <div class="employees">
              <div class="employees__additional">
              </div>
              <div class="employees__list">
                ${currentEmployees.map(employee => this.getEmployeeHTML(employee)).join('')}
              </div>
            </div>`;
  }

  static getEmployeeHTML(employee) {
    return `<div class="employee" data-id="${employee.id}">
              <a class="employee__title" data-id="${employee.id}">
                <span class="employee__label">Full name: </span>${employee.fullname}<br>
                <span class="employee__label">Position:</span> ${employee.position}<br>
              </a>
              <div class="employee__vacation">${employee.vacation ? `On vacation` : ''}</div>
              <a class="button stuff__btn-more" href="#/employee/${employee.id}">More...</a>
            </div>`;
  }
}

export default CurrentStuff;
