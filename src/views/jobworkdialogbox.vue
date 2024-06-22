<template>


    <div class="   fix  p-3  ">
       
        <div class="d-flex">
        <i class="bi bi-arrow-left-short mt-1 " @click="closeDialog" style="font-size: 25px; cursor: pointer;"></i>

        <div>
        <ul class="breadcrumb">
            <li><router-link to="/quotation" >Home</router-link></li>
            <li><router-link to="/jobwork" >Jobwork</router-link></li>
          
            <li v-if="showPass">Add Jobwork</li>
            <li v-else>Edit Jobwork</li>
        </ul>
        </div>
        </div>
        <div v-if="loading" class="spinner ">
            <div class="spinner-border " role="status">
      
            </div>
          </div>
        <div v-else class=" bg-white mt-3 row ">
            <div class="  col-md-12 p-5 ">


                <label for="jobwork_name">Jobwork Name*</label>
                <input type="text" autocomplete="off" id="jobwork_name" class="form-control  mb-4" v-model="jobwork.jobwork_name"
                    placeholder="Enter Jobwork Name ">
                
                <div class=" float-end  ">
                    <button v-if="showPass" class=" addbutton " @click="jobworkpost">Submit</button>
                    <button v-else class=" addbutton " @click="updatejobwork">Save Changes</button>

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
    name: "jobworkdialogbox-content",
    components: {
        Toast
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            validate_fields:['jobwork_name'],
        

            jobwork: {
                jobwork_name: '',
                jobwork_description: '',


            },
            showPass: true,
            loading:false,
        }
    },
    mounted() {
        if (this.$route.query && this.$route.query.data) {
            this.jobwork = JSON.parse(this.$route.query.data)
            this.showPass = false
        } else {
            this.showPass = true
        }

    },
    methods: {
        showError(errorMessage) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        },
        async jobworkpost() {
            this.loading = true
            let errorsValid = 0
            this.validate_fields.forEach((quote)=> {
                if(this.jobwork[quote] == '' ) {
                    
                    errorsValid += 1
                    return false
                }
            })

            if(errorsValid === 0) {
                this.jobwork.jobwork_description = this.jobwork.jobwork_name
            await axios.post(this.apiUrl + "/jobwork", this.jobwork);
            this.jobwork = {};

            this.closeDialogAndNavigate();
            }else {
                this.showError("Jobwork cannot be empty!..")
            }
            setTimeout(this.loading=false, 3000)
        },
        async updatejobwork() {
            this.loading = true


            const jobworkId = this.jobwork.jobwork_id;

            await axios.put(`${this.apiUrl}/updatejob/${jobworkId}`, this.jobwork)
            this.jobwork={}
            this.$router.push('/jobwork')

            setTimeout(this.loading=false, 3000)


        },
        closeDialog() {
            this.closeDialogAndNavigate();
        },
        closeDialogAndNavigate() {

            this.$emit('closeDialog');

            this.$router.push({ name: 'jobwork' });
        }
    }
}
</script>

<style scoped></style>