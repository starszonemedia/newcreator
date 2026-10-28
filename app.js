/*
  Stars Zone Media — Creator Rewards (Fixed Spin Qualification & One-time Limit)
*/

const SUPABASE_URL = "https://uxwsgusyaiistbaxapzc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_V8r8sHwMZmS8tCal2b2vZw_JCk2MbGW";
const SHEETS_WEB_APP_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

const supabaseReady =
  window.supabase &&
  SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("PASTE_") &&
  !SUPABASE_ANON_KEY.includes("PASTE_");

const sb = supabaseReady
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const REWARDS_LIST = [
  { id: 1, name: "Video Promotion", weight: 40, color: "#e6007e" },
  { id: 2, name: "LIVE Promotion", weight: 25, color: "#1f192f" },
  { id: 3, name: "Mobile Stand", weight: 15, color: "#a10058" },
  { id: 4, name: "$10 Amazon Gift", weight: 10, color: "#2d2244" },
  { id: 5, name: "$10 Cash", weight: 8, color: "#e6007e" },
  { id: 6, name: "5000 Coins", weight: 2, color: "#d4af37" }
];

const i18n = {
  en: {
    logout: "Log out",
    eyebrow: "CREATOR ACTIVATION PROGRAM",
    heroTitle: 'Your next level<br><span>starts here.</span>',
    heroText: "Show up, go LIVE, and unlock exclusive rewards made for your creator journey.",
    perk1: "Track your progress",
    perk2: "Unlock creator gifts",
    perk3: "Celebrate every milestone",
    memberAccess: "MEMBER ACCESS",
    welcomeBack: "Welcome, creator",
    authHint: "Sign in with your agency account to view your activation journey.",
    email: "Email address",
    password: "Password",
    signIn: "Sign in",
    accountNote: "Creator accounts are created by your agency administrator.",
    yourJourney: "YOUR CREATOR JOURNEY",
    hello: "Hello",
    joinDate: "JOIN DATE",
    journeyText: "Every active day brings you closer to your next reward.",
    activeDays: "Active days",
    liveHours: "LIVE hours",
    rewardStatus: "Reward status",
    inProgress: "In progress",
    first14: "FIRST 14 DAYS",
    activationTitle: "Your activation checklist",
    activationText: "Complete 8 eligible active days and 20 LIVE hours within your first 14 days. Tap on any day to check in!",
    progress: "Progress",
    checkinNote: "Check-ins are saved to your account. Dates and activity totals must be verified by Stars Zone Media.",
    yourMoment: "YOUR MOMENT",
    rewardsTitle: "Spin for a reward",
    rewardsText: "You’ve earned your chance. Give the wheel a spin!",
    spin: "✦ SPIN THE WHEEL",
    congrats: "Congratulations!",
    upgradeMessage: "You upgraded to the next rewards system. Kindly contact your agent.",
    redeem: "Redeem reward",
    redeemedStatus: "Redeemed, kindly contact your agent ✨🎉",
    rewardTerms: "Rewards are subject to agency verification and availability. One spin per eligible creator account.",
    footer: "Creator growth. Real recognition.",
    day: "Day",
    complete: "Complete",
    pending: "Tap to Check-in",
    eligible: "Eligible to spin",
    notEligible: "Requires 8 active days AND 20 LIVE hours to unlock.",
    spinWait: "Spinning...",
    spinUsed: "SPIN ALREADY USED",
    redeemed: "Your redemption request has been sent.",
    signinError: "Sign-in failed. Check your credentials.",
    wheelError: "An error occurred while spinning.",
    redeemError: "Could not submit redemption. Please try again.",
    noReward: "No reward has been selected yet."
  },

  ar: {
    logout: "تسجيل الخروج",
    eyebrow: "برنامج تفعيل صُنّاع المحتوى",
    heroTitle: 'مستواك القادم<br><span>يبدأ من هنا.</span>',
    heroText: "التزم بالبث المباشر، وحقق تقدمك، وافتح مكافآت حصرية لرحلتك كصانع محتوى.",
    perk1: "تابع تقدمك",
    perk2: "افتح هدايا المبدعين",
    perk3: "احتفل بكل إنجاز",
    memberAccess: "دخول الأعضاء",
    welcomeBack: "أهلًا بك يا صانع المحتوى",
    authHint: "سجّل الدخول بحساب الوكالة لمتابعة رحلة التفعيل الخاصة بك.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    accountNote: "يتم إنشاء حسابات المبدعين بواسطة مسؤول الوكالة.",
    yourJourney: "رحلتك كصانع محتوى",
    hello: "أهلًا",
    joinDate: "تاريخ الانضمام",
    journeyText: "كل يوم نشاط يقرّبك من مكافأتك القادمة.",
    activeDays: "أيام النشاط",
    liveHours: "ساعات البث المباشر",
    rewardStatus: "حالة المكافأة",
    inProgress: "قيد التقدم",
    first14: "أول 14 يومًا",
    activationTitle: "قائمة تفعيل حسابك",
    activationText: "أكمل 8 أيام نشاط مؤهلة و20 ساعة بث مباشر خلال أول 14 يومًا. اضغط على أي يوم لتسجيل الحضور!",
    progress: "التقدم",
    checkinNote: "يتم حفظ تسجيلات الحضور في حسابك. يجب على Stars Zone Media التحقق من التواريخ وإجمالي النشاط.",
    yourMoment: "لحظتك",
    rewardsTitle: "لف العجلة واربح",
    rewardsText: "لقد أصبحت فرصتك جاهزة. جرّب حظك!",
    spin: "✦ لف عجلة المكافآت",
    congrats: "ألف مبروك!",
    upgradeMessage: "لقد انتقلت إلى نظام المكافآت التالي. يُرجى التواصل مع الوكيل المسؤول عنك.",
    redeem: "استلام المكافأة",
    redeemedStatus: "تم الاستلام، يُرجى التواصل مع الوكيل المسؤول عنك ✨🎉",
    rewardTerms: "تخضع المكافآت للتحقق من الوكالة والتوفر. محاولة واحدة لكل حساب مؤهل.",
    footer: "نمو المبدعين. تقدير حقيقي.",
    day: "اليوم",
    complete: "مكتمل",
    pending: "سجّل الحضور",
    eligible: "مؤهل للفّ العجلة",
    notEligible: "يتطلب 8 أيام نشاط و20 ساعة بث مباشر لفتح العجلة.",
    spinWait: "جارٍ لف العجلة…",
    spinUsed: "تم استخدام فرصة اللف",
    redeemed: "تم إرسال طلب استلام المكافأة.",
    demo: "معاينة تجريبية: يرجى التحقق من Supabase.",
    signinError: "فشل تسجيل الدخول. تحقق من البيانات.",
    wheelError: "حدث خطأ أثناء لف العجلة.",
    redeemError: "تعذر إرسال طلب الاستلام. حاول مرة أخرى.",
    noReward: "لم يتم اختيار مكافأة بعد."
  }
};

