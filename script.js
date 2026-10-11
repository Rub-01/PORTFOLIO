const projects = {
  phishing: {
    eyebrow: "01 / INVESTIGATION · IOC ANALYSIS",
    title: "Phishing Email Investigation",
    summary: "A simulated SOC investigation of a suspicious email, moving from initial triage to evidence collection, threat-intelligence checks and a final malicious/benign verdict.",
    details: [
      ["Why I built it", "I wanted to understand how a SOC analyst would investigate a suspicious email reported by an employee and make a defensible decision from the evidence."],
      ["What I did", "Analysed email headers, checked the sender and sending infrastructure, extracted URLs and indicators, investigated suspicious links, checked indicators against threat-intelligence sources and documented the evidence."],
      ["Tools & techniques", "Email header analysis · VirusTotal · CyberChef · URL/domain analysis"],
      ["Skills developed", "Suspicious-email triage, IOC extraction, threat-intelligence use, evidence handling and clear security documentation."],
      ["Outcome", "Created a structured phishing investigation report containing the evidence, analysis and final verdict."],
      ["Real-world relevance", "The workflow mirrors an entry-level SOC use case: a reported email must be triaged quickly, indicators extracted, reputation checked and the conclusion documented for escalation or closure."]
    ],
    evidence: [
      ["Investigation report", "PLACEHOLDER — add report URL/PDF"],
      ["Screenshots of analysis", "PLACEHOLDER — add image/write-up URL"],
      ["Sample email headers", "PLACEHOLDER — add sanitized evidence"],
      ["IOC list", "PLACEHOLDER — add sanitized evidence"]
    ]
  },
  soc: {
    eyebrow: "02 / HOME SOC · THREAT DETECTION",
    title: "Building a Mini SOC Lab",
    summary: "A small Windows-based security environment built to generate events, collect telemetry, search logs and investigate suspicious PowerShell activity.",
    details: [
      ["Why I built it", "I wanted to understand how security analysts collect logs, investigate suspicious activity and turn observations into useful detections in a realistic environment."],
      ["What I did", "Set up a Windows virtual machine, installed and configured Sysmon, generated security events, collected and searched logs in Splunk, investigated suspicious PowerShell activity, created a basic detection query and documented the investigation."],
      ["Tools & technologies", "Windows VM · Splunk Enterprise · Windows Event Logs · Sysmon · PowerShell"],
      ["Skills developed", "Windows security logging, log analysis, SIEM fundamentals, event investigation and basic detection engineering."],
      ["Outcome", "Built a working home SOC environment and created a basic detection for suspicious PowerShell activity."],
      ["Real-world relevance", "This is a practical foundation for SOC work: endpoint telemetry becomes searchable data, suspicious activity is investigated in context, and repeatable patterns can become detections."]
    ],
    evidence: [
      ["Splunk detection query", "PLACEHOLDER — add GitHub/write-up link"],
      ["Lab screenshots", "PLACEHOLDER — add screenshots"],
      ["Sample logs", "PLACEHOLDER — add sanitized samples"],
      ["Investigation notes", "PLACEHOLDER — add write-up"],
      ["GitHub repository", "PLACEHOLDER — add repository URL"],
      ["Architecture diagram", "PLACEHOLDER — add diagram"]
    ]
  },
  automation: {
    eyebrow: "03 / AUTOMATION · THREAT INTELLIGENCE",
    title: "Python IOC Enrichment Tool",
    summary: "A proof-of-concept security automation tool that takes an indicator such as an IP address or domain and retrieves useful threat-intelligence context for an analyst.",
    details: [
      ["Why I built it", "During investigations, analysts often need to look up IP addresses, domains or hashes against external sources. I wanted to automate part of this repetitive workflow."],
      ["What I did", "Created a Python script that accepts an IOC as input, connects to a threat-intelligence API, parses the response and extracts useful information for an analyst."],
      ["Tools & technologies", "Python · REST APIs · JSON · VirusTotal API · GitHub"],
      ["Skills developed", "Security automation, API integration, JSON parsing, repetitive-task reduction and writing documentation for a security tool."],
      ["Outcome", "Created a working proof-of-concept IOC enrichment tool that can speed up the initial investigation of suspicious indicators."],
      ["Real-world relevance", "IOC enrichment is a common analyst workflow. Automating the first-pass lookup can reduce repetitive work and leave more time for contextual investigation."]
    ],
    evidence: [
      ["GitHub repository", "PLACEHOLDER — add repository URL"],
      ["Source code", "PLACEHOLDER — available through repository"],
      ["Terminal screenshots", "PLACEHOLDER — add screenshots"],
      ["Example API response", "PLACEHOLDER — add sanitized example"],
      ["Short demo", "PLACEHOLDER — add demo link/video"]
    ]
  }
};

const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");

function renderProject(key) {
  const p = projects[key];
  if (!p) return;

  const details = p.details.map(([heading, text]) => `
    <div class="detail-box">
      <h4>${heading}</h4>
      <p>${text}</p>
    </div>
  `).join("");

  const evidence = p.evidence.map(([name, status]) => `
    <div class="${status.startsWith("PLACEHOLDER") ? "placeholder" : ""}">
      <span>${name}</span><small>${status}</small>
    </div>
  `).join("");

  modalContent.innerHTML = `
    <div class="modal-inner">
      <div class="project-meta"><span>${p.eyebrow}</span></div>
      <h2 id="modalTitle">${p.title}</h2>
      <p class="summary">${p.summary}</p>
      <div class="detail-grid">${details}</div>
      <div class="evidence-list">
        <div><span class="label">EVIDENCE & LINKS</span><small>Replace placeholders with your real URLs</small></div>
        ${evidence}
      </div>
    </div>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-project]").forEach(btn => {
  btn.addEventListener("click", () => renderProject(btn.dataset.project));
});
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
