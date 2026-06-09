  // ----------------------- DATA MODEL (JSON) -------------------------
  const collegeData = {

    "Karnataka": {
      colleges: [
        { name: "RV College of Engineering", top: true, cutoffs: { "Computer Science": "300-800" } },
        { name: "BMS College of Engineering", top: true, cutoffs: { "Computer Science": "1200" } },
        { name: "MS Ramaiah Institute", top: false, cutoffs: { "Computer Science": "1800" } },
        { name: "DSCE Bangalore", top: false, cutoffs: { "Computer Science": "5000" } },
        { name: "NIE Mysore", top: false, cutoffs: { "Computer Science": "8000" } }
      ]
    },
    "Maharashtra": {
      colleges: [
        { name: "COEP Pune", top: true, cutoffs: { "Computer Science": "99+ percentiles" } },
        { name: "VJTI Mumbai", top: true, cutoffs: { "Computer Science": "99.5+" } },
        { name: "Walchand Sangli", top: false, cutoffs: { "Computer Science": "98+" } },
        { name: "PCCoE Pune", top: false, cutoffs: { "Computer Science": "97+" } },
        { name: "VIT Pune", top: false, cutoffs: { "Computer Science": "97-98" } }
      ]
    },
    "Madhya Pradesh": {
      colleges: [
        { name: "SGSITS Indore", top: true, cutoffs: { "Computer Science": "50k-80k" } },
        { name: "IET DAVV Indore", top: true, cutoffs: { "Computer Science": "70k-1 lakh" } },
        { name: "JEC Jabalpur", top: false, cutoffs: { "Computer Science": "1 lakh" } },
        { name: "MITS Gwalior", top: false, cutoffs: { "Computer Science": "1.5 lakh" } },
        { name: "SATI Vidisha", top: false, cutoffs: { "Computer Science": "2 lakh" } }
      ]
    },
    "Rajasthan": {
      colleges: [
        { name: "MBM Jodhpur", top: true, cutoffs: { "Computer Science": "80k-1 lakh" } },
        { name: "RTU Kota", top: false, cutoffs: { "Computer Science": "1.5 lakh" } },
        { name: "CTAE Udaipur", top: false, cutoffs: { "Computer Science": "1.5 lakh" } },
        { name: "JECRC Jaipur", top: false, cutoffs: { "Computer Science": "2 lakh" } },
        { name: "SKIT Jaipur", top: false, cutoffs: { "Computer Science": "2.5 lakh" } }
      ]
    },
    "Odisha": {
      colleges: [
        { name: "VSSUT Burla", top: true, cutoffs: { "Computer Science": "60k-90k" } },
        { name: "OUTR Bhubaneswar", top: true, cutoffs: { "Computer Science": "80k-1 lakh" } },
        { name: "Silicon Bhubaneswar", top: false, cutoffs: { "Computer Science": "1.2 lakh" } },
        { name: "CV Raman Global", top: false, cutoffs: { "Computer Science": "1.5 lakh" } },
        { name: "GIET Gunupur", top: false, cutoffs: { "Computer Science": "2 lakh" } }
      ]
    },
    "Haryana": {
      colleges: [
        { name: "YMCA Faridabad", top: true, cutoffs: { "Computer Science": "70k-1 lakh" } },
        { name: "UIET Kurukshetra", top: true, cutoffs: { "Computer Science": "1 lakh" } },
        { name: "DCRUST Murthal", top: false, cutoffs: { "Computer Science": "1.2 lakh" } },
        { name: "GJU Hisar", top: false, cutoffs: { "Computer Science": "1.5 lakh" } },
        { name: "GCET Sonipat", top: false, cutoffs: { "Computer Science": "2 lakh" } }
      ]
    }
  };

  // State list with icon mapping
const statesList = [
  "Karnataka", "Maharashtra", "Madhya Pradesh", "Rajsthan", "Odisha", 
  "Haryana",
];

