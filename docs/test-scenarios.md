# Step 2 — Agreed test scenarios (Group 1)

System under test: Swag Labs — https://www.saucedemo.com

| # | Feature | Test scenario (one line) |
|---|---|---|
| 1 | Login | A user with valid credentials reaches the Products page; invalid credentials show an error and stay on the login page. |
| 2 | Product catalogue | All six products show their own image, name and catalogue price. |
| 3 | Sorting | Each of the four sort options (Name A–Z, Name Z–A, Price low→high, Price high→low) reorders the catalogue correctly. |
| 4 | Cart | Adding a product increases the cart badge and the cart lists the product with its price; removing it reverses both. |
| 5 | Checkout — form validation | Checkout requires a genuine first name, last name and postal code before it will continue. |
| 6 | Checkout — totals & completion | The overview shows item total, 8% tax and a correct grand total, and Finish confirms the order exactly once. |
| 7 | Session handling | Logging out ends the session and leaves no basket data behind for the next user. |

# Step 7 — Automate or keep manual?

| # | Test scenario | Automate / Manual | Why |
|---|---|---|---|
| 1 | Valid and invalid login | **Automate** | Critical path, runs every release, data-driven across the six demo accounts — exactly what a regression suite is for. |
| 2 | Product image / name / price integrity | **Automate** | Data-driven and objectively assertable (src, text, price), and it is how we caught the identical-image and random-price defects. |
| 3 | Sorting in all four orders | **Automate** | Pure deterministic logic with an exact expected order; cheap to assert, tedious and error-prone by hand. |
| 4 | Add to / remove from cart | **Automate** | Critical revenue path, repeated every release, and the silent failures are invisible without an assertion on the badge. |
| 5 | Checkout field validation | **Automate** | Boundary and data-driven (empty, whitespace, symbols, over-long); a human will not re-run twenty input variants each release. |
| 6 | Totals and tax arithmetic | **Automate** | Numeric and exactly predictable — the ideal assertion. |
| 7 | Session / cart isolation between users | **Automate** | Multi-step and easy to forget manually, but trivially scripted: log in, add, log out, log in as another user, assert empty. |
| 8 | Visual layout, alignment and image sense-check | **Keep manual** | Needs human judgement — "the cart icon sits too high" and "this photo is not a backpack" are not assertions a DOM test makes well. Visual-regression tooling would be the next step. |
| 9 | Overall usability (no cart total, read-only quantity) | **Keep manual** | These are judgement calls about what a shopper expects, not pass/fail rules; exploratory testing finds them, scripts do not. |
