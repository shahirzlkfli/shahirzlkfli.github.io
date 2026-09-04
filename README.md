# 🚀 Fresh Graduate High-Impact Portfolio

A modern, high-performance portfolio website engineered specifically around **recruiter psychology** to help fresh graduates stand out and land software engineering interviews.

![Portfolio Preview Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80)

---

## 💡 Why This Portfolio Levels Up Your Stakes With Recruiters

Most fresh graduate portfolios fail for three reasons:
1. **Recruiters spend only 6 to 30 seconds scanning.** If they cannot immediately see what you build and what your core stack is, they bounce.
2. **Generic tutorial projects.** Generic todo-apps and unstyled clones signal a lack of independent problem-solving.
3. **Friction in contacting or seeing the code.** Broken links, no live previews, or having to search through 10 pages for a resume.

### This portfolio solves all of that:
- ⚡ **10-Second Recruiter Fast-Track (Bento Card)**: Shows target role, immediate availability, graduation GPA/honors, and core tech stack directly above the fold.
- 🔬 **Engineering Case Studies**: Projects aren't just screenshots; each card features an interactive deep-dive into *Problem -> Solution -> System Architecture -> Technical Hurdles -> Measurable Metrics*.
- 📄 **Interactive ATS Resume Modal**: Recruiters can preview your cleanly formatted resume directly in the browser and print/save to PDF with 1 click.
- 🎨 **Sleek Dual Themes**: Beautiful dark theme (Linear/Vercel style) with an instant toggle to clean light mode, persisting via `localStorage`.
- 📋 **Zero-Friction Outreach**: 1-click clipboard copy for email and direct links to GitHub and LinkedIn.

---

## 🛠️ Quickstart: How to Personalize in 5 Minutes

You do **not** need to edit messy HTML or complex CSS! Everything is cleanly driven by a single configuration file:

👉 Open [`js/portfolio-data.js`](js/portfolio-data.js)

### 1. Update Profile Info
```javascript
profile: {
  name: "Your Name",
  roleTitle: "Software Engineer / Full-Stack Developer",
  tagline: "Your unique value proposition...",
  location: "Your City, State / Remote",
  directEmail: "your.email@example.com",
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
  }
}
```

### 2. Update Recruiter Cheat Sheet
```javascript
recruiterCheatSheet: {
  availability: "Immediate Start / Summer 2026",
  workAuth: "Authorized to work in US / No sponsorship required",
  graduation: "Class of 2026 · B.S. in Computer Science (GPA: 3.8 / 4.0)",
  targetRoles: ["Software Engineer", "Full-Stack Developer", "Backend Engineer"],
  coreLanguages: ["TypeScript", "Python", "Go", "SQL"],
  coreStack: ["React", "FastAPI", "PostgreSQL", "Docker", "AWS"]
}
```

### 3. Add Your Projects & Case Studies
Add your capstone, hackathon, or side projects into `projects: [...]` with the problem, architecture, hurdles, and metrics.

---

## 🌐 Free 1-Click Deployment

### Option A: GitHub Pages (Recommended, Free Forever)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** -> **Pages**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
   - Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`!

### Option B: Vercel (Fastest, Free Custom Domain)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New Project**, import your repository.
3. Keep default settings and click **Deploy**.
4. Live in under 30 seconds with automatic HTTPS and free custom domain support.

---

## 📖 The Recruiter Playbook

Check out [`RECRUITER_PLAYBOOK.md`](RECRUITER_PLAYBOOK.md) in this folder for:
- Cold outreach email templates to recruiters and engineering managers.
- How to format your resume bullet points using the Google XYZ formula.
- How to present these case studies in technical & behavioral interviews.
