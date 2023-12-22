const content = document.getElementById("content")

loadPage()

function loadPage() {
    content.append(createHeader())
    content.append(createBody())
    content.append(createFoot())
}

function createHeader() {
    const header = document.createElement("div")
    const headerTitle = document.createElement("h1")
    headerTitle.innerText = "This is a motherfucking to-do list."
    header.appendChild(headerTitle)
    const createItemButton = document.createElement("button")
    createItemButton.innerHTML = "create item"
    createItemButton.setAttribute("id", "create-item-button")
    createItemButton.setAttribute("class", "link-button")
    // createItemButton.setAttribute("href", "#")
    header.appendChild(createItemButton)
    return header
}

function createBody() {
    const body = document.createElement("div")
    body.appendChild(createModal())
    return body
}

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
    modalSectionForm.innerHTML = '<hr><label for="sname">Section name:</label><br><input type="text" id="sname" name="sname"><br><br><input type="submit" id="section-submit" value="Submit"><br><br>'
    document.getElementById("modal-body").appendChild(modalSectionForm)
}

function createModalNoteForm() {
    document.getElementById("modal-body").innerHTML = ""
    const modalSectionForm = document.createElement("form")
    modalSectionForm.innerHTML = '<hr><label for="nname">Note name:</label><br><input type="text" id="nname" name="nname"><br><label for="desc">Description:</label><br><input type="text" id="desc" name="desc"><br><label for="date">Due date:</label><br><input type="date" id="date" name="date"><br><label for="priority">Priority:</label><br><select id="priority" name="priority"><option value="high">High</option><option value="medium">Medium</option><option value="Low">Low</option></select><br><br><input type="submit" id="note-submit" value="submit"><br><br>'
    document.getElementById("modal-body").appendChild(modalSectionForm)
}

function createFoot() {
    const foot = document.createElement("div")
    const overlay = document.createElement("div")
    overlay.setAttribute("class", "overlay")
    overlay.setAttribute("id", "overlay")
    foot.appendChild(overlay)
    return foot
}

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