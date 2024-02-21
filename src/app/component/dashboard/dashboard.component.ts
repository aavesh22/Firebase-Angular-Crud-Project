import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Employee } from '../../model/employee';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employeeList: Employee[] = [];
  employeeObj: Employee = {
    id: '',
    first_name: '',
    last_name: '',
    department_name: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  department_name = '';
  email: string = '';
  mobile: string = '';
  isEditing: boolean = false;
  editingEmployeeId: string | null = null;

  constructor(private auth: AuthService, private data: DataService,private router: Router) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  logout() {
    this.auth.logout();
  }

  getAllEmployees() {
    this.data.getAllEmployees().subscribe(res => {
      this.employeeList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      console.error('Error while fetching employee data', err);
    })
  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.department_name = '';
    this.email = '';
    this.mobile = '';
  }
  addEmployee() {
    if (this.first_name === '' || this.last_name === '' || this.department_name === '' || this.mobile === '' || this.email === '') {
      alert('Fill all input fields');
      return;
    }
    this.employeeObj.id = '';
    this.employeeObj.first_name = this.first_name;
    this.employeeObj.last_name = this.last_name;
    this.employeeObj.department_name = this.department_name;
    this.employeeObj.email = this.email;
    this.employeeObj.mobile = this.mobile;

    this.data.addEmployee(this.employeeObj);
    this.resetForm();
  }
  editEmployee(employee: Employee) {
    this.isEditing = true;
    this.editingEmployeeId = employee.id;
    this.id = employee.id;
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.department_name = employee.department_name;
    this.email = employee.email;
    this.mobile = employee.mobile;
  }

  updateEmployee() {
    if (this.editingEmployeeId) {
      const updatedEmployee: Employee = {
        id: this.editingEmployeeId,
        first_name: this.first_name,
        last_name: this.last_name,
        department_name: this.department_name,
        email: this.email,
        mobile: this.mobile
      };
      this.data.updateEmployee(updatedEmployee);
      this.isEditing = false;
      this.editingEmployeeId = null;
      this.resetForm();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingEmployeeId = null;
    this.resetForm();
  }

  deleteEmployee(employee: Employee) {
    if (window.confirm('Are you sure you want to delete ' + employee.first_name + ' ' + employee.last_name + ' ?')) {
      this.data.deleteEmployee(employee);
    }
  }

  redirectToUploadPage() {
    this.router.navigateByUrl('/file-upload');
  }
}
