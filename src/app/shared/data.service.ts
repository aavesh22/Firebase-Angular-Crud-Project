import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Employee } from '../model/employee';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }


  // add employee
  addEmployee(employee: Employee) {
    employee.id = this.afs.createId();
    return this.afs.collection('/Employees').add(employee);
  }

  // get all students
  getAllEmployees() {
    return this.afs.collection('/Employees').snapshotChanges();
  }

  // delete employee
  deleteEmployee(employee: Employee) {
    this.afs.doc('/Employees/' + employee.id).delete();
  }

  // update employee
  updateEmployee(employee: Employee) {
    this.deleteEmployee(employee);
    this.addEmployee(employee);
  }

}