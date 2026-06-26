import Dexie, { type EntityTable } from "dexie";

export interface Report {

    _id: string;
    referenceNumber: string;
    testDate: Date;
    reportDate: Date;
    referenceDoctor: string;

    patientName: string;
    patientAge: string;
    patientGender: string;
    reportData: string;
    deleted: Boolean;
    createdAt: Date;
    updatedAt: Date;

}


export const db = new Dexie("myDB") as Dexie & {
    reports: EntityTable<Report, "referenceNumber">
}


db.version(1).stores({
    reports: ' referenceNumber, patientName , reportDate'
})

