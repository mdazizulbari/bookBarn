
export const axiosSecure = axiosSecure.create({
    baseURL: 'http://localhost:5555'
})

const useAxiosSecure = () => {
    return axiosSecure;
}