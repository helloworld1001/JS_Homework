// //Задание 1

myArr = [-1, 0, 2, -4, 34, -2, 7, -5, 10, 100];

function filterOut(item) {
  return item > 0;
}

function filterFunction(arr) {
  console.log(arr.filter(filterOut));
}

filterFunction(myArr);

// //Задание 2

myArr = [-1, 0, 2, -4, 34, -2, 7, -5, 10, 100];
myArr2 = [0, -2, -8, 0, 10, -2, 4];

function findFirstPositive(arr) {
  return arr.find(function (number) {
    return number > 0;
  });
}

function isFirstPositive(arr) {
  console.log(findFirstPositive(arr));
}

isFirstPositive(myArr);
isFirstPositive(myArr2);

// //Задание 3

var palindrome = "поТоП";

function isPalindrome(newString) {
  var firstString = newString.toUpperCase();
  var secondString = firstString.split("").reverse().join("");
  return console.log(firstString === secondString);
}

isPalindrome(palindrome);

// //Задание 4

function areAnagrams(firstString, secondString) {
  var firstString = firstString.toLowerCase().split("").sort().join("");
  var secondString = secondString.toLowerCase().split("").sort().join("");
  return console.log(firstString === secondString);
}

areAnagrams("колобок", "локобок");

// //Задание 5

console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8, 9], 5));

function divideArr(arr, subArrSize) {
  if (subArrSize == 0) {
    return arr;
  }
  function filtration(item, i) {
    return i < subArrSize;
  }
  var newArr = [];
  var newSubArr = [];

  for (item in arr) {
    newSubArr = arr.filter(filtration);
    newArr[item] = newSubArr;
    arr = arr.slice(subArrSize);
    if (arr.length == 0) {
      break;
    }
  }

  return newArr;
}

// Задание 6

console.log(isPowerTwo(5));

function isPowerTwo(number) {
  for (var i = 0; ; i++) {
    if (Math.pow(2, i) > number) {
      return false;
    } else if (Math.pow(2, i) !== number) {
      continue;
    } else if (Math.pow(2, i) == number) {
      return true;
    }
  }
}
