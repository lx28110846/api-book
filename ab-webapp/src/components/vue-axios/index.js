import axios from 'axios'

const VueAxios = {
    install: function(Vue){
        if (this.installed) return;
        this.installed = true;
        
        Vue.axios = axios;
        
        Object.defineProperty(Vue.prototype, "$http",{
            get() {
                return axios
            }
        })
    }
}

export default VueAxios