async function saveLocation(index: number) {
  const currentLocation: { center: { x: number; y: number }; zoom: number; pageId?: string } = {
    center: figma.viewport.center,
    zoom: figma.viewport.zoom
  };
  if (figma.editorType === 'figma' || figma.editorType === 'dev') {
    currentLocation.pageId = figma.currentPage.id;
  }
  const key = `cameraLocation_${index}`;
  try {
    await figma.clientStorage.setAsync(key, currentLocation);
    figma.notify(`Saved Location ${index}`);
  } catch (err) {
    figma.notify(`Error saving Location ${index}: ${err}`, { error: true });
  }
}

async function recallLocation(index: number) {
  const key = `cameraLocation_${index}`;
  try {
    const savedLocation = await figma.clientStorage.getAsync(key) as { center: { x: number; y: number }; zoom: number; pageId?: string };
    if (savedLocation) {
      if ((figma.editorType === 'figma' || figma.editorType === 'dev') && savedLocation.pageId) {
        const targetPage = await figma.getNodeByIdAsync(savedLocation.pageId);

        if (targetPage && targetPage.type === 'PAGE') {
          if (figma.currentPage.id !== targetPage.id) {
            await figma.setCurrentPageAsync(targetPage);
          }
          figma.viewport.center = savedLocation.center;
          figma.viewport.zoom = savedLocation.zoom;
          figma.notify(`Recalled Location ${index} on page "${targetPage.name}"`);
        } else {
          figma.notify(`Could not find the page associated with Location ${index}. Recalling view on current page.`);
          figma.viewport.center = savedLocation.center;
          figma.viewport.zoom = savedLocation.zoom;
        }
      } else {
        figma.viewport.center = savedLocation.center;
        figma.viewport.zoom = savedLocation.zoom;
        figma.notify(`Recalled Location ${index}`);
      }
    } else {
      figma.notify(`Location ${index} not saved yet.`);
    }
  } catch (err) {
    figma.notify(`Error recalling Location ${index}: ${err}`, { error: true });
  }
}

async function main() {
    switch (figma.command) {
      case 'save1':
        await saveLocation(1);
        break;
      case 'save2':
        await saveLocation(2);
        break;
      case 'save3':
        await saveLocation(3);
        break;
      case 'save4':
        await saveLocation(4);
        break;
      case 'recall1':
        await recallLocation(1);
        break;
      case 'recall2':
        await recallLocation(2);
        break;
      case 'recall3':
        await recallLocation(3);
        break;
      case 'recall4':
        await recallLocation(4);
        break;
      default:
        figma.notify('Unknown command');
    }
    figma.closePlugin();
  }

main();
export {};