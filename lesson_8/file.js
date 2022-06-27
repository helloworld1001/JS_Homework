function Animal(name) {
  this.name = name;
  var foodAmount = 0;
  var self = this;
  this.feed = function () {
    console.log("Насыпаем в миску" + " " + self.dailyNorm() + "корма");
  };

  this.dailyNorm = function (amount) {
    if (!arguments.length) return formatFoodAmount();
    if (amount < 30) {
      throw new Error("Корма не может быть меньше 30 гр.");
    }
    if (amount > 100) {
      throw new Error("Корма не может быть больше 100 гр.");
    }

    foodAmount = amount;
  };

  function formatFoodAmount() {
    return foodAmount + " " + "гр.";
  }
}

function Cat(name) {
  Animal.apply(this, arguments);
  var parentFeed = this.feed;
  this.feed = function () {
    parentFeed();
    console.log("Кот доволен ^_^");
    return this;
  };
  this.stroke = function () {
    console.log("Гладим кота");
    return this;
  };
}

var barsik = new Animal("Барсик");

var tim = new Cat("Tim");

console.log(tim.name);
tim.dailyNorm(43);
tim.feed().stroke();
console.log(tim.dailyNorm());