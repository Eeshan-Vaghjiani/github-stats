# GitHub Profile Trophy

🏆 Add dynamically generated GitHub trophies on your READMEs!

This endpoint provides GitHub Profile Trophy functionality integrated into your existing GitHub stats domain.

## Quick Start

Copy and paste this into your markdown, and change the `username` value to your GitHub username:

```md
[![trophy](https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani)](https://github.com/ryo-ma/github-profile-trophy)
```

## Demo

[![trophy](https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=ryo-ma&theme=onedark)](https://github.com/ryo-ma/github-profile-trophy)

## Usage

### Basic Usage

```
https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani
```

### With Theme

```
https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani&theme=onedark
```

### With Custom Columns

```
https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani&column=3&row=1
```

## Parameters

| Parameter | Description | Type | Default | Example |
|-----------|-------------|------|---------|---------|
| `username` | **Required** - Your GitHub username | string | - | `EeshanVaghjiani` |
| `theme` | Trophy theme | string | `default` | `onedark`, `gruvbox`, `dracula`, etc. |
| `column` | Number of columns | number | `8` | `3` |
| `row` | Number of rows | number | `3` | `1` |
| `margin-w` | Horizontal margin between trophies | number | `0` | `10` |
| `margin-h` | Vertical margin between trophies | number | `0` | `10` |
| `no-bg` | Transparent background | boolean | `false` | `true` |
| `no-frame` | Hide trophy frames | boolean | `false` | `true` |
| `rank` | Filter by rank | string | - | `S,A,B` |
| `title` | Filter by title | string | - | `Commit,Issues` |

## Available Themes

The trophy endpoint supports multiple themes:

- `default`
- `onedark`
- `gruvbox`
- `dracula`
- `monokai`
- `chalk`
- `nord`
- `alduin`
- `darkhub`
- `juicyfresh`
- `buddhism`
- `oldie`
- `radical`
- `onestar`
- `discord`
- `algolia`
- `gitdimmed`
- `tokyonight`
- `matrix`
- `apprentice`
- `dark_dimmed`
- `dark_lover`

For a complete list and visual examples, visit the [original GitHub Profile Trophy repository](https://github.com/ryo-ma/github-profile-trophy?tab=readme-ov-file#apply-theme).

## Examples

### Onedark Theme

```md
[![trophy](https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani&theme=onedark)](https://github.com/ryo-ma/github-profile-trophy)
```

### Gruvbox Theme with Custom Layout

```md
[![trophy](https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani&theme=gruvbox&column=3&row=2)](https://github.com/ryo-ma/github-profile-trophy)
```

### No Background and No Frame

```md
[![trophy](https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani&no-bg=true&no-frame=true)](https://github.com/ryo-ma/github-profile-trophy)
```

### Filter by Rank

```md
[![trophy](https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani&rank=S,AAA)](https://github.com/ryo-ma/github-profile-trophy)
```

### Filter by Title

```md
[![trophy](https://github-readme-stats-eeshan04.vercel.app/api/trophy?username=EeshanVaghjiani&title=Commit,Followers,Stars)](https://github.com/ryo-ma/github-profile-trophy)
```

## Trophy Types

Trophies are earned based on various GitHub activities:

- **Stars** - Total stars earned
- **Commits** - Total commits
- **Followers** - Number of followers
- **Issues** - Issues created
- **Pull Requests** - PRs submitted
- **Repositories** - Public repositories
- And more!

## Ranks

Trophies have different ranks based on your achievements:

- **SSS** - Legendary
- **SS** - Super rare
- **S** - Rare
- **AAA** - Very high
- **AA** - High
- **A** - Above average
- **B** - Average
- **C** - Below average
- **?** - Unknown/Secret

## Environment Variables

The trophy endpoint requires a GitHub Personal Access Token to fetch user data:

- `GITHUB_TOKEN1` - Your GitHub Personal Access Token (required)
- `GITHUB_TOKEN2` - Optional second token for rate limit rotation

Make sure these are configured in your Vercel project settings or local `.env` file.

## Credits

This trophy feature is powered by [github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) by [@ryo-ma](https://github.com/ryo-ma).

## Support

For issues specific to the trophy functionality, please refer to the [original repository](https://github.com/ryo-ma/github-profile-trophy/issues).

For issues with this deployment, please open an issue in your repository.
