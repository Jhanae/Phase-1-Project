function postData(name, id, comments) {
   let testCharity = { id: id, name: name, comments: [comments] }

   let configObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testCharity),
   }

   fetch("http://localhost:3000/charities", configObj)
      .then(r => r.json())
      .then(data => data)
}

// function getOurDataByCharityName(name) {
//    return fetch(`http://localhost:3000/charities?name=${name}`)
//       .then(r => r.json())
//       .then(data => data)
// }

function getOurDataForACharity(id) {
   return fetch(`http://localhost:3000/charities/${id}`)
      .then(r => r.json())
      .then(data => data)
}

function patchData(name, id, comments) {
   let testCharity = { id: id, name: name, comments: comments }

   let configObj = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testCharity),
   }

   fetch(`http://localhost:3000/charities/${id}`, configObj)
      .then(r => r.json())
      .then(console.log)
}
