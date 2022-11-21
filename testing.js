const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
const newDevURL = 'https://streeteasy.com/building/new-york-by-gehry'
const excelFileName = "NYBG.xlsx"
const workbook = xlsx.utils.book_new();



async function rentedListing(url,page){
    // go to URL
    await page.goto(url)

    //wait for selector class activity
    await page.waitForSelector('.activity')

    await page.click('#see-all-activity-link a')




    // //extract all of rented data and store them in variable rented
    // const rentedApt = await page.$$eval('.activity', (allAs) =>
    // allAs.map((option) => option.innerText));


    // //create empty array aoaRented
    // const aoaRented = [];
    // //pushed data retrieved from activity selector stored in rentedApt to aoaRented array
    // aoaRented.push(rentedApt)

    // //return aoaRented array
    // return aoaRented

}








async function rentedUnitsCall(){
    //create a rented URL by adding necessary URL string
    const rentedUrl = newDevURL + '#tab_building_detail=3'
    //launch browser 
    const browser = await puppeteer.launch({headless: false});
    //open new browser page
    const page = await browser.newPage();
 
   //go to URL stored in rentedURL on new page
    const rentedData = await rentedListing(rentedUrl,page)


    //insert rentedData into a new worksheet
    const ws2 = xlsx.utils.aoa_to_sheet(rentedData);

    //append new worksheet with active data into a new workbook and named "Rented Listing" sheet
    xlsx.utils.book_append_sheet(workbook,ws2,"Rented Listing");

    //write excel file with appened worksheet with excel file name
    xlsx.writeFile(workbook,excelFileName);

    //close the browser
    await browser.close();
}




async function main(){
    
    //call rentedUnitCall function
    rentedUnitsCall();
}


main()






