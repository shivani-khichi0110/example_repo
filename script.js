// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Dark mode toggle (remembers choice)
const toggle = document.getElementById("theme-toggle");
try {
  if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
} catch (e) {}
toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";

toggle.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  toggle.textContent = dark ? "☀️" : "🌙";
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
});

// Typing effect
const words = ["Problem Solver", "Fast Learner", "Team Player"];
const typed = document.getElementById("typed");
let w = 0, c = 0, deleting = false;

function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1200); }
  else { deleting = false; w = (w + 1) % words.length; }
  setTimeout(type, deleting ? 50 : 110);
}
type();

// Reveal sections + animate skill bars on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    entry.target.querySelectorAll(".skill").forEach((s) => {
      s.querySelector(".fill").style.width = s.dataset.level + "%";
    });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll("section").forEach((s) => observer.observe(s));
