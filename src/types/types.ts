export interface Block {
    tag: string;
    text: string | null;
    attrs: { [key: string]: string };
    children: Block[];
}

export interface Inspection {
    id: string;
    location: string;
    date: string;
    type: string;
}

export interface InspectionDetails {
    damageLocation: string;
    newDamage: string;
    damageType: string;
    damageDate: string;
    immediateActionRequired: string;
    damageDescription: string;
    maintenanceLocation: string;
    maintenanceType: string;
    maintenanceImmediateActionRequired: string;
    maintenanceCostEstimate: string;
    installationLocation: string;
    installationType: string;
    reportedMalfunction: string;
    approved: string;
    installationComments: string;
    modificationLocation: string;
    performedBy: string;
    modificationDescription: string;
    actionRequired: string;
    modificationComments: string;
}

export interface Photo {
    fileName: string;
    webPath: string;
}

export interface Errors {
    [key: string]: boolean;
}

export interface Options {
    damageInspection: boolean;
    maintenanceInspection: boolean;
    installationInspection: boolean;
    modificationInspection: boolean;
}