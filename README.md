# Bee Talents – Senior Quality Engineer Assessment

## How to run

npm install
npx playwright install
npm test


**Performance:**
1. Sign up for free API key at https://app.reqres.in/api-keys (no card needed).
2. Install k6 → https://grafana.com/docs/k6/latest/set-up/install-k6/?pg=get&plcmt=selfmanaged-box10-cta1
3. In terminal run\`REQRES_API_KEY=<YourApiKey> npm run perf\`

**HTML Report:** \`npm run test:report\`

## Design decisions

- **Page Object Model (POM)**: Implemented POM classes for key pages (LoginPage, InventoryPage, CartPage, CheckoutStepOne, CheckoutStepTwo) to encapsulate locators and actions, enhancing maintainability, readability, and separation of concerns. This allows business stakeholders to read tests as high-level flows (e.g., \`loginPage.login(...)\`, \`inventoryPage.addToCart(...)\`) without dealing with raw selectors.
- **Fixtures**: Extended to provide reusable page object instances across tests – e.g., \`loginPage\` for base login setup, individual fixtures for \`inventoryPage\`, \`cartPage\`, \`checkoutPage\`, and a composed \`loggedInInventoryPage\` that handles authentication via POM and verifies the inventory load. This promotes DRY principles, reduces code duplication, and ensures consistent setup. For negative scenarios like failed login, POM is used directly without a full logged-in fixture to avoid unnecessary state.
- **No \`sleep\` / \`waitForTimeout\`**: Relied solely on Playwright's auto-waiting mechanisms and explicit assertions (e.g., \`expect.toBeVisible()\`, \`expect.toHaveURL()\`) for deterministic and efficient tests.
- **Test structure**: Organized with \`test.describe\` for grouping related scenarios (e.g., login success/failure together), and separate spec files per major flow (login vs. checkout) for clarity and ease of navigation.
- **Bonus**: Configured GitHub Actions workflow for CI/CD integration, enabled HTML reporter, and added screenshots/videos/traces on failure/retries for better debugging.
- **Why POM and advanced fixtures?** As a senior engineer, this design prioritizes scalability – centralizing UI changes in POM classes minimizes test breakage, while fixtures enable modular, composable setups for complex E2E flows, demonstrating trade-offs between simplicity and robustness.

## Reflection & Seniority Check

**How would you integrate Playwright tests into CI/CD?**  
Via GitHub Actions (see \`.github/workflows/playwright.yml\`) – triggers on push/PR, installs dependencies, runs tests, and uploads the HTML report as an artifact. Fails the build on test errors for quick feedback.

**How would you notify the team (Slack/Teams) about failures or regressions?**  
Integrate \`@slack/github-action\` or similar in the workflow's \`failure()\` step to send notifications with details like failed test names, error messages, links to reports, and attached screenshots/traces.

**What observability metrics would you include in an end-to-end quality dashboard?**  
- Test pass/flaky rate over time  
- Average and P95 test execution time  
- Code coverage percentage (if integrated)  
- Performance metrics like P99 response time and throughput from load tests  
- Production error rates correlated with test regressions (e.g., via Sentry/Datadog integration)

**How would you decide what to automate / what not to automate?**  
**Automate:** Critical user journeys, regression-prone features, stable APIs/UIs with high business impact to ensure reliability and speed up releases.  
**Do not automate:** Highly flaky or frequently changing UI elements (until stabilized), exploratory testing requiring human intuition, or low-value one-off scenarios better suited for manual verification.

**What belongs to performance vs functional testing?**  
Functional: Verifies if the system behaves correctly (e.g., successful login, adding to cart, error handling for locked user). Performance: Assesses efficiency under load (e.g., response times at P50/P95/P99, error rate, throughput with 100 concurrent users).
