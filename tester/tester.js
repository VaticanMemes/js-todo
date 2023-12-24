document.getElementById("submit").addEventListener("click", () => {
    date = document.getElementById("tester").value
    document.getElementById("content").appendChild(document.createElement("br"))
    document.getElementById("content").appendChild(document.createTextNode(date))
})

var sectionList = ["Home", "Harry"]
console.log(sectionList)
sectionList.splice(0, 1)
console.log(sectionList)
sectionList.splice(0, 1)
console.log(sectionList)

if (sectionList.length === 0) {
    console.log(true)
} else {
    console.log(false)
}