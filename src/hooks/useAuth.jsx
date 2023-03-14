const useAuth = () => {
    const auth = localStorage.getItem('authToken');
    console.log(auth)

  return [auth?true:false]
}

export default useAuth