<template>
    
    <div class=" fix   p-3 ">
       
        <div class="d-flex">
    <i class="bi bi-arrow-left-short mt-1 " @click="closeDialog" style="font-size: 25px; cursor: pointer;"></i>

    <div>
        <ul class="breadcrumb">
         <li><router-link to="/quotation" >Home</router-link></li>
        <li><a href="#">Change Password</a></li>
    </ul>
      </div>
      </div>
      <div v-if="loading" class="spinner ">
        <div class="spinner-border " role="status">
  
        </div>
      </div>
        <div v-else class=" bg-white mt-3 p-5">  
            <div >
                <label for="userPassword">User Password*</label>
                <input type="password" id="userPassword" class="form-control  mb-4"
                    v-model="cpassword.newpassword" placeholder="Enter user password">
            </div>
            <div>
                <label for="userPassword">Confirm Password*</label>
                <input type="password" id="confirmPassword" class="form-control " :class="confirmPassword == ''?'mb-4':''"
                    v-model="confirmPassword" placeholder="Enter user password">

                <div :class="confirmPassword === cpassword.newpassword?'color-green':'color-red'" class=" mb-4" v-if="confirmPassword !== '' && cpassword.newpassword!==''"> 
                    <span v-if="confirmPassword === cpassword.newpassword" >
                        Password Matches !...
                    </span>
                    <span v-else>
                        Password does not Matches!..
                    </span>
                </div>
            </div>
            <div class="d-flex flex-row-reverse bd-highlight ">
                          
                <button :disabled="confirmPassword != cpassword.newpassword" class=" addbutton "  @click="passwordpost">Submit</button>
               
            </div>
           </div>
           <Toast/>
            </div>
            
     

 
</template>

<script>
import axios from 'axios'
import Toast from 'primevue/toast';
export default {
    name:'changePassword',
    components: {
    Toast
},
    data(){
        return{
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            confirmPassword: '',
            loading: false,
            cpassword: {
                emailid: localStorage.getItem('email_id').toString(),
                newpassword: ''
            }
        }
    },
 
    methods:{
        showError(errorMessage) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
    },
        async passwordpost() {
            this.loading = true
          
             await axios.put(this.apiUrl + "/updatepassword", this.cpassword);
            this.unit = {};
           
         
      
        setTimeout(this.loading=false, 3000)

    },
    
    }
}
</script>

<style scoped>


</style>