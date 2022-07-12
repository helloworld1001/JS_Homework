// //Задание 1

myArr = [-1, 0, 2, -4, 34, -2, 7, -5, 10, 100];

function filterOut(item) {
  return item > 0;
}

console.log(myArr.filter(filterOut));

// //Задание 2

myArr = [-1, 0, 2, -4, 34, -2, 7, -5, 10, 100];
myArr2 = [0, -2, -8, 0, 10, -2, 4];

function findFirstPositive(arr) {
  return arr.find(function (number) {
    return number > 0;
  });
}

console.log(findFirstPositive(myArr));
console.log(findFirstPositive(myArr2));

// //Задание 3

var palindrome = "поТоП";

function isPalindrome(newString) {
  var charArray = newString.split("");
  var bufferCharArray = charArray.slice().reverse();
  for (var i = 0; i < charArray.length; i++) {
    if (
      charArray[i] == bufferCharArray[i] ||
      charArray[i].toLowerCase() == bufferCharArray[i] ||
      charArray[i].toUpperCase() == bufferCharArray[i]
    ) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome(palindrome));

// //Задание 4

console.log(areAnagrams("колобок", "локобок"));

function areAnagrams(firstString, secondString) {
  if (firstString.length !== secondString.length) {
    return false;
  }

  var firstString = firstString.split("").sort();
  var secondString = secondString.split("").sort();
  for (var i = 0; i < firstString.length; i++) {
    if (
      firstString[i] == secondString[i] ||
      firstString[i].toLowerCase() == secondString[i].toLowerCase() ||
      firstString[i].toUpperCase() == secondString[i].toUpperCase()
    ) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

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
