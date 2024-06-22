<template>

    <div class="fix p-3">
     
        <div class="d-flex">
        <i class="bi bi-arrow-left-short mt-1 " @click="closeDialog" style="font-size: 25px; cursor: pointer;"></i>

        <div>
        <ul class="breadcrumb">
            <li><router-link to="/quotation" >Home</router-link></li>
            <li><router-link to="/terms&condition" >Terms&condition</router-link></li>
            <li v-if="showPass"><a href="#">Add Terms&condition</a></li>
            <li v-else><a href="#">Edit Terms&condition</a></li>
        </ul>
       </div>
       </div>
       <div v-if="loading" class="spinner ">
        <div class="spinner-border " role="status">
  
        </div>
      </div>
        <div v-else class=" bg-white mt-3  ">
            <div class="row p-5">

                <label for="">Terms and Conditions</label>
                <input type="text" autocomplete="off" class="form-control  my-2" v-model="terms.terms_conditions_name">
                <div v-for="(term_value, index) in terms.tc_value" :key="index">
                    <label for="">Terms value</label>
                    <input type="text" autocomplete="off" class="form-control  my-2" v-model="terms.tc_value[index]">
                    <button v-if="index == 0" class="addbutton" @click="addtcvalue">+</button>
                    <button v-if="index > 0" class="addbutton" @click="removetcvalue(terms.tc_value, index)">-</button>

                </div>


                <div class="  d-flex flex-row-reverse bd-highlight">


                    <button v-if="showPass" class=" addbutton " @click="termspost">Submit</button>
                    <button v-else class="addbutton" @click="updateterms">Save Changes</button>
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
    name: 'termsandconditionsdialogbox-content',
    components: {
        Toast
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            validate_fields:['terms_conditions_name'],
            terms: {
                terms_conditions_name: '',
                tc_value: [''],
            },
            showPass: true,
            loading: false
        }
    },
    mounted() {
        if (this.$route.query && this.$route.query.data) {
        try {
            const parsedData = JSON.parse(this.$route.query.data);
            this.terms = {
                tc_id: parsedData.tc_id,
                terms_conditions_name: parsedData.terms_conditions_name,
                tc_value: parsedData.tc_value.split(',') 
            };
            
            this.showPass = false;
        } catch (error) {
            console.error('Error parsing JSON data:', error);
        }
    } else {
        this.showPass = true;
    }

    },
    methods: {
        showError(errorMessage) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        },
        async termspost() {
            this.loading = true
            let errorsValid = 0
            this.validate_fields.forEach((quote)=> {
                if(this.terms[quote] == '' ) {
                    
                    errorsValid += 1
                    return false
                }
            })

            if(errorsValid === 0) {
           
             await axios.post(this.apiUrl + "/terms", this.terms);
            this.terms = {};
            this.closeDialogAndNavigate();
            }else {
                this.showError("Terms & Conditions Name cannot be empty!..")
            }
            setTimeout(this.loading=false, 3000)

        },
        async updateterms() {
this.loading = true

            const termsId = this.terms.tc_id;
                

            await axios.put(`${this.apiUrl}/updatetc/${termsId}`, this.terms)
            this.terms={}
            this.$router.push('/terms&condition')

            setTimeout(this.loading=false, 3000)

        },
        addtcvalue() {
            this.terms.tc_value.push('');
        },
        removetcvalue(tc_value, index) {
            tc_value.splice(index, 1)
        },
        closeDialog() {
            this.closeDialogAndNavigate();
        },
        closeDialogAndNavigate() {

            this.$emit('closeDialog');

            this.$router.push({ name: 'terms&condition' });
        }

    }


}
</script>

<style scoped>


</style>