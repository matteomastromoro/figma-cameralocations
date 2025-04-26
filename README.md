# Figma Camera Locations Plugin

## What it does

This is a simple Figma plugin that allows you to save and recall up to four different camera locations (viewport Location and zoom level) within your Figma canvas. This helps you quickly navigate between different areas or zoom levels of your design without manually panning and zooming each time.

## How to Use

1.  **Save a Location:** Navigate to the view you want to save, then call one of the commands "Save Location [1-4]".
2.  **Recall a Location:** Call the "Recall Location [1-4]" to instantly return to that saved view.

You can also access these commands via the Figma Quick Actions menu (Ctrl+/ or Cmd+/) by typing the name of the command.

## Windows Companion AutoHotkey Script (Optional)

The repository also includes an AutoHotkey script (`FigmaCameraLocations.ahk`) for Windows users. This script maps the save and recall actions to function keys for even faster access:

*   `Alt+F1` to `Alt+F4`: Save locations 1 to 4
*   `F1` to `F4`: Recall locations 1 to 4

Feel free to edit the script to remap the shortcuts the way you prefer.

*Note: AutoHotkey must be installed and the script must be running for these hotkeys to work.*

## Mapping Shortcuts on macOS (Alternative)

If you are using macOS, you can map keyboard shortcuts to Figma plugin menu commands directly through the operating system:

1.  Open **System Settings** (or **System Preferences** on older macOS versions).
2.  Go to **Keyboard** > **Keyboard Shortcuts...** > **App Shortcuts**.
3.  Click the **+** button to add a new shortcut.
4.  Select **Figma.app** from the Application dropdown.
5.  In the **Menu Title** field, enter the *exact* name of the plugin command as it appears in the Figma Plugins menu (e.g., `Save Location 1`, `Recall Location 2`).
6.  In the **Keyboard Shortcut** field, press the key combination you want to assign (e.g., `⌥F1` for Alt+F1).
7.  Click **Add**.
8.  Repeat for each command you want to map.

This allows you to trigger the save/recall actions using your preferred shortcuts without needing an external script on macOS.

## Development

If you want to modify or extend this plugin:

1.  **Fork & Clone:** Fork this repository on GitHub and clone your fork locally.
2.  **Install Dependencies:** Open a terminal in the project directory and run `npm install`.
3.  **Build:** Run `npm run build` to compile the TypeScript code into JavaScript (`dist/code.js`). You can also run `npm run watch` to automatically rebuild when you make changes to the source files (`src/code.ts`).
4.  **Load in Figma:**
    *   Open Figma.
    *   Go to **Plugins** > **Development** > **Import plugin from manifest...**
    *   Select the `manifest.json` file located in the project directory.
5.  **Develop:** Make your changes in the `src/code.ts` file. The plugin will automatically update in Figma if you are using `npm run watch`. Otherwise, run `npm run build` after making changes.

## License

This project is provided as-is. You are completely free to use, modify, distribute, or do whatever you want with this code. No attribution is required. Consider it public domain or under an extremely permissive license like MIT or Unlicense.