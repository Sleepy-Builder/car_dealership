/**
 * Apex AI Dealership Assistant (AutoBot)
 * Answers basic customer questions: hours, location, contact, test drives, financing,
 * trade-in valuation, warranties, and vehicle inventory specs.
 */

class DealershipBot {
  constructor() {
    this.messagesContainer = document.getElementById('botMessages');
    this.inputField = document.getElementById('botInput');
    this.sendBtn = document.getElementById('botSendBtn');
    this.botWidget = document.getElementById('botWidget');
    this.botToggleBtn = document.getElementById('botToggleBtn');
    this.botCloseBtn = document.getElementById('botCloseBtn');
    this.quickChipsContainer = document.getElementById('botQuickChips');
    this.unreadBadge = document.getElementById('botUnreadBadge');
    this.isOpen = false;
    this.hasGreeted = false;

    this.initEventListeners();
    this.initQuickChips();
  }

  initEventListeners() {
    if (this.botToggleBtn) {
      this.botToggleBtn.addEventListener('click', () => this.toggleBot());
    }
    if (this.botCloseBtn) {
      this.botCloseBtn.addEventListener('click', () => this.closeBot());
    }
    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleUserSubmit());
    }
    if (this.inputField) {
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleUserSubmit();
        }
      });
    }
  }

  initQuickChips() {
    const defaultChips = [
      { label: "🕒 Hours & Location", query: "What are your hours and address?" },
      { label: "🚗 Book a Test Drive", query: "How do I schedule a test drive?" },
      { label: "💰 Financing & APR", query: "What financing rates and terms do you offer?" },
      { label: "🚙 Show me SUVs", query: "What SUVs do you have in stock?" },
      { label: "⚡ Electric Cars", query: "What electric or hybrid vehicles do you have?" },
      { label: "🔄 Trade-in Policy", query: "How does trading in my car work?" }
    ];

    if (this.quickChipsContainer) {
      this.quickChipsContainer.innerHTML = defaultChips.map(chip => 
        `<button type="button" class="bot-chip text-xs bg-slate-800 hover:bg-emerald-600/30 hover:border-emerald-500/50 border border-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap" data-query="${chip.query}">
          ${chip.label}
        </button>`
      ).join('');

      this.quickChipsContainer.querySelectorAll('.bot-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const query = btn.getAttribute('data-query');
          this.processUserQuery(query);
        });
      });
    }
  }

  toggleBot() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.botWidget.classList.remove('hidden');
      setTimeout(() => {
        this.botWidget.classList.remove('opacity-0', 'translate-y-4');
        this.botWidget.classList.add('opacity-100', 'translate-y-0');
      }, 10);
      if (this.unreadBadge) this.unreadBadge.classList.add('hidden');
      if (!this.hasGreeted) {
        this.sendBotGreeting();
        this.hasGreeted = true;
      }
      this.inputField.focus();
    } else {
      this.closeBot();
    }
  }

  closeBot() {
    this.isOpen = false;
    this.botWidget.classList.add('opacity-0', 'translate-y-4');
    this.botWidget.classList.remove('opacity-100', 'translate-y-0');
    setTimeout(() => {
      this.botWidget.classList.add('hidden');
    }, 250);
  }

  sendBotGreeting() {
    const welcomeHtml = `
      <p class="font-medium text-white mb-1.5">👋 Hello! I'm <strong>Apex Bot</strong>, your virtual concierge.</p>
      <p class="text-slate-300 text-xs leading-relaxed mb-2">
        I can help you with dealership hours, showroom directions, financing options, test drives, trade-ins, or vehicle specs.
      </p>
      <p class="text-xs text-slate-400">Ask me anything or tap one of the suggested topics below!</p>
    `;
    this.appendBotMessage(welcomeHtml);
  }

  handleUserSubmit() {
    const text = this.inputField.value.trim();
    if (!text) return;
    this.inputField.value = '';
    this.processUserQuery(text);
  }

  processUserQuery(userText) {
    // Append user message
    this.appendUserMessage(userText);
    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.generateResponse(userText);
      this.appendBotMessage(response.html, response.actionButtons);
    }, 450);
  }

  appendUserMessage(text) {
    const div = document.createElement('div');
    div.className = "flex justify-end mb-3";
    div.innerHTML = `
      <div class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs md:text-sm px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[82%] shadow-md leading-relaxed break-words">
        ${this.escapeHtml(text)}
      </div>
    `;
    this.messagesContainer.appendChild(div);
    this.scrollToBottom();
  }

  appendBotMessage(htmlContent, actionButtons = []) {
    const div = document.createElement('div');
    div.className = "flex items-start gap-2.5 mb-3";
    
    let buttonsHtml = '';
    if (actionButtons && actionButtons.length > 0) {
      buttonsHtml = `
        <div class="mt-2.5 pt-2 border-t border-slate-700/60 flex flex-wrap gap-1.5">
          ${actionButtons.map(btn => `
            <button type="button" class="bot-action-btn text-xs font-medium px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-colors" data-action="${btn.action}" data-payload="${btn.payload || ''}">
              ${btn.label}
            </button>
          `).join('')}
        </div>
      `;
    }

    div.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 text-xs">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs md:text-sm px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] shadow-md leading-relaxed">
        ${htmlContent}
        ${buttonsHtml}
      </div>
    `;

    this.messagesContainer.appendChild(div);

    // Attach listener to action buttons
    div.querySelectorAll('.bot-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const payload = btn.getAttribute('data-payload');
        this.handleBotAction(action, payload);
      });
    });

    this.scrollToBottom();
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'botTypingIndicator';
    indicator.className = "flex items-start gap-2.5 mb-3";
    indicator.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 text-xs">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-slate-800/80 border border-slate-700 text-slate-400 text-xs px-3.5 py-2 rounded-2xl rounded-tl-sm flex items-center gap-1">
        <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
        <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
        <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
      </div>
    `;
    this.messagesContainer.appendChild(indicator);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const el = document.getElementById('botTypingIndicator');
    if (el) el.remove();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  handleBotAction(action, payload) {
    if (action === 'open-test-drive') {
      window.dealershipApp && window.dealershipApp.openTestDriveModal(payload);
    } else if (action === 'scroll-to-inventory') {
      const el = document.getElementById('inventory-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'filter-inventory') {
      window.dealershipApp && window.dealershipApp.applyCategoryFilter(payload);
      const el = document.getElementById('inventory-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'view-car') {
      window.dealershipApp && window.dealershipApp.openCarModal(payload);
    } else if (action === 'open-calculator') {
      const el = document.getElementById('finance-calculator-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Generates intelligent rule-based contextual answers
   */
  generateResponse(query) {
    const q = query.toLowerCase();

    // 1. Dealership Hours
    if (q.includes('hour') || q.includes('open') || q.includes('close') || q.includes('time') || q.includes('sunday') || q.includes('weekend')) {
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-regular fa-clock text-emerald-400 mr-1.5"></i> Showroom Hours:</p>
          <ul class="space-y-1 text-slate-300 text-xs">
            <li><strong>Mon – Fri:</strong> 9:00 AM – 8:00 PM</li>
            <li><strong>Saturday:</strong> 9:00 AM – 7:00 PM</li>
            <li><strong>Sunday:</strong> 10:00 AM – 5:00 PM</li>
          </ul>
          <p class="mt-2 text-slate-400 text-xs">Service Center opens early at 7:30 AM on weekdays.</p>
        `,
        actionButtons: [
          { label: "📍 View Address & Map", action: "scroll-to-inventory", payload: "" },
          { label: "🚗 Book a Test Drive", action: "open-test-drive", payload: "" }
        ]
      };
    }

    // 2. Dealership Location / Address / Directions
    if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('direction') || q.includes('map') || q.includes('metro city')) {
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-location-dot text-emerald-400 mr-1.5"></i> Dealership Address:</p>
          <p class="text-slate-200"><strong>${DEALERSHIP_INFO.name}</strong></p>
          <p class="text-slate-300 text-xs">${DEALERSHIP_INFO.address.street}</p>
          <p class="text-slate-300 text-xs">${DEALERSHIP_INFO.address.suite}</p>
          <p class="text-slate-300 text-xs">${DEALERSHIP_INFO.address.city}, ${DEALERSHIP_INFO.address.state} ${DEALERSHIP_INFO.address.zip}</p>
          <p class="mt-2 text-xs text-slate-400">Conveniently located off Exit 14 on Highway 101 with complimentary valet customer parking.</p>
        `,
        actionButtons: [
          { label: "📞 Call Showroom: (555) 382-7400", action: "call-us", payload: "" },
          { label: "🕒 Check Hours", action: "filter-inventory", payload: "all" }
        ]
      };
    }

    // 3. Contact / Phone / Email
    if (q.includes('phone') || q.includes('call') || q.includes('email') || q.includes('contact') || q.includes('number') || q.includes('speak') || q.includes('human') || q.includes('rep')) {
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-phone text-emerald-400 mr-1.5"></i> Direct Contact Channels:</p>
          <div class="space-y-1.5 text-xs text-slate-300">
            <p><strong>Main Line:</strong> <a href="tel:5553827400" class="text-emerald-400 hover:underline">${DEALERSHIP_INFO.phone}</a></p>
            <p><strong>Toll-Free:</strong> <a href="tel:18005552739" class="text-emerald-400 hover:underline">${DEALERSHIP_INFO.tollFree}</a></p>
            <p><strong>Sales Inquiries:</strong> ${DEALERSHIP_INFO.salesEmail}</p>
            <p><strong>Concierge:</strong> ${DEALERSHIP_INFO.email}</p>
          </div>
          <p class="mt-2 text-xs text-slate-400">Our customer team is available during normal business hours to take your call!</p>
        `
      };
    }

    // 4. Test Drive scheduling & requirements
    if (q.includes('test drive') || q.includes('drive') || q.includes('appointment') || q.includes('try car') || q.includes('schedule')) {
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-car-side text-emerald-400 mr-1.5"></i> Test Drive Program:</p>
          <p class="text-xs text-slate-300 mb-2">
            You can test drive any vehicle in our inventory! What you'll need:
          </p>
          <ul class="text-xs text-slate-300 list-disc list-inside space-y-1 mb-2">
            <li>A valid driver's license (must be 18+)</li>
            <li>Proof of auto insurance</li>
          </ul>
          <p class="text-xs text-slate-400">
            We also offer <strong>At-Home 24-Hour Test Drives</strong> within a 25-mile radius!
          </p>
        `,
        actionButtons: [
          { label: "📅 Schedule Test Drive Now", action: "open-test-drive", payload: "" },
          { label: "🏎️ Browse Available Cars", action: "scroll-to-inventory", payload: "" }
        ]
      };
    }

    // 5. Financing / Loan / Interest rates / Credit / Monthly Payment
    if (q.includes('financ') || q.includes('rate') || q.includes('interest') || q.includes('apr') || q.includes('loan') || q.includes('credit') || q.includes('down payment') || q.includes('monthly') || q.includes('lease')) {
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-coins text-emerald-400 mr-1.5"></i> Financing & Lease Options:</p>
          <ul class="text-xs text-slate-300 space-y-1 mb-2">
            <li>• <strong>Promotional APR:</strong> As low as <strong>${DEALERSHIP_INFO.financing.startingApr}</strong> on select models</li>
            <li>• <strong>Loan Terms:</strong> Flexible periods from 24, 36, 48, 60, to 72 months</li>
            <li>• <strong>Credit Approval:</strong> We work with all credit tiers (Good, Fair, Rebuilding, First-Time Buyer)</li>
            <li>• <strong>$0 Down Payment:</strong> Qualified buyers can drive off with zero down payment</li>
          </ul>
          <p class="text-xs text-slate-400">Use our live payment calculator on the page to customize your monthly estimate.</p>
        `,
        actionButtons: [
          { label: "🧮 Open Payment Calculator", action: "open-calculator", payload: "" },
          { label: "🚗 Explore Inventory", action: "scroll-to-inventory", payload: "" }
        ]
      };
    }

    // 6. Trade-in valuation
    if (q.includes('trade') || q.includes('exchange') || q.includes('sell my car') || q.includes('appraisal') || q.includes('value of my car')) {
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-arrows-rotate text-emerald-400 mr-1.5"></i> Trade-In & Cash Offer Policy:</p>
          <p class="text-xs text-slate-300 mb-2">
            We buy cars even if you don't buy from us! 
          </p>
          <ul class="text-xs text-slate-300 space-y-1 mb-2">
            <li>✓ <strong>15-Minute On-Site Appraisal:</strong> No obligation</li>
            <li>✓ <strong>Kelley Blue Book Instant Cash Offer</strong> matching</li>
            <li>✓ <strong>Tax Savings:</strong> Deduct your trade value from sales tax when purchasing</li>
          </ul>
          <p class="text-xs text-slate-400">Bring your title, vehicle registration, and both sets of keys for same-day payout.</p>
        `
      };
    }

    // 7. Warranties / Guarantees / Return policy / Certified Pre-Owned
    if (q.includes('warranty') || q.includes('guarantee') || q.includes('return') || q.includes('cpo') || q.includes('certified') || q.includes('carfax') || q.includes('inspection')) {
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-shield-halved text-emerald-400 mr-1.5"></i> Apex Peace-of-Mind Protection:</p>
          <ul class="text-xs text-slate-300 space-y-1 mb-2">
            <li>🛡️ <strong>Certified Pre-Owned:</strong> 7-Year / 100,000-Mile Powertrain Warranty</li>
            <li>🔄 <strong>3-Day / 300-Mile Money-Back Guarantee:</strong> No questions asked return</li>
            <li>📋 <strong>Free CarFax Report:</strong> Included with every single car in stock</li>
            <li>🔧 <strong>160-Point Rigorous Inspection:</strong> Performed by ASE-certified technicians</li>
          </ul>
        `
      };
    }

    // 8. Are these real cars?
    if (q.includes('real car') || q.includes('is it real') || q.includes('fake') || q.includes('authentic') || q.includes('vin')) {
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-circle-check text-emerald-400 mr-1.5"></i> 100% Real Production Vehicles!</p>
          <p class="text-xs text-slate-300 mb-2">
            Yes! Every car listed in our showroom is an authentic, real-world model with certified VIN numbers, genuine manufacturer specifications, real horsepower, torque, EPA ratings, and realistic pricing.
          </p>
          <p class="text-xs text-slate-400">
            For example: Check out our 2024 Ford Mustang GT Coyote 5.0L (VIN: 1FA6P8CF8R5102941) or 2024 Toyota RAV4 Hybrid (VIN: 2T3C1RFV8RW189423).
          </p>
        `,
        actionButtons: [
          { label: "Mustang GT Specs", action: "view-car", payload: "mustang-gt-2024" },
          { label: "Toyota RAV4 Specs", action: "view-car", payload: "rav4-hybrid-2024" }
        ]
      };
    }

    // 9. Specific car queries:
    // Toyota / RAV4
    if (q.includes('rav4') || q.includes('toyota')) {
      const car = CARS_INVENTORY.find(c => c.id === 'rav4-hybrid-2024');
      return {
        html: `
          <p class="font-semibold text-white mb-1">2024 Toyota RAV4 Hybrid XSE AWD</p>
          <p class="text-xs text-slate-300 mb-2">
            • <strong>Engine:</strong> 2.5L 4-Cylinder Hybrid (219 Horsepower)<br>
            • <strong>Drivetrain:</strong> Electronic On-Demand AWD<br>
            • <strong>Fuel Economy:</strong> 41 City / 38 Hwy MPG<br>
            • <strong>Price:</strong> $${car.price.toLocaleString()} (${car.condition}, ${car.mileage} miles)<br>
            • <strong>VIN:</strong> ${car.vin}
          </p>
        `,
        actionButtons: [
          { label: "View RAV4 Full Details", action: "view-car", payload: car.id },
          { label: "Schedule Test Drive", action: "open-test-drive", payload: car.id }
        ]
      };
    }

    // Mustang / Ford
    if (q.includes('mustang') || q.includes('ford') || q.includes('muscle') || q.includes('v8')) {
      const car = CARS_INVENTORY.find(c => c.id === 'mustang-gt-2024');
      return {
        html: `
          <p class="font-semibold text-white mb-1">2024 Ford Mustang GT Premium Fastback</p>
          <p class="text-xs text-slate-300 mb-2">
            • <strong>Engine:</strong> 5.0L Coyote V8 (486 HP / 418 lb-ft)<br>
            • <strong>0-60 MPH:</strong> 4.2 seconds<br>
            • <strong>Transmission:</strong> 6-Speed Manual with Rev-Matching<br>
            • <strong>Price:</strong> $${car.price.toLocaleString()} (${car.condition})<br>
            • <strong>VIN:</strong> ${car.vin}
          </p>
        `,
        actionButtons: [
          { label: "View Mustang GT", action: "view-car", payload: car.id },
          { label: "Schedule Test Drive", action: "open-test-drive", payload: car.id }
        ]
      };
    }

    // Tesla / Model 3
    if (q.includes('tesla') || q.includes('model 3')) {
      const car = CARS_INVENTORY.find(c => c.id === 'tesla-model-3-2023');
      return {
        html: `
          <p class="font-semibold text-white mb-1">2023 Tesla Model 3 Long Range AWD</p>
          <p class="text-xs text-slate-300 mb-2">
            • <strong>Range:</strong> 333 miles per charge (EPA)<br>
            • <strong>Performance:</strong> 0-60 in 4.2s (Dual Motor AWD, 358 HP)<br>
            • <strong>Condition:</strong> Certified Pre-Owned (16,420 miles)<br>
            • <strong>Price:</strong> $${car.price.toLocaleString()}<br>
            • <strong>VIN:</strong> ${car.vin}
          </p>
        `,
        actionButtons: [
          { label: "View Tesla Details", action: "view-car", payload: car.id },
          { label: "Schedule Test Drive", action: "open-test-drive", payload: car.id }
        ]
      };
    }

    // Porsche / 911
    if (q.includes('porsche') || q.includes('911') || q.includes('carrera') || q.includes('exotic') || q.includes('fastest')) {
      const car = CARS_INVENTORY.find(c => c.id === 'porsche-911-2023');
      return {
        html: `
          <p class="font-semibold text-white mb-1">2023 Porsche 911 Carrera S (992)</p>
          <p class="text-xs text-slate-300 mb-2">
            • <strong>Engine:</strong> 3.0L Twin-Turbo Boxer 6 (443 HP)<br>
            • <strong>0-60 MPH:</strong> 3.3 seconds (Top speed: 191 mph)<br>
            • <strong>Transmission:</strong> 8-Speed Porsche Doppelkupplung (PDK)<br>
            • <strong>Price:</strong> $${car.price.toLocaleString()} (CPO, 7,850 miles)<br>
            • <strong>VIN:</strong> ${car.vin}
          </p>
        `,
        actionButtons: [
          { label: "View Porsche 911", action: "view-car", payload: car.id },
          { label: "Test Drive Request", action: "open-test-drive", payload: car.id }
        ]
      };
    }

    // BMW
    if (q.includes('bmw') || q.includes('m340i') || q.includes('3 series')) {
      const car = CARS_INVENTORY.find(c => c.id === 'bmw-m340i-2024');
      return {
        html: `
          <p class="font-semibold text-white mb-1">2024 BMW M340i xDrive Sedan</p>
          <p class="text-xs text-slate-300 mb-2">
            • <strong>Engine:</strong> 3.0L Turbo Inline 6 + 48V Hybrid (382 HP)<br>
            • <strong>0-60 MPH:</strong> 4.1 seconds (xDrive Intelligent AWD)<br>
            • <strong>Price:</strong> $${car.price.toLocaleString()} (New, 28 miles)<br>
            • <strong>VIN:</strong> ${car.vin}
          </p>
        `,
        actionButtons: [
          { label: "View BMW M340i", action: "view-car", payload: car.id },
          { label: "Test Drive Request", action: "open-test-drive", payload: car.id }
        ]
      };
    }

    // Electric / Hybrid
    if (q.includes('electric') || q.includes('ev') || q.includes('hybrid') || q.includes('battery') || q.includes('eco')) {
      const evs = CARS_INVENTORY.filter(c => c.fuelType === 'Electric' || c.fuelType === 'Hybrid');
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-bolt text-emerald-400 mr-1.5"></i> Eco & Electric Lineup (${evs.length} Available):</p>
          <ul class="text-xs text-slate-300 space-y-1 mb-2">
            ${evs.map(c => `<li>• <strong>${c.year} ${c.make} ${c.model}</strong> (${c.fuelType}): $${c.price.toLocaleString()}</li>`).join('')}
          </ul>
          <p class="text-xs text-slate-400">All electric models qualify for federal and state EV tax credits where applicable.</p>
        `,
        actionButtons: [
          { label: "Filter Electric / Hybrids", action: "filter-inventory", payload: "Electric" }
        ]
      };
    }

    // SUVs
    if (q.includes('suv') || q.includes('family') || q.includes('crossover') || q.includes('wrangler') || q.includes('jeep')) {
      const suvs = CARS_INVENTORY.filter(c => c.bodyType === 'SUV');
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-truck-pickup text-emerald-400 mr-1.5"></i> Featured SUVs in Stock:</p>
          <ul class="text-xs text-slate-300 space-y-1 mb-2">
            ${suvs.map(c => `<li>• <strong>${c.year} ${c.make} ${c.model}</strong> (${c.trim}): $${c.price.toLocaleString()}</li>`).join('')}
          </ul>
        `,
        actionButtons: [
          { label: "View All SUVs", action: "filter-inventory", payload: "SUV" }
        ]
      };
    }

    // Cheapest / Under 30k / Budget
    if (q.includes('cheap') || q.includes('affordable') || q.includes('under') || q.includes('budget') || q.includes('lowest')) {
      const sorted = [...CARS_INVENTORY].sort((a, b) => a.price - b.price);
      const top3 = sorted.slice(0, 3);
      return {
        html: `
          <p class="font-semibold text-white mb-1"><i class="fa-solid fa-tag text-emerald-400 mr-1.5"></i> Most Affordable Options:</p>
          <ul class="text-xs text-slate-300 space-y-1.5 mb-2">
            ${top3.map(c => `<li>• <strong>${c.year} ${c.make} ${c.model}</strong> - $${c.price.toLocaleString()} (${c.condition})</li>`).join('')}
          </ul>
          <p class="text-xs text-slate-400">Financing starting around $380/mo with approved credit.</p>
        `,
        actionButtons: [
          { label: "Explore Budget Cars", action: "filter-inventory", payload: "all" }
        ]
      };
    }

    // Default polite catch-all response
    return {
      html: `
        <p class="font-semibold text-white mb-1">Apex Assistant:</p>
        <p class="text-xs text-slate-300 mb-2">
          I can assist you with:
        </p>
        <ul class="text-xs text-slate-300 space-y-1 mb-2">
          <li>• <strong>Showroom Hours:</strong> Mon-Fri 9am-8pm, Sat 9am-7pm, Sun 10am-5pm</li>
          <li>• <strong>Location:</strong> 742 Horizon Blvd, Metro City, CA 90210</li>
          <li>• <strong>Phone:</strong> (555) 382-7400</li>
          <li>• <strong>Test Drives:</strong> Free online scheduling</li>
          <li>• <strong>Vehicle Inventory:</strong> Real specs, VINs, and live pricing</li>
        </ul>
        <p class="text-xs text-slate-400">Feel free to type your question or select an option below:</p>
      `,
      actionButtons: [
        { label: "🕒 Hours & Location", action: "scroll-to-inventory", payload: "" },
        { label: "🚗 Book a Test Drive", action: "open-test-drive", payload: "" },
        { label: "🧮 Payment Calculator", action: "open-calculator", payload: "" }
      ]
    };
  }
}

// Instantiate bot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.dealershipBot = new DealershipBot();
});
