console.log("welcome to js");
//**polyfill for map**
Array.prototype.myMap = function (callbackFn) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    arr.push(callbackFn(this[i], i, this));
  }
  return arr;
};

// let myarr = [1, 2, 3];
// const value = myarr.map((e) => {
//   return e * e;
// });
// console.log("value", value);
// const newval = myarr.myMap((e) => {
//   return e * 5;
// });
// console.log(newval);

// const arr = [1, 2, 3, 4, 5];
// const filterArr = arr.filter((e) => e > 2);
// console.log(filterArr, "filterArr");

Array.prototype.myfilter = function (cb) {
  var arr1 = [];
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index])) {
      arr1.push(this[index]);
    }
  }
  return arr1;
};
// const filterArr1 = arr.myfilter((e) => e < 2);
// console.log(filterArr1, "filterArr1");

// polyfill for reduce
const arr = [1, 2, 3, 4, 5];
// const sum = arr.reduce((acc, curr) => {
//   return (acc += curr);
// }, 0);

// console.log(sum, "sum");
Array.prototype.myreduce = function (cb, initialvalue) {
  var acc = initialvalue;
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], acc)) {
      acc += this[index];
    }
  }
  return acc;
};

// const sum = arr.myreduce((acc, curr) => {
//   return (acc += curr);
// }, 0);

// console.log(sum, "sum");
// let btnClick = false;
// const btn = document.getElementById("btn");

const mypromise = new Promise((res, rej) => {
  btn.addEventListener("click", () => {
    res("promise resolved");
  });
});

mypromise
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("error");
  });
// console.log("value", value);

// document.addEventListener("click", (e) => {
//   console.log(e), "event";
// });

// var employee1 = { firstName: "John", lastName: "Rodson" };
// var employee2 = { firstName: "Jimmy", lastName: "Baily" };

// function invite(greeting1, greeting2) {
//   console.log(
//     greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
//   );
// }

// invite.apply(employee1, ["Hello", "How are you?"]); // Hello John Rodson, How are you?

// Function.prototype.mycall = function (obj = {}, ...args) {
//   if (typeof this !== "function") {
//     throw Error("can not invoke ");
//   }
//   obj.fn = this;
//   obj.fn(...args);
// };
// invite.mycall(employee2, "Hello", "How are you?");
// Function.prototype.myapply = function (obj = {}, ...arr) {
//   if (typeof this !== "function") {
//     throw Error("can not invoke ");
//   }
//   if (!Array.isArray(arr)) {
//     throw Error("can not invoke ");
//   }
//   obj.fn = this;
//   obj.fn(...arr);
// };
// invite.myapply(employee2, ["Hello", "How are you?"]);

Function.prototype.mybind = function (obj = {}, ...args1) {
  if (typeof this !== "function") {
    throw Error("can not invoke ");
  }
  obj.fn = this;
  return function (...args2) {
    obj.fn(...args1, ...args2);
  };
};

obj1 = {
  name: "ronak",
  age: 23,
};
function detials(greet) {
  return `${this.name} is ${this.age} year old  ${greet}`;
}
// const getDetails = detials.bind(obj1, "welcome home");
// console.log(getDetails());

// Bind polyfill
const getDetails = detials.mybind(obj1, "welcome home");
console.log(getDetails());

const arra = [1, 2]; // {1:1,2:2}
function convert(arr) {
  let obj = {};
  let newarr = [];
  for (let index = 0; index < arr.length; index++) {
    obj[index + 1] = arr[index];
  }
  newarr.push(obj);
  return newarr;
}
console.log(convert(arra));

//polyfill for flat
const flatarr = [1, 2, [3, 4], [5, [6]]];

// console.log("flat", flatarr.flat(2));

Array.prototype.myflat = function (depth) {
  let arr = [];
  for (let index = 0; index < this.length; index++) {
    if (Array.isArray(this[index])) {
      arr.push(...this[index].myflat(depth - 1));
    } else {
      arr.push(this[index]);
    }
  }

  return arr;
};

console.log("flat", flatarr.myflat(2));

const orgObject = {
  company: "XYZ Corp",
  work: {
    hardware: "ford",
    software: "tcs",
  },
};
const carObject = { name: "Toyota" };
const staff = Object.assign({}, orgObject, carObject);
staff.work.hardware = "bmw";
console.log("staff", staff, orgObject);

const memoizAddition = () => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      console.log("Fetching from cache");
      return cache[value]; // Here, cache.value cannot be used as property name starts with the number which is not a valid JavaScript  identifier. Hence, can only be accessed using the square bracket notation.
    } else {
      console.log("Calculating result");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};
// returned function from memoizAddition
const addition = memoizAddition();
console.log(addition(20)); //output: 40 calculated
console.log(addition(20)); //output: 40 cached
console.log(addition(40)); //output: 40 cached

let first = { a: 1, b: 2, c: 3, d: { k: 5 } };
let second = { a: 1, b: 1, c: 3, d: { k: 5 }, e: 6 };

function duplicateObject(obj1, obj2) {
  let res = {};
  for (const key1 in obj1) {
    for (const key2 in obj2) {
      if (obj1[key1] == obj2[key2] && key1 == key2) {
        res[key1] = obj1[key1];
      }
    }
  }
  return res;
}
console.log("duplicate", duplicateObject(first, second));

//promise working

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved");
  }, 500);
});
var promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("fast resolve"), 300);
});

Promise.race([promise1, promise2]).then(function (value) {
  console.log(value); // "two" // Both promises will resolve, but promise2 is faster
});

// var window = document.window();
// function goBack() {
//   window.history.back();
// }

// console.log(goBack(), "goback");

function* genrator() {
  console.log("function called");
  yield "stared";
  yield "in middile stage";
  yield "Done";
}
let GN = genrator();
console.log(GN.next());
console.log(GN.next());
console.log(GN.next());
console.log(GN.next());

const data = [1, 4, 3, 65, 6, 77];
const data1 = [3, 54, 53, 35, 16, 87];
console.log("newarr", [...data, ...data1]);

var obj = {
  hellword: function () {
    return `hello this ${this.name}`;
  },
  name: "welcome",
};
var obj2 = {
  hellword: obj.hellword,
  name: "working",
};

console.log(obj2.hellword());
