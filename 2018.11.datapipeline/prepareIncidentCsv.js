/**
 * Input: Incidents_as_of_2018-11-23.csv, as input
 * Output: Algolia ready JSON file containing
 */

// Because we're in a hackathon! File is git-ignored.
const filename = 'Incidents_as_of_2018-11-23.csv';

const csvtojsonV2 = require("csvtojson/v2");

const normalize = (text) => text.replace(/([A-Z])/g, " $1").trim();

const transformTag = (value, mapping, defaultValue = 'Unknown') =>
    mapping.hasOwnProperty(value) ? mapping[value] : defaultValue;
const validateTag = (value, validValues, defaultValue = 'Unknown') =>
    validValues.indexOf(value) > -1 ? value : defaultValue;

async function process() {
    const rawData = await csvtojsonV2().fromFile(filename);

    const processed = rawData.map(i => {
        return (i.Latitude && i.Longitude) ? {
            objectID: `incidents-${i.Id}`,
            gender: validateTag(i.Gender, ['Male', 'Female']),
            age: parseInt(i.Age),
            source: i.Source,
            perspective: normalize(i.PointOfView),
            categories: i.Type.split(', ').map(normalize).concat(
                i.Motivation.split(', ').map(normalize)
            ).filter(v => ['', '0'].indexOf(v) == -1),
            aftermath: i.Aftermath.split(', ').map(normalize),
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