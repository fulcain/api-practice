import silverBox from "../libraries/silverBox_1.0.0-rc6_min/silverBox.min.js";
import apiCall from "./apiCall.js";

const startButton = document.querySelector('#startApp')

startButton.addEventListener("click", () => {
    // creating a popUp modal
    silverBox({
        theme: "dark",
        html: inputTemplate(),
        confirmButton: {
            buttonId: 'generate-button',
            text: "Generate",
            closeOnClick: false
        },
    })

    // calling generate function
    generate()
})

// generate button event listener

let genderArray = ['female', 'male']

function generate() {
    // select generate button
    let generateBtn = document.querySelector("#generate-button")
    let gender = document.querySelector('#gender')

    generateBtn.addEventListener('click', () => {
        // gender selection
        let userGender = gender.value

        // selects gender randomly
        if (userGender === 'random') {
            userGender = genderArray[Math.floor(Math.random() * genderArray.length)]
        }

        // calls the apiCall

        apiCall(`https://api.namefake.com/english-united-states/${userGender}`)
            .then(
                (data) => {
                    silverBox({
                        title: "Result",
                        theme: 'dark',
                        removePrevLoadings: 'all',
                        removePrevBoxes: 'all',
                        customIconId: 'icon',
                        html: resultTemplate(data, userGender),
                        customIcon: `assets/images/${userGender}.svg`,
                        centerContent: true,

                    })
                }
            )

    })
}

// templates
function inputTemplate() {
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

function resultTemplate(response, userGender) {
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