let lang = "en";
let currentUser = null;
let profile = null;
let reward = null;
let spinBusy = false;
let currentRotation = 0;
let isRedeemedState = false; // متغير لحفظ حالة الضغط على الزرار

const $ = id => document.getElementById(id);

function t(key) {
  return i18n[lang][key] || key;
}

function setLanguage(next) {
  lang = next;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  $("langBtn").textContent = lang === "en" ? "العربية" : "English";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) el.innerHTML = i18n[lang][key];
  });

  renderCheckins();
  if (profile) renderProfile();
  if (reward) showReward(reward);

  // لو الزرار اتدوس قبل كدة، نحدث نصه حسب اللغة الحالية (عربي أو إنجليزي) مع الحفاظ على الشكل الـ Glow والـ Pink
  if (isRedeemedState) {
    const redeemBtn = $("redeemBtn");
    redeemBtn.textContent = t("redeemedStatus");
    redeemBtn.disabled = true;
    redeemBtn.style.opacity = "1";
    redeemBtn.style.cursor = "not-allowed";
    redeemBtn.style.background = "linear-gradient(110deg, #ff2a9d, #e6007e)";
    redeemBtn.style.boxShadow = "0 0 20px rgba(255, 42, 157, 0.8), 0 0 40px rgba(230, 0, 126, 0.5)";
    redeemBtn.style.transform = "scale(1.02)";
  }
}

$("langBtn").addEventListener("click", () => {
  setLanguage(lang === "en" ? "ar" : "en");
});

/* Sign in */
$("authForm").addEventListener("submit", async event => {
  event.preventDefault();
  $("authMessage").textContent = "";

  if (!sb) {
    $("authMessage").textContent = t("demo");
    return;
  }

  const { data, error } = await sb.auth.signInWithPassword({
    email: $("email").value.trim(),
    password: $("password").value
  });

  if (error) {
    $("authMessage").textContent = t("signinError");
    return;
  }

  currentUser = data.user;
  await loadCreatorData();
});

