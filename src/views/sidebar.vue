<template>
   
       
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-sm-start " id="menu">
                
        
                <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
                    <router-link :to="item.link" class="nav-link align-middle px-0" @click="$emit('close')">
                        <i :class="'fs-4 ' + item.icon"></i><span class="ms-2">{{ item.name }}</span>

                    </router-link>
                </li>
            </ul>
   
        
    

</template>

<script>
export default {
    name: 'sidebar-page',
    data() {
        return {
            sidebarItems: [],
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            loggedIn: false,
            email: "",
            toggleBoxVisible: false

        }
    },
    mounted() {
        const storedObject = localStorage.getItem("loginresponse");
        const loginResponse = JSON.parse(storedObject);
        if (loginResponse && loginResponse.data) {
            let keys = loginResponse.data;
            keys.forEach(key => {
                let formattedKey = key.replace('_', '  &  ');
                if (formattedKey === 'quotation') {
                    formattedKey = 'estimate';
                }
                if (formattedKey === 'terms&condition') {
                    formattedKey = 'terms & condition'
                }
                let icon = '';
                switch (key) {
                    case 'user':
                        icon = 'bi bi-person-fill';
                        break;
                    case 'company':
                        icon = 'bi bi-building-fill';
                        break;
                    case 'jobwork':
                        icon = 'bi bi-box-fill';
                        break;
                    case 'terms&condition':
                        icon = 'bi bi-clipboard-check-fill';
                        break;
                    case 'product':
                        icon = 'bi bi-nut-fill';
                        break;
                    case 'unit':
                        icon = 'bi bi-caret-up-square-fill';
                        break;
                    case 'quotation':
                        icon = 'bi bi-calculator-fill';
                        break;
                }

                this.sidebarItems.push({
                    name: formattedKey.charAt(0).toUpperCase() + formattedKey.substr(1).toLowerCase() ,
                    link: '/' + key,
                    icon: icon
                })
            })
        }
        


    },
    methods: {
        closeSection() {
            this.$parent.$emit("closeSection")
        }
    }

}
</script>


<style scoped>
.active-link {
  
    background: rgba(255, 255, 255, 0.22);
    border-radius: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0.6px);
    -webkit-backdrop-filter: blur(0.6px);
    border: 1px solid rgba(255, 255, 255, 0.22);
    padding: 5px 20px 5px 0px; 
    color: #ffffff;
    
}
.sidenav ul{
    padding-left: 0.5rem;
}

.sidenav {
    background-color: #111c43 !important;
    height: 100% !important;
    
  }

.sidenav li {
    list-style: none;
    padding: 5px 20px 5px 0px; 
    
    font-family: displayregular;
    text-align: left; 
    width: 100%; 
}

.sidenav li a {
    text-decoration: none;
    color: #f1f0f0;
    font-size: .98rem;
    font-weight: 300;
    font-family: displayregular;
    display: block;
    padding: 5px 20px 5px 0px; 
  
}

.sidenav li a:hover {
    background: rgba(255, 255, 255, 0.22);
    border-radius: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0.6px);
    -webkit-backdrop-filter: blur(0.6px);
    border: 1px solid rgba(255, 255, 255, 0.22);
    padding: 5px 20px 5px 0px; 
    color: #ffffff;
    
}





.imge2 {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border-style: double;
    border-color: rgb(5, 68, 37);
}

.small-box {
    background-color: #ffffff;
    height: 70px;
    border: 1px solid #ebe7e7;
   
   
    right: 12px;
    position: absolute;
}

.small-box ul {
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 100%; 
}

.small-box li {
    list-style: none;
    margin-right: 32px;
   
}

.small-box li a {
    color: #020b16;
    text-decoration: none;
    display: flex;
    align-items: center; 
}
.small-box li a:hover {
    background-color: #1a3077;
    padding: 8px;
    border-radius: 5px;
    color: #ffffff;
}
.email{
   margin-top: 10px;
}

@media screen and (max-width: 368px) {
    .sidenav {
        width: 100%;
        z-index: 1;
    }

    .router {
        margin-left: 250px;
    }
}


</style>
