# Chatbot V1

This project exposes a simple API endpoint for querying the Gemini API.

The request is sent using the **gemini-1.5-pro** model by default (`api/quote.js`).
You can override this by setting a `GEMINI_MODEL` environment variable.

To run the API you need to provide a `GEMINI_API_KEY` environment variable.

## Running Locally

1. Create a `.env` file in the project root and add your Gemini API key:

   ```bash
   GEMINI_API_KEY=<your key here>
   ```

2. Start your local server with your preferred tool (`vercel dev`, `node`, etc.). The API will read `GEMINI_API_KEY` from the `.env` file.

## Deploying to Vercel

1. Create a new project on Vercel and link it to this repository.
2. In the Vercel dashboard, open **Settings** → **Environment Variables**.
3. Add a variable named `GEMINI_API_KEY` with the same value used locally.
4. Trigger a deployment—Vercel will provide the `GEMINI_API_KEY` to your API at build time.

## Pushing to GitHub

1. Add your GitHub repository as a remote:

   ```bash
   git remote add origin https://github.com/<your-user>/chatbot-v1.git
   ```

2. Push your code:

   ```bash
   git push -u origin main
   ```

Once connected, Vercel can automatically deploy every push to GitHub, keeping your live API up to date.
