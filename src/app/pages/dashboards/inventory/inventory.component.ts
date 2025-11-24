import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Bale {
  id: string;
  lotNumber: string;
  vendorName: string;
  stationName: string;
  weight: number;
  status: 'Available' | 'Quarantined' | 'Reserved' | 'In Use';
  staple: number;
  micronaire: number;
  strength: number;
  trash: number;
  selected?: boolean;
}

interface InventoryStats {
  total: number;
  available: number;
  quarantined: number;
}

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  // Inventory statistics
  stats: InventoryStats = {
    total: 850320,
    available: 795110,
    quarantined: 55210
  };

  // Filter options
  searchQuery: string = '';
  selectedStatus: string = 'All';
  selectedVendor: string = 'All';
  selectedStation: string = 'All';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 128;
  totalPages: number = 0;

  // Table data
  bales: Bale[] = [
    {
      id: 'B789-C1',
      lotNumber: 'L54321',
      vendorName: 'Delta Growers',
      stationName: 'Warehouse A',
      weight: 225.5,
      status: 'Available',
      staple: 28.5,
      micronaire: 4.1,
      strength: 30.2,
      trash: 2.5,
      selected: false
    },
    {
      id: 'B790-C2',
      lotNumber: 'L54322',
      vendorName: 'Pima Producers',
      stationName: 'Inspection Bay',
      weight: 230.1,
      status: 'Quarantined',
      staple: 29.1,
      micronaire: 4.5,
      strength: 31.5,
      trash: 3.1,
      selected: false
    },
    {
      id: 'B791-C3',
      lotNumber: 'L54323',
      vendorName: 'Delta Growers',
      stationName: 'Warehouse B',
      weight: 228.0,
      status: 'Available',
      staple: 28.8,
      micronaire: 4.2,
      strength: 30.8,
      trash: 2.2,
      selected: false
    },
    {
      id: 'B792-C4',
      lotNumber: 'L54324',
      vendorName: 'Upland Co-op',
      stationName: 'Warehouse A',
      weight: 224.7,
      status: 'Available',
      staple: 28.3,
      micronaire: 4.0,
      strength: 29.9,
      trash: 2.8,
      selected: false
    },
    {
      id: 'B793-C5',
      lotNumber: 'L54325',
      vendorName: 'Pima Producers',
      stationName: 'Inspection Bay',
      weight: 231.2,
      status: 'Quarantined',
      staple: 29.3,
      micronaire: 4.6,
      strength: 31.9,
      trash: 3.4,
      selected: false
    }
  ];

  filteredBales: Bale[] = [];
  displayedBales: Bale[] = [];
  allSelected: boolean = false;

  // Dropdown options
  statusOptions: string[] = ['All', 'Available', 'Quarantined', 'Reserved', 'In Use'];
  vendorOptions: string[] = ['All', 'Delta Growers', 'Pima Producers', 'Upland Co-op'];
  stationOptions: string[] = ['All', 'Warehouse A', 'Warehouse B', 'Inspection Bay'];

  ngOnInit(): void {
    this.calculateTotalPages();
    this.applyFilters();
  }

  // Add new bale
  addNewBale(): void {
    console.log('Add new bale clicked');
    // Implement modal or navigation logic here
  }

  // Search functionality
  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this.applyFilters();
  }

  // Filter by status
  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 1;
    this.applyFilters();
  }

  // Filter by vendor
  onVendorChange(vendor: string): void {
    this.selectedVendor = vendor;
    this.currentPage = 1;
    this.applyFilters();
  }

  // Filter by station
  onStationChange(station: string): void {
    this.selectedStation = station;
    this.currentPage = 1;
    this.applyFilters();
  }

  // Apply all filters
  applyFilters(): void {
    this.filteredBales = this.bales.filter(bale => {
      const matchesSearch = !this.searchQuery || 
        bale.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        bale.lotNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        bale.vendorName.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = this.selectedStatus === 'All' || bale.status === this.selectedStatus;
      const matchesVendor = this.selectedVendor === 'All' || bale.vendorName === this.selectedVendor;
      const matchesStation = this.selectedStation === 'All' || bale.stationName === this.selectedStation;

      return matchesSearch && matchesStatus && matchesVendor && matchesStation;
    });

    this.totalItems = this.filteredBales.length;
    this.calculateTotalPages();
    this.updateDisplayedBales();
  }

  // Pagination
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updateDisplayedBales(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedBales = this.filteredBales.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedBales();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedBales();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedBales();
    }
  }

  // Selection functionality
  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.displayedBales.forEach(bale => bale.selected = this.allSelected);
  }

  toggleBaleSelection(bale: Bale): void {
    bale.selected = !bale.selected;
    this.updateSelectAllState();
  }

  updateSelectAllState(): void {
    this.allSelected = this.displayedBales.length > 0 && 
      this.displayedBales.every(bale => bale.selected);
  }

  getSelectedBales(): Bale[] {
    return this.bales.filter(bale => bale.selected);
  }

  // Actions
  openBaleActions(bale: Bale, event: Event): void {
    event.stopPropagation();
    console.log('Open actions for bale:', bale.id);
    // Implement dropdown menu or modal logic here
  }

  // Utility methods
  getStatusClass(status: string): string {
    switch(status) {
      case 'Available':
        return 'badge-available';
      case 'Quarantined':
        return 'badge-quarantined';
      case 'Reserved':
        return 'badge-reserved';
      case 'In Use':
        return 'badge-in-use';
      default:
        return '';
    }
  }

  getPaginationPages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, -1, this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, -1, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, -1, this.currentPage, -1, this.totalPages);
      }
    }
    
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}