async function LoginUser(username, password) {
    try {

        let userDetails = await API.post('http://127.0.0.1:7000/log/api/token');
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


export default LoginUser;
