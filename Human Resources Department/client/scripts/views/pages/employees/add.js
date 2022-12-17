import Component from '../../component.js';
import Employees from '../../../models/employees.js';

class Add extends Component {
  static async render() {
    return `<h1 class="page-title">Add new employee</h1>
              <div class="employee-add">
                 <div class="employee-add__photo">
                    <img class="employee-add__image" src="../server/images/01-default.svg" height="200" alt="Add photo:">
                      <form action="http://localhost:3000/api/single" method="post" enctype="multipart/form-data">
                        <input class="employee-add__btn-chose" type="file" name="image">
                        <input class="employee-add__btn-photo button" type="submit" value="Download"/>
                     </form>
                  </div>
                  <div class="validation-info">
                  </div>
                  <input class="employee-add__fullname input" maxlength="30" type="text" placeholder="Full name" data="fullname">
                  <input class="employee-add__bdate input" placeholder="Date of birth" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" data="Date of Birth" value/>
                  <input class="employee-add__entrydate input" placeholder="Date of entry" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" data="Date of entry"/>
                  <input class="employee-add__position input" type="text" placeholder="Position" data="position">
                   <select class="employee-add__education input" data="education">
                    <option>Secondary education</option>
                    <option>Secondary special education</option>
                    <option>Higher education</option>
                  </select>
                  <input class="employee-add__passport input" type="text" placeholder="Passport" data="passport">
                  <input class="employee-add__registration input" type="text" placeholder="Registration" data="registration">
                  <input class="employee-add__phone input" type="text" placeholder="Phone number" data="phone">
                   <p class="emplloyee-add__salary-value">Set the salary level:</p>
                  <input class="employee-add__salary-input input" type="range" min="200" max="5000" step="10" value="0">
              </div>
              <div>
                <button class="employee-add__btn-back button">Back</button>
                <button class="employee-add__btn-save button">Save</button>
              </div>`;
  }

  static afterRender() {
    this.setActions();
  }

  static setActions() {
    const employeeAddContainer = document.getElementsByClassName('employee-add')[0],
      image = document.getElementsByClassName('employee-add__image')[0],
      fullNameField = employeeAddContainer.getElementsByClassName('employee-add__fullname')[0],
      bdateField = employeeAddContainer.getElementsByClassName('employee-add__bdate')[0],
      entryDateField = employeeAddContainer.getElementsByClassName('employee-add__entrydate')[0],
      positionField = employeeAddContainer.getElementsByClassName('employee-add__position')[0],
      educationField = employeeAddContainer.getElementsByClassName('employee-add__education')[0],
      passportField = employeeAddContainer.getElementsByClassName('employee-add__passport')[0],
      registrationField = employeeAddContainer.getElementsByClassName('employee-add__registration')[0],
      btnBack = document.getElementsByClassName('employee-add__btn-back')[0],
      btnSave = document.getElementsByClassName('employee-add__btn-save button')[0],
      btnAddPhoto = document.getElementsByClassName('employee-add__btn-photo')[0],
      choseFile = document.getElementsByClassName('employee-add__btn-chose')[0],
      phone = document.getElementsByClassName('employee-add__phone')[0],
      salaryInput = document.getElementsByClassName('employee-add__salary-input')[0],
      salaryValue = document.getElementsByClassName('emplloyee-add__salary-value')[0],
      validationInfo = document.getElementsByClassName('validation-info')[0],
      formInputs = document.querySelectorAll('.input');

    salaryInput.oninput = () => {
      salaryValue.innerHTML = `${salaryInput.value}$`;
    };

    btnAddPhoto.onclick = () => {
      swal('Photo has been download!', '', 'success');
    };

    choseFile.onchange = () => {
      const preview = document.querySelector('img');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        preview.src = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = '';
      }
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

      this.saveEmployee(
        fullNameField,
        bdateField,
        entryDateField,
        positionField,
        educationField,
        passportField,
        registrationField,
        phone.value,
        salaryInput.value
      );
    };

    btnBack.onclick = () => {
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

  static async saveEmployee(
    fullNameField,
    bdateField,
    entryDateField,
    positionField,
    educationField,
    passportField,
    registrationField,
    phone,
    salary
  ) {
    const newEmployee = {
      fullname: fullNameField.value,
      bdate: bdateField.value,
      entryDate: entryDateField.value,
      position: positionField.value,
      education: educationField.value,
      passport: passportField.value,
      registration: registrationField.value,
      phone: phone,
      salary: salary,
    };

    await Employees.addEmployee(newEmployee);
    await swal('The employee has been added to the database!', '', 'success');
    this.redirectToEmployeesList();
  }

  static redirectToEmployeesList() {
    location.hash = '#/employees/';
  }
}

export default Add;
