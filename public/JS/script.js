"use strict";
var menuIcon = document.getElementById("menu-icon");
var nav = document.getElementById("nav");
var closeBtn = document.getElementById("close-btn");



menuIcon.addEventListener("click", function(){
    nav.classList.add("open");
});
closeBtn.addEventListener("click", function(){
    nav.classList.remove("open");
});

