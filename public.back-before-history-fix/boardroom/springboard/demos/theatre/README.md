# Clementine Street Theatre

A complete fictional Foundry demonstration website for an independent 200-seat theatre in Wāpereki.

## Run locally

No build step or dependencies are required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Pages

- `index.html` — cinematic theatre homepage
- `now-playing.html` — current production details and programme tabs
- `coming-soon.html` — upcoming productions
- `book-tickets.html` — interactive demonstration booking flow
- `clementine-street.html` — venue, access, location and hire information

## Structure

- `assets/css/styles.css` — primary styling
- `assets/css/responsive.css` — responsive adjustments
- `assets/js/main.js` — navigation, homepage sequence and content tabs
- `assets/js/booking.js` — demonstration ticket selection
- `assets/js/venue-form.js` — demonstration venue enquiry form
- `assets/images/` — site photography and production artwork
- `assets/icons/favicon.svg` — site icon

## Important demonstration notes

This is a fictional Foundry demonstration site. Clementine Street Theatre, its productions, people, contact details and address are fictional.

The ticket checkout and venue-hire form are front-end demonstrations only. They do not process payments or send data to a server.

## Deployment

Deploy the contents of this folder as a static site on Cloudflare Pages, Netlify, Vercel, GitHub Pages or equivalent hosting. Internal links are relative, so the repository also works under a different preview domain.
