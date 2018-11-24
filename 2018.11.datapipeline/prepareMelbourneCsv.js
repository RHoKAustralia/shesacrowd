/**
 * Input: melbourne.csv, as input
 * Output: Algolia ready JSON file containing
 */

// Because we're in a hackathon! File is git-ignored.
const filename = 'melbourne.csv';

const csvtojsonV2 = require("csvtojson/v2");

const normalize = (text) => text.replace(/([A-Z])/g, " $1").trim();

const transformTag = (value, mapping, defaultValue = 'Unknown') =>
    mapping.hasOwnProperty(value) ? mapping[value] : defaultValue;
const validateTag = (value, validValues, defaultValue = 'Unknown') =>
    validValues.indexOf(value) > -1 ? value : defaultValue;

async function process() {
    const rawData = await csvtojsonV2().fromFile(filename);

    let index = 1;
    const processed = rawData.map(i => {
        let categories = ['Category', 'Category 2', 'Category 3'].map(
            colunm => i[colunm]
        ).filter(x => ['', '0'].indexOf(x) == -1).map(normalize);

        if (categories.length == 0) {
            categories = ['Other']
        }

        return (i.Latitude && i.Longitude) ? {
            objectID: `incidents-${i.Id}`,
            gender: validateTag(i.Gender, ['Male', 'Female']),
            age: parseInt(i.Age),
            source: i.Source,
            //perspective: normalize(i.PointOfView),
            categories,
            //aftermath: i.Aftermath.split(', ').map(normalize),
            "_geoloc": {
                lat: parseFloat(i.Latitude),
                lng: parseFloat(i.Longitude),
            },
            description: i.Description
        } : null;
    }).filter(x => x);

    console.log(JSON.stringify(processed, null, 2));
}

process();