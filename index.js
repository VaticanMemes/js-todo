const content = document.getElementById("content")

const noteList = []
const sectionList = ["Home", "Harry", "Larry"]

noteList.push(new note("Wash dishes", "wash 'em clean", "2023-12-25", "high", "Home"))
noteList.push(new note("Clean car", "wash the Ford clean", "2006-03-01", "low", "Home"))
noteList.push(new note("Wash penis", "12 Rules for Life", "2017-05-23", "medium", "Harry"))

loadPage()

function note(name, description, date, priority, section) {
    this.name = name
    this.description = description
    this.date = date
    this.priority = priority
    this.section = section
}

function loadPage() {
    content.innerHTML = ""
    content.append(createHeader())
    createNewEventListersAfterHeader()
    content.append(createBody())
    content.append(createFoot())
    createEventListenersEnd()
}

function createHeader() {
    const header = document.createElement("div")
    const headerTitle = document.createElement("h1")
    headerTitle.innerText = "This is a motherfucking to-do list."
    header.appendChild(headerTitle)
    header.appendChild(createHeaderSections())
    const createItemButton = document.createElement("button")
    createItemButton.innerHTML = "Create item"
    createItemButton.setAttribute("id", "create-item-button")
    createItemButton.setAttribute("class", "link-button")
    header.appendChild(createItemButton)
    return header
}

function createHeaderSections() {
    const headerSections = document.createElement("p")
    headerSections.setAttribute("id", "header-sections")
    headerSections.append(document.createTextNode("Sections: "))
    for (let i = 0; i < sectionList.length; i++) {
        const sectionLink = document.createElement("button")
        sectionLink.innerText = sectionList[i]
        sectionLink.setAttribute("class", "link-button")
        sectionLink.classList.add("header-section-link")
        sectionLink.setAttribute("id", sectionList[i])
        headerSections.append(sectionLink)
        headerSections.append(document.createTextNode(" | "))
    }
    return headerSections
}

function createNewEventListersAfterHeader() {
    document.getElementById("header-sections").onclick = function(evt) {
        const target = evt.target
        if (!(target.classList.contains("header-section-link"))) return
        const headerSectionLinkButtons = document.querySelectorAll("button.header-section-link")
        for (let i = 0; i < headerSectionLinkButtons.length; i++) {
            if (headerSectionLinkButtons[i].classList.contains("s-active")) {
                headerSectionLinkButtons[i].classList.remove("s-active")
            }
        }
        target.classList.add("s-active")
        localStorage.setItem("currentSection", target.id)
        loadPage()
    }

    // to check if none are active
    const sActiveStatus = false
    for (let i = 0; i < document.querySelectorAll("button.header-section-link").length; i++) {
        if (document.querySelectorAll("button.header-section-link")[i].classList.contains("s-active")) {
            console.log(document.querySelectorAll("button.header-section-link")[i].classList.contains("s-active"))
            sActiveStatus = true
        }
    }
    if (sActiveStatus === false) {
            if (localStorage.getItem("currentSection") === null) {
                document.querySelectorAll("button.header-section-link")[0].classList.add("s-active")
                // console.log("testicle")
            } else {
                document.getElementById(localStorage.getItem("currentSection")).classList.add("s-active")
                // console.log("tenticle")
            }
    }
}

function createEventListenersEnd() {
    document.getElementById("create-item-button").addEventListener("click", (evt) => {
        popUp(evt.target.id.replace("button", "modal"))
    })
    
    document.getElementById("create-item-closer").addEventListener("click", (evt) => {
        closePopUp(evt.target.id.replace("closer", "modal"))
    })
    
    document.getElementById("section-button").addEventListener("click", (evt) => {
        createModalSectionForm()
    })
    
    document.getElementById("note-button").addEventListener("click", (evt) => {
        createModalNoteForm()
    })
}

function createBody() {
    const body = document.createElement("div")
    body.appendChild(createModal())
    body.appendChild(createToDoElements())
    return body
}

