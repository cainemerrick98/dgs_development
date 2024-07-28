const Projects = {
    'dalston':{
        image_count:19,
        tab_name:'Project 1',
        description: 'Project description for project 1'
    },
    'heritage':{
        image_count:17,
        tab_name:'Project 2',
        description: 'Project description for project 2',
    },
    'hurstfold':{
        image_count:10,
        tab_name:'Project 3',
        description:'Project description for project 3',
    },
    'parrswood_ave':{
        image_count:6,
        tab_name:'Project 4',
        description:'Project description for project 4',
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
    setUpScroller()

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
        overlay.style.opacity = Math.max(0, Math.min(scrollY / 150, 0.9))
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
    buildSlideShowImages(folder_name);
    updateProjectDescription(folder_name)
}

/**
 * 
 * @param {String} folder_name 
 */
function buildSlideShowImages(folder_name) {
    const gallery = document.getElementById('gallery');
    const prev_button = document.getElementById('prev');
    const thumbnail_row = document.getElementById('thumbnail_row');
    const root = 'assets\\images';

    //TODO - refactor the below into a function
    const image_count = Projects[folder_name].image_count;
    for (i = 1; i <= image_count; i++) {
        var image_src = `${root}\\${folder_name}\\${folder_name}_${i}.jpg`;
        var slide = buildSlide(image_src);
        var thumbnail = buildThumbnail(image_src, i, image_count);

        gallery.insertBefore(slide, prev_button);
        thumbnail_row.appendChild(thumbnail);
    }
}

/**
 * 
 * @param {String} folder_name 
 */
function updateProjectDescription(folder_name){
    const project_description = Projects[folder_name].description
    document.getElementById('project_description').textContent = project_description
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
    Object.keys(Projects).forEach(folder_name => {
        var tab_name = Projects[folder_name].tab_name
        var tab = buildTab(tab_name, folder_name)
        tab_container.appendChild(tab)
    })
}

/**
 * 
 * @param {String} tab_name 
 * @param {String} folder_name 
 * @returns {HTMLButtonElement}
 * Creates the project tab button adds the change project event listener to it
 * and returns the button
 */
function buildTab(tab_name, folder_name){
    var tab = document.createElement("button")
    tab.textContent = tab_name
    tab.className = "tablinks"
    tab.addEventListener("click", ()=>{
        changeProject(folder_name)
    })
    return tab
}

/**
 * 
 * @param {String} folder_name - the name of folder to change to on the carousel
 */
function changeProject(folder_name){  
    clearSlides()
    clearThumbnails()
    buildSlideShow(folder_name)
    showSlide(1)
}

function clearSlides(){
    Array.from(document.querySelectorAll('.slide')).map(ele => ele.remove())
}

function clearThumbnails(){
    Array.from(document.querySelectorAll('.column')).map(ele => ele.remove()) //TODO - why is the class name column
}

/**
 * ensures the scroller is infinite by doubling content
 */
function setUpScroller(){
    const scroll_content = document.querySelector('.scroll-content')
    scroll_content.innerHTML += scroll_content.innerHTML

}