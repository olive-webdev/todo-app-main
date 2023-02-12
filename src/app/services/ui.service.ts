import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  isMobile() {
    return window.navigator.userAgent.includes('Mobile')
  }

  setTheme() {
    if (localStorage.getItem('theme') === "dark") {
      document.body.classList.add("dark")
      return "dark"
    }
    else if (localStorage.getItem('theme') === "light") {
      document.body.classList.add("light")
      return "light"
    }
    else {
      let theme: "dark" | "light" = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      document.body.classList.add(theme)
      return theme
    }
  }

  toggleTheme(theme: "light" | "dark") {
    document.body.classList.remove(theme)
    theme = theme === "light" ? "dark" : "light"
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
    return theme
  }
}
