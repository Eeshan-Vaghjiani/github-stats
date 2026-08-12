# 🚀 GitHub Readme Stats - Enhanced Edition

This is an enhanced fork with additional features:
- ✅ **GitHub Streak Card** with all-time contributions
- ✅ **Activity Graph Card** with customizable line charts
- ✅ All original features (Stats, Languages, Pins, etc.)

## 📋 Features

### 1. GitHub Stats Card
Shows your GitHub statistics including stars, commits, PRs, and issues.

### 2. Top Languages Card
Displays your most used programming languages.

### 3. GitHub Streak Card (NEW!)
Shows your contribution streaks with:
- All-time total contributions
- Current streak
- Longest streak
- Date ranges

### 4. Activity Graph Card (NEW!)
Line chart showing your last 31 days of contributions with customizable colors.

---

## 🎯 Quick Start - Deploy Your Own

### Step 1: Fork This Repository
1. Click the "Fork" button at the top right of this repository
2. Clone your forked repository to your local machine

### Step 2: Get a GitHub Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: `github-readme-stats`
4. Select scopes:
   - ✅ `repo` (all)
   - ✅ `user:read` (to include private contributions)
5. Click "Generate token"
6. **Copy the token** - you'll need it for Vercel!

### Step 3: Deploy to Vercel

#### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/github-readme-stats)

#### Option B: Manual Deploy
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Step 4: Add Your GitHub Token to Vercel
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `PAT_1`
   - **Value**: Your GitHub Personal Access Token (from Step 2)
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**
6. **Redeploy** your project for the changes to take effect

---

## 📖 Usage Examples

Replace `YOUR-VERCEL-URL` with your Vercel deployment URL (e.g., `github-readme-stats-username.vercel.app`)

### GitHub Stats Card
```markdown
![GitHub Stats](https://YOUR-VERCEL-URL/api?username=YOUR-GITHUB-USERNAME&show_icons=true&include_all_commits=true&count_private=true&hide_border=true&bg_color=1a1a1a&title_color=00b894&icon_color=006d77&text_color=ffffff)
```

### Top Languages Card
```markdown
![Top Languages](https://YOUR-VERCEL-URL/api/top-langs/?username=YOUR-GITHUB-USERNAME&layout=compact&langs_count=8&hide_border=true&bg_color=1a1a1a&title_color=00b894&text_color=ffffff)
```

### GitHub Streak Card
```markdown
![GitHub Streak](https://YOUR-VERCEL-URL/api/streak?user=YOUR-GITHUB-USERNAME&theme=dark&background=1A1A1A&ring=006D77&fire=00B894&currStreakLabel=00B894&sideLabels=FFFFFF&currStreakNum=FFFFFF&sideNums=FFFFFF&dates=FFFFFF&hide_border=true)
```

### Activity Graph Card
```markdown
![Activity Graph](https://YOUR-VERCEL-URL/api/activity-graph?username=YOUR-GITHUB-USERNAME&bg_color=1a1a1a&color=00b894&line=006d77&point=ffffff&area=true&hide_border=true)
```

---

## 🎨 Customization

### Streak Card Parameters
- `user` or `username` - GitHub username
- `background` or `bg_color` - Background color (hex without #)
- `ring` or `ring_color` - Ring color
- `fire` or `fire_color` - Flame color
- `currStreakLabel` - Current streak label color
- `currStreakNum` - Current streak number color
- `sideLabels` - Side labels color
- `sideNums` - Side numbers color
- `dates` - Dates color
- `hide_border` - Hide border (true/false)
- `theme` - Theme name (dark, radical, etc.)

### Activity Graph Parameters
- `username` or `user` - GitHub username
- `bg_color` or `background` - Background color
- `color` - Title and grid color
- `line` - Line color
- `point` - Point/dot color
- `area` - Area fill color (or use line color if set to "true")
- `hide_border` - Hide border (true/false)
- `theme` - Theme name

---

## 🎨 Color Themes

### Dark Teal (Default)
```
bg_color=1a1a1a
title_color=00b894
icon_color=006d77
text_color=ffffff
```

### Dark Blue
```
bg_color=0d1117
title_color=58a6ff
icon_color=1f6feb
text_color=c9d1d9
```

### Radical
```
bg_color=141321
title_color=fe428e
icon_color=a9fef7
text_color=a9fef7
```

---

## 🔧 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/github-readme-stats.git
   cd github-readme-stats
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   PAT_1=your_github_token_here
   ```

4. Run locally:
   ```bash
   node express.js
   ```

5. Test endpoints:
   - Stats: http://localhost:9000/api?username=YOUR-USERNAME
   - Streak: http://localhost:9000/api/streak?user=YOUR-USERNAME
   - Graph: http://localhost:9000/api/activity-graph?username=YOUR-USERNAME

---

## 📝 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api` | GitHub stats card |
| `/api/top-langs` | Top languages card |
| `/api/pin` | Repository pin card |
| `/api/wakatime` | WakaTime stats |
| `/api/gist` | Gist card |
| `/api/streak` | **NEW** - Contribution streak card |
| `/api/activity-graph` | **NEW** - Activity line graph |

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Deployment**: Vercel Serverless Functions
- **API**: GitHub GraphQL API
- **Testing**: Jest
- **Linting**: ESLint, Prettier

---

## 📦 What's New in This Fork

### ✨ New Features:
1. **Streak Card** (`/api/streak`)
   - All-time contribution tracking
   - Current and longest streak calculation
   - Date range display
   - Fully customizable colors
   - Backward compatible with both `user=` and `username=` parameters

2. **Activity Graph** (`/api/activity-graph`)
   - Last 31 days line chart
   - Customizable line and area colors
   - Grid with axis labels
   - Day-by-day contribution dots
   - Responsive design

### 🔧 Enhanced Features:
- Improved cache configuration for new endpoints
- Better error handling with SVG error cards
- Support for authenticated GitHub API (includes private repos)
- All-time contribution counting across all years

---

## 🤝 Contributing

This is a personal fork with additional features. If you find bugs or want to suggest improvements:

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - See LICENSE file for details

Original project by [anuraghazra](https://github.com/anuraghazra)
Enhanced by [eeshan-vaghjiani](https://github.com/eeshan-vaghjiani)

---

## 🙏 Acknowledgments

- Original [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) by Anurag Hazra
- GitHub GraphQL API
- Vercel for hosting

---

## ❓ FAQ

### Q: Why do I see 0 contributions?
A: Make sure you've added your GitHub token (`PAT_1`) to Vercel environment variables and redeployed.

### Q: Why don't I see private repository contributions?
A: Ensure your GitHub token has the `repo` and `user:read` scopes enabled.

### Q: Can I customize the colors?
A: Yes! All cards support extensive color customization via URL parameters.

### Q: How often does the data update?
A: Data is cached:
- Streak Card: 4 hours
- Activity Graph: 6 hours
- Stats Card: 24 hours
- Languages: 6 days

### Q: Can I use this for free?
A: Yes! Deploy to Vercel's free tier - it's sufficient for personal use.

---

## 📞 Support

If you encounter issues:
1. Check the [FAQ](#-faq) section
2. Verify your GitHub token is valid and has correct scopes
3. Check Vercel deployment logs for errors
4. Open an issue with details

---

**⭐ If you find this useful, please star the repository!**
