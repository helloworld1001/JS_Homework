import Component from '../../component.js';
import Error404 from '../error404.js';
import Employees from '../../../models/employees.js';

class PersonalCard extends Component {
  static async getData() {
    return await Employees.getEmployee(this.urlParts.id);
  }
  static async render(employee) {
    if (!employee.error) {
      const { fullname, bdate, entryDate, position, education, passport, registration, vacation, salary, phone } =
        employee;
      return `<h1 class="page-title">Personal card</h1>
              <div class="employee-card">
                <img class="employee-add__image" src="../server/images/${fullname}.jpg" alt="">
                <div class="employee-card__functions">
                  <a href="tel:${phone}" class="employee-card__cardbtn-phone button">Call</a>
                  <button class="employee-card__cardbtn-vacation button">Vacation</button>
                  <button class="employee-card__cardbtn-dismiss button">Dismiss</button>
                </div>
                <div class="validation-info">
                  </div>
                <div class="employee-card__vacation-block">
                  ${vacation ? vacation : ''}
                </div>
                <input class="employee-card__fullname input" type="text" value="${fullname}" placeholder="Full name" data-field="input" disabled>
                <input title="Bdate" class="employee-card__bdate input" placeholder="Date of birth" type="text" value="${bdate}"
                onfocus="(this.type='date')" onblur="(this.type='text')" data-field="input" disabled/>
                <input class="employee-card__entrydate input" placeholder="Date of entry" type="text" value="${entryDate}"
                onfocus="(this.type='date')" onblur="(this.type='text')" data-field="input" disabled/>
                <input class="employee-card__position input" type="text" value="${position}" placeholder="Position" data-field="input" disabled>
                <select class="employee-card__education input" data-field="input" disabled>
                  <option ${education == 'Secondary education' ? `selected` : ``}>Secondary education</option>
                  <option ${
                    education == 'Secondary special education' ? `selected` : ``
                  }>Secondary special education</option>
                  <option ${education == 'Higher education' ? `selected` : ``}>Higher education</option>
                </select>
                <input class="employee-card__passport input" type="text" value="${passport}" placeholder="Passport" data-field="input" disabled>
                <input class="employee-card__registration input" type="text" value="${registration}" placeholder="Registration" data-field="input" disabled>
                <input class="employee-card__phone input" type="text" value="${phone}" placeholder="Phone number" data="phone">
                <p class="emplloyee-card__salary-value">Salary: ${salary}$</p>
                <input class="employee-card__salary-input" type="range" min="200" max="5000" step="10" value="${salary}" data-field="input" disabled>
                <div class="employee-card__experience">
                  ${this.calculatingExp(entryDate)}.
                </div> 
                <div class="employee-card__functions"><button class="employee-card__cardbtn-back button">Back</button>
                <button class="employee-card__cardbtn-edit button">Edit</button>
                <button class="employee-card__cardbtn-save button">Save</button>
                </div>
              </div>`;
    } else {
      return Error404.render();
    }
  }

  static afterRender() {
    this.setActions();
  }

