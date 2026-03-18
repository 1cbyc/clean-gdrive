function moveDuplicateFilesInFolder() {
  const folderId = 'PASTE_YOUR_FOLDER_ID_HERE';
  const folder = DriveApp.getFolderById(folderId);

  let reviewFolder;
  const existing = folder.getFoldersByName('Review Duplicates');
  if (existing.hasNext()) {
    reviewFolder = existing.next();
  } else {
    reviewFolder = folder.createFolder('Review Duplicates');
  }

  const files = folder.getFiles();
  const seen = new Map();
  let movedCount = 0;

  while (files.hasNext()) {
    const file = files.next();

    // Duplicate rule: same name + same size
    const key = `${file.getName()}__${file.getSize()}`;

    if (seen.has(key)) {
      reviewFolder.addFile(file);
      folder.removeFile(file);
      movedCount++;
    } else {
      seen.set(key, file.getId());
    }
  }

  Logger.log(`Moved ${movedCount} duplicate file(s) to Review Duplicates`);
}
