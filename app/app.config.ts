export default defineAppConfig({
  ui: {
    primary: "green",
    gray: "slate",
    strategy: "merge",
    button: {
      color: {
        primary: {
          solid:
            "shadow-sm text-white dark:text-white bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",
        },
      },
    },
    input: {
      color: {
        white: {
          outline: "bg-red-200",
        },
      },
    },
    background: {
      light: { bgColor: "white", icon: "i-heroicons-sun-20-solid" },
      dark: { bgColor: "gray-950", icon: "i-heroicons-moon-20-solid" },
      cyan: { bgColor: "cyan-500", icon: "i-heroicons-book-open-20-solid" },
      red: { bgColor: "red-500", icon: "i-heroicons-fire-20-solid" },
    },
  },
});
