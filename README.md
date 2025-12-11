# 🧹 AESORTER

**Project Organizer for Adobe After Effects**

![Version](https://img.shields.io/badge/version-2.5-blue.svg) ![Platform](https://img.shields.io/badge/platform-After%20Effects-purple.svg) ![Tech](https://img.shields.io/badge/built%20with-React%20%2B%20Tailwind-06b6d4.svg)

**AESORTER** is a lightweight, production-ready extension that instantly organizes your chaotic Project Panel.

---

## ✨ Features

*   **📂 Smart Sorting:** Automatically detects and moves items into specific folders:
    *   Compositions
    *   Footage (Video)
    *   Audio / Sound FX
    *   Images / Stills
    *   Solids
    *   3D Models (`.obj`, `.glb`, `.c4d`)
    *   Vectors (`.ai`, `.svg`, `.eps`) (In the future after effects 2026)
*   **🎯 Sort Selected Only:** Imported a mess of files into an organized project? Select them and click "Sort Selected Only" to organize just those files without touching your existing structure.
*   **🧹 Deep Cleaning:** Optional setting to **delete unused footage** (items not used in any composition) to keep your project file light.
*   **⚙️ Fully Customizable:** Don’t like the folder names? Rename them in Settings and hit **Save**.
*   **🎨 UI:** A modern, dark-themed interface that matches After Effects, featuring smooth animations, tooltips, and my favourite gear spin.

---

## 🚀 Installation

Since this is a raw CEP extension (not a `.zxp` installer), you need to install it manually.

### 1. Enable Unsigned Extensions
**(I think you already have it all turned on after installing other stuff, so you can skip it.)**

You must tell After Effects to allow custom extensions.
*   **Windows:** Open Registry Editor (`regedit`), go to `HKEY_CURRENT_USER/Software/Adobe/CSXS.9`, and add a String key named `PlayerDebugMode` with value `1`.
*   **Mac:** Open Terminal and type: `defaults write com.adobe.CSXS.9 PlayerDebugMode 1`

### 2. Copy the Folder
Move the entire `aeSorter` folder into the Adobe extensions directory:

*   **Windows:** `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`
*   **Mac:** `/Library/Application Support/Adobe/CEP/extensions/`

### 3. Launch
Restart After Effects. Go to **Window > Extensions > AESORTER**.

---

## 🎮 How to Use

### The Main Buttons
1.  **SORT ALL PROJECT (Blue Button):** Scans your entire project panel and organizes every single item into folders.
2.  **SORT SELECTED ONLY (Gray Button):** Only organizes the items you currently have highlighted/selected in the Project Panel.
3.  **Gear Icon:** Opens the settings panel.

### The Settings
Hover over the settings in the app to see tooltips!

*   **Folder Names:** Rename default folders (e.g., change `01_COMPS` to `_Compositions`).
*   **3D / Vector Extensions:** Define which file types go into special folders.
*   **Delete Unused Items:** ⚠️ **Careful!** This will remove any footage not placed in a timeline.
*   **Subfolders by Extension:** If enabled, creates subfolders like `MP4`, `PNG`, `WAV` inside the main folders.
*   **Separate Precomps:** Moves nested compositions (pre-comps) into a separate folder to keep your main Comps folder clean.
*   **Ignore:** A folder name that the sorter will never touch (useful for assets you want to keep manually organized).

---

## 🛠 Tech Stack

This extension is built with a modern "No-Bundler" approach for maximum simplicity and ease of editing:
*   **UI:** React 18 (loaded via UMD), Tailwind CSS (via CDN).
*   **Logic:** Babel Standalone (compiles JSX in-browser).
*   **Host:** Adobe ExtendScript (`.jsx`) for communicating with After Effects.

---

## ❓ Troubleshooting

**The panel is blank?**
Make sure your computer is connected to the internet. The extension loads React and Tailwind from a CDN (Unpkg/TailwindCDN).

**"Extension could not be loaded" error?**
Double-check the "Enable Unsigned Extensions" step in the Installation guide. You likely missed the `PlayerDebugMode` registry key.

---

Created by **Chris Kyarov** and **Gemini**
