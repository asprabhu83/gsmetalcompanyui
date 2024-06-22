<template>
    
        <div class=" fix   p-3 ">
           
            <div class="d-flex">
        <i class="bi bi-arrow-left-short mt-1 " @click="closeDialog" style="font-size: 25px; cursor: pointer;"></i>

        <div>
            <ul class="breadcrumb">
             <li><router-link to="/quotation" >Home</router-link></li>
               <li><router-link to="/unit" >Unit</router-link></li>
            <li v-if="showPass"><a href="#">Add Unit</a></li>
            <li v-else><a href="#">Edit Unit</a></li>


        </ul>
          </div>
          </div>
          <div v-if="loading" class="spinner ">
            <div class="spinner-border " role="status">
      
            </div>
          </div>
            <div v-else class=" bg-white mt-3 ">  
                <div class="row p-5 ">
                   
                    <label for="unit_text">Unit text*</label>
                    <input type="text" autocomplete="off" id="unit_text" class="form-control  my-2"   v-model="unit.unit_text"
                        placeholder="Enter unit text ">
                    <label for="unit_type">Unit Type* </label> 
                    <input type="text" autocomplete="off" id="unit_type" class="form-control  my-2"  v-model="unit.unit_type"
                        placeholder="Enter unit type ">
                        <div class="d-flex flex-row-reverse bd-highlight ">
                          
                        <button v-if="showPass" class=" addbutton "  @click="unitpost">Submit</button>
                        <button v-else class=" addbutton "  @click="updateunit">Save changes</button>
                    </div>
                </div>
                </div>
                <Toast/>
            </div>

    
     
</template>

<script>
import axios from 'axios'
import Toast from 'primevue/toast';
    export default {
        name:'unitdialogbox-content',
        components: {
        Toast
    },
        data(){
            return{
                apiUrl: process.env.VUE_APP_API_BASE_URL,
                validate_fields:['unit_text', 'unit_type'],
                loading: false,


    unit: {
    unit_text: '',
    unit_type: '',


      },
      showPass: true,

            }
        },
        mounted() {
        if (this.$route.query && this.$route.query.data) {
            this.unit = JSON.parse(this.$route.query.data)
            this.showPass = false
        } else {
            this.showPass = true
        }

    },
        methods:{
            showError(errorMessage) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        },
            async unitpost() {
                this.loading = true
                let errorsValid = 0
            this.validate_fields.forEach((quote)=> {
                if(this.unit[quote] == '' ) {
                    
                    errorsValid += 1
                    return false
                }
            })

            if(errorsValid === 0) {
                 await axios.post(this.apiUrl + "/unit", this.unit);
                this.unit = {};
               
                this.closeDialogAndNavigate();
            } else {
                this.showError("Unit Information cannot be empty!..")
            }
          
            setTimeout(this.loading=false, 3000)

        },
        async updateunit() {
            
this.loading = true

            const unitId = this.unit.unit_id;


            await axios.put(`${this.apiUrl}/updateunit/${unitId}`, this.unit)
            this.unit={}
            this.$router.push('/unit')

            

        
            setTimeout(this.loading=false, 3000)

            

    
       
    },
        closeDialog() {
            this.closeDialogAndNavigate(); 
    },
    closeDialogAndNavigate() {
            
            this.$emit('closeDialog');

            this.$router.push({ name: 'unit' });
        }
        
        }
    }
</script>

<style scoped>


</style>