/* Sign out */
$("logoutBtn").addEventListener("click", async () => {
  if (sb) await sb.auth.signOut();
  currentUser = null;
  profile = null;
  reward = null;
  isRedeemedState = false;

  $("appView").classList.add("hidden");
  $("authView").classList.remove("hidden");
  $("logoutBtn").classList.add("hidden");
  $("authForm").reset();
});

async function boot() {
  if (sb) {
    await sb.auth.signOut();
  }
  $("appView").classList.add("hidden");
  $("authView").classList.remove("hidden");
  $("logoutBtn").classList.add("hidden");
  drawWheelSVG();
}

async function loadCreatorData() {
  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .eq("user_id", currentUser.id)
    .single();

  if (error || !data) {
    $("authMessage").textContent = "Your creator profile is not set up yet.";
    return;
  }

  profile = data;

  $("authView").classList.add("hidden");
  $("appView").classList.remove("hidden");
  $("logoutBtn").classList.remove("hidden");

  renderProfile();
}

function getStartDate() {
  return profile?.join_date ? new Date(profile.join_date + "T12:00:00") : new Date();
}

// Generates 14 Days
function getCheckinDates() {
  const start = getStartDate();
  const dates = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  return dates;
}

function dayKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

/* Save Check-in persistently to Supabase & LocalStorage */
async function handleCheckin(key) {
  if (!profile) return;

  let currentCheckins = Array.isArray(profile.checkins) ? [...profile.checkins] : [];
  if (currentCheckins.includes(key)) return;

  currentCheckins.push(key);
  profile.checkins = currentCheckins;

  if (sb && currentUser) {
    await sb
      .from("profiles")
      .update({ checkins: currentCheckins })
      .eq("user_id", currentUser.id);
  }

  renderProfile();
}

function renderCheckins() {
  const grid = $("checkinGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const dates = getCheckinDates();
  const done = new Set(Array.isArray(profile?.checkins) ? profile.checkins : []);

  for (let i = 0; i < 14; i++) {
    const date = dates[i];
    const key = dayKey(date);
    const complete = done.has(key);

    const card = document.createElement("div");
    card.className = "checkin" + (complete ? " done" : " clickable");

    card.innerHTML = `
      <span class="check-icon">${complete ? "✓" : "✦"}</span>
      <strong>${t("day")} ${i + 1}</strong>
      <span class="date">
        ${date.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { day: "numeric", month: "short" })}
      </span>
      <span>${complete ? t("complete") : t("pending")}</span>
    `;

    if (!complete) {
      card.addEventListener("click", () => handleCheckin(key));
    }

    grid.appendChild(card);
  }
}

function renderProfile() {
  $("creatorName").textContent = profile.creator_name || currentUser?.email?.split("@")[0] || "Creator";
  $("joinDateValue").textContent = profile.join_date
    ? new Date(profile.join_date + "T12:00:00").toLocaleDateString(
        lang === "ar" ? "ar-EG" : "en-GB",
        { day: "numeric", month: "short", year: "numeric" }
      )
    : "—";

  const done = new Set(Array.isArray(profile.checkins) ? profile.checkins : []);
  const activeDaysCount = done.size;
  const liveHoursCount = Number(profile.live_hours || 0);

  $("activeDaysValue").textContent = activeDaysCount;
  $("liveHoursValue").textContent = liveHoursCount;

  $("progressLabel").textContent = `${Math.min(activeDaysCount, 8)} / 8`;
  $("progressBar").style.width = `${Math.min((activeDaysCount / 8) * 100, 100)}%`;

  // STRICT UNLOCK CONDITION: MUST have BOTH >= 8 active days AND >= 20 LIVE hours
  const eligible = activeDaysCount >= 8 && liveHoursCount >= 20;

  const hasAlreadySpun = !!profile.has_spun || !!profile.reward;

  $("rewardStatusValue").textContent = profile.redeemed_at
    ? (lang === "ar" ? "تم الاستلام" : "Redeemed")
    : profile.reward || (eligible ? t("eligible") : t("inProgress"));

  const isSpinDisabled = !eligible || hasAlreadySpun;
  $("spinBtn").disabled = isSpinDisabled;
  $("spinBtn").style.opacity = isSpinDisabled ? ".45" : "1";
  $("spinBtn").style.cursor = isSpinDisabled ? "not-allowed" : "pointer";

  if (hasAlreadySpun) {
    $("spinMessage").textContent = t("spinUsed");
  } else {
    $("spinMessage").textContent = eligible ? t("eligible") : t("notEligible");
  }

  renderCheckins();

  if (profile.reward) {
    reward = profile.reward;
    showReward(reward);
  }
}

function drawWheelSVG() {
  const svg = $("wheelSvg");
  if (!svg) return;

  const numSlices = REWARDS_LIST.length;
  const anglePerSlice = 360 / numSlices;
  let svgHtml = "";

  REWARDS_LIST.forEach((item, i) => {
    const startAngle = i * anglePerSlice;
    const endAngle = (i + 1) * anglePerSlice;

    const x1 = 150 + 150 * Math.cos((Math.PI * (startAngle - 90)) / 180);
    const y1 = 150 + 150 * Math.sin((Math.PI * (startAngle - 90)) / 180);
    const x2 = 150 + 150 * Math.cos((Math.PI * (endAngle - 90)) / 180);
    const y2 = 150 + 150 * Math.sin((Math.PI * (endAngle - 90)) / 180);

    const pathData = `M 150 150 L ${x1} ${y1} A 150 150 0 0 1 ${x2} ${y2} Z`;

    const textAngle = startAngle + anglePerSlice / 2;
    const textRad = (Math.PI * (textAngle - 90)) / 180;
    const textX = 150 + 95 * Math.cos(textRad);
    const textY = 150 + 95 * Math.sin(textRad);

    svgHtml += `
      <path d="${pathData}" fill="${item.color}" stroke="#2d1836" stroke-width="2"/>
      <text x="${textX}" y="${textY}" fill="#ffffff" font-size="11" font-weight="bold" 
            text-anchor="middle" dominant-baseline="middle" 
            transform="rotate(${textAngle}, ${textX}, ${textY})">
        ${item.name}
      </text>
    `;
  });

  svg.innerHTML = svgHtml;
}

function getRandomReward() {
  const totalWeight = REWARDS_LIST.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < REWARDS_LIST.length; i++) {
    if (random < REWARDS_LIST[i].weight) {
      return { reward: REWARDS_LIST[i], index: i };
    }
    random -= REWARDS_LIST[i].weight;
  }
  return { reward: REWARDS_LIST[0], index: 0 };
}

