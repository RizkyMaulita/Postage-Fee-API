const axios = require('axios')
const baseURLOriginal = 'https://sandbox.keyta.id/api/v1/costs'

async function fetchData () {
  try {
    const payload = {
      "dest_address": "Jl. Anyelir, RT.9/RW.1, Jatipulo, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta, Indonesia",
      "dest_lat": "-6.1779499",
      "dest_lng": "106.8010439",
      "dest_postal_code": "11430",
      "src_address": "Keyta (PT Kita Teknologi Andalan), Jalan Kamboja, RT.4/RW.7, Kota Bambu Utara, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta, Indonesia",
      "src_lat": "-6.1816664",
      "src_lng": "106.802901",
      "src_postal_code": "11420",
      "weight": 1
    }
    const dataOriginal = await axios({
      url: baseURLOriginal,
      method: 'POST',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNjQ0OTkyMzQ3fQ.LTf1BxysqnpdNNtk1_dlWuYXqfDoN6ef1zP1rAHKM-4'
      },
      data: payload
    })
    if (dataOriginal) {
      const resultOriginal = dataOriginal.data?.results
      const codeExpedition = ['gojek', 'grab_express', 'jne', 'sicepat', 'paxel','anteraja','deliveree']
      return sortedData(resultOriginal, codeExpedition)
    }
  } catch (err) {
    return err
  }
}

function sortedData (expeditions, codeExpedition) {
  const resultSort = []
  codeExpedition.forEach((code) => {
    expeditions.forEach((expedition) => {
      if (code === expedition.code) {
        resultSort.push(expedition)
      }
    })
  })
  return resultSort
}

function getMarkup (fee) {
  if (fee > 129000) {
    return 7000
  } else if (fee < 129001 && fee > 40000 ) {
    return 5000
  } else if (fee < 40001 && fee > 30000 ) {
    return 3000
  } else if (fee < 30001 && fee > 17000 ) {
    return 2000
  } else if (fee < 17001 ) {
    return 1000
  }
}

module.exports = {fetchData, sortedData, getMarkup}