function createToDoElements() {
    const toDoElements = document.createElement("ul")
    const activeSection = document.querySelector("button.s-active").id
    for (let i = 0; i < noteList.length; i++) {
        if (noteList[i].section === activeSection) {
            const newNoteElement = document.createElement("p")
            newNoteElement.innerHTML = ("<li>" + noteList[i].name + " | " + noteList[i].description + " | " + noteList[i].date + " | " + noteList[i].priority + "</li>")
            toDoElements.appendChild(newNoteElement)
        }
    }
    return toDoElements
}

createToDoElements()

function createModal() {
    const modal = document.createElement("div")
    modal.setAttribute("class", "modal")
    modal.setAttribute("id", "create-item-modal")
    // modal header
    const modalHeader = document.createElement("p")
    modalHeader.innerHTML = "Create: <a href='#' class='link-button' id='section-button'>section</a> | <a href='#' class='link-button' id='note-button'>note</a> | <button class='link-button' id='create-item-closer' href='#'>&times;</button>"
    modalHeader.setAttribute("class", "modal-header")
    modal.appendChild(modalHeader)
    // modal body
    const modalBody = document.createElement("div")
    modalBody.setAttribute("id", "modal-body")
    modal.appendChild(modalBody)
    //// create section form
    //// create note form
    return modal
}

function createModalSectionForm() {
    document.getElementById("modal-body").innerHTML = ""
    const modalSectionForm = document.createElement("form")
    modalSectionForm.setAttribute("onsubmit", "modalSectionFormSubmit()")
    modalSectionForm.innerHTML = '<hr><label for="sname">Section name:</label><br><input type="text" id="sname" name="sname" required><br><br><input type="submit" id="section-submit" value="submit""><br><br>'
    document.getElementById("modal-body").appendChild(modalSectionForm)
}

function modalSectionFormSubmit() {
    sectionList.push(document.getElementById("sname").value)
    document.getElementById("sname").value = ''
    closePopUp("create-item-modal")
    loadPage()
}

function createModalNoteForm() {
    document.getElementById("modal-body").innerHTML = ""
    const modalNoteForm = document.createElement("form")
    modalNoteForm.setAttribute("onsubmit", "modalNoteFormSubmit()")
    const sectionsInHTML = []
    for (let i = 0; i < sectionList.length; i++) {
        const newElement = String('<option value="' + sectionList[i] + '">' + sectionList[i] + '</options>')
    sectionsInHTML.push(newElement)
    }
    stringo = String('<label for="sect">Sections:</label><br><select id="sect" name="sect" required>' + sectionsInHTML.join("") + '</select>')
    modalNoteForm.innerHTML = '<hr><label for="nname">Note name:</label><br><input type="text" id="nname" name="nname" required><br><label for="desc">Description:</label><br><input type="text" id="desc" name="desc" required><br><label for="date">Due date:</label><br><input type="date" id="date" name="date" required><br><label for="priority">Priority:</label><br><select id="priority" name="priority" required><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select><br>' + stringo + '<br><br><input type="submit" id="note-submit" value="submit"><br><br>'
    document.getElementById("modal-body").appendChild(modalNoteForm)
}

function modalNoteFormSubmit() {
    const nname = document.getElementById("nname").value
    const desc = document.getElementById("desc").value
    const date = document.getElementById("date").value
    const priority = document.getElementById("priority").value
    const notesSection = document.getElementById("sect").value
    noteList.push(new note(nname, desc, date, priority, notesSection))
    document.getElementById("nname").value = ''
    document.getElementById("desc").value = ''
    document.getElementById("sect").value = ''
    closePopUp("create-item-modal")
    loadPage()
    console.log(noteList)
}

function createFoot() {
    const foot = document.createElement("div")
    const overlay = document.createElement("div")
    overlay.setAttribute("class", "overlay")
    overlay.setAttribute("id", "overlay")
    foot.appendChild(overlay)
    return foot
}

function popUp(modalId) {
    const popUpModal = document.getElementById(modalId)
    if (popUpModal === null) return
    popUpModal.classList.add("active")
    document.getElementById("overlay").classList.add("active")
}

function closePopUp(modalId) {
    const popUpModal = document.getElementById(modalId)
    if (popUpModal === null) return
    popUpModal.classList.remove("active")
    document.getElementById("overlay").classList.remove("active")
}