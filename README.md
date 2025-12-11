## ℹ️ INFO / Информация

<details>
<summary><strong>English (click to expand)</strong></summary>

# 🧹 AESORTER

**Project Organizer for Adobe After Effects**

![Version](https://img.shields.io/badge/version-2.5-blue.svg) ![Platform](https://img.shields.io/badge/platform-After%20Effects-purple.svg) ![Tech](https://img.shields.io/badge/built%20with-React%20%2B%20Tailwind-06b6d4.svg)

**AESORTER** is a lightweight, extension that instantly organizes your chaotic Project Panel.

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
<details>
<summary>I think you already have it all turned on to on after installing other stuff, so you can skip it.</summary> 

You must tell After Effects to allow custom extensions.
*   **Windows:** Open Registry Editor (`regedit`), go to `HKEY_CURRENT_USER/Software/Adobe/CSXS.9`, and add a String key named `PlayerDebugMode` with value `1`.
*   **Mac:** Open Terminal and type: `defaults write com.adobe.CSXS.9 PlayerDebugMode 1` 
</details>

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

</details>

<details>
<summary><strong>Русский (нажмите для раскрытия)</strong></summary>

# 🧹 AESORTER

**Организатор проектов для Adobe After Effects**

![Version](https://img.shields.io/badge/version-2.5-blue.svg) ![Platform](https://img.shields.io/badge/platform-After%20Effects-purple.svg) ![Tech](https://img.shields.io/badge/built%20with-React%20%2B%20Tailwind-06b6d4.svg)

**AESORTER** — это лёгкое расширение, которое мгновенно наведет порядок в проекте.

---

## ✨ Функции

*   **📂 Умная сортировка:** Автоматически определяет и перемещает элементы в соответствующие папки:
    *   Композиции
    *   Видео (Footage)
    *   Аудио / Звуковые эффекты
    *   Изображения / Стиллы
    *   Solids (сплошные цвета)
    *   3D-модели (`.obj`, `.glb`, `.c4d`)
    *   Векторы (`.ai`, `.svg`, `.eps`) (в будущем, после After Effects 2026)
*   **🎯 Сортировка только выбранного:** Импортировали кучу файлов в уже организованный проект? Выделите их и нажмите «Sort Selected Only», чтобы упорядочить только эти файлы, не трогая существующую структуру.
*   **🧹 Глубокая очистка:** Опциональная настройка для **удаления неиспользуемых материалов** (элементов, не используемых ни в одной композиции), чтобы проект оставался лёгким.
*   **⚙️ Полная кастомизация:** Не нравятся названия папок? Переименуйте их в настройках и нажмите **Save**.
*   **🎨 Интерфейс:** Современный тёмный интерфейс, соответствующий стилю After Effects, с плавными анимациями, подсказками и любимой анимацией шестерёнки.

---

## 🚀 Установка

Поскольку это сырое CEP-расширение (не установщик `.zxp`), установка выполняется вручную.

### 1. Включение неподписанных расширений
<details>
<summary>Вероятно, у вас уже всё включено после установки других расширений, так что можно пропустить.</summary> 

Необходимо разрешить After Effects загружать кастомные расширения.
*   **Windows:** Откройте редактор реестра (`regedit`), перейдите в `HKEY_CURRENT_USER\Software\Adobe\CSXS.9`, добавьте строковый ключ `PlayerDebugMode` со значением `1`.
*   **Mac:** Откройте Terminal и введите: `defaults write com.adobe.CSXS.9 PlayerDebugMode 1` 
</details>

### 2. Копирование папки
Переместите всю папку `aeSorter` в директорию расширений Adobe:

*   **Windows:** `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`
*   **Mac:** `/Library/Application Support/Adobe/CEP/extensions/`

### 3. Запуск
Перезапустите After Effects. Перейдите в **Window > Extensions > AESORTER**.

---

## 🎮 Как использовать

### Основные кнопки
1.  **SORT ALL PROJECT (Синяя кнопка):** Сканирует всю панель проекта и организует каждый элемент в папки.
2.  **SORT SELECTED ONLY (Серая кнопка):** Организует только выделенные в панели проекта элементы.
3.  **Значок шестерёнки:** Открывает панель настроек.

### Настройки
Наведите курсор на элементы настроек, чтобы увидеть подсказки!

*   **Названия папок:** Переименуйте стандартные папки (например, измените `01_COMPS` на `_Compositions`).
*   **Расширения для 3D / Векторов:** Определите, какие типы файлов попадут в специальные папки.
*   **Удаление неиспользуемых элементов:** ⚠️ **Осторожно!** Это удалит материалы, не размещённые на таймлайне.
*   **Подпапки по расширениям:** Если включено, создаёт подпапки вроде `MP4`, `PNG`, `WAV` внутри основных папок.
*   **Отдельные прекомпы:** Перемещает вложенные композиции (pre-comps) в отдельную папку, чтобы основная папка Comps оставалась чистой.
*   **Игнорировать:** Название папки, которую сортировщик никогда не тронет (полезно для вручную организованных ассетов).

---

## 🛠 Технологии

Расширение построено с современным подходом «No-Bundler» для максимальной простоты и удобства редактирования:
*   **UI:** React 18 (загружается через UMD), Tailwind CSS (через CDN).
*   **Логика:** Babel Standalone (компиляция JSX в браузере).
*   **Хост:** Adobe ExtendScript (`.jsx`) для взаимодействия с After Effects.

---

## ❓ Устранение неполадок

**Панель пустая?**
Убедитесь, что компьютер подключён к интернету. Расширение загружает React и Tailwind с CDN (Unpkg/TailwindCDN).

**Ошибка «Extension could not be loaded»?**
Ещё раз проверьте шаг «Включение неподписанных расширений». Вероятно, пропущен ключ реестра `PlayerDebugMode`.

---

Создано **Chris Kyarov** и **Gemini**

</details>
