// Each question worth 1 point. Passing = 4/5 (80%).

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
  const overall = document.getElementById("overall");
  const resetBtn = document.getElementById("resetBtn");

  // Correct answers
  const answers = {
    q1: "quic",                    // fill in the blank
    q2: "multiplexing",            // single choice
    q3: "hpack",                   // single choice
    q4: "removed",                 // single choice
    q5: ["0rtt", "migration", "encryption"]  // multi-select (all must be chosen, no extras)
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let score = 0;

    // Q1 (text)
    const q1 = (document.getElementById("q1").value || "").trim().toLowerCase();
    score += markText("q1", q1 === answers.q1, "QUIC");

    //  Q2/Q3/Q4 (single-choice)
    score += markRadio("q2", answers.q2, "Multiplexed streams over one connection");
    score += markRadio("q3", answers.q3, "HPACK");
    score += markRadio("q4", answers.q4, "Removed/disabled by default in Chrome");

    // Q5 (multi-select)
    const chosen = [...document.querySelectorAll('input[name="q5"]:checked')].map(el => el.value).sort();
    const correct = [...answers.q5].sort();
    const allCorrect = arraysEqual(chosen, correct);
    setFeedback("fb-q5", allCorrect, "0-RTT resumption; connection migration; built-in encryption");
    if (allCorrect) score++;

    // Show result
    const pass = score >= 4;
    overall.hidden = false;
    overall.innerHTML = `
      <strong>${pass ? "Pass" : "Fail"}</strong><br>
      Score: ${score} / 5
    `;
    overall.classList.toggle("pass", pass);
    overall.classList.toggle("fail", !pass);
    overall.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    overall.hidden = true;
    // Clear all question feedback
    ["fb-q1", "fb-q2", "fb-q3", "fb-q4", "fb-q5"].forEach(id => {
      const el = document.getElementById(id);
      el.textContent = "";
      el.classList.remove("correct", "incorrect");
    });
    document.getElementById("q1").focus();
  });

  // helpers
  function setFeedback(id, isCorrect, answerText) {
    const el = document.getElementById(id);
    el.classList.remove("correct", "incorrect");
    el.classList.add(isCorrect ? "correct" : "incorrect");
    el.textContent = (isCorrect ? "Correct. " : "Incorrect. ") + "Answer: " + answerText;
  }

  function markText(key, condition, answerText) {
    setFeedback("fb-" + key, condition, answerText);
    return condition ? 1 : 0;
  }

  function markRadio(name, correctValue, answerText) {
    const sel = document.querySelector(`input[name="${name}"]:checked`);
    const ok = sel && sel.value === correctValue;
    setFeedback("fb-" + name, ok, answerText);
    return ok ? 1 : 0;
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }
});
