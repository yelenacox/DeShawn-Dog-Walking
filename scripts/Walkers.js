import { getWalkers } from "./database.js"
import { getWalkerCities } from "./database.js"
import { getCities } from "./database.js"

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {

        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("walker")) {
            const [, walkerPrimaryKey] = itemClicked.id.split("--")
            for (const walker of walkers) {
                if (walker.id === parseInt(walkerPrimaryKey)) {
                    const assignments = filterWalkerCitiesByWalker(walker)
                    const cities = assignedCityNames(assignments)
                    window.alert(`${walker.name} services ${cities}.`)
                }
            }
        }
    }
)

const filterWalkerCitiesByWalker = (walker) => {
    let assignments = []
    for (const assignment of walkerCities) {
        if (assignment.walkerId === walker.id) {
            assignments.push(assignment)
        }
    }
    return assignments
}

const assignedCityNames = (assignments) => {
    let cityNames = ""
    for (const assignment of assignments) {
        for (const city of cities) {
            if (city.id === assignment.cityId) {
                if (cityNames === "") {
                    //if cityNames is empty set it equal to first city
                    cityNames = city.name
                }
                else {
                    //if cityNames is not empty add " and " then city.name to the string
                    cityNames = `${cityNames} and ${city.name}`
                }
            }
        }
    }
    return cityNames
}

const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML
}