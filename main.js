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
  //////// modify list////////////////
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

function handleAddItem() {
  const input = document.querySelector(".items__add-label");
  const btn = document.querySelector(".items__add-btn");

  const addItem = input => {
    if (input.value !== "") {
      products.push({ name: input.value, quantity: 1 });
      showProducts();
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

const hideOptions = () => {
  document.querySelectorAll(".option-btn--active").forEach(btn => {
    btn.classList.remove("option-btn--active");
  });
};

function handleShowOptions() {
  const itemsOptions = document.querySelectorAll(".item__option");

  const showOptions = btn => {
    const btnActive = btn.classList.contains("option-btn--active");
    hideOptions();
    if (!btnActive) {
      btn.classList.add("option-btn--active");
    }
  };

  itemsOptions.forEach(item => {
    const btn = item.querySelector(".option-btn");
    btn.removeEventListener("click", e => showOptions(btn));
    btn.addEventListener("click", e => showOptions(btn));
  });
}

function handleOutsideOptionsClick() {
  window.addEventListener("click", e => {
    if (e.target.closest(".item__option") === null) {
      hideOptions();
    }
  });
}

const svgs = {
  plus: `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15V8M8 8V1M8 8H15M8 8H1" stroke="#333333" stroke-width="2" 
      stroke-linecap="round"/>
  </svg>`,
  minus: `
  <svg width="16" height="2" viewBox="0 0 16 2"fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 1H1" stroke="#333333" stroke-width="2" stroke-linecap="round" />
  </svg>`,
  delete: `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12H14V24H12V12Z" fill="#F2290D" />
    <path d="M18 12H20V24H18V12Z" fill="#F2290D" />
    <path d="M4 6V8H6V28C6 28.5304 6.21071 29.0391 6.58579 29.4142C6.96086 
      29.7893 7.46957 30 8 30H24C24.5304 30 25.0391 29.7893 25.4142 29.4142C25.7893 
      29.0391 26 28.5304 26 28V8H28V6H4ZM8 28V8H24V28H8Z" fill="#F2290D" />
    <path d="M12 2H20V4H12V2Z" fill="#F2290D" />
  </svg>`,
  option: `
  <svg width="29" height="23" viewBox="0 0 29 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0309 13.5625C11.0369 13.5625 12.0135 13.9019 12.8027 14.5257C13.5919 15.1495 14.1477 16.0212 14.3801 17H27.2184C27.4797 17.0001 27.7312 17.0993 27.9221 17.2777C28.1131 17.4561 28.2292 17.7003 28.247 17.961C28.2648 18.2216 28.183 18.4794 28.0181 18.682C27.8532 18.8847 27.6175 19.0173 27.3587 19.0529L27.2184 19.0625H14.3801C14.1476 20.0412 13.5918 20.9129 12.8026 21.5366C12.0134 22.1603 11.0369 22.4996 10.0309 22.4996C9.02501 22.4996 8.04848 22.1603 7.25927 21.5366C6.47005 20.9129 5.91427 20.0412 5.68181 19.0625H1.78094C1.51965 19.0624 1.26814 18.9632 1.07722 18.7848C0.886302 18.6064 0.770209 18.3622 0.7524 18.1015C0.734591 17.8409  0.816394 17.5831 0.98128 17.3805C1.14617 17.1778 1.38184 17.0452 1.64069 17.0096L1.78094 17H5.68181C5.9142 16.0212  6.46994 15.1495 7.25916 14.5257C8.04839 13.9019 9.02495 13.5625 10.0309 13.5625ZM18.9684 0.5C19.9744 0.500021 20.951 0.839368 21.7402 1.46316C22.5294 2.08696 23.0852 2.95873 23.3176 3.9375H27.2184C27.4797 3.93758 27.7312  4.03684 27.9221 4.21521C28.1131 4.39359 28.2292 4.63779 28.247 4.89846C28.2648 5.15913 28.183 5.41685 28.0181  5.61954C27.8532 5.82222 27.6175 5.95476 27.3587 5.99037L27.2184 6H23.3176C23.0851 6.9787 22.5293 7.85038 21.7401 8.4741C20.9509 9.09781 19.9744 9.4371 18.9684 9.4371C17.9625 9.4371 16.986 9.09781 16.1968 8.4741C15.4075 7.85038 14.8518 6.9787 14.6193 6H1.78094C1.51965 5.99992 1.26814 5.90066 1.07722 5.72229C0.886302 5.54391 0.770209 5.29971  0.7524 5.03904C0.734591 4.77836 0.816394 4.52065 0.98128 4.31796C1.14617 4.11528 1.38184 3.98274 1.64069 3.94712L1.78094  3.9375H14.6193C14.8517 2.95873 15.4074 2.08696 16.1967 1.46316C16.9859 0.839368 17.9625 0.500021 18.9684 0.5Z"
      fill="#3BDCB5" />
  </svg>`,
  optionGear: `
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" >
    <path d="M15 18.75C17.0711 18.75 18.75 17.0711 18.75 15C18.75 12.9289 17.0711 11.25 15 11.25C12.9289 11.25 11.25 12.9289 11.25 15C11.25 17.0711 12.9289 18.75 15 18.75Z"
      stroke="#FBFBFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M24.25 18.75C24.0836 19.127 24.034 19.5452 24.1075 19.9507C24.181 20.3562 24.3743 20.7304 24.6625 21.025L24.7375 21.1C24.9699 21.3322 25.1543 21.6079 25.2801 21.9114C25.406 22.2149 25.4707 22.5402 25.4707 22.8688C25.4707 23.1973 25.406 23.5226 25.2801 23.8261C25.1543 24.1296 24.9699 24.4053 24.7375 24.6375C24.5053 24.8699 24.2296 25.0543 23.9261 25.1801C23.6226 25.306 23.2973 25.3707 22.9688 25.3707C22.6402 25.3707 22.3149 25.306 22.0114 25.1801C21.7079 25.0543 21.4322 24.8699 21.2 24.6375L21.125 24.5625C20.8304 24.2743 20.4562 24.081 20.0507 24.0075C19.6452 23.934 19.227 23.9836 18.85 24.15C18.4803 24.3085 18.165 24.5716 17.9429 24.9069C17.7208 25.2423 17.6016 25.6353 17.6 26.0375V26.25C17.6 26.913 17.3366 27.5489 16.8678 28.0178C16.3989 28.4866 15.763 28.75 15.1 28.75C14.437 28.75 13.8011 28.4866 13.3322 28.0178C12.8634 27.5489 12.6 26.913 12.6 26.25V26.1375C12.5903 25.7238 12.4564 25.3225 12.2156 24.9859C11.9749 24.6493 11.6384 24.3929 11.25 24.25C10.873 24.0836 10.4548 24.034 10.0493 24.1075C9.64377 24.181 9.2696 24.3743 8.975 24.6625L8.9 24.7375C8.66782 24.9699 8.3921 25.1543 8.0886 25.2801C7.78511 25.406 7.45979 25.4707 7.13125 25.4707C6.80271 25.4707 6.47739 25.406 6.1739 25.2801C5.8704 25.1543 5.59468 24.9699 5.3625 24.7375C5.13006 24.5053 4.94566 24.2296 4.81985 23.9261C4.69404 23.6226 4.62928 23.2973 4.62928 22.9688C4.62928 22.6402 4.69404 22.3149 4.81985 22.0114C4.94566 21.7079 5.13006 21.4322 5.3625 21.2L5.4375 21.125C5.72567 20.8304 5.91898 20.4562 5.99251 20.0507C6.06603 19.6452 6.01639 19.227 5.85 18.85C5.69155 18.4803 5.42844 18.165 5.09308 17.9429C4.75772 17.7208 4.36473 17.6016 3.9625 17.6H3.75C3.08696 17.6 2.45107 17.3366 1.98223 16.8678C1.51339 16.3989 1.25 15.763 1.25 15.1C1.25 14.437 1.51339 13.8011 1.98223 13.3322C2.45107 12.8634 3.08696 12.6 3.75 12.6H3.8625C4.27624 12.5903 4.67751 12.4564 5.01412 12.2156C5.35074 11.9749 5.60714 11.6384 5.75 11.25C5.91639 10.873 5.96603 10.4548 5.89251 10.0493C5.81898 9.64377 5.62567 9.2696 5.3375 8.975L5.2625 8.9C5.03006 8.66782 4.84566 8.3921 4.71985 8.0886C4.59404 7.78511 4.52928 7.45979 4.52928 7.13125C4.52928 6.80271 4.59404 6.47739 4.71985 6.1739C4.84566 5.8704 5.03006 5.59468 5.2625 5.3625C5.49468 5.13006 5.7704 4.94566 6.0739 4.81985C6.37739 4.69404 6.70271 4.62928 7.03125 4.62928C7.35979 4.62928 7.68511 4.69404 7.9886 4.81985C8.2921 4.94566 8.56782 5.13006 8.8 5.3625L8.875 5.4375C9.1696 5.72567 9.54377 5.91898 9.94926 5.99251C10.3548 6.06603 10.773 6.01639 11.15 5.85H11.25C11.6197 5.69155 11.935 5.42844 12.1571 5.09308C12.3792 4.75772 12.4984 4.36473 12.5 3.9625V3.75C12.5 3.08696 12.7634 2.45107 13.2322 1.98223C13.7011 1.51339 14.337 1.25 15 1.25C15.663 1.25 16.2989 1.51339 16.7678 1.98223C17.2366 2.45107 17.5 3.08696 17.5 3.75V3.8625C17.5016 4.26473 17.6208 4.65772 17.8429 4.99308C18.065 5.32844 18.3803 5.59155 18.75 5.75C19.127 5.91639 19.5452 5.96603 19.9507 5.89251C20.3562 5.81898 20.7304 5.62567 21.025 5.3375L21.1 5.2625C21.3322 5.03006 21.6079 4.84566 21.9114 4.71985C22.2149 4.59404 22.5402 4.52928 22.8688 4.52928C23.1973 4.52928 23.5226 4.59404 23.8261 4.71985C24.1296 4.84566 24.4053 5.03006 24.6375 5.2625C24.8699 5.49468 25.0543 5.7704 25.1801 6.0739C25.306 6.37739 25.3707 6.70271 25.3707 7.03125C25.3707 7.35979 25.306 7.68511 25.1801 7.9886C25.0543 8.2921 24.8699 8.56782 24.6375 8.8L24.5625 8.875C24.2743 9.1696 24.081 9.54377 24.0075 9.94926C23.934 10.3548 23.9836 10.773 24.15 11.15V11.25C24.3085 11.6197 24.5716 11.935 24.9069 12.1571C25.2423 12.3792 25.6353 12.4984 26.0375 12.5H26.25C26.913 12.5 27.5489 12.7634 28.0178 13.2322C28.4866 13.7011 28.75 14.337 28.75 15C28.75 15.663 28.4866 16.2989 28.0178 16.7678C27.5489 17.2366 26.913 17.5 26.25 17.5H26.1375C25.7353 17.5016 25.3423 17.6208 25.0069 17.8429C24.6716 18.065 24.4085 18.3803 24.25 18.75V18.75Z"
      stroke="#FBFBFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`,
};

const products = [
  { name: "Milk", quantity: 1 },
  { name: "Bread", quantity: 2 },
  { name: "Apple", quantity: 5 },
  { name: "Avocado", quantity: 3 },
  { name: "Greek Yogurt", quantity: 21 },
];
const tasks = [
  {
    listName: "Home",
    tasks: [
      { name: "Ironing", id: "1" },
      { name: "Wash dishes", id: "2" },
      { name: "Fix the radio", id: "3" },
      { name: "Call cousine", id: "4" },
      { name: "Singing in the shower", id: "5" },
    ],
  },
  {
    listName: "Work",
    tasks: [{ name: "Finish todo app", id: "99" }],
  },
];
const countdowns = [
  { name: "Birthday day!", date: "12-02-2022" },
  { name: "Trip to LA!", date: "21-05-2023" },
];

function showProducts() {
  const itemList = document.querySelector(".products");
  if (itemList === null) {
    return;
  }
  itemList.textContent = "";
  products.forEach(({ name, quantity }) => {
    const li = document.createElement("li");

    li.classList = "items__item item";
    li.innerHTML = `
      <div class="item__desc">
      <label class="item__label">
      <input type="checkbox" class="item__status" />
      <span class="item__name"> ${name}</span>
      </label>
      <div class="item__quantity quantity">
      <button class="quantity__minus">${svgs.minus}</button>
      <input class="quantity__number" type="number" name="item-quantity"
      value="${quantity}" />
      <button class="quantity__plus">${svgs.plus}</button>
      <button class="quantity__del-btn">${svgs.delete}</button>
      </div>
      </div>`;
    itemList.appendChild(li);
  });
  handleQuantityChange();
  handleCheckboxChange();
}
function showTasks() {
  const taskList = document.querySelector(".tasks-lists");
  if (taskList === null) {
    return;
  }
  taskList.innerHTML = "";
  const tasksOptions = `
  <ul class="options">
    <li class="option">
      <button class="option__rename">Rename task...</button>
    </li>
    <li class="option">
      <button class="option__change-date">
        Change date of complete...
      </button>
    </li>
    <li class="option">
      <button class="option__move">Move task...</button>
    </li>
    <li class="option">
      <button class="option__delete">Delete task...</button>
    </li>
  </ul>`;
  const listOptions = `
  <ul class="options">
    <li class="option">
      <button class="option__rename">Rename list...</button>
    </li>
    <li class="option">
      <button class="option__delete">Delete list...</button>
    </li>
  </ul>`;

  tasks.forEach(({ listName, tasks: tasksItems }) => {
    const section = document.createElement("section");
    section.classList = "tasks-list";
    // gdzieś id tu
    section.innerHTML = `
      <div class="tasks-list__desc">
        <h2 class="tasks-list__name">${listName}</h2>
        <div class="item__option">
          <button class="tasks-list__option option-btn">${svgs.optionGear}</button>
          ${listOptions}
        </div>
      </div>
      <div class="items__add">
        <input class="items__add-label" type="text" name="add-item" placeholder="Add task..."/>
      </div>
      `;
    const ul = document.createElement("ul");

    ul.classList = "items__list";
    tasksItems.forEach(({ name }) => {
      const li = document.createElement("li");
      li.classList = "items__item item";
      li.innerHTML = `
        <div class="item__desc">
          <label class="item__label">
            <input type="checkbox" class="item__status" />
            <span class="item__name"> ${name} </span>
          </label>
          <div class="item__option">
            <button class="item__option-btn option-btn">${svgs.option}</button>
            ${tasksOptions}
          </div>
        </div>`;
      ul.appendChild(li);
    }); //end tasks item ForEach
    section.appendChild(ul);
    taskList.appendChild(section);
  }); //end tasks ForEach
  handleOutsideOptionsClick();
  handleShowOptions();
  handleCheckboxChange();
}

function showCountdowns() {
  const countdownList = document.querySelector(".countdowns");
  if (countdownList === null) {
    return;
  }
  countdownList.innerHTML = "";
  const options = `
  <ul class="options">
    <li class="option">
      <button class="option__rename">Rename event...</button>
    </li>
    <li class="option">
      <button class="option__change-date">Change date...</button>
    </li>
    <li class="option">
      <button class="option__change-time">Change time...</button>
    </li>
    <li class="option">
      <button class="option__delete">Delete event...</button>
    </li>
  </ul>`;
  countdowns.forEach(({ name, date }) => {
    const section = document.createElement("section");
    const [days, hours, minutes] = [2, 0, 0]; //przeliczyć date
    section.classList = "countdown";
    section.innerHTML = `
    <div class="countdown__desc">
      <h2 class="countdown__name">${name}</h2>
      <div class="item__option countdown__option">
        <button class="option-btn">${svgs.optionGear}</button>
        ${options}
      </div>
    </div>
    <p class="countdown__text">time left:</p>
    <div class="countdown__time">
      <span class="countdown__day">${days}D</span
      ><span class="countdown__hours">${hours}H</span
      ><span class="countdown__minutes">${minutes}M</span>
    </div>`;
    countdownList.appendChild(section);
  }); //end countdowns foreach
  handleOutsideOptionsClick();
  handleShowOptions();
}

function init() {
  handleHamburgerMenu();
  handleAddItem();
  showProducts();
  showTasks();
  showCountdowns();
}

init();
