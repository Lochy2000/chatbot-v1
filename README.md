# Chatbot v1

This project includes an API route that proxies requests to Google's Gemini API. To use it, set the `GEMINI_API_KEY` environment variable to your Gemini API key.

## Running locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server (for example, using `vercel dev` or your preferred Node runtime).

## Deploying to Vercel

1. [Create a Vercel account](https://vercel.com/) if you haven't already.
2. Import this repository into Vercel.
3. In your Vercel project settings, add an environment variable named `GEMINI_API_KEY` with your Gemini API key.
4. Deploy the project.

## Usage

Make a GET request to `/api/quote` with a `prompt` query parameter:

```bash
curl "https://your-deployment-url.vercel.app/api/quote?prompt=Hello"
```

For example:

```
GET /api/quote?prompt=Hello
```

returns a JSON object containing the reply from Gemini.
