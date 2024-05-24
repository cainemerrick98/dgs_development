const Projects = {
    'dalston':{
        image_count:19,
        tab_name:'Project 1',
        description: 'A wrap around extension and loft conversion in East Didsbury'
    },
    'heritage_gardens':{
        image_count:17,
        tab_name:'Project 2',
        description: 'An extension on the back and a full refurbishment of a huge property in the center of Didsbury',
    }
}
let SlideIndex = 1;

document.addEventListener('DOMContentLoaded', configurePage())
/**
 * Called on content loaded event
 * Sets up the page navigation event handling
 * May call some other configuration functions whihc is 
 * why it is not just setUpNavigation being called directly
 */
function configurePage(){
    setUpNavigation()
    setHeadlineOpacityChange()
    addTabs()
    buildSlideShow('dalston')
    showSlide(SlideIndex)

}

/**
 * Gets all the elements with a target attribute
 * Adds the click event navigateTo(target_value) 
 * This sets up the navbar navigation.
 */
function setUpNavigation(){ 
    var navigation_items = Array.from(document.querySelectorAll('[target]'))
    navigation_items.forEach(item => {
        var target_id = item.attributes.target.nodeValue
        item.addEventListener('click', () => {
            navigateTo(target_id)
        })
    })

}

/**
 * 
 * @param {String} target_id - the id of the element to navigate to 
 */
function navigateTo(target_id){
    const target_element = document.getElementById(target_id)
    const coordinates = getElementCoordinates(target_element)

    scrollTo(coordinates.x, coordinates.y)
}

/**
 * 
 * @param {HTMLElement} element 
 * @returns {object} coordinates
 */
function getElementCoordinates(element){
    const rect = element.getBoundingClientRect()
    return {
        y: window.scrollY + rect.top,
        x: window.scrollX + rect.left
    }
}

function setHeadlineOpacityChange(){
    document.addEventListener('scroll', () => {
        var overlay = document.getElementById('overlay')
        overlay.style.opacity = Math.max(0, Math.min(scrollY / 350, 0.9))
    })
}

/**
 * allows the user to move the slide show left and right
 * @param {Number} n 
 */
function moveSlide(n){
    showSlide(SlideIndex + n)
}

/**
 * Displays the slide at the given index
 * @param {Number} n - the index of the slide to move to
 */
function showSlide(n){

    let slides = document.getElementsByClassName('slide')
    let thumbnails = document.getElementsByClassName('demo')

    SlideIndex = n
    if(n > slides.length)SlideIndex = 1
    if(n < 1)SlideIndex = slides.length
    for(i=0; i<slides.length; i++){
        slides[i].style.display = "none"
        thumbnails[i].className = thumbnails[i].className.replace(" active", "")
    }

    slides[SlideIndex-1].style.display = "block"
    thumbnails[SlideIndex-1].className += " active"
}

/**
 * given a folder name builds the slides for the images
 * in that folder and appends them to the gallery
 * @param {String} folder_name 
 */
function buildSlideShow(folder_name){
    const gallery = document.getElementById('gallery')
    const prev_button = document.getElementById('prev')
    const thumbnail_row = document.getElementById('thumbnail_row')
    const root = 'assets\\images'
    
    const image_count = Projects[folder_name].image_count
    for(i=1; i<=image_count; i++){
        var image_src = `${root}\\${folder_name}\\${folder_name}_${i}.jpg`
        var slide = buildSlide(image_src)
        var thumbnail = buildThumbnail(image_src, i, image_count)

        gallery.insertBefore(slide, prev_button)
        thumbnail_row.appendChild(thumbnail)
    }
}

/**
 * Builds the html representation of a slide in the gallery
 * @param {String} image_src
 * @returns {HTMLDivElement} 
 */
function buildSlide(image_src){
    var slide = document.createElement('div')
    slide.className = 'slide'
    var img = document.createElement('img')
    img.src = image_src
    img.style.width = "100%"
    slide.appendChild(img)
    return slide
}

/**
 * 
 * @param {String} image_src 
 * @param {Number} image_index 
 * @param {Number} image_count
 * @returns {HTMLDivElement}
 */
function buildThumbnail(image_src, image_index, image_count){
    var thumbnail = document.createElement('div')
    thumbnail.className = "column"
    thumbnail.style.width = `${100/image_count}%`
    var img = document.createElement('img')
    img.src = image_src
    img.className = "demo cursor"
    img.style.width = "100%"
    img.addEventListener('click', ()=>{
        showSlide(image_index)
    })
    thumbnail.appendChild(img)
    return thumbnail
}

/**
 * adds the tabs to the our work section 
 */
function addTabs(){
    const tab_container = document.getElementById("tab_container")
    Object.keys(Projects).forEach(key => {
        var tab_name = Projects[key].tab_name
        var tab = buildTab(tab_name, key)
        tab_container.appendChild(tab)

        var description = Projects[key].description
        // var tab_content = buildTabContent(description)
    })
}

function buildTab(tab_name, project_name){
    var tab = document.createElement("button")
    tab.textContent = tab_name
    tab.className = "tablinks"
    tab.addEventListener("click", ()=>{
        changeProject(project_name)
    })
    return tab
}