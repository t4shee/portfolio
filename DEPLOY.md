# Deploying tashee-portfolio → Cloudflare Pages (₹0)

## One-time setup (~10 minutes)

1. **Push to GitHub**
   ```bash
   cd portfolio
   git init && git add -A && git commit -m "feat: initial portfolio"
   # create an empty repo at github.com/t4shee/portfolio, then:
   git remote add origin https://github.com/t4shee/portfolio.git
   git branch -M main && git push -u origin main
   ```

2. **Connect Cloudflare Pages**
   - dash.cloudflare.com → Workers & Pages → Create → Pages → *Connect to Git*
   - Select the `portfolio` repo
   - Framework preset: **Astro**
   - Build command: `npm run build` · Output directory: `dist`
   - Deploy. Your site is live at `https://<project>.pages.dev`
   - In project settings, rename the project to `tasheebisht` → URL becomes
     `https://tasheebisht.pages.dev`

3. **Enable free analytics**
   - Cloudflare dashboard → Web Analytics → Add site → it auto-injects the
     beacon for Pages projects (no code change needed).
   - The CSP in `public/_headers` already allows the Cloudflare beacon.

4. **Verify security headers**
   - After deploy, test at https://securityheaders.com — target grade: A.

## Every future update

```bash
git add -A && git commit -m "update content" && git push
```
Cloudflare rebuilds and deploys globally in ~1 minute. That is the entire CI/CD.

## Editing content

All text lives in **`src/data/profile.ts`** — experience, projects, skills,
achievements. Edit that one file; never touch components.

- Add a certification later → add a `certifications` array to profile.ts and
  render it in `index.astro` (or ask for the section to be added).
- Add a resume → drop a **sanitized** PDF (no phone/email — your current one
  contains both) at `public/resume.pdf`, then set `resumeAvailable = true` at
  the top of `src/data/profile.ts`. The terminal's `cat resume.pdf` starts
  serving the download automatically; until then it politely denies access
  and points to LinkedIn.
- Add project screenshots → put images in `public/projects/` and add an
  `images` field per project.

## If you later buy a domain (~₹600/yr for .in)

1. Buy via Cloudflare Registrar (at-cost pricing) or any registrar.
2. Pages project → Custom domains → add `tasheebisht.in`.
3. Update `site` in `astro.config.mjs` and the Sitemap URL in
   `public/robots.txt`, commit, push. SSL is automatic.

## SEO checklist after first deploy

- Google Search Console → add property → submit `sitemap-index.xml`.
- Add the site URL to your LinkedIn profile and GitHub bio — backlinks from
  those two profiles are the fastest way to rank #1 for your own name.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
```
test
