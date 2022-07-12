// Задание 1

var arr = ["Вася", "Коля", "Петя", "Егор", "Cергей"];
console.log(transformNames(arr));

function transformNames(names) {
  return names.map(function (name) {
    return { name };
  });
}

// Задание 2

var timeArr = ["00", "13", "24"];
console.log(showTime(timeArr));

function showTime(arr) {
  var result = arr.reduce(function (prev, current) {
    return prev + " : " + current;
  });
  return '"' + "Текущее время : " + result + '"';
}

// Задание 3

var fish =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, beatae!";

console.log(countingWovels(fish));

function countingWovels(text) {
  var count = 0;
  var wovelsArr = [
    "а",
    "е",
    "ё",
    "и",
    "о",
    "у",
    "э",
    "ю",
    "я",
    "ы",
    "a",
    "e",
    "i",
    "o",
    "u",
    "y",
  ];
  var editedTextArr = text
    .split(" ")
    .join("")
    .split(",")
    .join("")
    .split(".")
    .join("")
    .split("!")
    .join("")
    .split("?")
    .join("")
    .split("-")
    .join("")
    .split("");

  editedTextArr.forEach(function (itemOfText) {
    var found = wovelsArr.find(function (itemOfWovels) {
      if (
        itemOfWovels == itemOfText ||
        itemOfWovels.toUpperCase() == itemOfText
      ) {
        return true;
      }
    });
    if (found) {
      count++;
    }
  });

  return count;
}

// Задание 4

console.log(
  countSentencesLetters("Привет, студент! Студент... Как дела, студент?")
);

function countSentencesLetters(text) {
  var arr = text
    .split(".")
    .join("/")
    .split("!")
    .join("/")
    .split("?")
    .join("/")
    .split("/");

  var editArr = arr.filter(function (item) {
    if (item) {
      return item;
    }
  });

  editArr.forEach(function (item) {
    var count = item.split(",").join("").split(" ").join("").length;
    console.log(item + ": " + "Letters quantity is: " + count);
  });
}
