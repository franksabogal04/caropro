document.addEventListener("DOMContentLoaded", () => {
  /* Mobile menu */

  const menuButton = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    document
      .querySelectorAll(".mobile-nav a")
      .forEach((link) => {
        link.addEventListener("click", () => {
          mobileNav.classList.remove("open");
          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );
        });
      });
  }


  /* Furniture filters */

  const filters = document.querySelectorAll(".filter");
  const products =
    document.querySelectorAll(".product-card");

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const selected = button.dataset.filter;

      products.forEach((product) => {
        const shouldHide =
          selected !== "all" &&
          product.dataset.category !== selected;

        product.classList.toggle(
          "hidden",
          shouldHide
        );
      });
    });
  });


  /* Testimonials */

  const testimonials = [
    {
      quote:
        "Carolina helped me choose pieces I would never have found on my own. My living room finally feels finished, but still completely like me.",
      author: "— Sofia M., Miami",
    },
    {
      quote:
        "The process was personal, easy, and never pushy. The table Carolina found became the piece everyone talks about when they visit.",
      author: "— Daniela R., Coral Gables",
    },
    {
      quote:
        "She understood the feeling I wanted before I knew how to describe it. Every piece works beautifully together and feels built for real life.",
      author: "— Isabella P., Brickell",
    },
  ];

  let currentQuote = 0;

  const quoteText =
    document.querySelector("#quoteText");

  const quoteAuthor =
    document.querySelector("#quoteAuthor");

  const previousButton =
    document.querySelector("#quotePrev");

  const nextButton =
    document.querySelector("#quoteNext");

  function showQuote(index) {
    currentQuote =
      (index + testimonials.length) %
      testimonials.length;

    if (quoteText) {
      quoteText.textContent =
        testimonials[currentQuote].quote;
    }

    if (quoteAuthor) {
      quoteAuthor.textContent =
        testimonials[currentQuote].author;
    }
  }

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showQuote(currentQuote - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showQuote(currentQuote + 1);
    });
  }


  /* Reveal animations */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  /* Back-to-top button */

  const backTop =
    document.querySelector(".back-top");

  if (backTop) {
    window.addEventListener(
      "scroll",
      () => {
        backTop.classList.toggle(
          "show",
          window.scrollY > 700
        );
      },
      {
        passive: true,
      }
    );
  }


  /* Current footer year */

  const year = document.querySelector("#year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }
});