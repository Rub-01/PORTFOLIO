/* Project content and interactions — edit evidence URLs in this file when artifacts are ready. */
const projects = {
  phishing: {
    number: "CASE FILE / 001",
    category: "INVESTIGATION",
    title: "Phishing Email Investigation and IOC Analysis",
    summary: "A simulated email investigation built around a familiar SOC workflow: inspect the message, extract indicators, check context, and document a reasoned verdict.",
    why: "I wanted to understand how a SOC analyst would respond when an employee reports a suspicious email—and how to reach a conclusion based on evidence rather than appearance alone.",
    tools: ["Email header analysis", "VirusTotal", "CyberChef", "URL/domain analysis", "Threat intelligence"],
    actions: ["Analysed the email headers and sender details.", "Reviewed the sending infrastructure for suspicious signals.", "Extracted URLs and other indicators of compromise (IOCs).", "Examined suspicious links and checked indicators against threat-intelligence sources.", "Documented observations, supporting evidence, and a final verdict."],
    skills: ["Suspicious email triage", "IOC extraction", "Threat-intelligence lookups", "Evidence handling and reporting"],
    outcome: "Created a structured phishing investigation report containing the evidence, analysis, and final verdict. Add the report itself before presenting this as a completed, publicly reviewable case study.",
    relevance: "Email remains a common route for phishing and credential theft. A repeatable process for analysing message metadata, links, and indicators supports triage, escalation, and incident documentation.",
    evidence: [
      { title: "Investigation report", detail: "PLACEHOLDER — add report URL", url: "" },
      { title: "Analysis screenshots", detail: "PLACEHOLDER — add screenshot album URL", url: "" },
      { title: "Sample email headers", detail: "PLACEHOLDER — add sanitised sample URL", url: "" },
      { title: "IOC list", detail: "PLACEHOLDER — add sanitised IOC artifact URL", url: "" }
    ],
    note: "Only publish sanitised samples. Remove personal data, live malicious links, credentials, and any sensitive information before sharing."
  },
  soc: {
    number: "LAB / 002",
    category: "THREAT DETECTION",
    title: "Building a Mini SOC Lab for Threat Detection",
    summary: "A small Windows-based lab to generate security events, collect telemetry, search it in Splunk, and explore a basic detection for suspicious PowerShell activity.",
    why: "I wanted to see how security events move from an endpoint into a SIEM, and how an analyst can use that telemetry to investigate suspicious activity.",
    tools: ["Windows virtual machine", "Splunk Enterprise", "Windows Event Logs", "Sysmon", "PowerShell"],
    actions: ["Set up a Windows virtual machine for controlled testing.", "Installed and configured Sysmon to capture additional endpoint telemetry.", "Generated test security events and collected the resulting logs.", "Searched and reviewed event data in Splunk.", "Investigated suspicious PowerShell activity and created a basic detection query.", "Documented the lab and investigation workflow."],
    skills: ["Windows security logging", "Log search and analysis", "SIEM fundamentals", "Detection logic", "Basic threat investigation"],
    outcome: "Built a home SOC environment and developed a basic detection for suspicious PowerShell activity. The public evidence should show the lab architecture, relevant logs, and the query with sample results.",
    relevance: "Endpoint telemetry and SIEM searches are common building blocks of SOC monitoring. This lab demonstrates the learning process behind log collection, investigation, and detection development.",
    evidence: [
      { title: "GitHub repository", detail: "PLACEHOLDER — add repository URL", url: "" },
      { title: "Splunk detection query", detail: "PLACEHOLDER — add query or documentation URL", url: "" },
      { title: "Lab screenshots", detail: "PLACEHOLDER — add screenshot album URL", url: "" },
      { title: "Sample logs & investigation notes", detail: "PLACEHOLDER — add sanitised artifact URL", url: "" },
      { title: "Architecture diagram", detail: "PLACEHOLDER — add diagram URL", url: "" }
    ],
    note: "Use synthetic or sanitised logs in public examples. Never expose personal device details, tokens, usernames, or other sensitive telemetry."
  },
  ioc: {
    number: "TOOL / 003",
    category: "SECURITY AUTOMATION",
    title: "Python IOC Enrichment Tool",
    summary: "A proof of concept that accepts an indicator such as an IP address or domain, calls a threat-intelligence API, and presents useful context for initial analyst triage.",
    why: "Looking up indicators manually can be repetitive. I wanted to explore how a small Python utility could make the first enrichment step more consistent and easier to document.",
    tools: ["Python", "REST APIs", "JSON", "VirusTotal API", "GitHub"],
    actions: ["Created a Python script that accepts an IOC as input.", "Connected the script to a threat-intelligence API.", "Parsed the API response and extracted relevant fields.", "Organised the returned information into an analyst-friendly result.", "Worked on documenting usage and the tool's behaviour."],
    skills: ["Python scripting", "API requests and responses", "JSON parsing", "Threat-intelligence enrichment", "Security-tool documentation"],
    outcome: "Created a proof-of-concept IOC enrichment tool intended to speed up initial indicator review. Add a reproducible example and repository before claiming the tool is ready for others to use.",
    relevance: "IOC enrichment can help analysts quickly gather context before deciding whether an indicator needs deeper investigation. API errors, rate limits, and false positives still require careful handling.",
    evidence: [
      { title: "GitHub repository", detail: "PLACEHOLDER — add repository URL", url: "" },
      { title: "Source code", detail: "PLACEHOLDER — add source file URL", url: "" },
      { title: "Terminal screenshots", detail: "PLACEHOLDER — add screenshot URL", url: "" },
      { title: "Example API response", detail: "PLACEHOLDER — add sanitised response URL", url: "" },
      { title: "Short demo", detail: "PLACEHOLDER — add demo URL", url: "" }
    ],
    note: "Never commit API keys. Use environment variables for secrets and sanitise API responses before publishing. Example indicators should be safe test values."
  }
};

