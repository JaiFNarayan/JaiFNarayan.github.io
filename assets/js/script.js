'use strict';

// Based on vCard by codewithsadee (MIT), extended for project details, mailto contact form and #hash navigation.


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// sidebar toggle (mobile)
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// project filter: custom select (mobile) + buttons (desktop)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all" || selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}


// project detail modal
const projectModal = document.querySelector("[data-project-modal]");
document.body.appendChild(projectModal); // keep the fixed modal outside animated containers
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectClose = document.querySelector("[data-project-close]");
const pmImg = document.querySelector("[data-pm-img]");
const pmTitle = document.querySelector("[data-pm-title]");
const pmBody = document.querySelector("[data-pm-body]");
let lastFocused = null;

const openProject = function (item) {
  const img = item.querySelector(".project-img img");
  const tpl = item.querySelector("[data-project-details]");
  pmImg.src = img.getAttribute("src");
  pmImg.alt = img.alt;
  pmTitle.textContent = item.querySelector(".project-title").textContent;
  pmBody.innerHTML = "";
  pmBody.appendChild(tpl.content.cloneNode(true));
  projectModal.classList.add("active");
  projectOverlay.classList.add("active");
  document.body.classList.add("modal-open");
  lastFocused = document.activeElement;
  projectClose.focus();
}

const closeProject = function () {
  projectModal.classList.remove("active");
  projectOverlay.classList.remove("active");
  document.body.classList.remove("modal-open");
  pmBody.innerHTML = ""; // stops any embedded video
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll("[data-project-link]").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    openProject(this.closest("[data-filter-item]"));
  });
});

projectClose.addEventListener("click", closeProject);
projectOverlay.addEventListener("click", closeProject);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && projectModal.classList.contains("active")) closeProject();
});


// contact form: opens the visitor's email app with the message filled in
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = form.fullname.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
  window.location.href = "mailto:jaifnarayan@gmail.com?subject=" + subject + "&body=" + body;
});


// page navigation (+ #about / #resume / #projects / #contact deep links)
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const showPage = function (name, updateHash) {
  let found = false;
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === name) found = true;
  }
  if (!found) return;
  for (let i = 0; i < pages.length; i++) {
    const match = pages[i].dataset.page === name;
    pages[i].classList.toggle("active", match);
    navigationLinks[i].classList.toggle("active", match);
  }
  window.scrollTo(0, 0);
  if (updateHash) history.replaceState(null, "", "#" + name);
}

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    showPage(this.innerText.toLowerCase(), true);
  });
}

if (location.hash) showPage(location.hash.slice(1).toLowerCase(), false);
window.addEventListener("hashchange", function () { showPage(location.hash.slice(1).toLowerCase(), false); });
