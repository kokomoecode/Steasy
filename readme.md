# Project STEASY
 
The purpose is to increase efficieny of research team by automating internal data retrival process.

# Description

DEDM team tracks NYC rental market data of 200+ rental buildings to create customize market reports. By utilizing this program, we have improved our turnaround time to publish reports by 44%. 


# Installation Packages and Dependencies
- `Fork/Clone this repo (https://github.com/moethantkoko/Steasy.git) `
- `npm install`
- `npm i puppeteer`
- `npm install xlsx`

# User Instructions
- navigate to index.js
- update "newDevURL" variable to desirable streeteasy building URL
- update "excelFileName variable to desirable excel file name. Be sure it's a string with .xlsx"
- Run "node index.js" in your terminal


# Limitation
- This app is to run one building profile at a time to overcome server detection. 