const dialog = document.getElementById("projectDialog");
const dialogContent = document.getElementById("dialogContent");
const dialogEyebrow = document.getElementById("dialogEyebrow");
const dialogClose = document.getElementById("dialogClose");
const dialogBackdrop = document.getElementById("dialogBackdrop");
let lastFocusedElement = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function renderProject(project) {
  dialogEyebrow.textContent = `${project.number} · ${project.category}`;
  const tools = project.tools.map(tool => `<span>${escapeHTML(tool)}</span>`).join("");
  const actions = project.actions.map(item => `<li>${escapeHTML(item)}</li>`).join("");
  const skills = project.skills.map(item => `<li>${escapeHTML(item)}</li>`).join("");
  const evidence = project.evidence.map(item => {
    const title = escapeHTML(item.title);
    const detail = escapeHTML(item.detail);
    if (item.url && /^https?:\/\//i.test(item.url)) {
      return `<a class="evidence-link" href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer"><span><strong>${title}</strong><small>${detail}</small></span><span aria-hidden="true">↗</span></a>`;
    }
    return `<div class="evidence-link" aria-label="${title}: link not added"><span><strong>${title}</strong><small>${detail}</small></span><span class="placeholder-pill">ADD URL</span></div>`;
  }).join("");

  dialogContent.innerHTML = `
    <p class="eyebrow">${escapeHTML(project.category)} / PROJECT NOTES</p>
    <h2 id="dialogTitle">${escapeHTML(project.title)}</h2>
    <p class="dialog-lede">${escapeHTML(project.summary)}</p>
    <div class="dialog-stats">${tools}</div>
    <div class="detail-grid">
      <section class="detail-block"><h3><span>01</span> Why I built it</h3><p>${escapeHTML(project.why)}</p></section>
      <section class="detail-block"><h3><span>02</span> What I did</h3><ul>${actions}</ul></section>
      <section class="detail-block"><h3><span>03</span> Skills developed</h3><ul>${skills}</ul></section>
      <section class="detail-block"><h3><span>04</span> Outcome</h3><p>${escapeHTML(project.outcome)}</p></section>
      <section class="detail-block" style="grid-column:1/-1"><h3><span>05</span> Real-world relevance</h3><p>${escapeHTML(project.relevance)}</p></section>
    </div>
    <h3 class="evidence-heading">EVIDENCE &amp; ARTIFACTS</h3>
    <div class="evidence-buttons">${evidence}</div>
    <p class="dialog-note">${escapeHTML(project.note)}</p>
  `;
}

function openProject(key, trigger) {
  const project = projects[key];
  if (!project) return;
  lastFocusedElement = trigger;
  renderProject(project);
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    document.body.classList.add("dialog-open");
    dialogClose.focus();
  } else {
    // Fallback for older browsers without the native dialog element.
    window.alert(`${project.title}\n\n${project.summary}\n\nOpen this site in a modern browser to view full project notes.`);
  }
}

function closeProject() {
  if (dialog.open) dialog.close();
  document.body.classList.remove("dialog-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.project, button));
});
dialogClose.addEventListener("click", closeProject);
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  if (lastFocusedElement) lastFocusedElement.focus();
});
dialog.addEventListener("click", event => {
  // Clicking the empty dialog surface closes it; clicks inside the content do not.
  if (event.target === dialog) closeProject();
});
dialogBackdrop.addEventListener("click", closeProject);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && dialog.open) closeProject();
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("open", !expanded);
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

/*
HOW TO ADD REAL EVIDENCE:
1. Find the relevant project in the `projects` object above.
2. Change an evidence item's `url: ""` to a real public URL, e.g. `url: "https://github.com/your-name/repo"`.
3. Keep the label and detail accurate. Do not publish secrets, private logs, personal data, or unsafe live indicators.
*/
