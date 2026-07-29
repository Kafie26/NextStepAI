const form = document.getElementById("planForm");
const results = document.getElementById("results");
const planList = document.getElementById("planList");
const error = document.getElementById("formError");

const advice = {
  documents: ["Secure your identification documents", "List what you have, then contact a local vital-records office or case manager for help replacing a birth certificate, Social Security card, or state ID."],
  housing: ["Address your housing needs first", "Contact a local reentry or coordinated-entry program. Ask about eligibility, documents, openings, and application timelines."],
  resume: ["Create a simple, honest résumé", "List your work history, training, transferable skills, and volunteer experience. Ask a workforce center or mentor to review it."],
  transportation: ["Build a transportation backup plan", "Write down routes, travel times, and costs for important appointments. Identify one backup option before scheduling interviews."],
  employment: ["Begin a focused job search", "Choose three job types that match your skills. Apply to two realistic openings and record each follow-up date."],
  training: ["Compare training opportunities", "Research two short-term programs. Compare cost, schedule, requirements, and job-placement support."],
  housingGoal: ["Make a housing search checklist", "Gather your documents, monthly budget, preferred locations, and references before contacting housing programs."],
  routine: ["Create a repeatable weekday routine", "Set a consistent wake-up time and schedule one morning task, one career task, and one wellness activity each weekday."],
  wellness: ["Add wellness support", "Identify one trusted person or local provider, and schedule a healthy coping activity each day."],
  childcare: ["Plan for dependable childcare", "Write down the hours you need coverage and contact local assistance programs. Identify a backup option."],
  legal: ["Organize outstanding legal needs", "List unresolved court, supervision, expungement, or identification questions and contact qualified legal aid."],
  digital: ["Strengthen your computer skills", "Practice email, résumé uploads, and online applications. Ask a library or workforce center about free classes."]
};

function addRecommendation(plan, key) {
  if (advice[key] && !plan.includes(advice[key])) {
    plan.push(advice[key]);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  error.textContent = "";

  if (!form.checkValidity()) {
    error.textContent = "Please answer each required question.";
    form.reportValidity();
    return;
  }

  const name = document.getElementById("firstName").value.trim();
  const goal = document.getElementById("goal").value;
  const plan = [];

  if (document.getElementById("documents").value !== "all") addRecommendation(plan, "documents");
  if (document.getElementById("housing").value !== "stable") addRecommendation(plan, "housing");
  if (document.getElementById("transportation").value !== "yes") addRecommendation(plan, "transportation");
  if (document.getElementById("resume").value === "no") addRecommendation(plan, "resume");

  addRecommendation(plan, goal);
  document.querySelectorAll('input[name="support"]:checked').forEach(function (item) {
    addRecommendation(plan, item.value);
  });

  if (plan.length < 3) {
    addRecommendation(plan, "routine");
    addRecommendation(plan, "digital");
  }

  document.getElementById("resultTitle").textContent = name ? name + "’s 30-Day Plan" : "Your 30-Day Plan";
  document.getElementById("resultIntro").textContent = "Based on your answers, these are the most useful steps to prioritize. Start with the first item and adjust the plan as your situation changes.";
  planList.innerHTML = "";

  plan.slice(0, 7).forEach(function (item, index) {
    const box = document.createElement("article");
    box.className = "plan-item";
    const number = document.createElement("div");
    number.className = "plan-number";
    number.textContent = index + 1;
    const copy = document.createElement("div");
    const title = document.createElement("h3");
    const text = document.createElement("p");
    title.textContent = item[0];
    text.textContent = item[1];
    copy.append(title, text);
    box.append(number, copy);
    planList.append(box);
  });

  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("printButton").addEventListener("click", function () {
  window.print();
});
