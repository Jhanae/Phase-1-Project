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
   return fetch(`https://projects.propublica.org/nonprofits/api/v2/organizations/${einNumber}.json`)
      .then(res => res.json())
      .then(data => data)
}

function displayTaxPdf(einNumber) {
   searchByEIN(einNumber).then(data => {
      if (data.filings_without_data.length === 0) {
         let emptyTax = "emptyTax.pdf"
         document.querySelector("#taxPDF").src = emptyTax
      } else {
         document.querySelector("#taxPDF").src = data.filings_without_data[0].pdf_url
      }
   })
}

// THIS WORKS! can pass our own ID to the server

// function postData() {
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

function getOurDataForACharity(id) {
   return fetch(`http://localhost:3000/charities/${id}`)
      .then(r => r.json())
      .then(data => data)
}

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
   charityLi.classList.add("charityLi", "list-group-item")
   charityLi.innerHTML = `<span class="nameSpan"> ${charityLi.name} </span>     ||     <span class="einSpan"> EIN : ${ein} </span>  ||  <span class= "nteeSpan"> CODE/TYPE : ${ntee_code} </span>`
   charityLi.addEventListener("click", e => {
      console.log(`This Charity's name is ${charityLi.name}, and EIN is ${ein}`)

      getOurDataForACharity(charityLi.id).then(data => {
         if (data.comments.length > 0) {
            data.comments.forEach(getPreviousComments)
         }
      })

      displayTaxPdf(charity.ein)

      document.querySelector("h2.name").textContent = charityLi.name
      document.querySelector("h3.score").textContent = `Score: ${score}`

      document.querySelector("#hiddenComment").style.display = "block"

      let charityType = ntee_code.charAt(1)
      console.log(charityType)
      getImage(charityType)
      document.querySelector(".rating").reset()
      document.querySelector(".comments").reset()
      document.querySelector(".ratingStar").textContent = ""

      document.querySelectorAll(".star").forEach(star => {
         star.classList.remove("fix")
         star.classList.remove("over")
      })
   })
   document.querySelector("#organizationList").append(charityLi)
}

function getPreviousComments(comment) {
   let userComment = comment
   document.querySelector(".noComment").style.display = "none"

   let li = document.createElement("li")
   li.textContent = userComment
   li.className = "liComment"
   document.querySelector("#commentBox").append(li)
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
      document.querySelector(".total").textContent = `${data.organizations.length} results found`
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
      document.querySelector(".noComment").style.display = "none"

      let li = document.createElement("li")
      li.textContent = userComment
      li.className = "liComment"
      document.querySelector("#commentBox").append(li)
      //trying to maintain persistence
      let commentsArr = Array.from(document.querySelectorAll(".liComment"))
      console.log(commentsArr.slice(1))
   })
}

function patchComments(id, commentsInArr) {}

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

const stars = document.querySelectorAll(".star")
const rating = document.querySelector(".ratingStar")
for (let i = 0; i < stars.length; i++) {
   stars[i].starValue = i + 1
   ;["mouseover", "mouseout", "click"].forEach(function (e) {
      stars[i].addEventListener(e, starRate)
   })
}
function starRate(e) {
   let type = e.type
   let starValue = this.starValue

   if (type === "click") {
      if (starValue > 0) {
         rating.textContent = "You rated this " + starValue + " stars"
      }
   }
   stars.forEach(function (ele, ind) {
      if (type === "click") {
         if (ind < starValue) {
            ele.classList.add("fix")
         } else {
            ele.classList.remove("fix")
         }
      }
      if (type === "mouseover") {
         if (ind < starValue) {
            ele.classList.add("over")
         } else {
            ele.classList.remove("over")
         }
      }
      if (type === "mouseout") {
         ele.classList.add("over")
      }
   })
}
