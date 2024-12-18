import { CHART_BAR, CHART_DOUGHNUT, CHART_LINE } from '@/consts';

export interface Incident {
  id: number;
  location: Location;
  incident_type: IncidentType;
  description: string;
  status: Status;
  assigned_to: string;
  date_reported: Date;
  resolution_date: Date | null;
  reported_by: string;
  cost: number;
}

export interface IncidentFilters {
  query: string;
  status: string;
  incidentType: string;
  location: string;
  dateReportedFrom: string;
  dateReportedTo: string;
  resolutionDateFrom: string;
  resolutionDateTo: string;
  minCost: number;
  maxCost: number;
}

export interface IncidentChartStats {
  incidentsByType: { [key: string]: number };
  incidentsByDate: { [key: string]: number };
  incidentsByStatus: { [key: string]: number };
  incidentsByCost: { [key: string]: number };
}

export type AvailableChartTypes =
  | typeof CHART_BAR
  | typeof CHART_LINE
  | typeof CHART_DOUGHNUT;

export enum Location {
  PlantA = 'Plant A',
  PlantB = 'Plant B',
  PlantC = 'Plant C',
  WarehouseA = 'Warehouse A',
  WarehouseB = 'Warehouse B',
  WarehouseC = 'Warehouse C',
  FacilityA = 'Facility A',
  FacilityB = 'Facility B',
  FacilityC = 'Facility C',
  StorageSiteA = 'Storage Site A',
  StorageSiteB = 'Storage Site B',
  StorageSiteC = 'Storage Site C'
}

export enum IncidentType {
  EquipmentFailure = 'Equipment Failure',
  HumanError = 'Human Error',
  SafetyCompliance = 'Safety Compliance',
  ChemicalSpill = 'Chemical Spill',
  ElectricalFault = 'Electrical Fault',
  FireIncident = 'Fire Incident',
  WorkplaceInjury = 'Workplace Injury',
  EnvironmentalHazard = 'Environmental Hazard'
}

export enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
  Closed = 'Closed'
}
