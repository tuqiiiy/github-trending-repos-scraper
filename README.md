# GitHub Trending & High-Star Repos Scraper 🌟

Effortlessly discover trending GitHub repositories, open-source AI projects, cutting-edge developer tools, and fast-growing libraries based on programming languages, keywords, topics, and star counts.

---

## ⚡ Key Features

- **Search by Keyword / Topic**: Monitor topics like `ai`, `llm`, `agents`, `devtools`, `web3`, `rust`, etc.
- **Language Filtering**: Filter specifically for Python, TypeScript, JavaScript, Rust, Go, C++, etc.
- **Custom Star Thresholds**: Filter repositories with at least `minStars` (e.g., >100, >1000).
- **Flexible Sorting**: Sort by highest stars, most forks, or most recently updated.
- **Enriched Metadata**: Includes star counts, fork counts, open issues, repo descriptions, homepage links, repository topics/tags, license, and owner details.
- **Instant Export**: Export cleanly to JSON, CSV, Excel, XML, or connect to Make/Zapier.

---

## 📥 Input Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `topic` | String | `"ai"` | Search keyword or topic (e.g. `agent`, `scraper`, `llm`). |
| `language` | String | `""` | Programming language (e.g. `python`, `typescript`, `rust`). |
| `minStars` | Integer | `100` | Minimum stargazers threshold. |
| `sort` | String | `"stars"` | Sort by `stars`, `forks`, or `updated`. |
| `maxItems` | Integer | `30` | Maximum number of repositories to extract (up to 100). |

---

## 📤 Output Sample

```json
{
  "id": 624738290,
  "name": "auto-gpt",
  "fullName": "Significant-Gravitas/AutoGPT",
  "description": "AutoGPT is the vision of accessible AI for everyone, to use and to build on.",
  "url": "https://github.com/Significant-Gravitas/AutoGPT",
  "stars": 165000,
  "forks": 42000,
  "openIssues": 850,
  "language": "Python",
  "topics": ["ai", "autonomous-agents", "gpt-4", "llm", "python"],
  "owner": {
    "login": "Significant-Gravitas",
    "avatarUrl": "https://avatars.githubusercontent.com/u/130105315?v=4"
  },
  "createdAt": "2023-03-30T10:00:00Z",
  "scrapedAt": "2026-11-17T12:00:00Z"
}
```

---

## 💡 Practical Applications

1. **Tech Scouting**: Track breakout open-source projects before they go mainstream.
2. **Developer Recruiting**: Find creators and maintainers of top libraries in specific niches.
3. **Automated Content**: Build "Top 10 GitHub AI Repos of the Week" newsletters or Twitter/LinkedIn threads.
