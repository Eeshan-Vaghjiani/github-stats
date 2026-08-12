# Deploy to Vercel - Step by Step Guide

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Your GitHub Personal Access Token (the one you already created)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy the project**:
   ```bash
   vercel
   ```
   - When prompted, confirm the project settings
   - Choose "Yes" when asked if you want to link to existing project or create new
   - Select your scope (your username/team)

4. **Add Environment Variable**:
   After deployment, add your GitHub token:
   ```bash
   vercel env add PAT_1
   ```
   - When prompted, paste your GitHub Personal Access Token. Keep it private and do not commit it to the repository.
   - Select: Production, Preview, Development (all environments)

5. **Redeploy with the environment variable**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GitHub Stats"
   git branch -M main
   git remote add origin https://github.com/eeshan-vaghjiani/github-readme-stats.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `github-readme-stats` repository
   - Click "Import"

3. **Configure Environment Variables**:
   - Before clicking "Deploy", expand "Environment Variables"
   - Add variable:
     - Name: `PAT_1`
     - Value: your GitHub Personal Access Token (stored as a Vercel secret)
   - Click "Add"

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)

## After Deployment

Your app will be available at: `https://your-project-name.vercel.app`

### Usage Examples:

**Your Stats Card:**
```
https://your-project-name.vercel.app/api?username=eeshan-vaghjiani&show_icons=true&hide_border=true&bg_color=1a1a1a&title_color=00b894&icon_color=006d77&text_color=ffffff
```

**Top Languages:**
```
https://your-project-name.vercel.app/api/top-langs?username=eeshan-vaghjiani&layout=compact&hide_border=true&bg_color=1a1a1a&title_color=00b894&text_color=ffffff
```

**Pin a Repo:**
```
https://your-project-name.vercel.app/api/pin?username=eeshan-vaghjiani&repo=your-repo-name
```

## Use in Your GitHub Profile

Add to your `README.md`:

```markdown
![GitHub Stats](https://your-project-name.vercel.app/api?username=eeshan-vaghjiani&show_icons=true&hide_border=true&bg_color=1a1a1a&title_color=00b894&icon_color=006d77&text_color=ffffff)

![Top Languages](https://your-project-name.vercel.app/api/top-langs?username=eeshan-vaghjiani&layout=compact&hide_border=true&bg_color=1a1a1a&title_color=00b894&text_color=ffffff)
```

## Troubleshooting

If you see rate limit errors:
- Make sure the `PAT_1` environment variable is set correctly in Vercel
- You can add multiple tokens: `PAT_1`, `PAT_2`, `PAT_3`, etc.
- Each token increases your rate limit capacity

## Notes

- The original project by Anurag Hazra is no longer maintained
- This is your personal deployment
- You can customize themes, colors, and layout options
- Check the README.md for all customization options
