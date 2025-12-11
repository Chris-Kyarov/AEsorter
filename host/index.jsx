// host/index.jsx

// Эта функция будет вызываться из HTML
function runSmartSort(configString) {
    try {
        // 1. Превращаем строку настроек от HTML обратно в объект
        var cfg = JSON.parse(configString);
        var isSelectedOnly = (cfg.selectedOnly === true);

        app.beginUndoGroup("CEP Smart Sort");

        // 2. Логика удаления неиспользуемого
        // (Только если мы сортируем ВЕСЬ проект, чтобы случайно не удалить нужное при сортировке выделенного)
        if (cfg.delUnused === true && !isSelectedOnly) {
            try { app.project.removeUnusedFootage(); } catch(e) {}
        }

        var proj = app.project;
        var folderCache = {};

        // Вспомогательные функции
        function getFolder(name) {
            if (!name) return null;
            if (folderCache[name]) return folderCache[name];
            for (var i = 1; i <= proj.numItems; i++) {
                if (proj.item(i) instanceof FolderItem && proj.item(i).name === name) {
                    folderCache[name] = proj.item(i);
                    return proj.item(i);
                }
            }
            // Фикс для Solids
            if (name === cfg.f_solids) {
                for (var i = 1; i <= proj.numItems; i++) {
                    if (proj.item(i) instanceof FolderItem && proj.item(i).name === "Solids") {
                        proj.item(i).name = name;
                        folderCache[name] = proj.item(i);
                        return proj.item(i);
                    }
                }
            }
            var f = proj.items.addFolder(name);
            folderCache[name] = f;
            return f;
        }

        function getSubFolder(parentFolder, subName) {
            for (var i = 1; i <= parentFolder.numItems; i++) {
                var item = parentFolder.item(i);
                if (item instanceof FolderItem && item.name === subName) return item;
            }
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
            // Если выбрана сортировка только выделенного
            var selection = proj.selection;
            for (var i = 0; i < selection.length; i++) {
                items.push(selection[i]);
            }
        } else {
            // Если весь проект
            for (var i = 1; i <= proj.numItems; i++) {
                items.push(proj.item(i));
            }
        }

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (!item) continue;
            if (item instanceof FolderItem) continue;
            
            // Игнор папка
            if (item.parentFolder && item.parentFolder.name === cfg.ignore) continue;

            var targetName = null;
            var extension = "";

            if (item instanceof CompItem) {
                if (cfg.sepPrecomps === true && item.usedIn.length > 0) targetName = cfg.f_precomps;
                else targetName = cfg.f_comps;
            }
            else if (item instanceof FootageItem) {
                var src = item.mainSource;
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

            if (targetName) {
                var finalFolder = getFolder(targetName);
                if (cfg.subfolders === true && extension !== "") {
                     if (targetName !== cfg.f_solids && targetName !== cfg.f_comps && targetName !== cfg.f_precomps) {
                        finalFolder = getSubFolder(finalFolder, extension);
                    }
                }
                if (item.parentFolder !== finalFolder) item.parentFolder = finalFolder;
            }
        }

        app.endUndoGroup();
        return "Done"; // Возвращаем ответ в HTML

    } catch(err) {
        alert("CEP Error: " + err.toString());
    }
}