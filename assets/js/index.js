import silverBox from "../libraries/silverBox_1.0.0-rc6_min/silverBox.min.js";

const oiOiOi = `
<!-- input section -->
<section id="name-fake-input">
    <div class="container">
        <!-- input wrapper -->
        <div class="input-wrapper">
            <!-- label -->
            <label for="gender">Gender</label>
            <!-- select -->
            <select name="gender" id="gender">
                <option value="random">random</option>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
        </div>
    </div>
</section>`
const startApp = document.querySelector('#startApp')
startApp.addEventListener("click",() =>{
    silverBox({
    silverBoxId:"nameFakeInput",
    theme: "dark",
    html: oiOiOi,
    confirmButton:{
        text:"generate",
        closeOnClick:true
    },
})
})