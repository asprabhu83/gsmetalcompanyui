
<template>
  
 
    <div class="container-fluid">
      
      <div class="row">
        <template v-if="route.path !== '/' ">
         
      <div class="col-2 col-md-2 col-xl-2 col-xs-1 px-sm-2 px-0 sidebar d-none d-lg-block" id="navbarNavDarkDropdown">
            <div class="fixed d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-4"><a class="navbar-brand" href="#"> <img src="./assets/logo2.jpg" alt="" class="imge img-fluid rounded-circle"></a></span>
                </a>
               <sidebar/> <hr>
                <div class="pb-4">
                  Powered by <a href="https://palindromeinfotech.in/" target="blank" class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Palindrome InfoTech</a>
                </div>
            </div>
        </div>
    
        <main class="col-lg-10 col-sm-12 col-xs-12 p-0">
          
  <nav class="navbar navbar-expand-lg fixTop" v-if="route.path !== '/' ">
    <div class="container-fluid">
         <!-- OFFCANVAS MAIN CONTAINER START -->
         <section
         class="offcanvas offcanvas-start d-block d-lg-none"
         id="menuLateral"
         tabindex="-1"
       >
         <div class="offcanvas-header" data-bs-theme="dark">
           <h5 class="offcanvas-title text-info"><span class="fs-4"><a class="navbar-brand" href="#"> <img src="./assets/logo2.jpg" alt="" class="imge img-fluid rounded-circle"></a></span></h5>
           <button
             class="btn-close"
             id="close-button"
             type="button"
             aria-label="Close"
             data-bs-dismiss="offcanvas"
           ></button>
         </div>
         <!-- OFF CANVAS MENU LINKS  START-->
         <div
           class="offcanvas-body d-flex flex-column justify-content-between px-4"
         >
          <sidebar @close="closeSection"/>
           <!-- enlaces redes sociales -->
 
      
         </div>
       </section>
      <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#menuLateral"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
         
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 float-end">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle email d-none d-sm-block" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <!-- <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"> -->
                 <span class="rounded-circle bg-light p-1 mt-2 mr-1 text-dark font-bold">
                  {{initials.firstletter}}{{initials.lastletter}}</span>
                  {{ email }}
                </a>
                <a class="nav-link dropdown-toggle email d-block d-sm-none" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <!-- <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"> -->
                  <span class="rounded-circle bg-light p-1 mt-2 mr-1 text-dark font-bold">
                   {{initials.firstletter}}{{initials.lastletter}}</span>

                 </a>
                <ul class="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><router-link to="/cpassword" class="dropdown-item">Change Password</router-link>
                    
                </li>
                  <li>
                    <a class="dropdown-item" href="" @click="logout" ><span><i
                                class="bi bi-box-arrow-in-left mx-1"></i></span>Logout</a>
                </li>
             
                </ul>
              </li>
            </ul>
          
        </div>
      </nav>
 
     <div class="col-auto">
      <router-view />
     </div>
      
           
        </main>
        </template>
        <template v-if="route.path == '/' ">
        <div :class="{'router': route.path !== '/'}">
                <router-view/>
                
            </div>
          </template>


        </div>
    </div>
  </template>
<script setup>
import {  computed } from 'vue'
import sidebar from '@/views/sidebar.vue'
import { useRouter, useRoute } from 'vue-router'
import 'vue3-autocomplete/dist/vue3-autocomplete.css'

const router = useRouter()
const route = useRoute() 

const email = computed (()=> {
  return localStorage.getItem("email_id");
})
const initials = computed(() => {
  return JSON.parse(localStorage.getItem("loginresponse")).initial
})
        const logout = () => {
            localStorage.removeItem("email_id");
            localStorage.removeItem("loginresponse");
            caches.keys().then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))));

            router.push("/");
        }
      
const closeSection = () =>{
  
  const element = document.getElementById("close-button");
  if(element.checkVisibility())
    element.click(); 
}
</script>


<style lang="scss">

@font-face {
  font-family: rounded;
  src: url('./fonts/SF-Pro-Rounded-Bold.otf');
 
}
@font-face {
  font-family: regular;
  src: url('./fonts/SF-Pro-Rounded-Regular.otf');
}

@font-face {
  font-family:public ;
  src: url('./fonts/PublicSans-VariableFont_wght.ttf');
};
@font-face {
    font-family: displaymedium;
    src: url('./fonts/SFPRODISPLAYMEDIUM.OTF');
}
@font-face {
    font-family: displaybold;
    src: url('./fonts/SFPRODISPLAYBOLD.OTF');
}
@font-face {
    font-family: displayregular;
    src: url('./fonts/SFPRODISPLAYREGULAR.OTF');
}
.fixTop {
  background-color: #111c43 !important;
  position: sticky !important;
  z-index: 1;
  top: 0;
}
.sidebar, .offcanvas {
  background-color: #111c43 !important;
 
}
.router{
   
    
  
  padding-top: 77px;
 
}
label{
    font-family: displaymedium;
    color: #070A13;
    font-weight: 400;
    font-size: 14px;
   
}

.dim-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 999; 
}


.box {
    
    background: white;
    text-transform: capitalize;
   }
::placeholder{
    font-size: 16px;
    font-weight: 50;
    font-family: displayregular;
    
    
}
ul.breadcrumb {
  padding: 10px 16px;
  list-style: none;
  background:#eeeef5 ;
  
 
  
 
}
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}
ul.breadcrumb li+li:before {
  padding: 8px;
  color: rgb(112, 110, 110);
  content: "/";
}
ul.breadcrumb li a {
  color: #0275d8;
  text-decoration: none;
}
ul.breadcrumb li a:hover {
  color: #01447e;
  text-decoration: underline;
}
.navbar-toggler {
  background-color: whitesmoke !important;
}


.edit-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  
  
}

@media (max-width: 768px) {
  .edit-dialog {
    max-width: 100%;
    padding: 10px;
  }
}



.dustbin{
    color: red;
}
.fix{
  // background: #F5F5FA;
 background:#eeeef5 ;
 min-height: 100vh;
  
}


.addbutton {
   
  
    background-color: #213785;
    color: #F5F5FA;
    border: 2px solid #373075;
    padding: 7px 28px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;

}



.addbutton:hover {
    background-color: #463bac;
    color: white;
}

.addbutton2 {
    background-color: #ffffff;
    border: 2px solid #CBD5E1;
    color:#070A13;
    padding: 7px 28px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
   
    
  

}



.addbutton2:hover {
    background-color: #ebeef1;
    color:#070A13;
}
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
   
    color: #375aa5;
    height: 700px; 
  }
  .contents{
    position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  
}

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

.imge {
  height: 45px !important;
  
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
.nav-link{
  color: #FFFFFF !important;
 
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

@media screen and (max-width: 768px) {
  .imge {
    height: 25px !important;
    
  }
}
nav,
.offcanvas {
  background-color: #1e293b;
}
.navbar-toggler {
  border: none;
}
.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}


.offcanvas.offcanvas-start {
  width: 75% !important;
}

.p-paginator {
  border-radius: 0px !important;
}

</style>
