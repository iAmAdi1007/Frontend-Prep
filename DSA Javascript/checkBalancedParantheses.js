function Stack() {
  this.top = -1;
  this.items = [];

  this.pop = function () {
    //Gets element
    const element = this.items[this.top];
    //decrements top
    this.top -= 1;
    this.items.splice(-1, 1);
    //returns element
    return element;
  };

  this.push = function (data) {
    //increments top
    this.top += 1;
    //adds the item to the top of stack
    this.items[this.top] = data;
  };

  this.peek = function () {
    return this.items[this.top];
  };

  this.isEmpty = function () {
    return this.top === -1;
  };

  this.size = function () {
    return this.top + 1;
  };

  this.display = function() {
    console.log('$Top:', this.top);
    console.log(this.items);
  }
}

function checkBalancedParantheses(str) {
  const stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(" || str[i] === "{" || str[i] === "[") {
      stack.push(str[i]);
    //   console.log('*** After Push ****');
    //   stack.display();
    }

    if (str[i] === ")" || str[i] === "}" || str[i] === "]") {
      if (stack.isEmpty()) {
        return false;
      }
      let top = stack.pop();
    //   console.log("*** After Pop ***");
    //   stack.display();
      if (str[i] === ")" && top !== "(") {
        return false;
      } else if (str[i] === "}" && top !== "{") {
        return false;
      } else if (str[i] === "]" && top !== "[") {
        return false;
      }
    }
  }

  if (stack.isEmpty()) {
    return true;
  } else {
    return false;
  }
}

console.log(checkBalancedParantheses("[({})]"));
