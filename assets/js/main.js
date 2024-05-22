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
        y: window.scrollY + rect.top - 100,
        x: window.scrollX + rect.left
    }

}

function setHeadlineOpacityChange(){
    document.addEventListener('scroll', () => {
        var overlay = document.getElementById('overlay')
        console.log(scrollY)
        overlay.style.opacity = Math.max(0, Math.min(scrollY / 350, 0.9))
    })
}