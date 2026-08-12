# 🚀 GitHub Readme Stats - Enhanced Edition

Enhanced fork with **Streak Card** and **Activity Graph** support!

## ✨ What's New

This fork adds two powerful new cards:

### 1. 🔥 Streak Card
Track your contribution streaks with style!
- All-time total contributions
- Current active streak
- Longest streak ever
- Date ranges for each streak

### 2. 📊 Activity Graph
Visualize your daily contributions!
- Last 31 days line chart
- Customizable colors
- Area fill gradient
- Grid with axis labels

## 🎯 Live Examples

### Streak Card
![Streak Card](https://github-readme-stats-eeshan04.vercel.app/api/streak?user=eeshan-vaghjiani&theme=dark&background=1A1A1A&ring=006D77&fire=00B894&currStreakLabel=00B894&sideLabels=FFFFFF&currStreakNum=FFFFFF&sideNums=FFFFFF&dates=FFFFFF&hide_border=true)

### Activity Graph
![Activity Graph](https://github-readme-stats-eeshan04.vercel.app/api/activity-graph?username=eeshan-vaghjiani&bg_color=1a1a1a&color=00b894&line=006d77&point=ffffff&area=true&hide_border=true)

### GitHub Stats
![GitHub Stats](https://github-readme-stats-eeshan04.vercel.app/api?username=eeshan-vaghjiani&show_icons=true&include_all_commits=true&count_private=true&hide_border=true&bg_color=1a1a1a&title_color=00b894&icon_color=006d77&text_color=ffffff)

### Top Languages
![Top Languages](https://github-readme-stats-eeshan04.vercel.app/api/top-langs/?username=eeshan-vaghjiani&layout=compact&langs_count=8&hide_border=true&bg_color=1a1a1a&title_color=00b894&text_color=ffffff)

---

## 🚀 Quick Deploy

### 1. Fork This Repo
Click the "Fork" button at the top right.

### 2. Get GitHub Token
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Enable scopes: `repo`, `user:read`
4. Copy the token

### 3. Deploy to Vercel
```bash
npm install -g vercel
vercel login
vercel
```

### 4. Add Token to Vercel
1. Go to Vercel Dashboard → Your Project → Settings
2. Environment Variables
3. Add: `PAT_1` = your GitHub token
4. Save and redeploy

**📖 Full Guide**: See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed instructions.

---

## 📋 Usage

Replace `YOUR-URL` with your Vercel deployment URL:

### Streak Card
```markdown
![Streak](https://YOUR-URL/api/streak?user=USERNAME&theme=dark&background=1A1A1A&ring=006D77&fire=00B894&hide_border=true)
```

### Activity Graph  
```markdown
![Graph](https://YOUR-URL/api/activity-graph?username=USERNAME&bg_color=1a1a1a&color=00b894&line=006d77&point=ffffff&area=true&hide_border=true)
```

### Stats Card
```markdown
![Stats](https://YOUR-URL/api?username=USERNAME&show_icons=true&hide_border=true)
```

### Languages Card
```markdown
![Languages](https://YOUR-URL/api/top-langs/?username=USERNAME&layout=compact&hide_border=true)
```

---

## 🎨 Customization

### Color Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `bg_color` | Background color | `1a1a1a` |
| `title_color` | Title color | `00b894` |
| `text_color` | Text color | `ffffff` |
| `icon_color` | Icon color | `006d77` |
| `line` | Graph line color | `006d77` |
| `point` | Graph point color | `ffffff` |
| `area` | Graph area fill | `true` or hex color |

### Streak Parameters

| Parameter | Description |
|-----------|-------------|
| `ring` | Ring color around flame |
| `fire` | Flame icon color |
| `currStreakLabel` | Current streak label color |
| `currStreakNum` | Current streak number color |
| `sideLabels` | Side labels color |
| `sideNums` | Side numbers color |
| `dates` | Date text color |

---

## 🔧 Local Development

```bash
# Clone
git clone https://github.com/YOUR-USERNAME/github-readme-stats.git
cd github-readme-stats

# Install
npm install

# Add token to .env
echo "PAT_1=your_github_token" > .env

# Run
node express.js
```

Visit: http://localhost:9000/api?username=YOUR-USERNAME

---

## 📦 Tech Stack

- Node.js + Express.js
- GitHub GraphQL API
- Vercel Serverless Functions
- SVG rendering

---

## 🆕 New Endpoints

| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `/api/streak` | Contribution streak card | `user`, `background`, `ring`, `fire`, colors |
| `/api/activity-graph` | 31-day activity line chart | `username`, `bg_color`, `line`, `point`, `area` |

---

## 📝 Features

### Streak Card Features:
- ✅ All-time contribution count
- ✅ Current streak with dates
- ✅ Longest streak with dates
- ✅ Animated flame icon
- ✅ Customizable colors
- ✅ Works with private repos (with token)

### Activity Graph Features:
- ✅ Last 31 days of contributions
- ✅ Line chart with area fill
- ✅ Dotted grid background
- ✅ Day labels on X-axis
- ✅ Contribution count on Y-axis
- ✅ Hover tooltips on each point

---

## ❓ FAQ

**Q: Why do I see 0 contributions?**
A: Add your GitHub token to Vercel environment variables.

**Q: Can I see private repo contributions?**
A: Yes! Make sure your token has `repo` and `user:read` scopes.

**Q: How often does data update?**
A: Cached for 4-6 hours. Add `?cache_seconds=0` to force refresh (not recommended).

**Q: Can I use custom colors?**
A: Yes! All parameters accept hex colors without the `#` symbol.

---

## 🙏 Credits

- Original project: [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- Enhanced by: [eeshan-vaghjiani](https://github.com/eeshan-vaghjiani)

---

## 📄 License

MIT License - See [LICENSE](./LICENSE)

---

**⭐ Star this repo if you find it useful!**

**🔗 Share it with your friends!**

**💬 Open issues for bugs or feature requests!**
