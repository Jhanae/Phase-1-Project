//all api documentation can be found here https://projects.propublica.org/nonprofits/api
//just DC, arts culture and humanities, 501C(3)

//this function lets you search by page number (50 results per page), or by search by words (997 items for this one - I think that could be manageable)
// Also, with this we can use a submit to do most of the filtering on the api side and probably not even need to implement filter on ours
//to test it out can use the getData example below

function init() {
   // getData(0, "").then(data => data.organizations.forEach(renderCharityLi))
   searchEventButton()
   getComments()
}
document.querySelector("div#orgDetails img").className = "image"
document.querySelector(".image").src = "charity img.jpg"
let image = document.createElement("img")
image.className = "charityType"
image.src =
   "data:image/png;base64,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"
document.querySelector("p.image").append(image)
init()

function getData(num = 0, search = "") {
   //page must be between 1-10
   let pageNum = num
   //line below helps with queries that are more than one word in length to match the api search structure
   search.split(" ").join("+")
   let searchTerm = `q="${search}"`
   //if there is no search term, I needed to clear out the variable or it would throw an error
   if (search === "") {
      searchTerm = ""
   }

   //just console log for now - would need to be switched to return data and remove console.log on 22
   return fetch(
      `https://projects.propublica.org/nonprofits/api/v2/search.json?${searchTerm}&state%5Bid%5D=DC&ntee%5Bid%5D=1&page=${pageNum}&c_code%5Bid%5D=3`
   )
      .then(r => r.json())
      .then(data => data)
      .catch(err => console.log(err))
}

//after searching broadly, can use ein Number to get data if we add an event listner that checks this function
//A LOT MORE DATA here - can dig into the most recent year with data, or without data and show the .pdf of the tax return for the most recent year?
function searchByEIN(einNumber) {
   fetch(`https://projects.propublica.org/nonprofits/api/v2/organizations/${einNumber}.json`)
      .then(res => res.json())
      .then(console.log)
}

// THIS WORKS! can pass our own ID to the server

//function doThisThing() {
//    let testCharity = { id: 84955729, name: "Cool Charity Name" }

//    let configObj = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(testCharity),
//    }

//    fetch("http://localhost:3000/charities", configObj)
//       .then(r => r.json())
//       .then(console.log)
// }

// doThisThing()

const sanitizeName = rawNameOfCharity => {
   let copyArr = [...rawNameOfCharity.split(" ")]
   let sanitizeArr = []
   let capKeywords = ["The", "A", "An", "But", "Of", "And", "For", "At", "By", "From", "With"]
   //basic capitalization of first word and last word
   copyArr.forEach(word => {
      sanitizeArr.push(word[0] + word.slice(1).toLowerCase())
   })
   //searches for words that should always be lowercase starting with the second word in the array
   let wordIndex = 1
   sanitizeArr.slice(1).findIndex(word => {
      let arrIndex = capKeywords.indexOf(word)
      if (arrIndex !== -1) {
         sanitizeArr[wordIndex] = word.toLowerCase()
      } else if (word === "Dc") {
         sanitizeArr[wordIndex] = "DC"
      } else if (word === "Us") {
         sanitizeArr[wordIndex] = "US"
      }

      wordIndex++
   })
   //previous logic dicated I needed to add a special case for the first index position of DC/US
   if (sanitizeArr[0] === "Dc") {
      sanitizeArr[0] = "DC"
   } else if (sanitizeArr[0] === "Us") {
      sanitizeArr[0] = "US"
   }

   return sanitizeArr.join(" ")
}

function renderCharityLi(charity) {
   let { ein, name, ntee_code, score } = charity
   let charityLi = document.createElement("li")
   charityLi.ein = ein
   charityLi.id = ein
   charityLi.ntee_code = ntee_code
   charityLi.score = score
   charityLi.name = sanitizeName(name)
   charityLi.classList.add("charityLi")
   charityLi.innerHTML = `<span class="nameSpan"> ${charityLi.name} </span>     ||     <span class="einSpan"> EIN : ${ein} </span>  ||  <span class= "nteeSpan"> CODE/TYPE : ${ntee_code} </span>`
   charityLi.addEventListener("click", e => {
      console.log(`This Charity's name is ${name}, and EIN is ${ein}`)
      e.preventDefault()

      document.querySelector("h2.name").textContent = charityLi.name
      document.querySelector("h3.score").textContent = score

      let charityType = ntee_code.charAt(1)
      console.log(charityType)
      getImage(charityType)
   })
   document.querySelector("#organizationList").append(charityLi)
}

function searchEventButton() {
   document.querySelector("#charitySearch").addEventListener("submit", e => {
      e.preventDefault()
      document.querySelector("#organizationList").innerHTML = ""
      console.log(e.target.charitySearch.value)
      searchByName(e.target.charitySearch.value)
   })
}

function searchByName(searchTerm) {
   getData(0, searchTerm).then(data => {
      if (data.organizations.length === 0) {
         nothingFoundFunctionSilly()
      } else {
         data.organizations.forEach(renderCharityLi)
      }
   })
}

function getImage(type) {
   console.log(type)
   switch (type) {
      case "0":
      case "1":
         document.querySelector(".charityType").src = "humanity type 0 and 1.jpg"
         break
      case "2":
         document.querySelector(".charityType").src = "humanity type 2.jpg"
         break
      case "3":
         document.querySelector(".charityType").src = "Mediatype3.jpg"
         break
      case "4":
         document.querySelector(".charityType").src = "Visual Arts Organizations type 4.jpg"
         break
      case "5":
         document.querySelector(".charityType").src =
            "https://independenttravelcats.com/wp-content/uploads/2019/12/Donation-boxes-National-History-Museum-3.jpg"
         break
      case "6":
         document.querySelector(".charityType").src = "type6Performing arts.jpg"
         break
   }
}

function getComments() {
   document.querySelector("form.comments").addEventListener("submit", e => {
      e.preventDefault()

      let userComment = document.querySelector(".input").value
      console.log(userComment)

      let li = document.createElement("li")
      li.innerHTML = userComment
      ul.append(li)
   })
}

function nothingFoundFunctionSilly() {
   const searchArrResults = [
      "Nadda - try again",
      "We don't have anything like that",
      "Nothing to see here",
      "Pretty sure that doesn't exist - try something else",
      "Try saying: 'Alexa, will you find want I want?'",
      "Uhm ... never heard of it",
      "Looks like we made a wrong turn somewhere ... search again?",
   ]
   let index = Math.floor(Math.random() * searchArrResults.length)

   const emptyLi = document.createElement("li")
   emptyLi.classList.add("charityLi", "nameSpan")
   emptyLi.textContent = searchArrResults[index]
   document.querySelector("#organizationList").append(emptyLi)
}
