<template>

    <div class="  fix p-3 ">
        <div class="d-flex">
            <i class="bi bi-arrow-left-short mt-1 " @click="closeDialog" style="font-size: 25px; cursor: pointer;"></i>

            <div>
                <ul class="breadcrumb">
                    <li><router-link to="/quotation" >Home</router-link></li>
                    <li><router-link to="/company" >Company</router-link></li>
                    <li v-if="showPass">Add Company</li>
                    <li v-else>Edit Company</li>


                </ul>
            </div>
        </div>
        <div v-if="loading" class="spinner ">
            <div class="spinner-border " role="status">
      
            </div>
          </div>
        <div v-else class="">
            <div class="   bg-white mt-3 p-5">
                <div class=" row">
                    <div>
                        <label for="companyName"> Name*</label>
                        <input type="text" autocomplete="off" id="companyName" class="form-control  mb-4" v-model="details.company_name"
                            placeholder="Enter company name">


                    </div>
                    <div  class="col-md-6 ">
                        <label for="email" >Email</label>
                        <input type="email" id="email" class="form-control" :class="isEmailValid() == 'has-success' || details.company_email_id ==''? 'mb-4':''" v-model="details.company_email_id" @keyup="isEmailValid()"
                            placeholder="Enter email">
                            <div v-if="isEmailValid() == 'has-error' && details.company_email_id!==''" class=" mb-4 text-danger">Invalid Email!..</div>
                    </div>
                   
                    <div class="col-md-6 ">
                        <label for="companyPhoneNumber"> Phone Number*</label>
                        <input type="text" autocomplete="off" id="companyPhoneNumber" class="form-control  mb-4 "
                            v-model="details.company_phone_no" placeholder="Enter company phone number">

                    </div>
                     <div class="col-md-6 ">
                        <label for="companyPhoneNumber">Alternate Phone Number*</label>
                        <input type="text" autocomplete="off" id="alternatePhoneNumber" class="form-control  mb-4 "
                            v-model="details.alter_no" placeholder="Enter alternate phone number">

                    </div>
                       <div class="col-md-6 ">
                        <label for="landline">Landline Number*</label>
                        <input type="text" autocomplete="off" id="landline" class="form-control  mb-4 "
                            v-model="details.landline_no" placeholder="Enter landline number">

                    </div>
                    <div>
                        <label for="companyWebsite"> Website</label>
                        <input type="text" autocomplete="off" id="companyWebsite" class="form-control  mb-4 "
                            v-model="details.company_website" placeholder="Enter company website">


                    </div>
                    <div>
                        <label for="companyLogo"> Logo</label>
                        <input type="file" id="companyLogo" class="form-control  mb-4" @change="handleFileChange"
                            placeholder="Upload company logo">
                        <div v-if="!showPass" class="my-3">
                            <img :src="details.editImage" alt="product Logo" style="max-width: 50px; max-height: 50px;">
                        </div>



                    </div>
                    <div class="col-md-6   ">
                        <label for="address1">Address 1</label>
                        <input type="text" autocomplete="off" id="address1" class="form-control  mb-4 " v-model="details.address1"
                            placeholder="Enter address 1">

                    </div>
                    <div class="col-md-6 ">
                        <label for="address2">Address 2</label>
                        <input type="text" autocomplete="off" id="address2" class="form-control  mb-4 " v-model="details.address2"
                            placeholder="Enter address 2">

                    </div>
                    <div>
                        <label for="city">City</label>
                        <input type="text" autocomplete="off" id="city" class="form-control  mb-4 " v-model="details.city"
                            placeholder="Enter city">

                    </div>
                    <div>
                        <label for="zipCode">Zip Code</label>
                        <input type="text" autocomplete="off" id="zipCode" class="form-control  mb-4 " v-model="details.zip_code"
                            placeholder="Enter zip code">
                    </div>


                    <div class="col-md-6">
                        <label for="bankName">Bank Name</label>
                        <input type="text" autocomplete="off" id="bankName" class="form-control  mb-4 " v-model="details.bank_name"
                            placeholder="Enter bank name">
                    </div>
                    <div class="col-md-6">
                        <label for="bankAccountNo">Bank Account No</label>
                        <input type="text" autocomplete="off" id="bankAccountNo" class="form-control  mb-4 " v-model="details.bank_ac_no"
                            placeholder="Enter bank account number">

                    </div>



                    <div class="col-md-6   ">
                        <label for="bankBranch">Bank Branch</label>
                        <input type="text" autocomplete="off" id="bankBranch" class="form-control  mb-4 " v-model="details.bank_branch"
                            placeholder="Enter bank branch">


                    </div>
                    <div class="col-md-6 ">
                        <label for="ifsc">IFSC</label>
                        <input type="text" autocomplete="off" id="ifsc" class="form-control  mb-4 " v-model="details.ifsc_number"
                            placeholder="Enter IFSC">
                    </div>

                    <div>
                        <label for="companyGSTNumber">Company GST Number</label>
                        <input type="text" autocomplete="off" id="companyGSTNumber" class="form-control  mb-4 "
                            v-model="details.company_gst_number" placeholder="Enter company GST number">

                    </div>
                    <div class="d-flex flex-row-reverse bd-highlight ">
                        <button v-if="showPass" class=" addbutton " @click="postapicompany">Submit</button>
                        <button v-else class=" addbutton " @click="updateCompany">Save Changes</button>
    
                    </div>

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
    name: 'companydialogbox-content',
    components: {
        Toast
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            loading:false,
            validate_fields:['company_name',  'company_phone_no' ],
        
            details: {
                company_name: '',
                address1: '',
                address2: '',
                city: '',
                zip_code: '',
                company_email_id: '',
                company_phone_no: '',
                alter_no: '',
                landline_no: '',
                company_logo: '',
                company_website: '',
                bank_name: '',
                bank_ac_no: '',
                bank_branch: '',
                ifsc_number: '',
                company_gst_number: ''
            },
            showPass: true,

        }
    },
    mounted() {
        if (this.$route.query && this.$route.query.data) {
            this.details = JSON.parse(this.$route.query.data)
            this.showPass = false
        } else {
            this.showPass = true
        }

    },

    methods: {
        isEmailValid() {
                      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.details.company_email_id)) {
        return 'has-success'
      } else {
        return 'has-error'
      }
     
    },
        showError(errorMessage) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        },
        async postapicompany() {
            this.loading = true
            let errorsValid = 0
            this.validate_fields.forEach((quote)=> {
                if(this.details[quote] == '' ) {
                    
                    errorsValid += 1
                    return false
                }
            })

            if(errorsValid === 0) {
         
            await axios.post(this.apiUrl + "/company", this.details);
            this.details = {};
            this.closeDialogAndNavigate();
            }else {
                this.showError("Please Fill Mandatory Fields!..")
            }
            setTimeout(this.loading=false, 3000)

        },
        async updateCompany() {
            this.loading = true
            const companyId = this.details.company_id;

            await axios.put(`${this.apiUrl}/updatecom/${companyId}`, this.details);
            this.details = {}
            this.$router.push('/company')
            setTimeout(this.loading=false, 3000)

        },
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                this.details.company_logo = reader.result;

            };
            reader.readAsDataURL(file);

        },
        closeDialog() {
            this.closeDialogAndNavigate();
        },
        closeDialogAndNavigate() {

            this.$emit('closeDialog');

            this.$router.push({ name: 'companymaster' });
        }
    }
}
</script>


<style scoped></style>