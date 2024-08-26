<template>

    <div class="  fix p-3">
      
        <div class="d-flex">
        <i class="bi bi-arrow-left-short mt-1 " @click="closeDialog" style="font-size: 25px; cursor: pointer;"></i>

        <div>

        
        <ul class="breadcrumb " v-if="routeName != 'newusermaster'">
             <li><router-link to="/quotation" >Home</router-link></li>
            <li><router-link to="/user" >User</router-link></li>
            <li v-if="showPass"><a href="#">Add User</a></li>
            <li v-else><a href="#">Edit User</a></li>


        </ul>
        <ul class="breadcrumb " v-if="routeName === 'newusermaster'">
            <li><router-link to="/quotation" >Home</router-link></li>
           <li><router-link to="/quotation" >Estimates</router-link></li>
           <li v-if="showPass"><a href="#">Add Customer</a></li>
           <li v-else><a href="#">Edit User</a></li>


       </ul>
        </div>
        </div>

        <div v-if="loading" class="spinner ">
            <div class="spinner-border " role="status">
      
            </div>
          </div>

        <div v-else  class=" bg-white mt-3 ">

            <div class=" bg-white mt-3 p-5 mb-2">
                <div class=" row">
                    <div v-if="userRole === 'admin' && routeName != 'newusermaster'">
                        <label for="userRole">User Role*</label>
                        <select id="userRole" class="form-select w-50  mb-4" v-model="details.user_role">
                            <option value="admin">Admin</option>
                            <option value="salesperson">Salesperson</option>
                            <option value="customer">Customer</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>
                    <div v-if="userRole === 'staff' && routeName != 'newusermaster'">
                        <label for="userRole">User Role*</label>
                        <select id="userRole" class="form-select w-50  mb-4" v-model="details.user_role">
                            <option value="salesperson">Salesperson</option>
                            <option value="customer">Customer</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>
                    <div class="col-md-6   ">
                        <label for="firstName">First Name*</label>
                        <input type="text" autocomplete="off" id="firstName" class="form-control  mb-4 " v-model="details.first_name"
                            placeholder="Enter first name">
                    </div>
                    <div class="col-md-6 ">
                        <label for="lastName">Last Name</label>
                        <input type="text" autocomplete="false" role="presentation" id="lastName" name="last_name" class="form-control  mb-4" v-model="details.last_name"
                            placeholder="Enter last name">
                    </div>
                    <div v-if="details.user_role === 'customer'">
                        <label for="clientname">Client Name*</label>
                        <input type="text" autocomplete="off" id="clientname" class="form-control  mb-4" v-model="details.client_name"
                            placeholder="Enter Client Name">
                    </div>
                    <div class="col-md-6" v-if="details.user_role === 'admin' || details.user_role === 'staff' || details.user_role === 'salesperson'">
                        <label for="userPassword">User Password*</label>
                        <input type="password" id="userPassword" class="form-control  mb-4"
                            v-model="details.user_password" placeholder="Enter user password">
                    </div>
                    <div class="col-md-6   " v-if="details.user_role === 'admin'  || details.user_role === 'staff' || details.user_role === 'salesperson'">
                        <label for="userPassword">Confirm Password*</label>
                        <input type="password" id="confirmPassword" class="form-control " :class="confirmPassword == ''?'mb-4':''"
                            v-model="confirmPassword" placeholder="Enter user password">

                        <div :class="confirmPassword === details.user_password?'color-green':'color-red'" class=" mb-4" v-if="confirmPassword !== '' && details.user_password!==''"> 
                            <span v-if="confirmPassword === details.user_password" >
                                Password Matches !...
                            </span>
                            <span v-else>
                                Password does not Matches!..
                            </span>
                        </div>
                    </div>
                    <div class="col-md-6   ">
                        <label for="address1">Address 1</label>
                        <input type="text" autocomplete="off" id="address1" class="form-control  mb-4" v-model="details.address1"
                            placeholder="Enter address 1">
                    </div>
                    <div class="col-md-6 ">
                        <label for="address2">Address 2</label>
                        <input type="text" autocomplete="off" id="address2" class="form-control  mb-4" v-model="details.address2"
                            placeholder="Enter address 2">
                    </div>
                     
                    <div>
                        <label for="city">City*</label>
                        <input type="text" autocomplete="off" id="city" class="form-control  mb-4" v-model="details.city"
                            placeholder="Enter city">
                    </div>
                    <div>
                        <label for="zipCode">Zip Code*</label>
                        <input type="text" autocomplete="off" id="zipCode" class="form-control  mb-4" v-model="details.zip_code"
                            placeholder="Enter zip code">
                    </div>
                    <div >
                        <label for="email" >Email<span v-if="details.user_role && details.user_role !== 'customer'">*</span></label>
                        <input type="email" id="email" class="form-control" :class="isEmailValid() == 'has-success' || details.email_id ==''? 'mb-4':''" v-model="details.email_id" @keyup="isEmailValid()"
                            placeholder="Enter email">
                            <div v-if="isEmailValid() == 'has-error' && details.email_id!==''" class=" mb-4 text-danger">Invalid Email!..</div>
                    </div>
                   
                    <div class="col-md-6   ">
                        <label for="phoneNumber">Phone Number*</label>
                        <input type="number" autocomplete="off" id="phoneNumber" class="form-control  mb-4" v-model="details.phone_no"
                            placeholder="Enter phone number">

                    </div>
                    <div class="col-md-6 ">
                        <label for="alternateNumber">Alternate Number</label>
                        <input type="number" autocomplete="off" id="alternateNumber" class="form-control  mb-4" v-model="details.alter_no"
                            placeholder="Enter alternate number">
                    </div>
                    <div>
                        <label for="website">Website</label>
                        <input type="text" autocomplete="off" id="website" class="form-control  mb-4" v-model="details.website"
                            placeholder="Enter website">


                    </div>
                    <div v-if="iscustomer" class="col-md-6   ">
                        <label for="bankName">Bank Name</label>
                        <input type="text" autocomplete="off" id="bankName" class="form-control  mb-4" v-model="details.bank_name"
                            placeholder="Enter bank name">

                    </div>
                    <div v-if="iscustomer" class="col-md-6 ">
                        <label for="bankAccountNo">Bank Account No</label>
                        <input type="text" autocomplete="off" id="bankAccountNo" class="form-control  mb-4" v-model="details.bank_ac_no"
                            placeholder="Enter bank account number">

                    </div>
                    <div v-if="iscustomer" class="col-md-6   ">
                        <label for="bankBranch">Bank Branch</label>
                        <input type="text" autocomplete="off" id="bankBranch" class="form-control  mb-4" v-model="details.bank_branch"
                            placeholder="Enter bank branch">

                    </div>
                    <div v-if="iscustomer" class="col-md-6 ">
                        <label for="ifsc">IFSC</label>
                        <input type="text" autocomplete="off" id="ifsc" class="form-control  mb-4" v-model="details.ifsc_number"
                            placeholder="Enter IFSC">


                    </div>
                    <div v-if="iscustomer">
                        <label for="customerGSTNumber">Customer GST Number</label>
                        <input type="text" autocomplete="off" id="customerGSTNumber" class="form-control  mb-4"
                            v-model="details.customer_gst_number" placeholder="Enter customer GST number">

                    </div>
                    <div class="d-flex flex-row-reverse bd-highlight ">
                        <button v-if="showPass" class=" addbutton " @click="postapiuser">Submit</button>
                        <button v-else class="addbutton" @click="updateuser">Save Changes</button>
    
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
    name: 'userdialogbox-content',
    components: {
        Toast
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            loading: false,
            confirmPassword: '',
            details: {
                first_name: '',
                last_name: '',
                user_password: '',
                address1: '',
                address2: '',
                client_name: '',
                city: '',
                zip_code: '',
                email_id: '',
                phone_no: '',
                alter_no: '',
                website: '',
                user_role: '',
                bank_name: '',
                bank_ac_no: '',
                bank_branch: '',
                ifsc_number: '',
                customer_gst_number: '',

            },
            showPass: true,
            userRole: '',
            routeName: '',
            validate_fields: ''
          
            
        }
    },
    
    mounted() {
        if (this.$route.query && this.$route.query.data) {
            this.details = JSON.parse(this.$route.query.data)
            this.showPass = false
        } else {
            this.showPass = true
        }
        this.userRole =  localStorage.getItem('userRole')
        this.routeName = this.$route.name
        if(this.userRole === 'salesperson' ||  this.$route.name === "newusermaster" ) 
         this.details.user_role = 'customer'
       
    },
    computed:{
        iscustomer(){
            return this.details.user_role === 'customer';
        }

    },
    methods: {
        isEmailValid() {
                      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.details.email_id)) {
        return 'has-success'
      } else {
        return 'has-error'
      }
     
    },
        showError(errorMessage) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        },
        async postapiuser() {
            this.loading = true
            let errorsValid = 0
            this.validate_fields = this.details.user_role && this.details.user_role ==='customer'?['first_name',  'phone_no' ]:['first_name',  'user_password', 'phone_no', 'email_id' ];
            this.validate_fields.forEach((quote)=> {
                if(quote !=='user_password' && this.userRole === 'salesperson') {
                    if(this.details[quote] == '' ) {
                    errorsValid += 1
                    return false
                }
                } else {
                    
                    if(this.details[quote] == '' ) {
                    errorsValid += 1
                    return false
                }
                }
                
            })
            console.log(this.validate_fields)
            if(errorsValid === 0) {
           try {
             await axios.post(this.apiUrl + "/createuser", this.details);
             this.details = {};
             this.closeDialogAndNavigate();
           } catch (err) {
            this.showError(err.response.data.error)
           }
            
           
            }else {
                this.showError("Please Fill All Fields!..")
            }

            setTimeout(this.loading=false, 3000)

        },
        async updateuser() {
this.loading = true


            const userId = this.details.user_id;

            await axios.put(`${this.apiUrl}/users/${userId}`, this.details)
            this.details={}
            this.$router.push('/user')

            setTimeout(this.loading=false, 3000)

            

        },
        closeDialog() {
            this.closeDialogAndNavigate();
        },
        closeDialogAndNavigate() {
            this.$emit('closeDialog');
            if(this.$route.name === "newusermaster") {
                this.$router.push({ name: 'quotationdialogbox' });
            } else {
                this.$router.push({ name: 'usermaster' });
            }
            
        },

    }

};
</script>

<style scoped>
.color-red {
    color: red;
}
.color-green {
    color: green;
}
</style>