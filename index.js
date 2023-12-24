const content = document.getElementById("content")

if (localStorage.getItem("noteList") === null) {
    var noteList = []
} else {
    var noteList = JSON.parse(localStorage.getItem("noteList"))
}

if (localStorage.getItem("sectionList") === null) {
    var sectionList = ["Home"]
} else {
    var sectionList = JSON.parse(localStorage.getItem("sectionList"))
}

loadPage()

function note(name, description, date, priority, section) {
    this.name = name
    this.description = description
    this.date = date
    this.priority = priority
    this.section = section
}

function loadPage() {
    sectionListTest()
    localStorage.setItem("noteList", JSON.stringify(noteList))
    localStorage.setItem("sectionList", JSON.stringify(sectionList))
    content.innerHTML = ""
    content.append(createHeader())
    createNewEventListersAfterHeader()
    content.append(createBody())
    content.append(createFoot())
    createEventListenersEnd()
}

function sectionListTest() {
    if (sectionList.length === 0) {
        sectionList.push("Home")
    }
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
    var sActiveStatus = false
    for (let i = 0; i < document.querySelectorAll("button.header-section-link").length; i++) {
        if (document.querySelectorAll("button.header-section-link")[i].classList.contains("s-active")) {
            sActiveStatus = true
        }
    }
    var currentSectionExists = false
    for (let i = 0; i < sectionList.length; i++) {
        if (sectionList[i] === localStorage.getItem("currentSection")) {
            currentSectionExists = true
        }
    }
    if (sActiveStatus === false) {
            if (localStorage.getItem("currentSection") === null) {
                document.querySelectorAll("button.header-section-link")[0].classList.add("s-active")
            } else if (!currentSectionExists) {
                document.querySelectorAll("button.header-section-link")[0].classList.add("s-active")
            } else {
                document.getElementById(localStorage.getItem("currentSection")).classList.add("s-active")
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

    // I know this is a hideous loop but my event delegation wasn't working so ¯\_(ツ)_/¯
    for (let i = 0; i < document.getElementsByClassName("delete-button").length; i++) {
        document.getElementsByClassName("delete-button")[i].addEventListener("click", (evt) => {
            noteList.splice(evt.target.id, 1)
            loadPage()
        })
        }

    // Another hideous loop
    for (let i = 0; i < document.getElementsByClassName("edit-button").length; i++) {
        document.getElementsByClassName("edit-button")[i].addEventListener("click", (evt) => {
            document.getElementById("body").appendChild(createEditModal(evt.target.id))
            popUp("edit-modal")
        })
        }
}

function createEditModal(id) {
    const editModal = document.createElement("div")
    editModal.setAttribute("class", "modal")
    editModal.setAttribute("id", "edit-modal")
    // modal header
    const editModalHeader = document.createElement("p")
    editModalHeader.innerHTML = "Edit: " + noteList[id].name
    editModalHeader.setAttribute("class", "modal-header")
    editModal.appendChild(editModalHeader)
    // modal body
    const editModalBody = document.createElement("div")
    editModalBody.setAttribute("id", "edit-modal-body")
    editModal.appendChild(editModalBody)
    //// create section form
    //// create note form
    // here's some code I copied from the createModalNoteForm
    const modalEditForm = document.createElement("form")
    const sectionsInHTML = []
    for (let i = 0; i < sectionList.length; i++) {
        var newElement = ""
        if (sectionList[i] === noteList[id].section) {
            newElement = String('<option value="' + sectionList[i] + '" selected>' + sectionList[i] + '</options>')
        } else {
            newElement = String('<option value="' + sectionList[i] + '">' + sectionList[i] + '</options>')
        }
        sectionsInHTML.push(newElement)
    }
    const stringo = String('<label for="esect">Sections:</label><br><select id="esect" name="esect" required>' + sectionsInHTML.join("") + '</select>')
    modalEditForm.innerHTML = '<hr><label for="enname">Note name:</label><br><input type="text" id="enname" name="enname" value="' + noteList[id].name + '" required><br><label for="edesc">Description:</label><br><input type="text" id="edesc" name="edesc" value="' + noteList[id].description + '" required><br><label for="edate">Due date:</label><br><input type="date" id="edate" value="' + noteList[id].date + '" name="edate" required><br><label for="epriority">Priority:</label><br><select id="epriority" name="epriority" value="' + noteList[id].priority + '" required><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select><br>' + stringo + '<br><br>'
    editModalBody.appendChild(modalEditForm)
    const editModalButton = document.createElement("button")
    editModalButton.setAttribute("id", "edit-submit")
    editModalButton.setAttribute("value", "submit")
    editModalButton.innerText = "submit"
    // I know an event listener for a click is pretty ugly too
    editModalButton.addEventListener("click", (evt) => {
        evt.preventDefault()
        editModalSubmit(id)
    })
    modalEditForm.appendChild(editModalButton)
    modalEditForm.appendChild(document.createElement("br"))
    modalEditForm.appendChild(document.createElement("br"))
    return editModal
}

function editModalSubmit(id) {
    const enname = document.getElementById("enname").value
    const edesc = document.getElementById("edesc").value
    const edate = document.getElementById("edate").value
    const epriority = document.getElementById("epriority").value
    const enotesSection = document.getElementById("esect").value
    noteList[id].name = enname
    noteList[id].description = edesc
    noteList[id].date = edate
    noteList[id].priority = epriority
    noteList[id].section = enotesSection
    document.getElementById("enname").value = ''
    document.getElementById("edesc").value = ''
    document.getElementById("esect").value = ''
    closePopUp("edit-modal")
    loadPage()
}

function createBody() {
    const body = document.createElement("div")
    body.setAttribute("id", "body")
    body.appendChild(createModal())
    body.appendChild(createToDoElements())
    body.appendChild(createDeleteSection())
    return body
}

function createDeleteSection() {
    const deleteSection = document.createElement("button")
    deleteSection.classList.add("link-button")
    deleteSection.classList.add("delete-section-button")
    deleteSection.setAttribute("id", "delete-section-button")
    deleteSection.innerText = "Delete section"
    deleteSection.addEventListener("click", () => {
        // found on stack overflow
        const index = sectionList.indexOf(document.querySelector("button.s-active").id);
        if (index > -1) { // only splice array when item is found
            sectionList.splice(index, 1); // 2nd parameter means remove one item only
        }
        // deleting notes of that section
        for (let i = 0; i < noteList.length; i++) {
            if (noteList[i].section === document.querySelector("button.s-active").id) {
                noteList.splice(i, 1)
            } else {
                ++i
            }
        }
        loadPage()
    })
    return deleteSection
}

function createToDoElements() {
    const toDoElements = document.createElement("ul")
    const activeSection = document.querySelector("button.s-active").id
    for (let i = 0; i < noteList.length; i++) {
        if (noteList[i].section === activeSection) {
            const deleteButton = document.createElement("button")
            deleteButton.classList = "link-button delete-button"
            deleteButton.setAttribute("id", i)
            deleteButton.innerText = "delete"
            const editButton = document.createElement("button")
            editButton.classList = "link-button edit-button"
            editButton.setAttribute("id", i)
            editButton.innerText = "edit"
            const newNoteElement = document.createElement("p")
            newNoteElement.innerHTML = ("<li>" + noteList[i].name + " | " + noteList[i].description + " | " + noteList[i].date + " | " + noteList[i].priority + "</li>")
            newNoteElement.appendChild(editButton)
            newNoteElement.appendChild(document.createTextNode(" | "))
            newNoteElement.appendChild(deleteButton)
            toDoElements.appendChild(newNoteElement)
        }
    }

    return toDoElements
}

function createModal() {
    const modal = document.createElement("div")
    modal.setAttribute("class", "modal")
    modal.setAttribute("id", "create-item-modal")
    // modal header
    const modalHeader = document.createElement("p")
    modalHeader.innerHTML = "Create: <button class='link-button' id='section-button'>section</button> | <button class='link-button' id='note-button'>note</button> | <button class='link-button' id='create-item-closer'>&times;</button>"
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
        var newElement = ""
        if (sectionList[i] === document.querySelector("button.s-active").id) {
            newElement = String('<option value="' + sectionList[i] + '" selected>' + sectionList[i] + '</options>')
        } else {
            newElement = String('<option value="' + sectionList[i] + '">' + sectionList[i] + '</options>')
        }
        sectionsInHTML.push(newElement)
    }
    const stringo = String('<label for="sect">Sections:</label><br><select id="sect" name="sect" selected="' + String(document.getElementsByClassName("s-active")[0].innerText) + '" required>' + sectionsInHTML.join("") + '</select>')
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