const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
const newDevURL = 'https://streeteasy.com/building/new-york-by-gehry'
const excelFileName = "NYBG.xlsx"
const workbook = xlsx.utils.book_new();


async function activeListing(url,page){
    // go to URL
    await page.goto(url)


    //extract every address data and store them in variable apt 
    const apt = await page.$$eval('.ActiveListingsUnit-address ', (allAs) =>
    allAs.map((option) => option.textContent));
    //extract every rent data and store them in variable price
    const price = await page.$$eval('.ActiveListingsUnit-itemPrice ', (allAs) =>
    allAs.map((option) => option.textContent));
    //filtered data stored in price variable by store them only if the data is 0 or numbers 
    const filteredprice = price.map( e => e.split('').filter( x => x === '0' || Number(x)).join(''))
    //extract every unit data and store them in variable unit
    const unit = await page.$$eval('.ActiveListingsUnit-itemProperties ', (allAs) =>
    allAs.map((option) => option.innerText));


    // return stored apt, filtered price and unit data in an array
    return [
        apt,filteredprice,unit 
    ]

};

async function rentedListing(url,page){
    // go to URL
    await page.goto(url)

    //wait for selector class activity
    await page.waitForSelector('.activity')


    //extract all of rented data and store them in variable rented
    const rentedApt = await page.$$eval('.activity', (allAs) =>
    allAs.map((option) => option.innerText));


    //create empty array aoaRented
    const aoaRented = [];
    //pushed data retrieved from activity selector stored in rentedApt to aoaRented array
    aoaRented.push(rentedApt)

    //return aoaRented array
    return aoaRented

}





async function activeUnitsCall(){
    //launch browser 
    const browser = await puppeteer.launch({headless: false});
    //open new browser page
    const page = await browser.newPage();
    //go to URL stored in newDevURL on new page
    const activeData = await activeListing(newDevURL,page)



    //insert activeData into a new worksheet
    const ws1 = xlsx.utils.aoa_to_sheet(activeData);
    //append new worksheet with active data into a new workbook and named "Active Listing" sheet
    xlsx.utils.book_append_sheet(workbook,ws1,"Active Listing");


    //write excel file with appened worksheet with excel file name
    xlsx.writeFile(workbook,excelFileName);

    //close the browser
    await browser.close();
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
    //call activeUnitCall function
    activeUnitsCall();
    //call rentedUnitCall function
    rentedUnitsCall();
}


main()






