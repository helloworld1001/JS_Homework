//Задание 1

function Animal(name) {
  this.name = name;
  this._foodAmount = 0;
}

Animal.prototype.feed = function () {
  console.log("Насыпаем в миску" + " " + this.dailyNorm() + "корма");
};

Animal.prototype.dailyNorm = function (amount) {
  if (!arguments.length) return this._formatFoodAmount();
  if (amount < 30) {
    throw new Error("Корма не может быть меньше 30 гр.");
  }
  if (amount > 100) {
    throw new Error("Корма не может быть больше 100 гр.");
  }

  this._foodAmount = amount;
};

Animal.prototype._formatFoodAmount = function () {
  return this._foodAmount + " " + "гр.";
};

function Cat() {
  Animal.apply(this.arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.feed = function () {
  Animal.prototype.feed.apply(this);
  console.log("Кот доволен ^_^");
  return this;
};
Cat.prototype.stroke = function () {
  console.log("Гладим кота");
  return this;
};

var barsik = new Cat();
barsik.dailyNorm(55);
barsik.feed().stroke();

//Задание 2

var initialObj = {
  string: "Vasya",
  number: 30,
  boolean: true,
  undefined: undefined,
  null: null,
  array: [1, 2, 3],
  object: {
    string2: "Petrov",
    object2: {
      array2: [{}, {}],
    },
    object3: {},
  },
  method: function () {
    alert("Hello");
  },
};

function deepClone(obj) {
  if (Array.isArray(obj)) {
    var newObj = [];
  } else {
    var newObj = {};
  }

  for (item in obj) {
    if (typeof obj[item] != "object" || obj[item] == null) {
      newObj[item] = obj[item];
    } else if (typeof obj[item] == "object" && !Array.isArray(obj[item])) {
      newObj[item] = deepClone(obj[item]);
    } else if (Array.isArray(obj[item])) {
      newObj[item] = deepClone(obj[item]);
    }
  }

  return newObj;
}

var objNew = deepClone(initialObj);
objNew.object.object2.array2[1].name = "Вася";
console.log(initialObj);
console.log(objNew);

//Задание 3

var firstInitialObj = {
  string: "Vasya",
  number: 30,
  boolean: true,
  undefined: undefined,
  null: null,
  array: [1, 2, 3],
  object: {
    string2: "Petrov",
    object2: {
      array2: [{}, {}],
    },
    object3: {},
  },
  method: function () {
    alert("Hello");
  },
};

var secondInitialObj = {
  string: "Vasya",
  number: 30,
  boolean: true,
  undefined: undefined,
  null: null,
  array: [1, 2, 3],
  object: {
    string2: "Petrov",
    object2: {
      array2: [{}, {}],
    },
    object3: {},
  },
  method: function () {
    alert("Hello");
  },
};

function comparison(firstObj, secondObj) {
  if (Object.keys(firstObj).length !== Object.keys(secondObj).length) {
    return false;
  } else {
    for (item in firstObj) {
      if (!secondObj.hasOwnProperty(item)) {
        return false;
      } else if (
        typeof firstObj[item] == "object" &&
        typeof secondObj[item] == "object" &&
        firstObj[item] !== null &&
        secondObj[item] !== null &&
        Object.keys(firstObj[item]).length == 0 &&
        Object.keys(secondObj[item]).length == 0
      ) {
        continue;
      } else if (
        typeof firstObj[item] == "function" &&
        typeof secondObj[item] == "function"
      ) {
        if (firstObj[item].toString() !== secondObj[item].toString()) {
          return false;
        }
      } else if (
        (typeof firstObj[item] !== "object" &&
          typeof secondObj[item] !== "object") ||
        (firstObj[item] == null && secondObj[item] == null)
      ) {
        var result = firstObj[item] == secondObj[item];
        if (!result) {
          return false;
        }
      } else if (
        typeof firstObj[item] == "object" &&
        typeof secondObj[item] == "object" &&
        firstObj[item] !== null &&
        secondObj[item] !== null
      ) {
        if (!comparison(firstObj[item], secondObj[item])) {
          return false;
        } else {
          if (firstObj[item] !== secondObj[item]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

console.log(comparison(firstInitialObj, secondInitialObj));
