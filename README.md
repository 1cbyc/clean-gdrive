# Delete Duplicates in a Google Drive Folder

This folder contains a Google Apps Script that scans one Google Drive folder, finds likely duplicate files, and moves the extra copies into a `Review Duplicates` subfolder.

It does not permanently delete anything.

## Files

- `code.gs`: Google Apps Script for finding and moving duplicate files.

## What counts as a duplicate

The script treats files as duplicates when they have:

- the same normalized file name
- the same file size

Name normalization means it also catches common patterns like:

- `report.pdf`
- `report (1).pdf`
- `Copy of report.pdf`

This is a practical and reasonably safe rule, but it is still not a perfect content match.

## How to use it

1. Open [Google Apps Script](https://script.google.com/).
2. Create a new project.
3. Copy the contents of `code.gs` into the Apps Script editor.
4. Replace `PASTE_YOUR_FOLDER_ID_HERE` with the Google Drive folder ID you want to scan.
5. Run the `moveDuplicateFilesInFolder` function.
6. Approve the requested Google permissions.
7. Check the `Review Duplicates` folder inside the target folder.

## How to find your folder ID

1. Open Google Drive in your browser.
2. Click the specific folder you want to scan.
3. Look at the URL in the address bar.
4. Copy the long string that comes after `/folders/`.

Example:

```text
https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz
```

The folder ID is:

```text
1AbCdEfGhIjKlMnOpQrStUvWxYz
```

Paste that value into `code.gs` where you see:

```javascript
const folderId = 'PASTE_YOUR_FOLDER_ID_HERE';
```

## What the script does

- scans the selected folder and its subfolders recursively
- creates a `Review Duplicates` folder if it does not already exist
- keeps the first file it sees for each duplicate group
- moves later matching files into `Review Duplicates`
- logs how many files were scanned and moved

## Important notes

- It scans files in subfolders too.
- It does not treat folders themselves as duplicates.
- It moves files for review instead of deleting them.
- You should manually confirm duplicates before permanently deleting anything.
- Duplicate detection is based on normalized name plus file size, not a true content hash.

## Why you may have seen `Moved 0 duplicate file(s)`

The earlier version only checked:

- files directly inside the chosen folder
- exact same file name
- exact same file size

So it would miss:

- files inside subfolders
- files named like `photo (1).jpg`
- files named like `Copy of photo.jpg`
- duplicate-looking folders

This updated version fixes the first three cases.

## Possible upgrades

You can extend this later to:

- detect duplicate folders by name
- write a duplicate report to Google Sheets
- use stronger duplicate detection such as file hashes or content comparison
