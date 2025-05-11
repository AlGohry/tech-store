import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: JSON.parse(localStorage.getItem('darkMode')) || false
  }),
  actions: {
    toggleDark() {
      this.dark = !this.dark
    }
  }
})

// This function initializes a watcher on the dark mode state
export function initThemeWatcher(themeStore) {
  watch(
    () => themeStore.dark,
    val => {
      document.documentElement.classList.toggle('dark', val)
      localStorage.setItem('darkMode', JSON.stringify(val))
    },
    { immediate: true }
  )
}
