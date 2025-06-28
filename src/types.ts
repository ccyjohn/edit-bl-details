export interface Cargo {
  id: number;
  sequence: number;
  container: string;
  description: string;
  packages: number;
  grossWeight: number;
  volume: number;
  cargoNature: string;
  marksNumbers: string;
  fullDescription: string;
}

export interface CargoNature {
  value: string;
  label: string;
}

export interface ContainerStatus {
  [key: string]: string;
}

export interface CargoMovement {
  [key: string]: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface Party {
  name: string;
  address: string[];
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
} 