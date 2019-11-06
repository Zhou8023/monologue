import http from '../../utils/index'
export function getTable(url,params) {
    return http.get(url,params)
}