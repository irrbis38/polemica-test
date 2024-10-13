"use strict";

const initHeader = (header) => {
    const navbar = header.querySelector(".header__navbar");
    const btn_burger = header.querySelector(".header__burger");
    const user = header.querySelector(".header__user");
    const btn_user = header.querySelector(".header__user-toggle");
    const dropdown = header.querySelector(".header__user-dropdown");
    const user_links = header.querySelectorAll(".header__user-link");

    btn_burger &&
        btn_burger.addEventListener("click", () => {
            header.classList.toggle("active");
            btn_burger.classList.toggle("active");
            document.body.classList.toggle("lock");
        });

    user &&
        btn_user &&
        btn_user.addEventListener("click", () => {
            if (user.classList.contains("active")) {
                user.classList.remove("active");
                window.removeEventListener("click", closeDropdown);
            } else {
                user.classList.add("active");
                window.addEventListener("click", closeDropdown);
            }
        });

    user_links.length > 0 &&
        user &&
        user_links.forEach((link) => {
            link.addEventListener("click", () => {
                user.classList.remove("active");
                window.removeEventListener("click", closeDropdown);
            });
        });

    const closeDropdown = (e) => {
        if (!user.contains(e.target)) {
            user.classList.remove("active");
            window.removeEventListener("click", closeDropdown);
        }
    };

    const resetTransitionMobile = () => {
        navbar.style.transition = "unset";
        setTimeout(() => {
            dropdown.style.transition = "";
        }, 0);
    };

    const resetTransitionDesktop = () => {
        dropdown.style.transition = "unset";
        setTimeout(() => {
            navbar.style.transition = "";
        }, 0);
    };

    // reset init transition
    window.innerWidth < 991
        ? resetTransitionDesktop()
        : resetTransitionMobile();

    // reset transition on window resize
    const mq = window.matchMedia("(max-width: 991px)");

    mq.addEventListener("change", (e) => {
        if (e.matches) {
            user.classList.remove("active");
            resetTransitionDesktop();
            window.removeEventListener("click", closeDropdown);
        } else {
            header.classList.remove("active");
            btn_burger.classList.remove("active");
            document.body.classList.remove("lock");
            resetTransitionMobile();
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    // init header
    const header = document.querySelector(".header");
    header && initHeader(header);
});
