# 🚀 Quick Start Guide

## For You (Pushing to GitHub)

```bash
# Add all changes
git add .

# Commit
git commit -m "feat: Add streak card and activity graph endpoints"

# Push
git push origin master
```

---

## For Your Friends (Deploying)

### 5-Minute Setup:

1. **Fork** → https://github.com/YOUR-USERNAME/github-readme-stats

2. **Get Token** → https://github.com/settings/tokens
   - Generate new token (classic)
   - Enable: `repo` + `user:read`
   - Copy token

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Token**:
   - Vercel Dashboard → Environment Variables
   - `PAT_1` = paste token
   - Redeploy

5. **Use**:
   ```markdown
   ![Streak](https://YOUR-URL/api/streak?user=USERNAME)
   ```

📖 **Full Guide**: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

---

## 📋 All Your Stats URLs

Replace with your Vercel URL:

```markdown
<!-- Stats -->
![Stats](https://YOUR-URL/api?username=USERNAME&show_icons=true&hide_border=true&bg_color=1a1a1a&title_color=00b894&icon_color=006d77&text_color=ffffff)

<!-- Languages -->
![Languages](https://YOUR-URL/api/top-langs/?username=USERNAME&layout=compact&hide_border=true&bg_color=1a1a1a&title_color=00b894&text_color=ffffff)

<!-- Streak -->
![Streak](https://YOUR-URL/api/streak?user=USERNAME&theme=dark&background=1A1A1A&ring=006D77&fire=00B894&hide_border=true)

<!-- Activity Graph -->
![Graph](https://YOUR-URL/api/activity-graph?username=USERNAME&bg_color=1a1a1a&color=00b894&line=006d77&point=ffffff&area=true&hide_border=true)
```

---

## 🎨 Quick Color Presets

### Dark Teal (Current)
```
bg_color=1a1a1a&title_color=00b894&icon_color=006d77&text_color=ffffff
```

### Dark Blue
```
bg_color=0d1117&title_color=58a6ff&icon_color=1f6feb&text_color=c9d1d9
```

### Radical Purple
```
bg_color=141321&title_color=fe428e&icon_color=a9fef7&text_color=a9fef7
```

---

## ✨ What's New

- ✅ Streak Card with all-time contributions
- ✅ Activity Graph with 31-day line chart
- ✅ Customizable colors for everything
- ✅ Works with private repos (with token)

---

## 📖 Need More Help?

- **Quick Deploy**: [DEPLOY.md](./DEPLOY.md)
- **Full Guide**: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
- **Examples**: [README-ENHANCED.md](./README-ENHANCED.md)
- **Git Commands**: [COMMIT-GUIDE.md](./COMMIT-GUIDE.md)

---

**⭐ Star the repo • 🔗 Share with friends • 💬 Open issues**
