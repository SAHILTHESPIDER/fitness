# Hercules Power

Hercules Power is a fitness web app. The site is a React app in `Heracles-Power`. Accounts, logs, reviews, and the AI coach are an Express API in `Backend`. The database is MongoDB.

The free tools are the meal list, workout demos, and BMI calculator. An account saves meals, workouts, weight, water, and habits. Paid member plans are marked coming soon. The site does not collect card details.

## What you can do

- Browse meals and filter them as veg, non-veg, or protein. The filter uses the button you just clicked.
- Keep a food list in the browser, or log it to your account for today. You can copy yesterday.
- Browse gym, yoga, cardio, calisthenics, and home exercises, with muscle, sets, and reps.
- Calculate BMI. The gauge runs from underweight, to normal, to overweight, to obese.
- Create an account, edit your profile, and see goal progress, BMI, today's calories, this week's workouts, and weight history.
- Ask the coach for meals or a workout week. You confirm before anything is saved.
- Leave a review while logged in. The name comes from the account.
- Reset a password by email when SMTP is configured.

## Run it locally

You need Node.js 20 or newer.

Frontend:

```bash
cd Heracles-Power
npm install
npm run dev
```

The site opens at http://localhost:5173. Copy `Heracles-Power/.env.example` to `Heracles-Power/.env` if you want to point at a different API. If `VITE_API_URL` is missing, local development calls http://localhost:8080.

API:

```bash
cd Backend
npm install
```

Copy `Backend/.env.example` to `Backend/.env`, fill in `MONGO_CONN` and `JWT_SECRET`, then:

```bash
npm start
```

The API listens on port 8080. `GET /ping` and `GET /health` should answer. `npm test` checks the BMI and calorie maths.

MongoDB has to be running before the API will start. The user collection is `usertests` (the model name is `Usertest`).

## Environment variables

Set these yourself. Do not commit real values. Do not put the OpenAI key in a variable that starts with `VITE_`. Vite would ship that key to every browser.

### Frontend (`Heracles-Power/.env`)

| Name | Purpose |
| --- | --- |
| `VITE_API_URL` | Public URL of the API, with no trailing slash. Local default is `http://localhost:8080`. |

### API (`Backend/.env`)

| Name | Purpose |
| --- | --- |
| `PORT` | API port. Defaults to 8080. |
| `MONGO_CONN` | MongoDB connection string. Required. |
| `JWT_SECRET` | Long random string used to sign login tokens. Required. Tokens last 7 days. |
| `CORS_ORIGINS` | Comma-separated site origins allowed to call the API. Defaults to `http://localhost:5173,https://herrcule-power.vercel.app`. |
| `OPENAI_API_KEY` | Server-only key for meal and workout suggestions. Model is `gpt-4o-mini`. Leave it empty and the coach says it is offline. |
| `SMTP_HOST` | Mail host for password reset. If host, user, or password is missing, forgot-password returns a clear "not set up" message and does not look up the email. |
| `SMTP_PORT` | Usually 587. |
| `SMTP_USER` | Mail account username. |
| `SMTP_PASS` | Mail account password. |
| `SMTP_FROM` | From address. Falls back to `SMTP_USER`. |
| `APP_URL` | Public site URL used inside the reset link, such as `https://herrcule-power.vercel.app`. |

`GET /health` reports `{ ok, ai, smtp }` so you can see whether the key and the mailbox are visible to the server. It does not reveal the secrets.

## Deploy checklist

The live site and the API are separate. Both need a new deploy after this change. The API must be redeployed or login, logs, reviews, and the coach stay on the old routes.

### Vercel (the website)

- Root directory: `Heracles-Power`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable, set before the build: `VITE_API_URL` = the public Render URL, for example `https://fitness-e905.onrender.com`
- Vite bakes `VITE_API_URL` into the JavaScript at build time. If you add it later, build again.
- `Heracles-Power/vercel.json` sends unknown paths such as `/diet` and `/login` back to `index.html`, so a refresh does not 404. The file at the repository root is not the one Vercel uses when the project root is `Heracles-Power`.

### Render (the API)

- Root directory: `Backend`
- Start command: `npm start` (that runs `node index.js`)
- Set `MONGO_CONN`, `JWT_SECRET`, and `CORS_ORIGINS`
- `CORS_ORIGINS` must include the exact site origin, including `https://`
- Set `OPENAI_API_KEY` only here, never on Vercel
- Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `APP_URL` if password reset should send mail
- Redeploy the API after saving the variables

Then redeploy the Vercel site so the new pages and the API URL are in the bundle.

## Calorie target

The target uses Mifflin-St Jeor and a lightly active day (BMR × 1.375). If the current weight is more than 1 kg above the goal, it subtracts 400 kcal. If the goal is more than 1 kg above the current weight, it adds 300 kcal. The result never goes under 1200 kcal. Meal calories come from `Food.json`. The coach is not allowed to invent them.

## Coach safety line

Every coach screen includes this line: "This is general fitness guidance, not medical advice. Stop and talk to a professional if you feel pain or have an injury."

## Author

Sahil Gupta — sahilgupta9594@gmail.com
