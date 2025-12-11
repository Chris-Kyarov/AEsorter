// host/index.jsx

// Эта функция будет вызываться из HTML
function runSmartSort(configString) {
    try {
        // 1. Превращаем строку настроек от HTML обратно в объект
        var cfg = JSON.parse(configString);
        var isSelectedOnly = (cfg.selectedOnly === true);

        app.beginUndoGroup("CEP Smart Sort");

        // 2. Логика удаления неиспользуемого
        if (cfg.delUnused === true && !isSelectedOnly) {
            try { app.project.removeUnusedFootage(); } catch(e) {}
        }

        var proj = app.project;
        var folderCache = {};

        // === Вспомогательные функции ===

        // Проверка, является ли item настоящей папкой
        function isFolder(item) {
            if (!item) return false;
            // Проверка instanceof + наличие свойства numItems (есть только у папок и композиций, но у папок нет слоев)
            // И у папок нет mainSource
            return (item instanceof FolderItem && item.numItems !== undefined);
        }

        // Рекурсивная проверка игнора (проверяет всех родителей до корня)
        function isIgnored(item, ignoreName) {
            if (!ignoreName) return false;
            var current = item.parentFolder;
            while (current && !(current instanceof Project)) {
                if (current.name === ignoreName) return true;
                current = current.parentFolder;
            }
            return false;
        }

        function getFolder(name) {
            if (!name) return null;
            
            // 1. Проверяем кэш
            if (folderCache[name]) {
                var cached = folderCache[name];
                // Убеждаемся, что объект в кэше всё еще валиден и это папка
                try {
                    if (isFolder(cached)) return cached;
                } catch(e) {
                    delete folderCache[name]; // Объект протух
                }
            }

            // 2. Ищем в корне (или во всем проекте, но лучше по top-level для скорости, но AE плоский список обычно)
            // Ищем существующую папку
            for (var i = 1; i <= proj.numItems; i++) {
                var item = proj.item(i);
                if (isFolder(item) && item.name === name) {
                    folderCache[name] = item;
                    return item;
                }
            }

            // 3. Фикс для Solids (переименование стандартной папки)
            if (name === cfg.f_solids) {
                for (var i = 1; i <= proj.numItems; i++) {
                    var item = proj.item(i);
                    // Ищем папку "Solids", которая не наша целевая (мы её уже искали выше)
                    if (isFolder(item) && item.name === "Solids") {
                        item.name = name;
                        folderCache[name] = item;
                        return item;
                    }
                }
            }

            // 4. Если не нашли - создаем
            var f = proj.items.addFolder(name);
            folderCache[name] = f;
            return f;
        }

        function getSubFolder(parentFolder, subName) {
            // Защита: если родитель вдруг не папка
            if (!isFolder(parentFolder)) return parentFolder; 

            // Ищем подпапку
            for (var i = 1; i <= parentFolder.numItems; i++) {
                var item = parentFolder.item(i);
                if (isFolder(item) && item.name === subName) return item;
            }

            // Создаем, если нет
            var newSub = proj.items.addFolder(subName);
            newSub.parentFolder = parentFolder;
            return newSub;
        }

        function makeExtArray(str) {
            var safeStr = String(str || ""); 
            return safeStr.toLowerCase().replace(/\s/g, '').split(',');
        }

        var exts3D = makeExtArray(cfg.ext_3d);
        var extsVec = makeExtArray(cfg.ext_vector);

        function getFileExtension(name) {
            var parts = name.split('.');
            if (parts.length > 1) return parts[parts.length-1].toLowerCase();
            return "";
        }

        // --- ГЛАВНЫЙ ЦИКЛ ---
        var items = [];
        
        if (isSelectedOnly) {
            var selection = proj.selection;
            for (var i = 0; i < selection.length; i++) {
                items.push(selection[i]);
            }
        } else {
            for (var i = 1; i <= proj.numItems; i++) {
                items.push(proj.item(i));
            }
        }

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            
            // Базовые проверки валидности
            if (!item) continue;
            // Не сортируем сами папки
            if (item instanceof FolderItem) continue;
            
            // Проверка Игнора (Рекурсивная)
            if (isIgnored(item, cfg.ignore)) continue;

            var targetName = null;
            var extension = "";

            // Определение типа и цели
            if (item instanceof CompItem) {
                if (cfg.sepPrecomps === true && item.usedIn.length > 0) targetName = cfg.f_precomps;
                else targetName = cfg.f_comps;
            }
            else if (item instanceof FootageItem) {
                var src = item.mainSource;
                if (!src) continue; // Бывает для странных placeholder

                if (src instanceof SolidSource) targetName = cfg.f_solids;
                else if (src instanceof FileSource || src instanceof PlaceholderSource) {
                    var ext = getFileExtension(item.name);
                    if (src.file) ext = getFileExtension(src.file.name);
                    extension = ext;

                    var is3D = false; for(var x=0; x<exts3D.length; x++) if(ext === exts3D[x]) is3D = true;
                    var isVec = false; for(var x=0; x<extsVec.length; x++) if(ext === extsVec[x]) isVec = true;

                    if (is3D) targetName = cfg.f_3d;
                    else if (isVec) targetName = cfg.f_vector;
                    else if (!item.hasVideo && item.hasAudio) targetName = cfg.f_audio;
                    else if (item.hasVideo && !src.isStill) targetName = cfg.f_video;
                    else if (src.isStill) targetName = cfg.f_images;
                    else targetName = cfg.f_others;
                }
            }

            // Перемещение
            if (targetName) {
                try {
                    var finalFolder = getFolder(targetName);
                    
                    // Сабфолдеры
                    if (cfg.subfolders === true && extension !== "") {
                         // Не создаем сабфолдеры в Солидах, Компах и Прекомпах (обычно это мусор)
                         if (targetName !== cfg.f_solids && targetName !== cfg.f_comps && targetName !== cfg.f_precomps) {
                            finalFolder = getSubFolder(finalFolder, extension);
                        }
                    }

                    // Финальная проверка перед перемещением
                    // Мы проверяем isFolder(finalFolder), чтобы не крашнуться с ошибкой "FootageItem is not correct type"
                    if (finalFolder && isFolder(finalFolder) && item.parentFolder !== finalFolder) {
                        item.parentFolder = finalFolder;
                    }
                } catch(e) {
                    // Ловим ошибку для конкретного файла, чтобы не прерывать весь скрипт
                    // $.writeln("Error moving item: " + item.name + " -> " + e.toString());
                }
            }
        }

        app.endUndoGroup();
        return "Done";

    } catch(err) {
        alert("CEP Error: " + err.toString());
    }
}