const stateIcons = {
  "Karnataka": "fa-temple", 
  "Maharashtra": "fa-landmark", 
  "Madhya Pradesh": "fa-tree", 
   "Rajasthan": "fa-desert", 
     "Odisha": "fa-sea",

  "Haryana": "fa-farm",           // or "fa-tractor", "fa-wheat"
  // or "fa-camel", "fa-sand"
// or "fa-fish", "fa-temple"
};
  const defaultIcon = "fa-university";

  // ---------- Global state management (no page reload) ----------
  let currentScreen = "states"; // states, colleges, cutoff
  let selectedState = "";
  let selectedCollegeObj = null;
  let filterText = "";

  // DOM root
  const appRoot = document.getElementById("appRoot");

  // Helper: re-render based on currentScreen & filter
  function render() {
    if (currentScreen === "states") {
      renderStatesScreen();
    } else if (currentScreen === "colleges") {
      renderCollegesScreen();
    } else if (currentScreen === "cutoff") {
      renderCutoffScreen();
    }
  }

  // Utility: back navigation
  function goBack() {
    if (currentScreen === "colleges") {
      currentScreen = "states";
      selectedState = "";
      filterText = "";
      render();
    } else if (currentScreen === "cutoff") {
      currentScreen = "colleges";
      selectedCollegeObj = null;
      render();
    }
  }

  // State screen (home with cards)
  function renderStatesScreen() {
    const statesHTML = statesList.map(state => {
      const icon = stateIcons[state] || defaultIcon;
      return `
        <div class="state-card" data-state="${state}">
          <i class="fas ${icon} fa-2x"></i>
          <h3>${state}</h3>
          <p style="margin-top: 8px; opacity:0.7;"><i class="fas fa-chevron-right"></i> view colleges</p>
        </div>
      `;
    }).join('');

    const html = `
      <div class="screen">
        <div style="margin-bottom: 1rem;">
          <p style="font-weight:500;"><i class="fas fa-map-marker-alt"></i> based on official data </p>
        </div>
        <div class="grid-cards" id="statesGrid">
          ${statesHTML}
        </div>
      </div>
    `;
    appRoot.innerHTML = html;
    // attach event listeners to state cards
    document.querySelectorAll('.state-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const stateName = card.getAttribute('data-state');
        if (stateName) {
          selectedState = stateName;
          currentScreen = "colleges";
          filterText = "";
          render();
        }
      });
    });
  }

  // Colleges screen (with search bar, highlight top colleges)
  function renderCollegesScreen() {
    const stateData = collegeData[selectedState];
    if (!stateData) {
      appRoot.innerHTML = `<div class="message-area">❌ No data for ${selectedState}</div><button class="back-btn" id="backBtn"><i class="fas fa-arrow-left"></i> Back to States</button>`;
      document.getElementById("backBtn")?.addEventListener("click", goBack);
      return;
    }
    let collegesArray = [...stateData.colleges];
    // filter based on search
    if (filterText.trim() !== "") {
      const term = filterText.toLowerCase();
      collegesArray = collegesArray.filter(col => col.name.toLowerCase().includes(term));
    }

    const collegesHTML = collegesArray.map(col => {
      const topBadge = col.top ? `<span class="badge-top"><i class="fas fa-star"></i> Top Pick</span>` : "";
      return `
        <div class="college-card" data-college-name="${col.name}">
          <i class="fas fa-building"></i>
          <div class="college-info">
            <h4>${col.name} ${topBadge}</h4>
            <small style="color: #4a7b8c;"><i class="fas fa-chart-simple"></i> Click for branch cutoffs</small>
          </div>
          <i class="fas fa-chevron-right" style="color:#1e88b0;"></i>
        </div>
      `;
    }).join('');

    const noResultMsg = collegesArray.length === 0 ? `<div class="message-area"><i class="fas fa-search"></i> No colleges match "${filterText}"</div>` : "";

    const html = `
      <div class="screen">
        <button class="back-btn" id="backBtnColleges"><i class="fas fa-arrow-left"></i> Back to States</button>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap:wrap; margin-bottom:20px;">
          <h2 style="color:#115a74;"><i class="fas fa-university"></i> Top Colleges in ${selectedState}</h2>
          <div class="search-section">
            <input type="text" class="search-input" id="collegeSearchInput" placeholder="🔍 Search colleges..." value="${filterText.replace(/"/g, '&quot;')}">
          </div>
        </div>
        ${noResultMsg}
        <div class="grid-cards" id="collegesGrid">
          ${collegesHTML}
        </div>
      </div>
    `;

    appRoot.innerHTML = html;
    document.getElementById("backBtnColleges")?.addEventListener("click", goBack);
    const searchInput = document.getElementById("collegeSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        filterText = e.target.value;
        render();
      });
    }
    // attach college click events
    document.querySelectorAll('.college-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const collegeName = card.getAttribute('data-college-name');
        const fullCollege = collegesArray.find(c => c.name === collegeName);
        if (fullCollege) {
          selectedCollegeObj = fullCollege;
          currentScreen = "cutoff";
          render();
        }
      });
    });
  }

  // cutoff display screen with branch table / card
  function renderCutoffScreen() {
    if (!selectedCollegeObj || !selectedState) {
      currentScreen = "states";
      render();
      return;
    }
    const college = selectedCollegeObj;
    const cutoffs = college.cutoffs;
    const branches = Object.keys(cutoffs);
    
    let tableRows = "";
    for (let branch of branches) {
      const rank = cutoffs[branch];
      tableRows += `
        <tr>
          <td><i class="fas fa-code-branch"></i> ${branch}</td>
          <td><span class="rank-value"><i class="fas fa-trophy"></i> Rank: ${rank.toLocaleString()}</span></td>
        </tr>
      `;
    }
    
    const highlightNote = college.top ? `<div style="margin-top: 15px; background:#ffe6cc; border-radius:28px; padding:12px 18px; color:#a45d00;"><i class="fas fa-crown"></i> Top ranked institution – Highly competitive cutoffs!</div>` : "";
    
    const html = `
      <div class="screen">
        <button class="back-btn" id="backCutoffBtn"><i class="fas fa-arrow-left"></i> Back to Colleges</button>
        <div class="cutoff-card">
          <div class="college-badge">
            <i class="fas fa-landmark" style="font-size: 2rem; color:white;"></i>
            <h2>${college.name}</h2>
          </div>
          <p style="margin-bottom: 20px; font-weight:500;"><i class="fas fa-map-pin"></i> ${selectedState} • Branch-wise opening ranks (approx)</p>
          <table class="cutoff-table">
            <thead>
              <tr><th>Branch / Specialization</th><th>Cutoff Rank (General)</th></tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          ${highlightNote}
          <div style="margin-top: 28px; font-size:0.85rem; background:#eef2fc; padding:10px 18px; border-radius: 40px;">
            <i class="fas fa-info-circle"></i> Data indicative based on recent years. Ranks may vary by category.
          </div>
        </div>
      </div>
    `;
    appRoot.innerHTML = html;
    document.getElementById("backCutoffBtn")?.addEventListener("click", goBack);
  }

  // Dark mode toggle (bonus)
  function initDarkMode() {
    const toggleBtn = document.getElementById("darkModeToggle");
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) document.body.classList.add("dark");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const darkActive = document.body.classList.contains("dark");
        localStorage.setItem("darkMode", darkActive);
        // update icon
        const icon = toggleBtn.querySelector("i");
        if (icon) {
          if (darkActive) icon.className = "fas fa-sun";
          else icon.className = "fas fa-moon";
        }
      });
      const icon = toggleBtn.querySelector("i");
      if (icon) {
        if (document.body.classList.contains("dark")) icon.className = "fas fa-sun";
        else icon.className = "fas fa-moon";
      }
    }
  }

  // Additional dynamic back support + initial render and reattach dark mode on each render ?
  // Actually the toggle button persists across re-renders, but we need to ensure that
  // after each render the dark mode toggle keeps working (it's outside appRoot so fine)
  // But we should also re-attach any necessary listeners for the dark toggle if not already? It's static.
  
  // Trigger initial render and watch for hash navigation / back
  function startApp() {
    render();
    initDarkMode();
    // optional: handle browser back button manually? we use internal back, but we could also pushState. bonus not needed but clean.
  }

  startApp();

  // Ensure that when a dynamic re-render occurs, the dark mode button state remains synced
  // but since toggle event is attached to persistent button it's fine.
  // Also final touch: add smooth animations on each render CSS already does
  // Provide nice top college badge styling and search.
  // Extra: add minor transition animation on dynamic content load.