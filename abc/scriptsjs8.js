 (function() {
      // ----------------------------------------------
      // JSON DATA - CHANGE THIS OBJECT FOR DIFFERENT UNIVERSITY
      // ----------------------------------------------
     const universityData = {
  "name": "Mari State University",
  "city": "Yoshkar-Ola",
  "country": "Russia",
  "established": "1972",
  "fees": "26-30 Lakh",
  "duration": "6 Years",
  "medium": "English",
  "recognition": ["NMC", "WHO"],
  "image": "https://placehold.co/600x400/0f4c81/white?text=Mari+State+University",
  "description": "Mari State University provides affordable MBBS education with modern facilities and a growing international student community.",
  "hostel": "Available",
  "indianFood": "Available"
};



      // ----------------------------------------------
      // DYNAMIC SEO UPDATE
      // ----------------------------------------------
      const name = universityData.name || "University";
      const city = universityData.city || "";
      const country = universityData.country || "Russia";
      const fees = universityData.fees || "";
      
      document.title = `${name} MBBS in ${country} | Fees & Admission | NationScholars.in`;
      const metaDescription = document.getElementById('dynamicDescription');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Study MBBS at ${name} in ${country}. Check fees (${fees}), eligibility, hostel and admission details.`
        );
      }

      // ----------------------------------------------
      // RENDER PAGE
      // ----------------------------------------------
      function renderUniversityPage(data) {
        const app = document.getElementById('app');
        if (!app) return;

        const recognitionStr = data.recognition ? data.recognition.join(', ') : 'NMC, WHO';
        const hostelStatus = data.hostel || 'Available';
        const indianFoodStatus = data.indianFood || 'Available';
        
        // Why choose auto-generated cards based on data
        const whyChooseCards = [
          { title: "Globally Recognized", desc: `Recognized by ${recognitionStr}.` },
          { title: "Affordable Fees", desc: `Total tuition between ${data.fees || '15-18 Lakh'}.` },
          { title: "English Medium", desc: `Complete course in ${data.medium || 'English'} language.` },
          { title: "Indian Food", desc: `${indianFoodStatus} mess facility for Indian students.` },
          { title: "Safe Hostel", desc: `Comfortable hostel: ${hostelStatus}.` },
          { title: "Established Legacy", desc: `Founded in ${data.established || '1932'}.` }
        ];

        // Related universities (static list for demo, could be loaded from JSON)
        const relatedUniversities = [
          { name: "Kazan Federal University", city: "Kazan", fees: "16-20 Lakh" },
          { name: "Bashkir State Medical University", city: "Ufa", fees: "14-18 Lakh" },
          { name: "Orel State University", city: "Orel", fees: "13-17 Lakh" },
          { name: "Tver State Medical University", city: "Tver", fees: "18-22 Lakh" }
        ];

        const html = `
          <div class="container">
            <!-- Hero Section -->
            <div class="hero">
              <div class="hero-grid">
                <div class="hero-image">
                  <img src="${data.image || 'https://placehold.co/600x400/0f4c81/white?text=University'}" alt="${data.name} campus">
                </div>
                <div class="hero-content">
                  <span class="badge">🎓 MBBS in ${data.country || 'Russia'}</span>
                  <h1 class="university-name">${data.name}</h1>
                  <div class="location">📍 ${data.city || ''}, ${data.country || 'Russia'}</div>
                  <div class="fee-badge-large">💰 ${data.fees || 'N/A'}</div>
                  <div class="hero-buttons">
                    <a href="#lead-form" class="btn btn-primary">Apply Now 🚀</a>
                    <a href="#" class="btn btn-outline" id="counselingBtn">📞 Free Counseling</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Facts -->
            <div class="quick-facts">
              <div class="facts-grid">
                <div class="fact-card"><div class="fact-icon">🏛️</div><div class="fact-label">Established</div><div class="fact-value">${data.established || '—'}</div></div>
                <div class="fact-card"><div class="fact-icon">💵</div><div class="fact-label">Fees</div><div class="fact-value">${data.fees || '—'}</div></div>
                <div class="fact-card"><div class="fact-icon">⏳</div><div class="fact-label">Duration</div><div class="fact-value">${data.duration || '6 Years'}</div></div>
                <div class="fact-card"><div class="fact-icon">🗣️</div><div class="fact-label">Medium</div><div class="fact-value">${data.medium || 'English'}</div></div>
                <div class="fact-card"><div class="fact-icon">🏠</div><div class="fact-label">Hostel</div><div class="fact-value">${hostelStatus}</div></div>
                <div class="fact-card"><div class="fact-icon">✅</div><div class="fact-label">Recognition</div><div class="fact-value">${recognitionStr}</div></div>
              </div>
            </div>

            <!-- About University -->
            <section>
              <h2 class="section-title">About University</h2>
              <div class="about-text">
                ${data.description || 'A prestigious institution offering quality medical education.'}
              </div>
            </section>

            <!-- Why Choose -->
            <section>
              <h2 class="section-title">Why Choose This University</h2>
              <div class="cards-grid" id="whyCardsContainer"></div>
            </section>

            <!-- Fee Summary -->
            <section>
              <h2 class="section-title">Fee Summary</h2>
              <div class="fee-summary-box">
                <div class="fee-item"><h3>${data.fees || '15-18 Lakh'}</h3><p>Total Tuition</p></div>
                <div class="fee-item"><h3>${data.duration || '6 Years'}</h3><p>Course Duration</p></div>
                <div class="fee-item"><h3>${hostelStatus}</h3><p>Hostel Facility</p></div>
              </div>
            </section>

            <!-- Admission Process -->
            <section>
              <h2 class="section-title">Admission Process</h2>
              <div class="timeline">
                <div class="timeline-step"><div class="step-number">1</div><h4>Apply Online</h4><p>Fill the form with basic details</p></div>
                <div class="timeline-step"><div class="step-number">2</div><h4>Document Upload</h4><p>Submit academic & NEET score</p></div>
                <div class="timeline-step"><div class="step-number">3</div><h4>Admission Letter</h4><p>Receive within 7-10 days</p></div>
                <div class="timeline-step"><div class="step-number">4</div><h4>Visa & Travel</h4><p>We assist with visa & departure</p></div>
              </div>
            </section>

            <!--
            <section id="lead-form">
              <h2 class="section-title">Get Free Counseling</h2>
              <div class="lead-form">
                <form id="enquiryForm">
                  <div class="form-group"><input type="text" placeholder="Full Name" required></div>
                  <div class="form-group"><input type="tel" placeholder="Mobile Number" required></div>
                  <div class="form-group"><input type="text" placeholder="NEET Score (if available)"></div>
                  <button type="submit" class="btn btn-primary" style="width:100%;">Apply Now 🎓</button>
                </form>
              </div>
            </section>
 -->
            <!-- Related Universities Slider -->
            <section>
              <h2 class="section-title">Related Universities</h2>
              <div class="slider-container" id="relatedSlider"></div>
            </section>
          </div>
        `;

        app.innerHTML = html;

        // Populate why choose cards dynamically
        const whyContainer = document.getElementById('whyCardsContainer');
        if (whyContainer) {
          whyContainer.innerHTML = whyChooseCards.map(card => 
            `<div class="why-card"><h3>${card.title}</h3><p>${card.desc}</p></div>`
          ).join('');
        }

        // Populate related slider
        const slider = document.getElementById('relatedSlider');
        if (slider) {
          slider.innerHTML = relatedUniversities.map(uni => 
            `<div class="slider-card"><h4>${uni.name}</h4><p>📍 ${uni.city}</p><p>💰 ${uni.fees}</p></div>`
          ).join('');
        }

        // WhatsApp link (dynamic message)
       // const whatsappEl = document.getElementById('whatsappLink');
    //    if (whatsappEl) {
    //      const message = encodeURIComponent(`Hi, I'm interested in MBBS at ${data.name}. Please share details.`);
    //      whatsappEl.href = `https://wa.me/919999999999?text=${message}`; // placeholder number
    //    }

        // Form submission prevention & alert
        const form = document.getElementById('enquiryForm');
        if (form) {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Our counselor will contact you soon.');
            form.reset();
          });
        }

        // Counseling button smooth scroll
        const counselingBtn = document.getElementById('counselingBtn');
        if (counselingBtn) {
          counselingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
          });
        }
      }

      // Start rendering
      renderUniversityPage(universityData);
    })();