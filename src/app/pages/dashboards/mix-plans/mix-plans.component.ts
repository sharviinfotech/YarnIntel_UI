import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mix-plans',
  standalone: true,  // Add this if standalone
  imports: [CommonModule, ReactiveFormsModule],  
  templateUrl: './mix-plans.component.html',
  styleUrls: ['./mix-plans.component.css']
})
export class MixPlansComponent implements OnInit {
  mixPlanForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize the form with default structure
   */
  initializeForm(): void {
    this.mixPlanForm = this.fb.group({
      mixPlanName: ['', Validators.required],
      description: [''],
      bales: this.fb.array([])
    });

    // Add two default rows
    this.addBaleRow();
    this.addBaleRow();
  }

  /**
   * Getter for easy access to bales FormArray
   */
  get bales(): FormArray {
    return this.mixPlanForm.get('bales') as FormArray;
  }

  /**
   * Create a new bale row FormGroup
   */
  createBaleRow(): FormGroup {
    return this.fb.group({
      baleId: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      moisture: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      trash: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  /**
   * Add a new bale row to the form array
   */
  addBaleRow(): void {
    this.bales.push(this.createBaleRow());
  }

  /**
   * Delete a bale row at specified index
   * Prevents deletion if only one row remains
   */
  deleteRow(index: number): void {
    if (this.bales.length > 1) {
      this.bales.removeAt(index);
      console.log(`Row ${index} deleted. Remaining rows: ${this.bales.length}`);
    } else {
      alert('At least one bale row is required!');
    }
  }

  /**
   * Save the mix plan
   * Validates form before submission
   */
  savePlan(): void {
    // Mark all fields as touched to show validation errors
    this.mixPlanForm.markAllAsTouched();

    if (this.mixPlanForm.invalid) {
      alert('Please fill in all required fields correctly!');
      console.log('Form Errors:', this.getFormValidationErrors());
      return;
    }

    // Process the form data
    const formData = this.mixPlanForm.value;
    console.log('Mix Plan Saved:', formData);
    
    // Calculate totals
    const totals = this.calculateTotals();
    console.log('Totals:', totals);

    alert('Mix Plan Saved Successfully!');
    
    // Optional: Reset form after successful save
    // this.resetForm();
  }

  /**
   * Calculate totals for weight, moisture, and trash
   */
  calculateTotals(): { totalWeight: number; avgMoisture: number; avgTrash: number } {
    let totalWeight = 0;
    let totalMoisture = 0;
    let totalTrash = 0;
    const baleCount = this.bales.length;

    this.bales.controls.forEach((control) => {
      const bale = control.value;
      totalWeight += parseFloat(bale.weight) || 0;
      totalMoisture += parseFloat(bale.moisture) || 0;
      totalTrash += parseFloat(bale.trash) || 0;
    });

    return {
      totalWeight: totalWeight,
      avgMoisture: baleCount > 0 ? totalMoisture / baleCount : 0,
      avgTrash: baleCount > 0 ? totalTrash / baleCount : 0
    };
  }

  /**
   * Cancel and reset the form
   */
  cancel(): void {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.resetForm();
    }
  }

  /**
   * Reset the form to initial state
   */
  resetForm(): void {
    this.mixPlanForm.reset();
    
    // Clear the bales array
    while (this.bales.length !== 0) {
      this.bales.removeAt(0);
    }
    
    // Add two default rows again
    this.addBaleRow();
    this.addBaleRow();
    
    console.log('Form reset to initial state');
  }

  /**
   * Helper method to get form validation errors (for debugging)
   */
  getFormValidationErrors(): any[] {
    const errors: any[] = [];
    
    Object.keys(this.mixPlanForm.controls).forEach(key => {
      const controlErrors = this.mixPlanForm.get(key)?.errors;
      if (controlErrors) {
        errors.push({ field: key, errors: controlErrors });
      }
    });

    // Check bales array errors
    this.bales.controls.forEach((control, index) => {
      Object.keys(control.value).forEach(key => {
        const fieldErrors = control.get(key)?.errors;
        if (fieldErrors) {
          errors.push({ field: `bales[${index}].${key}`, errors: fieldErrors });
        }
      });
    });

    return errors;
  }

  /**
   * Get bale at specific index (helper method)
   */
  getBaleAt(index: number): FormGroup {
    return this.bales.at(index) as FormGroup;
  }

  /**
   * Check if form or specific control is invalid and touched
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.mixPlanForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Check if bale field is invalid
   */
  isBaleFieldInvalid(index: number, fieldName: string): boolean {
    const field = this.bales.at(index).get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}