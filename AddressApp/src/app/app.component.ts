import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AddressApp';
  list: any[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }
  

  async fetchData() {
    try {
      const response = await fetch('http://localhost:8080/api/address'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.list = await response.json();
      console.log('Data received:', this.list);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  // post data method

  async sendPostRequest(nameP: string, addressP: string, cityP: string) {
    const postData = { name: nameP, address: addressP, city: cityP };

    fetch('http://localhost:8080/api/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
    


 async add() {
    let name = prompt("Enter Name") || "";
    let address = prompt("Enter Address") || "";
    let city = prompt("Enter City") || "";
  
    if (name && address && city) {
      this.sendPostRequest(name, address, city);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      console.warn("All fields are required!");
    }
  }


  // delete a record
  async delete() {
      let id=prompt("Enter ID to delete") || "";
    fetch(`http://localhost:8080/api/address/delete/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Record deleted successfully:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }  

  

}
