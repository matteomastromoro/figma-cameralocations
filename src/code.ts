const uiWidth = 200; // Adjusted width for button layout
const defaultHeight = 200; // Adjusted height for buttons

// Function to save the current camera position
async function savePosition(index: number) {
  const currentPosition = {
    center: figma.viewport.center,
    zoom: figma.viewport.zoom
  };
  const key = `cameraPosition_${index}`;
  try {
    await figma.clientStorage.setAsync(key, currentPosition);
    figma.notify(`Saved position ${index}`);
  } catch (err) {
    figma.notify(`Error saving position ${index}: ${err}`, { error: true });
  }
}

// Function to recall a saved camera position
async function recallPosition(index: number) {
  const key = `cameraPosition_${index}`;
  try {
    const savedPosition = await figma.clientStorage.getAsync(key) as { center: { x: number; y: number }; zoom: number };
    if (savedPosition) {
      figma.viewport.center = savedPosition.center;
      figma.viewport.zoom = savedPosition.zoom;
      figma.notify(`Recalled position ${index}`);
    } else {
      figma.notify(`Position ${index} not saved yet.`);
    }
  } catch (err) {
    figma.notify(`Error recalling position ${index}: ${err}`, { error: true });
  }
}

// Main plugin logic
async function main() {
  // Check if the plugin was launched via a menu command
  if (figma.command) {
    switch (figma.command) {
      case 'save1':
        await savePosition(1);
        break;
      case 'save2':
        await savePosition(2);
        break;
      case 'save3':
        await savePosition(3);
        break;
      case 'save4':
        await savePosition(4);
        break;
      case 'recall1':
        await recallPosition(1);
        break;
      case 'recall2':
        await recallPosition(2);
        break;
      case 'recall3':
        await recallPosition(3);
        break;
      case 'recall4':
        await recallPosition(4);
        break;
      default:
        figma.notify('Unknown command');
    }
    // Close the plugin after executing the command
    figma.closePlugin();
  } else {
    // If launched without a command, show the UI
    figma.showUI(__html__, { themeColors: true, title: "Camera Locations", width: uiWidth, height: defaultHeight });

    // Setup message handling for the UI
    figma.ui.onmessage = async (msg) => {
      switch (msg.type) {
        case 'save-position':
          await savePosition(msg.index);
          // Optional: Keep UI open or close after action
          // figma.closePlugin();
          break;
        case 'recall-position':
          await recallPosition(msg.index);
          // Optional: Keep UI open or close after action
          // figma.closePlugin();
          break;
        case 'setheight':
          const newHeight = Math.max(defaultHeight, Math.min(msg.height, 800));
          figma.ui.resize(uiWidth, newHeight);
          break;
        case 'cancel': // If you add a cancel button to the UI
          figma.closePlugin();
          break;
        default:
          console.log("Unknown message type received:", msg.type);
      }
    };
  }
}

// Run the main logic
main();

// Make sure to export something even if it's empty
export {};