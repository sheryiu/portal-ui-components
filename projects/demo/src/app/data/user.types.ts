export type Customer = {
  id: string;
  profile: {
    color: string;
    icon: string;
  };
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
  savedAddresses: Address[];
  registeredSince: Date;
}

export type Address = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export enum EmployeeDepartment {
  WAREHOUSE = "Warehouse",
  SHIPPING = "Shipping",
  MANAGEMENT = "Management",
}

export enum EmployeePosition {
  INTERN = "Intern",
  WAREHOUSE_WORKER = "Warehouse Worker",
  FORKLIFT_OPERATOR = "Forklift Operator",
  INVENTORY_CLERK = "Inventory Clerk",
  WAREHOUSE_SUPERVISOR = "Warehouse Supervisor",
  WAREHOUSE_MANAGER = "Warehouse Manager",
  SHIPPING_AND_RECEIVING_CLERK = "Shipping and Receiving Clerk",
  HR_MANAGER = "HR Manager",
  CFO = "Chief Financial Officer",
  CEO = "Chief Executive Officer",
}

export enum EmployeeStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ON_LEAVE = "On Leave",
  TERMINATED = "Terminated",
  RETIRED = "Retired",
  PROBATION = "Probation",
  CONTRACT = "Contract",
}

export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: EmployeeDepartment;
  position: EmployeePosition;
  dateOfJoining: Date;
  dateOfLeaving: Date | null;
  status: EmployeeStatus;
}