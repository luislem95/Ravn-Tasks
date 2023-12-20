/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral2: "#94979A",
        neutral3: "#393D41",
        neutral4: "#2C2F33",
        primary2: "#EBA59E",
        primary4: "#DA584B",
        background: "#222528",
        text: "#34495e",
        gradient: "linear-gradient(to left, transparent, #DA584B)",
      },
    },
  },
  plugins: [],
};
