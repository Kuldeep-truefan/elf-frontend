async function LoginUser(username, password) {
    try {

        let userDetails = await API.post('http://127.0.0.1:8000/log/api/token');
        // if (userDetails.isExistingUser) {
        //     console.log(userDetails,"userdetails")
        // }
        console.log(userDetails)
        return userDetails;
    }
    catch (err) {
        return false;
    }
}

// async function MakePublic(filename){

//     let MakePublic = async()=> {
//         var publink = fetch(`http://127.0.0.1:7000/log/makepub`, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json' }
//         })
//         publink.then(response => {
//             return response.json();
//         }).then(data => {
//             console.log("JKJHKHDFK",data);
//         });
//     }
// }

export default LoginUser;
