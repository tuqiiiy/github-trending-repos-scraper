import { Actor } from 'apify';
import { gotScraping } from 'got-scraping';

await Actor.init();

const input = await Actor.getInput() || {};
const topic = (input.topic || '').trim();
const language = (input.language || '').trim();
const minStars = input.minScore !== undefined ? input.minScore : (input.minStars !== undefined ? input.minStars : 100);
const sort = input.sort || 'stars';
const maxItems = Math.min(input.maxItems || 30, 100);

console.log(`[GitHub Scraper] Starting search - Topic: "${topic}", Language: "${language}", MinStars: ${minStars}, Sort: ${sort}, Limit: ${maxItems}`);

// Build GitHub search query
const queryParts = [];
if (topic) {
    queryParts.push(topic);
}
if (language) {
    queryParts.push(`language:${language}`);
}
queryParts.push(`stars:>=${minStars}`);

const q = queryParts.join(' ');
const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=${sort}&order=desc&per_page=${maxItems}`;

console.log(`[GitHub Scraper] Query URL: ${url}`);

try {
    const response = await gotScraping({
        url,
        headers: {
            'User-Agent': 'Apify-GitHub-Trending-Actor/1.0 (tuqiiiy)',
            'Accept': 'application/vnd.github.v3+json',
        },
        responseType: 'json',
        timeout: { request: 15000 },
    });

    const data = response.body;
    const items = (data.items || []).slice(0, maxItems);

    console.log(`[GitHub Scraper] GitHub returned ${data.total_count || items.length} results. Formatting ${items.length} records...`);

    const records = items.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || null,
        url: repo.html_url,
        homepage: repo.homepage || null,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        language: repo.language || null,
        topics: repo.topics || [],
        license: repo.license ? repo.license.spdx_id || repo.license.name : null,
        owner: {
            login: repo.owner?.login,
            avatarUrl: repo.owner?.avatar_url,
            url: repo.owner?.html_url,
            type: repo.owner?.type,
        },
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        scrapedAt: new Date().toISOString(),
    }));

    if (records.length > 0) {
        await Actor.pushData(records);
        console.log(`[GitHub Scraper] Successfully saved ${records.length} repositories to dataset.`);
    } else {
        console.log('[GitHub Scraper] No repositories matched the search criteria.');
    }

} catch (error) {
    console.error(`[GitHub Scraper] Error:`, error.message);
    throw error;
}

await Actor.exit();
