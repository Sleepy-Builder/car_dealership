/**
 * Apex Horizon Motors - Modern Vue 3 Application
 * Reactive inventory, side-by-side vehicle comparison, interactive finance calculator,
 * AI Virtual Concierge Bot, and Cinematic Pre-Landing Moving Car Intro.
 */

const { createApp, ref, computed, onMounted, nextTick } = Vue;

const app = createApp({
  setup() {
    // Cinematic Pre-Landing Intro State
    const showIntro = ref(true);
    const introMph = ref(0);
    const introTimer = ref(null);

    // Inventory & Filters
    const inventory = ref(CARS_DATA);
    const dealership = ref(DEALERSHIP_METADATA);
    const searchQuery = ref('');
    const selectedCategory = ref('all');
    const selectedCondition = ref('all');
    const sortBy = ref('featured');
    const maxPriceFilter = ref(150000);

    // Modals & UI Drawers
    const selectedCar = ref(null);
    const activeModalImageIndex = ref(0);
    const testDriveCar = ref(null);
    const showTestDriveModal = ref(false);
    const testDriveSuccess = ref(false);
    const toastMessage = ref('');
    const showToast = ref(false);

    // Side-by-side Comparison Tray
    const comparedCars = ref([]);
    const showCompareModal = ref(false);

    // Finance Calculator
    const calcType = ref('finance'); // 'finance' or 'lease'
    const calcPrice = ref(47990);
    const calcDown = ref(5000);
    const calcTrade = ref(0);
    const calcTerm = ref(60);
    const calcApr = ref(3.99);

    // AI Concierge Bot State
    const isBotOpen = ref(false);
    const botMessages = ref([]);
    const botInput = ref('');
    const isBotTyping = ref(false);
    const botChatContainer = ref(null);
    const hasUnread = ref(true);

    // Speedometer counter for Intro
    const runIntroSpeedometer = () => {
      introMph.value = 0;
      let startTime = null;
      const targetSpeed = 85;
      const duration = 2800;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Easing curve: accelerate quickly, cruise, then zoom
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        introMph.value = Math.floor(ease * targetSpeed);
        if (progress < 1 && showIntro.value) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const enterShowroom = () => {
      showIntro.value = false;
      if (introTimer.value) clearTimeout(introTimer.value);
    };

    const replayIntro = () => {
      showIntro.value = true;
      runIntroSpeedometer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      introTimer.value = setTimeout(() => {
        enterShowroom();
      }, 3400);
    };

    onMounted(() => {
      // Start Intro Animation Sequence
      runIntroSpeedometer();

      // Automatically transition from intro to landing page after 3.2s
      introTimer.value = setTimeout(() => {
        enterShowroom();
      }, 3200);
    });

    // Filtered & Sorted Inventory
    const filteredCars = computed(() => {
      return inventory.value.filter(car => {
        // Category
        let matchCat = true;
        if (selectedCategory.value !== 'all') {
          if (selectedCategory.value === 'Electric') {
            matchCat = car.fuelType === 'Electric' || car.fuelType === 'Hybrid' || car.fuelType === 'Plug-In Hybrid';
          } else {
            matchCat = car.bodyType === selectedCategory.value;
          }
        }

        // Condition
        let matchCond = true;
        if (selectedCondition.value !== 'all') {
          matchCond = car.condition === selectedCondition.value;
        }

        // Price
        const matchPrice = car.price <= maxPriceFilter.value;

        // Search text
        let matchSearch = true;
        if (searchQuery.value.trim()) {
          const q = searchQuery.value.toLowerCase().trim();
          const haystack = `${car.year} ${car.make} ${car.model} ${car.trim} ${car.vin} ${car.bodyType} ${car.fuelType} ${car.engine}`.toLowerCase();
          matchSearch = haystack.includes(q);
        }

        return matchCat && matchCond && matchPrice && matchSearch;
      }).sort((a, b) => {
        if (sortBy.value === 'price-asc') return a.price - b.price;
        if (sortBy.value === 'price-desc') return b.price - a.price;
        if (sortBy.value === 'hp-desc') return b.horsepower - a.horsepower;
        if (sortBy.value === 'mileage-asc') return a.mileage - b.mileage;
        return 0; // featured
      });
    });

    // Calculated Monthly Payment
    const monthlyPayment = computed(() => {
      const principal = Math.max(0, calcPrice.value - calcDown.value - calcTrade.value);
      if (principal <= 0) return 0;

      if (calcType.value === 'lease') {
        const residual = calcPrice.value * 0.55;
        const depreciation = (principal - residual) / 36;
        const financeFee = (principal + residual) * (calcApr.value / 2400);
        return Math.max(120, Math.round(depreciation + financeFee));
      }

      // Standard Loan Amortization Formula
      const r = (calcApr.value / 100) / 12;
      const n = calcTerm.value;
      if (r === 0) return Math.round(principal / n);
      const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return Math.round(monthly);
    });

    const totalLoanCost = computed(() => {
      const principal = Math.max(0, calcPrice.value - calcDown.value - calcTrade.value);
      if (calcType.value === 'lease') {
        return monthlyPayment.value * 36;
      }
      return monthlyPayment.value * calcTerm.value;
    });

    const totalInterestCost = computed(() => {
      const principal = Math.max(0, calcPrice.value - calcDown.value - calcTrade.value);
      return Math.max(0, totalLoanCost.value - principal);
    });

    // Methods
    const openCarModal = (car) => {
      selectedCar.value = car;
      activeModalImageIndex.value = 0;
      document.body.style.overflow = 'hidden';
    };

    const closeCarModal = () => {
      selectedCar.value = null;
      document.body.style.overflow = '';
    };

    const openTestDrive = (car = null) => {
      testDriveCar.value = car || inventory.value[0];
      showTestDriveModal.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeTestDrive = () => {
      showTestDriveModal.value = false;
      document.body.style.overflow = '';
    };

    const submitTestDrive = (event) => {
      event.preventDefault();
      const carName = testDriveCar.value ? `${testDriveCar.value.year} ${testDriveCar.value.make} ${testDriveCar.value.model}` : "your vehicle";
      closeTestDrive();
      triggerToast(`✨ Test drive confirmed for the ${carName}. Our sales concierge will greet you upon arrival.`);
    };

    const triggerToast = (msg) => {
      toastMessage.value = msg;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 4500);
    };

    const loadPriceInCalculator = (price) => {
      calcPrice.value = price;
      calcDown.value = Math.round(price * 0.1);
      closeCarModal();
      const el = document.getElementById('calculator-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Comparison Tray Methods
    const toggleCompare = (car) => {
      const index = comparedCars.value.findIndex(c => c.id === car.id);
      if (index > -1) {
        comparedCars.value.splice(index, 1);
      } else {
        if (comparedCars.value.length >= 3) {
          triggerToast("You can compare up to 3 vehicles at once.");
          return;
        }
        comparedCars.value.push(car);
      }
    };

    const isCompared = (carId) => {
      return comparedCars.value.some(c => c.id === carId);
    };

    const removeCompared = (carId) => {
      comparedCars.value = comparedCars.value.filter(c => c.id !== carId);
    };

    const clearComparison = () => {
      comparedCars.value = [];
      showCompareModal.value = false;
    };

    // AI Concierge Bot Logic
    const toggleBot = () => {
      isBotOpen.value = !isBotOpen.value;
      if (isBotOpen.value) {
        hasUnread.value = false;
        if (botMessages.value.length === 0) {
          botGreeting();
        }
        scrollToBottom();
      }
    };

    const botGreeting = () => {
      botMessages.value.push({
        sender: 'bot',
        time: 'Just now',
        text: `Welcome to **Apex Horizon Motors**! I am **Aura**, your digital showroom concierge.`,
        subtitle: `How can I help you today? Ask about our showroom hours, location, test-drive requirements, financing rates, or specific real car specifications.`,
        actions: [
          { label: "🕒 Hours & Address", query: "What are your hours and showroom address?" },
          { label: "🚗 Schedule Test Drive", query: "How do I schedule a test drive?" },
          { label: "💰 Financing Rates", query: "What are your financing rates and terms?" },
          { label: "⚡ Electric Vehicles", query: "Show me electric and hybrid cars" }
        ]
      });
    };

    const sendBotMessage = () => {
      const text = botInput.value.trim();
      if (!text) return;
      botInput.value = '';
      processUserQuery(text);
    };

    const executePrompt = (query) => {
      processUserQuery(query);
    };

    const processUserQuery = (query) => {
      botMessages.value.push({
        sender: 'user',
        time: 'Just now',
        text: query
      });
      scrollToBottom();

      isBotTyping.value = true;
      setTimeout(() => {
        isBotTyping.value = false;
        const response = generateBotResponse(query);
        botMessages.value.push(response);
        scrollToBottom();
      }, 500);
    };

    const scrollToBottom = () => {
      nextTick(() => {
        if (botChatContainer.value) {
          botChatContainer.value.scrollTop = botChatContainer.value.scrollHeight;
        }
      });
    };

    const generateBotResponse = (query) => {
      const q = query.toLowerCase();

      // Hours & Times
      if (q.includes('hour') || q.includes('open') || q.includes('close') || q.includes('time') || q.includes('sunday')) {
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**Showroom & Sales Hours:**\n• **Monday – Friday:** 9:00 AM – 8:00 PM\n• **Saturday:** 9:00 AM – 7:00 PM\n• **Sunday:** 10:00 AM – 5:00 PM\n\n*Our Service & Parts Center opens early at 7:30 AM on weekdays.*`,
          actions: [
            { label: "📍 View Address & Map", query: "Where are you located?" },
            { label: "🚗 Schedule Test Drive", action: "test-drive" }
          ]
        };
      }

      // Location & Address
      if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('direction') || q.includes('map')) {
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**Showroom Location:**\n**Apex Horizon Motors**\n742 Horizon Boulevard, Suite 100\nMetro City, CA 90210\n\n*Conveniently situated off Exit 14 on Highway 101 with complimentary valet customer parking.*`,
          actions: [
            { label: "📞 Call Showroom: (555) 382-7400", query: "What is your phone number?" },
            { label: "🕒 Check Hours", query: "What are your hours?" }
          ]
        };
      }

      // Contact & Phone
      if (q.includes('phone') || q.includes('call') || q.includes('contact') || q.includes('email') || q.includes('number') || q.includes('rep')) {
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**Direct Contact Details:**\n• **Main Showroom:** (555) 382-7400\n• **Toll-Free:** 1-800-555-APEX\n• **Sales Concierge:** sales@apexmotors.com\n• **Customer Care:** concierge@apexmotors.com`,
          actions: [
            { label: "🚗 Schedule Test Drive", action: "test-drive" }
          ]
        };
      }

      // Test Drive
      if (q.includes('test drive') || q.includes('drive') || q.includes('try') || q.includes('appointment')) {
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**Test Drive Requirements:**\n1. Valid driver's license (must be 18+)\n2. Proof of active auto insurance\n\nYou'll enjoy a dedicated 30-minute test route on open expressway and scenic roads. We also provide at-home test drives within 25 miles!`,
          actions: [
            { label: "📅 Book VIP Test Drive", action: "test-drive" },
            { label: "🏎️ Browse Real Cars", action: "scroll-inventory" }
          ]
        };
      }

      // Financing / APR
      if (q.includes('financ') || q.includes('rate') || q.includes('apr') || q.includes('credit') || q.includes('down payment') || q.includes('lease') || q.includes('loan')) {
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**Financing & Lease Terms:**\n• **Promotional APR:** Starting at **3.49% APR** for qualified buyers\n• **Flexible Terms:** 36, 48, 60, or 72 months\n• **Zero Down:** $0 down payment available on tier-1 credit\n• **Trade-In Bonus:** Equity applies directly to offset sales tax`,
          actions: [
            { label: "🧮 Use Payment Calculator", action: "scroll-calculator" },
            { label: "🔄 Trade-In Policy", query: "How does trading in a car work?" }
          ]
        };
      }

      // Trade-In Policy
      if (q.includes('trade') || q.includes('sell') || q.includes('appraisal') || q.includes('kbb')) {
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**Trade-In Guarantee:**\n• Free **15-minute on-site appraisal**\n• We match or beat Kelley Blue Book (KBB) Instant Cash Offers\n• We buy cars outright even if you don't purchase from us!`,
          actions: [
            { label: "🚗 Value My Trade With Sales", query: "What is your phone number?" }
          ]
        };
      }

      // Porsche 911
      if (q.includes('porsche') || q.includes('911') || q.includes('carrera') || q.includes('fastest')) {
        const car = inventory.value.find(c => c.id.includes('porsche'));
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**2024 Porsche 911 Carrera S (992):**\n• **Engine:** 3.0L Twin-Turbo Boxer-6 (443 HP)\n• **0-60 MPH:** 3.3 seconds (Top Speed: 191 mph)\n• **Transmission:** 8-Speed PDK Automatic\n• **Price:** $132,500 (Certified Pre-Owned, 4,850 mi)\n• **VIN:** ${car.vin}`,
          carToView: car,
          actions: [
            { label: "Inspect Porsche Specs", action: "view-car", payload: car },
            { label: "Book Porsche Test Drive", action: "test-drive-car", payload: car }
          ]
        };
      }

      // Mustang GT
      if (q.includes('mustang') || q.includes('ford') || q.includes('v8') || q.includes('coyote')) {
        const car = inventory.value.find(c => c.id.includes('mustang'));
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**2024 Ford Mustang GT Premium Fastback:**\n• **Engine:** 5.0L Gen-4 Coyote V8 (486 HP / 418 lb-ft)\n• **Transmission:** 6-Speed Manual with Rev-Matching\n• **0-60 MPH:** 4.2 seconds\n• **Price:** $47,990 (New, 38 mi)\n• **VIN:** ${car.vin}`,
          carToView: car,
          actions: [
            { label: "Inspect Mustang Specs", action: "view-car", payload: car },
            { label: "Book Mustang Test Drive", action: "test-drive-car", payload: car }
          ]
        };
      }

      // Tesla
      if (q.includes('tesla') || q.includes('model 3')) {
        const car = inventory.value.find(c => c.id.includes('tesla'));
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**2024 Tesla Model 3 Long Range AWD:**\n• **EPA Range:** 341 miles per charge\n• **0-60 MPH:** 4.2 seconds (394 HP Dual Motor)\n• **Refresh:** Highland acoustic glass and rear display\n• **Price:** $47,740 (New, 12 mi)\n• **VIN:** ${car.vin}`,
          carToView: car,
          actions: [
            { label: "Inspect Tesla Specs", action: "view-car", payload: car },
            { label: "Book Tesla Test Drive", action: "test-drive-car", payload: car }
          ]
        };
      }

      // Electric / Hybrid
      if (q.includes('electric') || q.includes('ev') || q.includes('hybrid')) {
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**Featured Electrified Vehicles in Stock:**\n• **2024 Tesla Model 3 Long Range** (341 mi range) - $47,740\n• **2024 Hyundai Ioniq 5 Limited** (800V fast charging) - $54,100\n• **2024 Toyota RAV4 Hybrid XSE** (41 MPG) - $37,885\n• **2023 Jeep Wrangler 4xe Plug-in** (470 lb-ft) - $52,400`,
          actions: [
            { label: "⚡ Filter Electric in Showroom", action: "filter-electric" }
          ]
        };
      }

      // Real Car verification
      if (q.includes('real') || q.includes('vin') || q.includes('fake') || q.includes('authentic')) {
        return {
          sender: 'bot',
          time: 'Just now',
          text: `**100% Real Production Vehicles Guaranteed:**\nEvery vehicle listed in our showroom is an authentic real car with certified 17-digit VIN numbers, factory manufacturer specs, real horsepower ratings, and clean titles verified by CarFax.`,
          actions: [
            { label: "🔍 Browse Showroom", action: "scroll-inventory" }
          ]
        };
      }

      // Default Helpful Answer
      return {
        sender: 'bot',
        time: 'Just now',
        text: `I'm happy to help you with:\n• Showroom hours & address\n• Phone & salesperson direct contact\n• Booking VIP test drives\n• Loan & lease financing terms\n• Specific technical specs on any car in stock`,
        actions: [
          { label: "🕒 Hours & Location", query: "What are your hours and showroom address?" },
          { label: "🚗 Book Test Drive", action: "test-drive" },
          { label: "🧮 Payment Calculator", action: "scroll-calculator" }
        ]
      };
    };

    const handleBotAction = (action, payload = null) => {
      if (action === 'test-drive') {
        openTestDrive();
      } else if (action === 'test-drive-car' && payload) {
        openTestDrive(payload);
      } else if (action === 'view-car' && payload) {
        openCarModal(payload);
      } else if (action === 'scroll-inventory') {
        const el = document.getElementById('inventory-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'scroll-calculator') {
        const el = document.getElementById('calculator-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'filter-electric') {
        selectedCategory.value = 'Electric';
        const el = document.getElementById('inventory-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return {
      showIntro,
      introMph,
      enterShowroom,
      replayIntro,
      inventory,
      dealership,
      searchQuery,
      selectedCategory,
      selectedCondition,
      sortBy,
      maxPriceFilter,
      filteredCars,
      selectedCar,
      activeModalImageIndex,
      testDriveCar,
      showTestDriveModal,
      testDriveSuccess,
      toastMessage,
      showToast,
      comparedCars,
      showCompareModal,
      calcType,
      calcPrice,
      calcDown,
      calcTrade,
      calcTerm,
      calcApr,
      monthlyPayment,
      totalLoanCost,
      totalInterestCost,
      isBotOpen,
      botMessages,
      botInput,
      isBotTyping,
      botChatContainer,
      hasUnread,
      openCarModal,
      closeCarModal,
      openTestDrive,
      closeTestDrive,
      submitTestDrive,
      loadPriceInCalculator,
      toggleCompare,
      isCompared,
      removeCompared,
      clearComparison,
      toggleBot,
      sendBotMessage,
      executePrompt,
      handleBotAction
    };
  }
});

app.mount('#app');
