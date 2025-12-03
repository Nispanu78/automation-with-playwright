To run this test suite locally, please follow these guidelines

1. Install node.js following the appropriate guidelines for your OS
1a. For Windows, go to https://nodejs.org/en/download and download the Windows installer (.msi). After download is complete, click 
on the executable and follow instructions on screen. For a simple installation, it is advisable to leave default settings.
2. Verify that node.js and npm (node packet manager) is installed by running the following commands:
node -v
npm -v
3. Create a new project directory and cd into it:
mkdir automation-with-playwright
cd automation-with-playwright
4. Initialize npm project:
npm init -y
5. Install Playwright:
npm init playwright@latest
During setup: Choose TypeScript, accept default test folder, add GitHub Actions workflow: Yes/No (optional), install Playwright browsers: Yes
6. Install additional dependencies:
npm install @faker-js/faker --save-dev
npm install dotenv --save-dev
npm install typescript@4.5 --save-dev
7. Run all tests with the following command:
npx playwright test 
8. Run a single test with the following command:
npx playwright test tests/e2e-user-journey.spec.ts
9. Open Playwright report (traceviewer is set as "on") with the following command:
npx playwright show-report
10. To debug, use 
npx playwright test --debug















4. For Linux run the following commands
4a. Update the system
sudo apt update && sudo apt upgrade -y
4b Install dependencies
sudo apt install -y libnss3 libatk-bridge2.0-0 libxkbcommon-x11-0 libgbm-dev
4c. Install playwright 
npm install playwright
4d. Install browsers
npx playwright install
4e. Verify installation with the following script:
echo "const { chromium } = require('playwright'); (async () => { const browser = await chromium.launch(); const page = await browser.newPage(); await page.goto('https://example.com'); console.log(await page.title()); await browser.close(); })();" > test.js
node test.js
5. Features of the application are tested in Chrome version 131.0.6778.265
6. Run all tests with the following command:
npx playwright test --project=chromium
7. Run a single test with the following command:
npx playwright test tests/test5.spec.ts --project=chromium
8. Open Playwright report (traceviewer is set as "on") with the following command:
npx playwright show-report
9. To debug, use 
npx playwright test --debug