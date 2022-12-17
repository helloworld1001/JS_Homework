class Employees {
  static async getEmployeesList() {
    const response = await fetch('http://localhost:3000/api/employees');
    return await response.json();
  }
  static async addEmployee(newEmployee) {
    const response = await fetch('http://localhost:3000/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });
    return await response.json();
  }

  static async getEmployee(id) {
    const response = await fetch(`http://localhost:3000/api/employee/${id}`);
    return await response.json();
  }

  static async editEmployee(updatedEmployee) {
    await fetch(`http://localhost:3000/api/employee/${updatedEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    });
  }

  static async setVacation(startDate, id) {
    await fetch(`http://localhost:3000/api/employee/${id}/vacation/${startDate}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'no-cors',
    });
  }

  static async getVacation(id) {
    const response = await fetch(`http://localhost:3000/api/employee/${id}/vacation`);
    return await response.json();
  }

  static async removeVacation(id) {
    await fetch(`http://localhost:3000/api/employee/${id}/vacation`, {
      method: 'DELETE',
    });
  }

  static async getDismissedList() {
    const response = await fetch('http://localhost:3000/api/dismissed');
    return await response.json();
  }

  static async dismissEmployee(id) {
    await fetch(`http://localhost:3000/api/employee/${id}/dismiss`, {
      method: 'DELETE',
    });
  }
  static async removeEmployee(id) {
    await fetch(`http://localhost:3000/api/employee/${id}/remove`, {
      method: 'DELETE',
    });
  }
}

export default Employees;
