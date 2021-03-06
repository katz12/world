import { query } from '../api/dbpedia';
const countries = [
  "BD",
  "BE",
  "BF",
  "BG",
  "BA",
  "BN",
  "BO",
  "JP",
  "BI",
  "BJ",
  "BT",
  "JM",
  "BW",
  "BR",
  "BS",
  "BY",
  "BZ",
  "RU",
  "RW",
  "RS",
  "TL",
  "TM",
  "TJ",
  "RO",
  "GW",
  "GT",
  "GR",
  "GQ",
  "GY",
  "GE",
  "GB",
  "GA",
  "GN",
  "GM",
  "GL",
  "GH",
  "OM",
  "TN",
  "JO",
  "HR",
  "HT",
  "HU",
  "HN",
  "PR",
  "PS",
  "PT",
  "PY",
  "PA",
  "PG",
  "PE",
  "PK",
  "PH",
  "PL",
  "ZM",
  "EH",
  "EE",
  "EG",
  "ZA",
  "EC",
  "IT",
  "VN",
  "SB",
  "ET",
  "SO",
  "ZW",
  "ES",
  "ER",
  "ME",
  "MD",
  "MG",
  "MA",
  "UZ",
  "MM",
  "ML",
  "MN",
  "MK",
  "MW",
  "MR",
  "UG",
  "MY",
  "MX",
  "IL",
  "FR",
  "XS",
  "FI",
  "FJ",
  "FK",
  "NI",
  "NL",
  "NO",
  "NA",
  "VU",
  "NC",
  "NE",
  "NG",
  "NZ",
  "NP",
  "XK",
  "CI",
  "CH",
  "CO",
  "CN",
  "CM",
  "CL",
  "XC",
  "CA",
  "CG",
  "CF",
  "CD",
  "CZ",
  "CY",
  "CR",
  "CU",
  "SZ",
  "SY",
  "KG",
  "KE",
  "SS",
  "SR",
  "KH",
  "SV",
  "SK",
  "KR",
  "SI",
  "KP",
  "KW",
  "SN",
  "SL",
  "KZ",
  "SA",
  "SE",
  "SD",
  "DO",
  "DJ",
  "DK",
  "DE",
  "YE",
  "DZ",
  "US",
  "UY",
  "LB",
  "LA",
  "TW",
  "TT",
  "TR",
  "LK",
  "LV",
  "LT",
  "LU",
  "LR",
  "LS",
  "TH",
  "TF",
  "TG",
  "TD",
  "LY",
  "AE",
  "VE",
  "AF",
  "IQ",
  "IS",
  "IR",
  "AM",
  "AL",
  "AO",
  "AR",
  "AU",
  "AT",
  "IN",
  "TZ",
  "AZ",
  "IE",
  "ID",
  "UA",
  "QA",
  "MZ"
];

const promises = [];

const countryMap = {};
const errorMap = {};
countries.forEach(
  countryCode => {
    promises.push(
      query(`SELECT ?country WHERE {
        ?country a dbo:Country.
        ?redir dbo:wikiPageRedirects ?country.
        FILTER regex(?redir, "ISO_3166-1:${countryCode}")
      }`)
      .then(data => {
        const bindings = data.results.bindings;
        if (bindings.length == 1) {
          const country = bindings[0].country.value;
          countryMap[countryCode] = country;
        } else {
          errorMap[countryCode] = bindings;
        }
      })
    )
  }
)

Promise.all(promises)
  .then(() => { console.log(countryMap); console.log(errorMap) })
