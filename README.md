# Figma Camera Locations Plugin

## What it does

This is a simple Figma plugin that allows you to save and recall up to four different camera locations (viewport position and zoom level) across your Figma files. This helps you quickly navigate between different areas or zoom levels of your designs without manually panning, zooming, or switching files each time.

## How to Use

1.  **Save a Location:** Navigate to the view you want to save, then call one of the commands "Save Location [1-4]". The first time you save in a file, you will be asked to paste that file's URL so that cross-file recall can jump back to it later. You only need to do this once per file.
2.  **Recall a Location:** Call "Recall Location [1-4]" to instantly return to that saved view.
    *   If the location is in the same file, the viewport and page are restored immediately.
    *   If the location is in a different file, the plugin opens that file's URL and asks you to press the shortcut again once the destination file has loaded. The second press lands you on the saved page and viewport.
3.  **Clean all saved locations:** Wipes all four saved slots and removes the current file's stored URL. Use this if you want to start fresh. The next save in any file will ask for its URL again.

You can also access these commands via the Figma Quick Actions menu (Ctrl+/ or Cmd+/) by typing the name of the command.

### When the URL prompt reappears

The plugin stamps each file with its URL so it only has to ask once. You will only be asked again if:

*   You are saving a location in a file the plugin has never seen before.
*   You ran "Clean all saved locations" in that file, which removes its stored URL.

### Notes & limitations

*   Saved locations are stored per Figma account. If you sign into a different account, you will see an empty set of slots.
*   Cross-file jumps rely on the URL you paste, so make sure it is the canonical file URL (Share > Copy link).
*   The URL you paste is never sent anywhere. The plugin only extracts the file key from it and stores it locally on your machine, alongside the file itself. The full URL is not retained.

## Mapping Shortcuts on macOS (Optional)

If you are using macOS, you can map keyboard shortcuts to Figma plugin menu commands directly through the operating system:

1.  Open **System Settings** (or **System Preferences** on older macOS versions).
2.  Go to **Keyboard** > **Keyboard Shortcuts...** > **App Shortcuts**.
3.  Click the **+** button to add a new shortcut.
4.  Select **Figma.app** from the Application dropdown.
5.  In the **Menu Title** field, enter the *exact* name of the plugin command as it appears in the Figma Plugins menu (e.g., `Save Location 1`, `Recall Location 2`).
6.  In the **Keyboard Shortcut** field, press the key combination you want to assign (e.g., `⌥F1` for Alt+F1).
7.  Click **Add**.
8.  Repeat for each command you want to map.

## Windows Companion AutoHotkey Script (Optional)

The repository also includes an AutoHotkey script (`FigmaCameraLocations.ahk`) for Windows users. This script maps the save and recall actions to function keys for even faster access:

*   `Alt+F1` to `Alt+F4`: Save locations 1 to 4
*   `F1` to `F4`: Recall locations 1 to 4

Feel free to edit the script to remap the shortcuts the way you prefer.

*Note: AutoHotkey must be installed and the script must be running for these hotkeys to work. The way I use it is autostarting it by putting the shortcut from the script in shell:startup. The file `FigmaCameraLocations_AHKv1.ahk` is an alternative version of the script for whoever still uses the old AutoHotkey version, AHK v1.*

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