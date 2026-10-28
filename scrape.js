const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');

// 🔒 بنسحب المفتاح من الـ Environment Variables بأمان تام
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

(async () => {
    const creators = [
        'mira_nabil1'
    ];

    const browser = await chromium.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });

    const context = await browser.newContext({
        storageState: 'auth.json'
    });

    const page = await context.newPage();

    console.log("🚀 Gari fth Creator Data...");
    await page.goto('https://live-backstage.tiktok.com/portal/data/data?', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    console.log("✅ Opened Creator Data");

    for (const creator of creators) {
        console.log(`🔍 Searching: ${creator}`);

        await page.locator('[data-id="username-search"]').click();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Backspace');
        await page.keyboard.type(creator);
        await page.waitForTimeout(2000);

        const creatorOption = page.locator('.shortId-XR8ar8', {
            hasText: creator
        }).first();

        await creatorOption.waitFor({ state: 'visible' });
        await creatorOption.click();

        console.log(`✅ Selected: ${creator}`);
        await page.waitForTimeout(8000);

        const values = await page
            .locator('.liveplatform-data-card-value')
            .evaluateAll(elements =>
                elements.map(el => el.innerText.trim())
            );

        console.log("📊 Raw extracted values:", values);

        // Qira'at el-sa3at w tahweelha l-raqam (Decimal)
        const rawDuration = values.find(v => /h|m|s/i.test(v)) || "0h";
        console.log("⏱️ Raw duration text:", rawDuration);

        let hoursNumber = 0;
        const hMatch = rawDuration.match(/(\d+)\s*h/i);
        const mMatch = rawDuration.match(/(\d+)\s*m/i);
        const sMatch = rawDuration.match(/(\d+)\s*s/i);

        if (hMatch) hoursNumber += parseFloat(hMatch[1]);
        if (mMatch) hoursNumber += parseFloat(mMatch[1]) / 60;
        if (sMatch) hoursNumber += parseFloat(sMatch[1]) / 3600;

        // Law mafeesh h/m/s w kan raqam bas
        if (!hMatch && !mMatch && !sMatch) {
            const fallbackMatch = rawDuration.match(/[\d.]+/);
            if (fallbackMatch) hoursNumber = parseFloat(fallbackMatch[0]);
        }

        hoursNumber = parseFloat(hoursNumber.toFixed(2));
        console.log(`⏱️ Final hours calculated: ${hoursNumber}`);

        // 📤 El-tahdeeth el-mabsoot fe column live_hours le-creator_name mira_nabil1
        console.log("📤 Sending data to Supabase...");
        const { data, error } = await supabase
            .from('profiles')
            .update({ live_hours: hoursNumber })
            .eq('creator_name', creator)
            .select();

        if (error) {
            console.error("❌ Supabase Error:", error.message);
        } else if (data && data.length === 0) {
            console.warn(`⚠️ Msh l2y '${creator}' fe column creator_name fe Supabase!`);
        } else {
            console.log(`✅ Successfully updated ${creator} with ${hoursNumber} hours in Supabase!`);
            console.log("📄 Updated row:", data);
        }
    }

    await browser.close();
})();