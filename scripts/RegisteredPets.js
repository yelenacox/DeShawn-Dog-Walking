import { getPets } from "./database.js"
import { getWalkers } from "./database.js"

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("pet")) {
            const [, petPrimaryKey] = itemClicked.id.split("--")
            const matchingPet = pets.find(pet => pet.id === parseInt(petPrimaryKey))
            const matchingWalker = walkers.find(walker => matchingPet.walkerId === walker.id)

            window.alert(`${matchingPet.name} is being walked by ${matchingWalker.name}`)
        }
    }
)
const pets = getPets()
const walkers = getWalkers()

export const RegisteredPets = () => {
    let petHTML = "<ul>"

    for (const pet of pets) {
        petHTML += `<li id="pet--${pet.id}">${pet.name}</li>`
    }

    petHTML += "</ul>"

    return petHTML
}

