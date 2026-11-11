# Hollywood POS - Windows counter app

Counter billing only: **Sale, Sales list, Credit, Cash & report, Settings, Users**.
Purchases, stock, expenses, dashboard, reports, menu editing and audit stay in the web portal (repo HPOS_WEB).

`web/index.html` is a copy of the POS from https://github.com/roshrpa/HPOS_WEB. `scripts/prepare.js` turns it into `app/index.html` with the desktop flag on, so the two always share one code base.

## Build the Windows installer
GitHub -> Actions -> **Build Windows app** -> Run workflow. The installer (`Hollywood POS Setup x.y.z.exe`) is attached to the run under Artifacts.

## Update to the latest POS
Replace `web/index.html` with the latest `index.html` from HPOS_WEB, commit, and run the build again.

## Run on a developer machine
```
npm install
npm start
```

Data is saved on this computer first, so billing works without internet. Connect the server later in Settings -> Sync.
