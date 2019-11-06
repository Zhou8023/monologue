import http from '../../utils/index'
export function login(url,params) {
    return http.post(url,params)
}