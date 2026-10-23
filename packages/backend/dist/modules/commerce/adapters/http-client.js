import { execSync } from 'child_process';
export async function fetchJsonSafely(url, timeoutMs = 8000) {
    // 1. Try standard fetch first
    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);
        const res = await fetch(url, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) UniversalCommerceChatbot/1.0'
            }
        });
        clearTimeout(id);
        if (res.ok) {
            return (await res.json());
        }
    }
    catch (e) {
        // Fall through to system curl
    }
    // 2. Fallback to system curl (bypasses Windows Node socket timeouts)
    try {
        const cmd = `curl.exe -s --max-time 10 "${url}"`;
        const output = execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString('utf-8');
        if (output && (output.startsWith('[') || output.startsWith('{'))) {
            return JSON.parse(output);
        }
    }
    catch (err) {
        console.warn(`[fetchJsonSafely] Both fetch and curl failed for ${url}:`, err);
    }
    return null;
}
