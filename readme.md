# Project STEASY
 
The Challenge: To automate laborious process of manually extracting rental transactions from Streeteasy.
The Solution: Project STEASY - webscraping application that automatically stores rental transactions data in excel file.


# Impact

DEDM team tracks NYC rental market data of 200+ rental buildings to create customize market reports. By utilizing this application, we have improved our turnaround time to publish reports by 44%. 


# Tech Stack:

For the purpose of simplicity, Puppeteer, a Node.js Library is used to scrap rental transactions from desirable streeteasy building URL.

- Javascript
- Puppeteer
- Node.JS
- XLSX NPM package


# Demo and Images
![Image!](Screenshot-v1.png)

Streeteasy Building Page on the left with rental transactions

**After the application was run**
![Image!](Screenshot-v2.png)

Desired rental transactions data were stored and saved in excel file for futher analysis.


# User Instructions
- navigate to index.js
- update "newDevURL" variable to desirable streeteasy building URL
- update "excelFileName variable to desirable excel file name. Be sure it's a string with .xlsx"
- Run "node index.js" in your terminal


# Installation Packages and Dependencies
- `Fork/Clone this repo (https://github.com/moethantkoko/Steasy.git) `
- `npm install`


# Limitation
- This app is to run one building profile at a time to overcome server detection. 
