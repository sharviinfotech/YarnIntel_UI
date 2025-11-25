import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-entry',
  templateUrl: './stock-entry.component.html',
  styleUrl: './stock-entry.component.css'
})
export class StockEntryComponent {
   stockForm: FormGroup;
 
  constructor(private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
  }
 
  // FormArray getter
  get items(): FormArray {
    return this.stockForm.get('items') as FormArray;
  }
 
  // Create new row
  createItem(): FormGroup {
    return this.fb.group({
      NatureofTransaction: ['', Validators.required],
      CompanyName: ['', Validators.required],
      Postingdate: ['', Validators.required],
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      StationName: ['', Validators.required],
      SLock: ['', Validators.required],
      quantity: [0, Validators.required],
      value: [0, Validators.required],
      Lot: ['',Validators.required],
      sci: ['',Validators.required],
      micff: ['',Validators.required],
      mat: ['',Validators.required],
      len: ['',Validators.required],
      unf: ['',Validators.required],
      sfi: ['',Validators.required],
      str: ['',Validators.required],
      elg: ['',Validators.required],
      rd: ['',Validators.required],
      b: ['',Validators.required],
      trash: ['',Validators.required],
      moisture: ['',Validators.required],
      neps_t: ['',Validators.required],
      bales: ['',Validators.required],
      kgs: ['',Validators.required],
      uom: ['']
    });
  }
 
  // Add row
  addRow(): void {
    this.items.push(this.createItem());
  }
 
  // Remove row
  removeRow(index: number): void {
    this.items.removeAt(index);
  }
 
  // Save all data
  saveStockEntry(): void {
    if (this.stockForm.valid) {
      const stockData = this.stockForm.value.items;
      console.log('Stock Entry Data:', stockData);
 
      // Example: API Call
      // this.http.post('http://localhost:3000/api/inventory/save', stockData).subscribe(...)
      alert('Stock data saved successfully!');
    } else {
      alert('Please fill all required fields.');
    }
  }

}
