const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
const newDevURL = 'https://streeteasy.com/building/sven-29_59-northern-boulevard-long_island_city'
const workbook = xlsx.utils.book_new();


async function activeListing(url,page){
    await page.goto(url)

    const apt = await page.$$eval('.ActiveListingsUnit-address ', (allAs) =>
    allAs.map((option) => option.textContent));

    const price = await page.$$eval('.ActiveListingsUnit-itemPrice ', (allAs) =>
    allAs.map((option) => option.textContent));
    const filteredprice = price.map( e => e.split('').filter( x => x === '0' || Number(x)).join(''))

    const unit = await page.$$eval('.ActiveListingsUnit-itemProperties ', (allAs) =>
    allAs.map((option) => option.innerText));

    return [
        apt,filteredprice,unit 
    ]

};

async function rentedListing(url,page){
    await page.goto(url)

    const rentedApt = await page.$$eval('.activity', (allAs) =>
    allAs.map((option) => option.innerText));



    const aoaRented = [];
    aoaRented.push(rentedApt)

    return aoaRented

}





async function activeUnitsCall(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const activeData = await activeListing(newDevURL,page)




    const ws1 = xlsx.utils.aoa_to_sheet(activeData);
    xlsx.utils.book_append_sheet(workbook,ws1,"Active Listing");



    xlsx.writeFile(workbook,"testing.xlsx");


    await browser.close();
}


async function rentedUnitsCall(){

    const rentedUrl = newDevURL + '#tab_building_detail=3'

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    const rentedData = await rentedListing(rentedUrl,page)




    const ws2 = xlsx.utils.aoa_to_sheet(rentedData);
    xlsx.utils.book_append_sheet(workbook,ws2,"Rented Listing");

    xlsx.writeFile(workbook,"testing.xlsx");


    await browser.close();
}




async function main(){
    activeUnitsCall();
    rentedUnitsCall();
}


main()






