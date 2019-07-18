const supervisionItems = [{
    name: 'CCC',
    id: 'CCC',
    default: false
}, {
    name: 'PVP',
    id: 'PVP',
    default: false
}, {
    name: 'COMP',
    id: 'COMP',
    default: false
}, {
    name: 'DEP',
    id: 'DEP',
    default: false
}, {
    name: 'EM',
    id: 'EM',
    default: true
}, {
    name: 'GPS',
    id: 'GPS',
    default: true
}, {
    name: 'SO',
    id: 'SO',
    default: true
}, {
    name: 'SO-A',
    id: 'SO-A',
    default: true
}, {
    name: 'SO-B',
    id: 'SO-B',
    default: true
}, {
    name: 'SO-C',
    id: 'SO-C',
    default: true
}, {
    name: 'FUG',
    id: 'FUG',
    default: false
}, {
    name: 'INCAR',
    id: 'INCAR',
    default: false
}, {
    name: 'RESID',
    id: 'RESID',
    default: false
}, {
    name: 'DRUG CT',
    id: 'DRUG CT',
    default: false
}, {
    name: 'DORA',
    id: 'DORA',
    default: true
}, {
    name: 'ECR',
    id: 'ECR',
    default: true
}, {
    name: 'FOSI',
    id: 'FOSI',
    default: true
}, {
    name: 'IG INT',
    id: 'IG INT',
    default: true
}, {
    name: 'MIO',
    id: 'MIO',
    default: true
}];

const mainGangs = [{
    name: 'sureno',
    id: 1
}, {
    name: 'nortenos',
    id: 2
}, {
    name: 'omg - outlaw motorcycl',
    id: 3
}, {
    name: 'white supremacist',
    id: 4
}, {
    name: 'crip',
    id: 5
}, {
    name: 'bloods',
    id: 6
}, {
    name: 'people nation',
    id: 7
}, {
    name: 'folk nation',
    id: 8
}, {
    name: 'others',
    id: 9
}, {
    name: 'no type specified',
    id: 10
}, {
    name: 'vlt',
    id: 11
}, {
    name: 'o13',
    id: 12
}, {
    name: 'qvo',
    id: 13
}];

const offenseTypes = [{
    name: 'murder',
    id: 'A'
}, {
    name: 'sex/registerable',
    id: 'D'
}, {
    name: 'sex/non-registerable',
    id: 'E'
}, {
    name: 'person',
    id: 'G'
}, {
    name: 'alcohol & drug',
    id: 'J'
}, {
    name: 'property',
    id: 'M'
}, {
    name: 'weapons',
    id: 'P'
}, {
    name: 'driving',
    id: 'S'
}, {
    name: 'other',
    id: 'V'
}, {
    name: 'drug possession only',
    id: 'X'
}, {
    name: 'unknown',
    id: 'Z'
}];

const agents = [
    { value: 'Steve', supervisor: 'Susan' },
    { value: 'Karl', supervisor: 'Sarah' },
    { value: 'Matt', supervisor: 'Susan' },
    { value: 'Mitt', supervisor: 'Sarah' }
];

const supervisors = [
    { value: 'Sarah' },
    { value: 'Susan' },
];

const supervisionContactDays = [30, 60, 90, 180];

export {
    supervisionItems,
    mainGangs,
    offenseTypes,
    agents,
    supervisors,
    supervisionContactDays
};
