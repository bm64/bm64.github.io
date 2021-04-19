function handleCheckboxChange() {
  const checkboxes = document.querySelectorAll(".item__status");

  const toggleCheckedClass = e => {
    const label = e.target.parentNode;
    //not toggle to prevent changing it from DOM
    if (e.target.checked) {
      label.classList.add("item__label--checked");
    } else {
      label.classList.remove("item__label--checked");
    }
  };

  checkboxes.forEach(checkbox => {
    checkbox.removeEventListener("change", toggleCheckedClass);
    checkbox.addEventListener("change", toggleCheckedClass);
  });
}

handleCheckboxChange();

function handleHamburgerMenu() {
  const hamburger = document.querySelector(".menu__hamburger");
  const items = document.querySelector(".items");
  const menu = document.querySelector(".menu__items");

  hamburger.addEventListener("click", e => {
    menu.classList.toggle("menu__items--active");
  });
  items.addEventListener("click", e => {
    menu.classList.remove("menu__items--active");
  });
}

handleHamburgerMenu();

function handleQuantityChange() {
  const quantities = document.querySelectorAll(".quantity");

  const changeValue = (number, value) => {
    const lastValue = parseInt(number.value);
    number.value = lastValue + value;
    if (number.value <= 1) {
      number.value = 1;
    }
  };

  ////////////////////////////////////
  //////// TO DO /////////////////////
  ////////////////////////////////////
  const deleteItem = item => {
    console.log(`delete item ${item}`);
    item.remove();
  };

  quantities.forEach(quantity => {
    const minus = quantity.querySelector(".quantity__minus");
    const plus = quantity.querySelector(".quantity__plus");
    const number = quantity.querySelector(".quantity__number");
    const del = quantity.querySelector(".quantity__del-btn");
    minus.addEventListener("click", e => changeValue(number, -1));
    plus.addEventListener("click", e => changeValue(number, 1));
    del.addEventListener("click", e => {
      const item = quantity.parentNode.parentNode;
      deleteItem(item);
    });
  });
}

handleQuantityChange();

function handleAddItem() {
  const input = document.querySelector(".items__add-label");
  const btn = document.querySelector(".items__add-btn");

  ////////////////////////////////////
  //////// TO DO /////////////////////
  ////////////////////////////////////
  const addItem = input => {
    if (input.value !== "") {
      console.log(`add ${input.value} to product list`);
    }
    input.value = "";
  };

  input.addEventListener("keyup", e => {
    if (e.key === "Enter") {
      addItem(input);
    }
  });

  btn.addEventListener("click", e => addItem(input));
}

handleAddItem();

const hideOptions = () => {
  document.querySelectorAll(".option-btn--active").forEach(btn => {
    btn.classList.remove("option-btn--active");
  });
};

function handleShowOptions() {
  const itemsOptions = document.querySelectorAll(".item__option");

  const showOptions = btn => {
    hideOptions();
    btn.classList.add("option-btn--active");
  };

  itemsOptions.forEach(item => {
    const btn = item.querySelector(".option-btn");
    btn.removeEventListener("click", e => showOptions(btn));
    btn.addEventListener("click", e => showOptions(btn));
  });
}
handleShowOptions();

function handleOutsideOptionsClick() {
  window.addEventListener("click", e => {
    if (e.target.closest(".item__option") === null) {
      hideOptions();
    }
  });
}
handleOutsideOptionsClick();
