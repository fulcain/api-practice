
function apiCall(url) {
    return (
        new Promise(
            (resolve, reject) => {

                // create xhr object
                const xhr = new XMLHttpRequest()
                // open 
                xhr.open("GET", url, true)

                // onload
                xhr.onload = function () {
                    // if there is no error in getting data
                    if (this.status === 200) resolve(JSON.parse(this.responseText))

                    // if there is an error in getting data
                    if (this.status !== 200) reject("error!")
                }
                // send
                xhr.send()
            }
        )
    )
}
export default apiCall