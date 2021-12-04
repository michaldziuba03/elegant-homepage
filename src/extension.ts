export function isWebExt(permission?: string) {
    if (!window.browser) {
        return false;
    }

    if (window.browser && !permission) {
        return true;
    }

    if (window.browser && window.browser[permission!]) {
        return true;
    }

    return false;
}

export async function getDefaultEngine() {
    const engines = await window.browser.search.get() as any[];
    return engines.find(item => item.isDefault)
}

export async function searchWithDefaultEngine(q: string) {
    const tab = await window.browser.tabs.getCurrent();
    window.browser.search.search({
        query: q,
        tabId: tab.id,
    });
}