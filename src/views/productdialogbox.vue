<template>


    <div class="   fix p-3   ">
      
        <div class="d-flex">
        <i class="bi bi-arrow-left-short mt-1 " @click="closeDialog" style="font-size: 25px; cursor: pointer;"></i>

        <div>
        <ul class="breadcrumb">
             <li><router-link to="/quotation" >Home</router-link></li>
           <li><router-link to="/product" >Product</router-link></li>
            <li v-if="showPass">Add Product</li>
            <li v-else>Edit Product</li>



        </ul>
      </div>
      </div>
      <div v-if="loading" class="spinner ">
        <div class="spinner-border " role="status">
  
        </div>
      </div>
        <div v-else class=" bg-white mt-3 ">

            <div class="col-md-12 row p-5">

                <div class="col-md-5">
                    <label for="product_name">Product Name*</label>
                    <input type="text" autocomplete="off" id="product_name" class="form-control w-100 mb-3" v-model="product.product_name"
                        placeholder="Enter product name ">
                    <label for="product_description">Product Description</label>
                    <textarea class="form-control" v-model="product.product_description" rows="1"></textarea>
                    <label for="product_price">Product Price*</label>
                    <input type="number" autocomplete="off" id="product_price" class="form-control w-100 mb-3"
                        v-model="product.product_price" placeholder="Enter product price ">
                    <label for="product_wholesale_price">Product Wholesale Price* </label>
                    <input type="number" autocomplete="off" id="product_wholesale_price" class="form-control w-100 mb-3"
                        v-model="product.product_wholesale_price" placeholder="Enter product wholesale price ">
                </div>
                <div class="col-md-5" >

                    <label for="product_image">Product Image* </label>
                    <input type="file" class="form-control w-100 mb-3" @change="handleFileChange">
                    <div v-if="!showPass">
                        <img :src="product.editImage" alt="product Logo" style="max-width: 50px; max-height: 50px;">
                    </div>
                  
                   
                    
                    <label for="unit">Unit Type*</label>
                    <select id="unit" v-model="product.u_id" class="form-select w-100 mb-3">
                        <option v-for="(unit, index) in responseunit" :value="unit.unit_id" :key="index">
                            {{ unit.unit_type }}</option>
                    </select>
                    
                    <div class=" float-end   ">

                        <button v-if="showPass" class=" addbutton " @click="productpost">Submit</button>
                        <button v-else class=" addbutton " @click="updateproduct">Save Changes</button>

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
    name: 'productdialogbox-content',
    components: {
        Toast
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            loading: false,
            validate_fields:['product_name', 'product_description', 'product_price', 'u_id', 'product_wholesale_price'],
        


            product: {
                product_name: '',
                product_description: '',
                product_price: '',
                product_image: '',
                product_wholesale_price: '',
                u_id: '',
                j_id: ''



            },
            showPass: true,
            responseunit: [],
            responsejobwork: [],
            
            
        }
    },
    methods: {
        showError(errorMessage) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        },
        async productpost() {
            this.loading = true
            let errorsValid = 0
            this.validate_fields.forEach((quote)=> {
                if(this.product[quote] == '' ) {
                    
                    errorsValid += 1
                    return false
                }
            })

            if(errorsValid === 0) {
            await axios.post(this.apiUrl + "/product", this.product);
            this.product = {};

            this.closeDialogAndNavigate();
            } else {
                this.showError("Product's Mandatory Information cannot be empty!..")
            }

            setTimeout(this.loading=false, 3000)

        },
       
        async updateproduct() {

this.loading = true

            const productId = this.product.product_id;

            await axios.put(`${this.apiUrl}/updatepro/${productId}`, this.product)
            this.product={}
            this.$router.push('/product')

            setTimeout(this.loading=false, 3000)

           



        },
        async fetchResponseunit() {


            const response = await axios.get(this.apiUrl + "/get/unit");
            this.responseunit = response.data.TableName



        },
        async fetchResponsejobwork() {


            const response = await axios.get(this.apiUrl + "/get/jobwork");
            this.responsejobwork = response.data.TableName



        },
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                this.product.product_image = reader.result;

            };
            reader.readAsDataURL(file);
        },
        closeDialog() {
            this.closeDialogAndNavigate();
        },
        closeDialogAndNavigate() {

            this.$emit('closeDialog');

            this.$router.push({ name: 'product' });
        }

    },
    mounted() {
        if (this.$route.query && this.$route.query.data) {
            this.product = JSON.parse(this.$route.query.data)
            this.showPass = false
        } else {
            this.showPass = true
        }
        this.fetchResponseunit(),
            this.fetchResponsejobwork()
          

    }
}
</script>

<style scoped></style>