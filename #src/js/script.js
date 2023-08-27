document.addEventListener("DOMContentLoaded", function () {
  
  const navigationItems = document.querySelectorAll(".catalogView > a");
  const contentBlocks = document.querySelectorAll(".catalogList");

  navigationItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      navigationItems.forEach((navItem) => {
        navItem.classList.remove("active");
      });
      this.classList.add("active");
      const targetBlockId = this.getAttribute("data-target");
      contentBlocks.forEach((block) => {
        block.style.display = "none";
      });

      document.getElementById(targetBlockId).style.display = "block";
      
    });
  });
});

// 2. tabs


const tabs = document.querySelector(".tabs");
const tabButton = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tabContent-item");


if (tabs) {
  tabs.onclick = e => {
    const id = e.target.dataset.id;
    if (id) {
      tabButton.forEach(btn => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");

      contents.forEach(content => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  }
}

// 3. back to top

const backToTopButton = document.getElementById("backToTop");

function scrollToTop(e) {
  e.preventDefault();
  window.scroll({
    top: 0,
    behavior: "smooth"
  });
}

backToTopButton.addEventListener("click", scrollToTop);

// 4. localStogare

document.addEventListener("DOMContentLoaded", function() {
  const typeOne = document.querySelector('.catalogView-typeOne');
  const typeTwo = document.querySelector('.catalogView-typeTwo');

  typeOne.addEventListener('click', function() {
      const productId = typeOne.getAttribute('data-target');
      localStorage.setItem(`catalogView`, productId);
  });

  typeTwo.addEventListener('click', function() {
    const productId = typeTwo.getAttribute('data-target');
    localStorage.setItem(`catalogView`, productId);
  });

  const catalogTypeOne = document.getElementById('catalogTypeOne');
  const catalogTypeTwo = document.getElementById('catalogTypeTwo');
  const selectedProductType = localStorage.getItem('catalogView');

  const catalogTypeOneLink = document.querySelector('[data-target="catalogTypeOne"]');
  const catalogTypeTwoLink = document.querySelector('[data-target="catalogTypeTwo"]');

  if (selectedProductType == 'catalogTypeTwo') {
    catalogTypeOne.style.display = 'none';
    catalogTypeTwo.style.display = 'block';
    catalogTypeOneLink.classList.remove('active');
    catalogTypeTwoLink.classList.add('active');
  } else if (selectedProductType == 'catalogTypeOne') {
    catalogTypeOneLink.classList.add('active');
    catalogTypeTwoLink.classList.remove('active');
    catalogTypeOne.style.display = 'block';
    catalogTypeTwo.style.display = 'none';
  }

});