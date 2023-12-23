document.getElementById("submit").addEventListener("click", () => {
    date = document.getElementById("tester").value
    document.getElementById("content").appendChild(document.createElement("br"))
    document.getElementById("content").appendChild(document.createTextNode(date))
})