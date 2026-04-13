declare const __html__: string;

type SavedLocation = {
  center: { x: number; y: number };
  zoom: number;
  pageId?: string;
  fileKey?: string;
  fileName?: string;
};

type PendingRecall = SavedLocation & { index: number; timestamp: number };

const PENDING_KEY = 'cameraLocation_pending';
const PENDING_TTL_MS = 2 * 60 * 1000;
const FILE_URL_RE = /figma\.com\/(?:file|design|board|deck|slides|proto)\/([a-zA-Z0-9]+)/;

function supportsPages() {
  return figma.editorType === 'figma' || figma.editorType === 'dev';
}

function getStampedFileKey(): string | null {
  return figma.root.getPluginData('customFileKey') || null;
}

function stampFileKey(key: string) {
  figma.root.setPluginData('customFileKey', key);
}

function extractFileKey(url: string): string | null {
  const m = url.match(FILE_URL_RE);
  return m ? m[1] : null;
}

function promptForFileUrl(): Promise<string | null> {
  return new Promise((resolve) => {
    figma.showUI(__html__, { width: 340, height: 160, title: 'Figma Camera Locations', themeColors: true });
    figma.ui.onmessage = (msg: { type: string; url?: string; height?: number }) => {
      if (msg.type === 'resize' && msg.height) {
        figma.ui.resize(340, msg.height);
        return;
      }
      figma.ui.close();
      if (msg.type === 'url' && msg.url) resolve(msg.url);
      else resolve(null);
    };
  });
}

async function ensureFileKeyStamped(): Promise<string | null> {
  const existing = getStampedFileKey();
  if (existing) return existing;
  const url = await promptForFileUrl();
  if (!url) return null;
  const key = extractFileKey(url);
  if (!key) return null;
  stampFileKey(key);
  return key;
}

async function saveLocation(index: number) {
  const fileKey = await ensureFileKeyStamped();
  if (!fileKey) {
    figma.notify(`Cannot save Location ${index} without the file URL.`, { error: true });
    return;
  }

  const loc: SavedLocation = {
    center: figma.viewport.center,
    zoom: figma.viewport.zoom,
    fileKey,
    fileName: figma.root.name
  };
  if (supportsPages()) loc.pageId = figma.currentPage.id;

  try {
    await figma.clientStorage.setAsync(`cameraLocation_${index}`, loc);
    figma.notify(`Saved Location ${index}`);
  } catch (err) {
    figma.notify(`Error saving Location ${index}: ${err}`, { error: true });
  }
}

async function applyLocation(saved: SavedLocation, index: number) {
  if (supportsPages() && saved.pageId) {
    const targetPage = await figma.getNodeByIdAsync(saved.pageId);
    if (targetPage && targetPage.type === 'PAGE') {
      if (figma.currentPage.id !== targetPage.id) {
        await figma.setCurrentPageAsync(targetPage);
      }
      figma.viewport.center = saved.center;
      figma.viewport.zoom = saved.zoom;
      figma.notify(`Recalled Location ${index} on page "${targetPage.name}"`);
      return;
    }
    figma.notify(`Page for Location ${index} not found in this file.`, { error: true });
    return;
  }
  figma.viewport.center = saved.center;
  figma.viewport.zoom = saved.zoom;
  figma.notify(`Recalled Location ${index}`);
}

async function recallLocation(index: number) {
  try {
    const saved = await figma.clientStorage.getAsync(`cameraLocation_${index}`) as SavedLocation | undefined;
    if (!saved) {
      figma.notify(`Location ${index} not saved yet.`);
      return;
    }

    const currentKey = getStampedFileKey();

    if (!saved.fileKey || (currentKey && saved.fileKey === currentKey)) {
      await applyLocation(saved, index);
      return;
    }

    if (currentKey && saved.fileKey !== currentKey) {
      const pending: PendingRecall = { ...saved, index, timestamp: Date.now() };
      await figma.clientStorage.setAsync(PENDING_KEY, pending);
      const pageParam = saved.pageId ? `?node-id=${encodeURIComponent(saved.pageId)}` : '';
      const url = `https://www.figma.com/design/${saved.fileKey}/${encodeURIComponent(saved.fileName || 'file')}${pageParam}`;
      figma.openExternal(url);
      figma.notify(`Opening "${saved.fileName || 'file'}" — press the shortcut again once it loads.`, { timeout: 5000 });
      return;
    }

    const pending: PendingRecall = { ...saved, index, timestamp: Date.now() };
    await figma.clientStorage.setAsync(PENDING_KEY, pending);
    const pageParam = saved.pageId ? `?node-id=${encodeURIComponent(saved.pageId)}` : '';
    const url = `https://www.figma.com/design/${saved.fileKey}/${encodeURIComponent(saved.fileName || 'file')}${pageParam}`;
    figma.openExternal(url);
    figma.notify(`Opening "${saved.fileName || 'file'}" — press the shortcut again once it loads.`, { timeout: 5000 });
  } catch (err) {
    figma.notify(`Error recalling Location ${index}: ${err}`, { error: true });
  }
}

async function consumePendingIfMatches(): Promise<boolean> {
  try {
    const pending = await figma.clientStorage.getAsync(PENDING_KEY) as PendingRecall | undefined;
    if (!pending || !pending.fileKey) return false;

    const expired = Date.now() - pending.timestamp > PENDING_TTL_MS;
    if (expired) {
      await figma.clientStorage.deleteAsync(PENDING_KEY);
      return false;
    }

    const currentKey = getStampedFileKey();

    if (currentKey && currentKey !== pending.fileKey) {
      return false;
    }

    if (!currentKey) {
      stampFileKey(pending.fileKey);
    }

    await figma.clientStorage.deleteAsync(PENDING_KEY);
    await applyLocation(pending, pending.index);
    return true;
  } catch {
    return false;
  }
}

async function cleanAllLocations() {
  try {
    const keys = await figma.clientStorage.keysAsync();
    const toDelete = keys.filter(k => k.startsWith('cameraLocation_'));
    for (const k of toDelete) {
      await figma.clientStorage.deleteAsync(k);
    }
    figma.root.setPluginData('customFileKey', '');
    figma.notify(`Cleared ${toDelete.length} saved location${toDelete.length === 1 ? '' : 's'}.`);
  } catch (err) {
    figma.notify(`Error clearing locations: ${err}`, { error: true });
  }
}

async function main() {
  const consumed = await consumePendingIfMatches();
  if (consumed) {
    figma.closePlugin();
    return;
  }

  switch (figma.command) {
    case 'save1': await saveLocation(1); break;
    case 'save2': await saveLocation(2); break;
    case 'save3': await saveLocation(3); break;
    case 'save4': await saveLocation(4); break;
    case 'recall1': await recallLocation(1); break;
    case 'recall2': await recallLocation(2); break;
    case 'recall3': await recallLocation(3); break;
    case 'recall4': await recallLocation(4); break;
    case 'cleanAll': await cleanAllLocations(); break;
    default: figma.notify('Unknown command');
  }
  figma.closePlugin();
}

main();
export {};
