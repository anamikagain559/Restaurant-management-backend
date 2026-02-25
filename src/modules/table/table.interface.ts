export enum TableStatus {
    AVAILABLE = "Available",
    OCCUPIED = "Occupied",
    RESERVED = "Reserved",
}

export interface ITable {
    tableNumber: number;
    capacity: number;
    status: TableStatus;
}
