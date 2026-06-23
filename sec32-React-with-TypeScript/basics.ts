// Primitives: number, string, boolean, null, undefined, symbols
// More complex types: arrays, objects
// Function types, parameters

// Primitives
let age: number = 12.1; // cud assign both integer and float

let userName: string;

userName = 'Max';

let isInstructor: boolean = false;

// More complex types
let hobbies: string[];  // wanna have an arr of strings
hobbies = ['Sports', 'Cooking']

let person: {
    name: string,  // defining what type of values the object keys should have and what object keys shud be in the object
    age: number
}

person = {
    name: 'Max',
    age: 12
}

let people: {
    name: string,
    age: number
}[];  // wanna have an arr of such objects