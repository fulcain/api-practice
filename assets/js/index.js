import silverBox from "../libraries/silverBox_1.0.0-rc6_min/silverBox.min.js";
import apiCall from "./apiCall.js";

const nameFake = document.querySelector('#nameFake')
const catAndDog = document.querySelector("#catAndDog")

// name fake start button
nameFake.addEventListener("click", () => {
    // creating a popUp modal
    silverBox({
        theme: "dark",
        html: fakeNameInputTemplate(),
        confirmButton: {
            buttonId: 'generate-button',
            text: "Generate",
            closeOnClick: false
        },
    })

    // calling generate function
    showNameFake()
})

// cat and dog start button 
catAndDog.addEventListener('click', () => {
    // create popUp modal
    silverBox({
        theme: "dark",
        html: catAndDogInputTemplate(),
        confirmButton: {
            buttonId: 'show-image',
            text: "Show image",
            closeOnClick: false
        },
    })
    // calls show catAndDog function
    showCatAndDog()
})

// genders array
let genderArray = ['female', 'male']

// generates the the result modal after gathering information from apiCall and gender selection

function showNameFake() {
    // select generate button
    const generateBtn = document.querySelector("#generate-button")
    const gender = document.querySelector('#gender')

    generateBtn.addEventListener('click', () => {
        // gender selection
        let userGender = gender.value

        // selects gender randomly
        if (userGender === 'random') {
            userGender = genderArray[Math.floor(Math.random() * genderArray.length)]
        }

        // calls the apiCall
        // api call for fakeName
        apiCall(`https://api.namefake.com/english-united-states/${userGender}`)
            .then(
                (data) => {
                    silverBox({
                        title: "Result",
                        theme: 'dark',
                        removePrevLoadings: 'all',
                        removePrevBoxes: 'all',
                        showCloseButton: true,
                        html: fakeNameResultTemplate(data, userGender),
                        customIcon: `assets/images/${userGender}.svg`,
                        centerContent: true,
                    })
                }
            )
    })
}
// Generates dog and cat pic after the dog/cat selection 

function showCatAndDog() {
    // select show image button 
    const showImage = document.querySelector('#show-image')
    const catAndDog = document.querySelector("#cat-and-dog")


    showImage.addEventListener('click', () => {
        // stores the select value inside the catAndDogValue variable
        let catAndDogValue = catAndDog.value

        apiCall(`https://api.the${catAndDogValue}api.com/v1/images/search`)
            .then(
                response => {
                    return response[0]
                })
            .then(
                finalResponse => {
                    silverBox({
                        theme: 'dark',
                        html: catAndDogResultTemplate(finalResponse.url),
                        denyButton: {
                            text: 'Go back',
                            closeOnClick: true,
                        },
                        removePrevLoadings: 'last'
                    })
                }

            )

    })
}
// templates

// fake name api inputTemplate
function fakeNameInputTemplate() {
    return (
        `
        <!-- input section -->
        <section id="name-fake-input">
            <div class="container">
                <!-- input wrapper -->
                <div class="input-wrapper">
                    <!-- label -->
                    <label for="gender">Gender</label>
                    <!-- select -->
                    <select name="gender" id="gender">
                        <option value="random">Random</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
        </section>`
    )
}

// fakeName resultTemplate
function fakeNameResultTemplate(response, userGender) {
    return (` 
    <section id="result">
        <div id="information">
            <div>Name: ${response.name}</div>
            <div>Gender: ${userGender}</div>
            <div>Email: ${response.email_d}</div>
            <div>Height: ${response.height}</div>
            <div>Weight: ${response.weight}</div>
            <div>Phone: ${response.phone_h}</div>
        </div>
    </section>`
    )
}
// cat and dog Input template
function catAndDogInputTemplate() {
    return (
        `
        <!-- input section -->
        <section id="cat-and-dog-input">
            <div class="container">
                <!-- input wrapper -->
                <div class="input-wrapper">
                    <!-- label -->
                    <label for="cat-and-dog">Animal</label>
                    <!-- select -->
                    <select name="cat-and-dog" id="cat-and-dog">
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </select>
                </div>
            </div>
        </section>`
    )
}
// cat and dog resultTemplate 
function catAndDogResultTemplate(imageUrl) {
    return (
        ` 
    <section id="result">
        <img id="animal-image" src="${imageUrl}">
    </section>
    `
    )
}