/**
 * Created by 西兰花的春天 on 2017/5/26.
 */
const STORAGE_KEY = 'gcxTest';
export default {
    fetch(){
        return JSON.parse(window.localStorage.getItem(
            STORAGE_KEY) || '[]')
    },
    save(items){
        window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
              }


}