$("spinBtn").addEventListener("click", async () => {
  if (spinBusy || $("spinBtn").disabled) return;

  spinBusy = true;
  $("spinBtn").disabled = true;
  $("spinMessage").textContent = t("spinWait");

  try {
    const selected = getRandomReward();
    const winningReward = selected.reward;
    const index = selected.index;

    const anglePerSlice = 360 / REWARDS_LIST.length;
    const sliceCenterAngle = index * anglePerSlice + anglePerSlice / 2;
    
    const targetDegree = 360 * 5 + (360 - sliceCenterAngle);
    currentRotation += targetDegree;

    const svgEl = $("wheelSvg");
    svgEl.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(async () => {
      reward = winningReward.name;
      profile.reward = reward;
      profile.has_spun = true;

      showReward(reward);

      if (sb && currentUser) {
        await sb.from("profiles").update({
          has_spun: true,
          reward: reward
        }).eq("user_id", currentUser.id);
      }

      spinBusy = false;
    }, 4000);

  } catch (error) {
    $("spinMessage").textContent = t("wheelError");
    $("spinBtn").disabled = false;
    spinBusy = false;
  }
});

function showReward(name) {
  $("resultCard").classList.remove("hidden");
  $("rewardName").textContent = name;
  $("spinMessage").textContent = t("spinUsed");
  $("spinBtn").textContent = t("spinUsed");
  $("spinBtn").disabled = true;
  $("spinBtn").style.opacity = ".45";
  $("spinBtn").style.cursor = "not-allowed";
}

$("redeemBtn").addEventListener("click", async () => {
  $("redeemMessage").textContent = "";
  const assignedReward = reward || profile?.reward;

  if (!assignedReward) {
    $("redeemMessage").textContent = t("noReward");
    return;
  }

  // حفظ حالة إن الزرار اتدوس
  isRedeemedState = true;

  const redeemBtn = $("redeemBtn");
  redeemBtn.textContent = t("redeemedStatus");
  redeemBtn.disabled = true;
  redeemBtn.style.opacity = "1";
  redeemBtn.style.cursor = "not-allowed";
  redeemBtn.style.background = "linear-gradient(110deg, #ff2a9d, #e6007e)";
  redeemBtn.style.boxShadow = "0 0 20px rgba(255, 42, 157, 0.8), 0 0 40px rgba(230, 0, 126, 0.5)";
  redeemBtn.style.transform = "scale(1.02)";

  $("redeemMessage").innerHTML = "✦ ✨ 🎉 Congratulations! Your reward has been locked successfully. ✨ ✦";
  $("redeemMessage").classList.add("success");
});

boot();
