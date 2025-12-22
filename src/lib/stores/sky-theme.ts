import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

export type ThemeMode = 'light' | 'dark' | 'system' | 'sky';

// Store for the current theme mode
export const themeMode = writable<ThemeMode>('sky');

// Store for the current sky colors (updated every minute)
export const skyColors = writable<{
    background: string;
    solidColor: string;
    isDark: boolean;
}>({
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    solidColor: '#16213e',
    isDark: true
});

// Sky color configurations for different times of day
interface SkyColorConfig {
    hour: number;
    colors: string[];
    isDark: boolean;
}

const skyConfigs: SkyColorConfig[] = [
    // Midnight (0:00) - Deep night
    { hour: 0, colors: ['#0a0a1a', '#0f0f2a', '#141430'], isDark: true },
    // Late night (3:00)
    { hour: 3, colors: ['#0d0d20', '#121230', '#181840'], isDark: true },
    // Pre-dawn (5:00) - First hints of light
    { hour: 5, colors: ['#1a1a3a', '#2d2d5a', '#3d3d6a'], isDark: true },
    // Dawn (6:00) - Golden hour begins
    { hour: 6, colors: ['#2d2d5a', '#6b4984', '#c76b6b', '#f0a070'], isDark: true },
    // Sunrise (7:00) - Beautiful sunrise colors
    { hour: 7, colors: ['#4a4a80', '#d17878', '#f4a460', '#ffd89b'], isDark: false },
    // Early morning (8:00)
    { hour: 8, colors: ['#87CEEB', '#a8d8ea', '#c8e8f8'], isDark: false },
    // Morning (9:00)
    { hour: 9, colors: ['#6bb3d9', '#87CEEB', '#a8d8ea'], isDark: false },
    // Late morning (10:00)
    { hour: 10, colors: ['#5aa5d0', '#7ac2e5', '#98d4f0'], isDark: false },
    // Midday (12:00) - Brightest
    { hour: 12, colors: ['#4a9bc8', '#6bb3d9', '#87CEEB'], isDark: false },
    // Early afternoon (14:00)
    { hour: 14, colors: ['#5aa5d0', '#7ac2e5', '#98d4f0'], isDark: false },
    // Afternoon (16:00)
    { hour: 16, colors: ['#6bb3d9', '#8fc4e8', '#b0d8f0'], isDark: false },
    // Late afternoon (17:00) - Golden hour starts
    { hour: 17, colors: ['#87CEEB', '#c9a87c', '#e8b87c'], isDark: false },
    // Sunset (18:00) - Beautiful sunset
    { hour: 18, colors: ['#6b7b9a', '#d17878', '#f4a460', '#ffd89b'], isDark: false },
    // Dusk (19:00)
    { hour: 19, colors: ['#4a4a80', '#8b5a8b', '#c76b6b', '#d48872'], isDark: true },
    // Twilight (20:00)
    { hour: 20, colors: ['#2d2d5a', '#4a4a80', '#6b4984'], isDark: true },
    // Evening (21:00)
    { hour: 21, colors: ['#1a1a3a', '#2d2d5a', '#3d3d6a'], isDark: true },
    // Night (22:00)
    { hour: 22, colors: ['#121225', '#1a1a35', '#222245'], isDark: true },
    // Late night (23:00)
    { hour: 23, colors: ['#0d0d1a', '#121228', '#171735'], isDark: true }
];

// Helper function to interpolate between two colors
function interpolateColor(color1: string, color2: string, factor: number): string {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);

    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Interpolate between two color arrays
function interpolateColorArray(colors1: string[], colors2: string[], factor: number): string[] {
    const maxLength = Math.max(colors1.length, colors2.length);
    const result: string[] = [];

    for (let i = 0; i < maxLength; i++) {
        const c1 = colors1[Math.min(i, colors1.length - 1)];
        const c2 = colors2[Math.min(i, colors2.length - 1)];
        result.push(interpolateColor(c1, c2, factor));
    }

    return result;
}

// Get sky configuration for a specific time
function getSkyColorsForTime(date: Date): { background: string; solidColor: string; isDark: boolean } {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const currentTime = hour + minutes / 60;

    // Find the two configs to interpolate between
    let prevConfig = skyConfigs[skyConfigs.length - 1];
    let nextConfig = skyConfigs[0];

    for (let i = 0; i < skyConfigs.length; i++) {
        if (skyConfigs[i].hour <= hour) {
            prevConfig = skyConfigs[i];
            nextConfig = skyConfigs[(i + 1) % skyConfigs.length];
        }
    }

    // Calculate interpolation factor
    let prevHour = prevConfig.hour;
    let nextHour = nextConfig.hour;

    // Handle wrap-around at midnight
    if (nextHour < prevHour) {
        nextHour += 24;
        if (currentTime < prevHour) {
            prevHour -= 24;
        }
    }

    const hourDiff = nextHour - prevHour;
    const factor = hourDiff === 0 ? 0 : (currentTime - prevHour) / hourDiff;

    // Interpolate colors
    const interpolatedColors = interpolateColorArray(prevConfig.colors, nextConfig.colors, factor);

    // Create gradient
    const gradientStops = interpolatedColors
        .map((color, i) => `${color} ${(i / (interpolatedColors.length - 1)) * 100}%`)
        .join(', ');

    const background = `linear-gradient(180deg, ${gradientStops})`;

    // Use the middle color as the solid background for elements
    const middleIndex = Math.floor(interpolatedColors.length / 2);
    const solidColor = interpolatedColors[middleIndex];

    // Determine if dark mode should be active
    // Use a smooth transition for dark mode too
    const isDark = factor < 0.5 ? prevConfig.isDark : nextConfig.isDark;

    return { background, solidColor, isDark };
}

// Update sky colors based on current time
export function updateSkyColors(): void {
    const now = new Date();
    const colors = getSkyColorsForTime(now);
    skyColors.set(colors);
}

// Initialize sky mode and set up interval updates
let intervalId: number | null = null;

export function initSkyMode(): void {
    if (!browser) return;

    // Update immediately
    updateSkyColors();

    // Update every 30 seconds for smooth transitions
    if (intervalId === null) {
        intervalId = window.setInterval(updateSkyColors, 30000);
    }
}

export function cleanupSkyMode(): void {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Persistence functions
const STORAGE_KEY = 'theme-mode';

export function loadThemeMode(): ThemeMode {
    if (!browser) return 'sky';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system' || stored === 'sky') {
        return stored;
    }
    return 'sky';
}

export function saveThemeMode(mode: ThemeMode): void {
    if (!browser) return;
    localStorage.setItem(STORAGE_KEY, mode);
}

// Apply the theme to the document
export function applyTheme(mode: ThemeMode, skyIsDark: boolean = true, skySolidColor?: string): void {
    if (!browser) return;

    const html = document.documentElement;

    switch (mode) {
        case 'light':
            html.classList.remove('dark');
            // Reset to default light background
            html.style.removeProperty('--background');
            break;
        case 'dark':
            html.classList.add('dark');
            // Reset to default dark background
            html.style.removeProperty('--background');
            break;
        case 'system':
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
            // Reset to default background
            html.style.removeProperty('--background');
            break;
        case 'sky':
            if (skyIsDark) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
            // Set the --background CSS variable to the current sky color
            if (skySolidColor) {
                html.style.setProperty('--background', skySolidColor);
            }
            break;
    }
}
