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

// Type inference
let course = 'React'; // if u r already assigning the variable to a value, typescript will look at it and see its type. so assigning any other type later will throw error auotmatically because of type inference
// course = 123   // error


// Union types
let course1: string | number | string[] = 'React'; // can be multiple types now
course1 = 123;


// Type alias
type Person = {    // can store type somewhere and then use it the variable elsewhere 
    name: string,
    age: number
}

let person1: Person; // person1 will have to be obj with those keys and key value types

let people1: Person[]; // will be arr of such objs

// Functions & types
function add1(a: number, b: number) {
    return a + b;  // type inference here
}

function add2(a: number, b: number): number | string {  // treturned value can only be of type number or string
    return a + b;  
}

// Generics
function insertAtBeginning<T>(array: T[], value: T) {  // due to adding T, typescript will know updatedArray, demoArray and value should all be of the same type
    const newArray = [value, ...array]
    return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1);

// updatedArray[0].split('')  // will throw an error updatedArray[0] isnt a string
 