  static setActions() {
    const btnBack = document.getElementsByClassName('employee-card__cardbtn-back')[0],
      btnSave = document.getElementsByClassName('employee-card__cardbtn-save')[0],
      btnEdit = document.getElementsByClassName('employee-card__cardbtn-edit')[0],
      btnDismiss = document.getElementsByClassName('employee-card__cardbtn-dismiss')[0],
      btnVacation = document.getElementsByClassName('employee-card__cardbtn-vacation')[0],
      employeeCardContainer = document.getElementsByClassName('employee-card')[0],
      fullNameField = employeeCardContainer.getElementsByClassName('employee-card__fullname')[0],
      bdateField = employeeCardContainer.getElementsByClassName('employee-card__bdate')[0],
      entryDateField = employeeCardContainer.getElementsByClassName('employee-card__entrydate')[0],
      positionField = employeeCardContainer.getElementsByClassName('employee-card__position')[0],
      educationField = employeeCardContainer.getElementsByClassName('employee-card__education')[0],
      passportField = employeeCardContainer.getElementsByClassName('employee-card__passport')[0],
      registrationField = employeeCardContainer.getElementsByClassName('employee-card__registration')[0],
      vacationBlock = employeeCardContainer.getElementsByClassName('employee-card__vacation-block')[0],
      allFields = employeeCardContainer.children,
      salaryInput = employeeCardContainer.getElementsByClassName('employee-card__salary-input')[0],
      salaryValue = employeeCardContainer.getElementsByClassName('emplloyee-card__salary-value')[0],
      phone = document.getElementsByClassName('employee-card__phone')[0],
      validationInfo = document.getElementsByClassName('validation-info')[0],
      formInputs = document.querySelectorAll('.input');

    if (vacationBlock.innerText) {
      btnVacation.innerText = 'Get to work';
    } else {
      btnVacation.innerText = 'Vacation';
    }

    salaryInput.oninput = () => {
      salaryValue.innerHTML = `Salary: ${salaryInput.value}$`;
    };

    // employeeCardContainer.onkeyup = evt => {
    //   const target = evt.target;
    //   if (target.tagName == 'INPUT') {
    //     this.checkInputs(fullNameField, positionField, passportField, registrationField, salaryValue, btnSave);
    //   }
    // };

    btnVacation.onclick = evt => {
      const target = evt.target;
      switch (true) {
        case target.innerText == 'Vacation':
          target.innerText = 'Get to work';
          this.takeVacation(vacationBlock);
          break;
        case target.innerText == 'Get to work':
          target.innerText = 'Vacation';
          vacationBlock.innerText = '';
          this.getToWork(this.urlParts.id);
          break;
      }
    };

    btnDismiss.onclick = () => {
      this.dismissEmployee(this.urlParts.id);
    };

    btnBack.onclick = () => {
      this.redirectToEmployeesList();
    };

    btnEdit.onclick = () => {
      for (const field of allFields) {
        if (field.dataset.field) {
          field.disabled = false;
        }
      }
      btnEdit.disabled = true;
    };

    btnSave.onclick = () => {
      formInputs.forEach(input => {
        input.value = input.value.trim();
        if (!input.value) {
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      const emptyInputs = Array.from(formInputs).filter(input => input.value === '');

      if (emptyInputs.length) {
        swal('Not all fields are filled!', '', 'warning');
        return false;
      } else if (!emptyInputs.length) {
        if (!this.validationName(fullNameField.value)) {
          validationInfo.innerHTML = `<p>The name must consist of two parts, contain only Latin letters
            alphabet and contain no more than 30 characters.</p>`;
          fullNameField.classList.add('error');
          return false;
        }

        if (!this.validationPosition(positionField.value)) {
          positionField.classList.add('error');
          validationInfo.innerHTML = `<p>The field "Position" should consist of Latin letters in the amount of 3 to 20 characters.</p>`;
          return false;
        }

        if (!this.validationPass(passportField.value)) {
          passportField.classList.add('error');

          validationInfo.innerHTML = `<p>The passport number must start with "ZX", "ZC", or "ZS", followed by 7 digits.</p>`;
          return false;
        }
        if (!this.validationPhone(phone.value)) {
          phone.classList.add('error');
          validationInfo.innerHTML = `<p>The number must be in the format: +48XXXXXXXXX</p>`;
          return false;
        }
        if (!this.validationReg(registrationField.value)) {
          registrationField.classList.add('error');
          validationInfo.innerHTML = `<p>The field "Registration" should consist of Latin letters in the amount of 10 to 30 characters and numbers.</p>`;
          return false;
        }
      }

      this.editEmployee(
        this.urlParts.id,
        fullNameField.value,
        bdateField.value,
        entryDateField.value,
        positionField.value,
        educationField.value,
        passportField.value,
        registrationField.value,
        salaryInput.value
      );

      this.redirectToEmployeesList();
    };
  }

  static validationName(fullname) {
    return /^[a-z,A-Z]{2,15}\s[a-z,A-Z]{2,15}$/.test(fullname);
  }

  static validationPosition(position) {
    return /^[a-z,A-Z]{3,20}$/.test(position);
  }

  static validationPass(passport) {
    return /^(ZX|ZC|ZS|ZZ)[\d]{7}$/.test(passport);
  }

  static validationPhone(phoneNumber) {
    return /^\+48[\d]{9}$/.test(phoneNumber);
  }

  static validationReg(registration) {
    return /^[a-z,A-Z,\d\s]{5,30}$/.test(registration);
  }

  static checkInputs(fullName, position, passport, registration, salaryValue, btnSave) {
    if (
      fullName.value.trim() &&
      position.value.trim() &&
      passport.value.trim() &&
      registration.value.trim() &&
      salaryValue.innerHTML !== 'Set the salary level:'
    ) {
      btnSave.disabled = false;
    } else {
      btnSave.disabled = true;
    }
  }

  static async takeVacation(vacationBlock) {
    await swal('Enter the number of vacation days:', {
      content: 'input',
    }).then(value => {
      swal(`Number of vacation days: ${value}`);
      let oneDayInMilliseconds = 1000 * 60 * 60 * 24;
      let startDate = Date.now() + value * oneDayInMilliseconds;
      startDate = new Date(startDate);
      vacationBlock.innerText = `Employee on vacation. Start date: ${startDate.toDateString()}`;
      Employees.setVacation(vacationBlock.innerText, this.urlParts.id);
    });
  }

  static async getToWork(id) {
    await Employees.removeVacation(id);
  }

  static async dismissEmployee(id) {
    let confirmation = await swal({
      title: 'Are you sure you want to fire the employee?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('The employee has been fired.', {
          icon: 'success',
        });
        return true;
      } else {
        swal('Operation canceled.');
        return false;
      }
    });
    if (confirmation) {
      await Employees.dismissEmployee(id);
      this.redirectToEmployeesList();
    }
  }

  static async editEmployee(id, fullname, bdate, entryDate, position, education, passport, registration, salary) {
    const updatedEmployee = {
      id,
      fullname: fullname.trim(),
      bdate: bdate.trim(),
      entryDate: entryDate.trim(),
      position: position.trim(),
      education: education.trim(),
      passport: passport.trim(),
      registration: registration.trim(),
      salary: salary,
    };

    await Employees.editEmployee(updatedEmployee);
  }

  static redirectToEmployeesList() {
    location.hash = '#/employees/';
  }

  static calculatingExp(entryDate) {
    entryDate = new Date(entryDate);
    let today = new Date(Date.now());
    let oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    let timeDiff = today.getTime() - entryDate.getTime();
    timeDiff = Math.round(timeDiff / oneDayInMilliseconds);
    return `Work experience is ${timeDiff} days`;
  }
}

export default PersonalCard;
