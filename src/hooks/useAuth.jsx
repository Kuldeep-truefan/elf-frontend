const useAuth = () => {
    const auth = localStorage.getItem('authToken');

  return [auth?true:false]
}

export default useAuth