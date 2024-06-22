<template>
    <div class=" fix p-3 ">
      
        <div class="d-flex">
            <i class="bi bi-arrow-left-short mt-1 " @click="closeDialog" style="font-size: 25px; cursor: pointer;"></i>

            <div>
                <ul class="breadcrumb">
                     <li><router-link to="/quotation" >Home</router-link></li>
                    <li><router-link to="/quotation" >Estimates</router-link></li>
                    <li v-if="showPass"><a href="#">Add Estimate</a></li>
                    <li v-else><a href="#">Edit Estimate</a></li>
                </ul>
            </div>
        </div>
        <div v-if="loading" class="spinner ">
            <div class="spinner-border " role="status">
      
            </div>
          </div>
        <div v-else class="bg-white mt-3 ">

            <div class="p-4 ">

                <div class="my-3 ">
                    <div class="row  ">
                        <div class="left col-md-6">
                            <label for="choosetype">Choose Type*</label>
                            <select name="choosetype" id="choosetype" class="form-select my-2 "
                                v-model="quotationData.quotation_type">
                                <option value="Quotation">Quotation</option>
                                <option value="Estimates">Estimate</option>
                            </select>
                            <label for="company">Company Name*</label>
                            <select id="company" v-model="quotationData.company_id" class="form-select  my-2">
                                <option v-for="(company, index) in responsecompany" :value="company.company_id"
                                    :key="index">
                                    {{ company.company_name }}
                                </option>
                            </select>
                            <label for="rate">Rate</label>
                            <input id="rate" v-model="quotationData.rate" type="number" class="form-control my-2"
                                placeholder=" % ">



                        </div>
                        <div class="right col-md-6">
                            <label for="Est_Caption">Est Caption*</label>
                            <input id="Est_Caption" v-model="quotationData.est_caption" type="text" autocomplete="off"
                                class="form-control my-2">

                            <label for="customer">Customer* <i class="bi bi-person-fill-add mx-1 fs-3 text-primary" @click="addUser()"></i></label>
                        
                            <select id="customer" v-model="quotationData.customer_id" class="form-select my-2">
                                <option v-for="(option4, key) in responseuser" :value="option4.user_id" :key="key">
                                    {{ option4.first_name }} {{ option4.last_name }}
                                </option>
                            </select>
                            <label for="date">Date</label>
                            
                            <input id="date" v-model="quotationData.date" type="date" class="form-control my-2">
                        </div>
                    </div>
                    <label for="choose_Price_Method">Choose Price Method*</label>
                    <select v-model="quotationData.selectedpricemethod" class="form-select my-2" @change="updateTotalPrice">
                        <option value="ProductPrice">Product Price</option>
                        <option value="WholeSalePrice">Wholesale Price</option>
                    </select>
                </div>

                <div>
                    <div class="jowworkcontent border shadow  p-5" v-for="(jobwork, jobIndex) in jobworkData"
                        :key="jobIndex">
                        <div class="my-3">
                            <div class="row">
                                <div class="col-lg-3 col-md-4">
                                    <label for="jobwork">Job Work</label>
                                    <select id="jobwork" v-model="jobwork.jobwork_name" class="form-select"
                                        @change="fetchProducts(jobwork)">
                                        <option v-for="(option, key) in responsejobwork" :value="option.jobwork_name"
                                            :key="key">
                                            {{ option.jobwork_name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-lg-3 col-md-5">
                                    <label for="job_description">Job Description</label>
                                    <textarea class="form-control" v-model="jobwork.jobwork_description"
                                        rows="1"></textarea>
                                </div>
                                <div class="col">
                                    <button v-if="jobIndex > 0" class="buttonn button2"
                                        @click="removeJobwork(jobIndex)">-</button>
                                    <button class="buttonn button2" @click="addJobwork()">+</button>
                                </div>
                            </div>
                        </div>

                        <div class="" v-if="jobwork.jobwork_name">
                            <div v-for="(product, proIndex) in jobwork.productData" :key="proIndex"
                                class="probox row my-3">
                                <div class="col-lg-2 col-md-3 col-sm-4"  ref="elementToDetectOutsideClick">
                                    <label for="product_name">Product Name</label>
                                    <div class="autocompleteClass">
                                       <input type="text" autocomplete="off" id="search" placeholder="Product Name"  
                                       @focus="onFocus(jobwork, product)" @input="onChange(jobwork, product)"
                                       @keyup.down="onArrowDown($event, jobwork.list_products)" @keyup.up="onArrowUp" @keyup.enter="onEnter($event, jobwork.list_products, product)"
                                        v-model="product.product_name"  class="form-control my-0 jobwork">
                        
                           <ul v-if="jobwork.list_products.length && product.showList" @blur="product.showList = false"  ref="scrollContainer" id="scroller">
  <li
    v-for="(lproduct, lindex) in jobwork.list_products"
    :key="lindex"
    ref="options"
     @click="selectProduct(lproduct, product)"
     :class="{ 'is-active': lindex === arrowCounter }"
  >
    {{ lproduct.product_name }}
  </li>

</ul>
       </div>   
       <div class="errorText" v-if="jobwork.list_products.length == 0 && product.showList">
        No Products added in this Jobwork!..
       </div>                 <input type="hidden" id="search" placeholder="Product_" v-model="product.product_name">

                                    <input v-if="product.product_name === 'others'" type="text" autocomplete="off"
                                        class="form-control my-3" placeholder="Enter Product Name"
                                        v-model="product.other_productname">
                                </div>
                              
                                <div class="col-lg-2 col-md-3 col-sm-3" v-if="product.product_name === 'others'">
                                    <label for="unit">Unit Type</label>
                                    <select id="unit" v-model="product.unit_type" class="form-select">
                                        <option v-for="(unit, index) in responseunit" :value="unit.unit_id"
                                            :key="index">
                                            {{ unit.unit_type }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-3" v-else>
                                    <label for="unit_type">Unit Type</label>
                                    <input id="unit_type" v-model="product.unit_type" type="text" autocomplete="off" class="form-control"
                                        readonly>
                                      
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-3" v-if="quotationData.selectedpricemethod === 'ProductPrice'">
                                    <label for="price">Price</label>
                                    <input id="price" v-model="product.product_price" type="text" autocomplete="off" class="form-control">
                                </div>
                              
                                <div class="col-lg-2 col-md-2 col-sm-3"
                                    v-if="quotationData.selectedpricemethod === 'WholeSalePrice'">
                                    <label for="product_wholesale_price">Wholesale Price</label>
                                    <input id="product_wholesale_price" v-model="product.product_wholesale_price"
                                        type="number" class="form-control">
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-3">
                                    <label for="quantity">Quantity</label>
                                    <input id="quantity" v-model="product.product_quantity" type="text" autocomplete="off"
                                        class="form-control" @input="updateTotalPrice">
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4">
                                    <label for="total_price">Amount</label>
                                    <input id="total_price" v-model="product.amount" type="number" class="form-control"
                                        :readonly="true">
                                </div>
                                <div class="col">
                                    <button v-if="proIndex > 0" class="button2"
                                        @click="removeProduct(jobIndex, proIndex)">-</button>
                                    <button class=" button2" @click="addProduct(jobIndex)">+</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                <div class="p-3">
                    <div class="row mb-md-3">
                        <div class=" col-md-4 mb-3">
                            <label for="">Additional Text</label>
                            <input type="text" autocomplete="off" class="form-control" v-model="quotationData.additional_text">
                        </div>
                        <div class=" col-md-4">
                            <label for="">Additional Value</label>
                            <input type="text" autocomplete="off" class="form-control" v-model="quotationData.additional_value"
                                @input="updateTotalPrice">

                        </div>

                        <div class=" col-md-4" v-if="userRole !='salesperson'">
                            <label for="salesperson">Sales Person</label>
                            <select id="salesperson" v-model="quotationData.salesperson_id" class="form-select">
                                <option v-for="(option6, key) in responsesales" :value="option6.user_id" :key="key">
                                    {{ option6.first_name }} {{ option6.last_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="">Less Text</label>
                            <input type="text" autocomplete="off" class="form-control" v-model="quotationData.less_text">

                        </div>
                        <div class="col-md-4">
                            <label for="">Choose Discount Type</label>
                            <select name="" id="" class="form-select" v-model="selecteddiscount" @change="updateTotalPrice">
                                <option value="Discountbypercentage">Less By Percentage</option>
                                <option value="Discountbyamount">Less By Amount</option>
                            </select>

                        </div>
                        <div class="col-md-4">
                            <div class="" v-if="selecteddiscount === 'Discountbypercentage'">
                                <label for="">Less Value</label>
                                <input type="text" autocomplete="off" class="form-control" v-model="quotationData.less_value"
                                    @input="updateTotalPrice" placeholder=" % ">
                                <input type="hidden" class="form-control" v-model="quotationData.lessvalue_amount"
                                    readonly>
                            </div>
                            <div class="" v-else-if="selecteddiscount === 'Discountbyamount'">
                                <label for="">Less Amount</label>
                                <input type="text" autocomplete="off" class="form-control" v-model="quotationData.less_amount"
                                    @input="updateTotalPrice" placeholder=" ">
                            </div>

                        </div>


                       <!-- <div class="col">
                            <label for="preparedby">Prepared By</label>
                            <select id="preparedby" v-model="quotationData.prepared_by" class="form-select">
                                <option v-for="(option7, key) in responseuser" :value="option7.user_id" :key="key">
                                    {{ option7.first_name }} {{ option7.last_name }}
                                </option>
                            </select>
                        </div>-->
                    </div>
                </div>


                <div class="row">
                    <div class="col-md-4  ">
                        <div class="p-3">
                            <input type="checkbox"  v-model="quotationData.show_header"
                            >
<label class="mx-2"> Show Header </label>
                        </div>
                        <div class="mb-2 p-3">
                            <input type="checkbox"  v-model="quotationData.show_signature"
                            >
<label class="mx-2"> Show Signature </label>
                        </div>
                        <h4 class="mb-2 p-3">Terms And Conditions</h4>
                        <div class=" p-3">
                            <ul class="ul p-0">
                                
                                <li v-for="(item, index) in responseterms" :key="index" class="mb-1">
                                    <input type="checkbox" :value="item.tc_id" v-model="quotationData.terms_conditions"
                                        >


                                    <label class="mx-2">{{ item.terms_conditions_name }}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="offset-md-4 col-md-4">
                                   
                                    <div class="mb-2">
                                        <label for="gst">Amount Excluding GST</label>
                                        <input id="gst" v-model="quotationData.amount_wo_gst" type="text" autocomplete="off" class="form-control"
                                            @input="handleGstChange">
                                    </div>
                                    <div  class="mb-2">
                                        <label for="gst">GST</label>
                                        <input id="gst" v-model="quotationData.gst" type="text" autocomplete="off" class="form-control"
                                            @input="handleGstChange">
                                    </div>
                                    <div  class="mb-2">
                                        <label for="gst">GST Amount</label>
                                        <input id="gst" v-model="quotationData.gst_amount" type="text" autocomplete="off" class="form-control"
                                            @input="handleGstChange">
                                    </div>
                                    <div  class="mb-2">
                                        <label for="total_amount">Total Amount</label>
                                        <input id="total_amount" type="number" class="form-control form-control-lg"
                                            v-model="quotationData.totalamount" readonly>
                                    </div>
                              
                        
                    </div>

                </div>
                <div class="d-flex flex-row-reverse bd-highlight my-4">
                    <button v-if="showPass" class="addbutton" @click="submitData">Submit</button>
                    <button v-if="!showPass && this.quotationData.approved_status =='Unapproved'" class="addbutton" @click="updatequotation">Save Changes</button>
                    <button v-if="userRole==='admin' && !showPass && this.quotationData.approved_status==='Unapproved'"  class="addbutton" @click="approveOrUnApproveQuote(1)">Approve</button>
                    <button v-if="userRole==='admin' && !showPass && this.quotationData.approved_status==='Approved'"  class="addbutton" @click="approveOrUnApproveQuote(0)">UnApprove</button>
                </div>
            </div>
        </div>
        <Toast/>
    </div>
</template>

<script>
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
    name: 'quotationdialogbox-page',
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            userRole: '',
            searchTerm: '',
            searchProducts: [],
            arrowCounter: 0,
            loading: false,
            validate_fields:['quotation_type', 'company_id', 'est_caption', 'customer_id', 'totalamount' ],
            quotationData: {
                quotation_type: '',
                company_id: '',
                customer_id: '',
                date: '',
                rate: '',
                priceMethod: 'ProductPrice',
                additional_text: '',
                additional_value: '',
                less_text: '',
                less_value: '',
                less_amount: '',
                lessvalue_amount:'',
                est_caption: '',
                salesperson_id: '',
                prepared_by: localStorage.getItem("userId"),
                terms_conditions: [],
                totalamount: 0,
                gst_amount: 0,
                gst: 18,
            },
            jobworkData: [{
                jobwork_name: '',
                jobwork_description: '',
                list_products: [],
                
                productData: [{
                    product_name: '',
                    other_productname: '',
                    showList: false,
                    product_price: '',
                    product_wholesale_price: '',
                    product_description: '',
                    product_quantity: '',
                    unit_type: '',
                    amount: ''
                }]
            }],
            selectedTerms: [],
            responsejobwork: [],
            responseproduct: [],
            products: [],
            responsecompany: [],
            responseuser: [],
            responseterms: [],
            responsesales: [],
            responseunit: [],
            showDialog: false,
            editedItem: {},
            selectedpricemethod: 'ProductPrice',
            selecteddiscount: 'Discountbypercentage',
            showPass: true, 
            show_header: false,
            show_signature: false
        };
    },
    computed:{
        salesPersonID(){
            return localStorage.getItem('userRole') === 'salesperson'?localStorage.getItem("userId"):'';
        }

    },
    components: {
        Toast
    },
    methods: {
        addUser() {
            this.$router.push({name: "newusermaster"})
        },
        onArrowDown(ev, products) {
    ev.preventDefault()
    console.log(ev, products)
    if (this.arrowCounter < products.length - 1) { 
        this.arrowCounter = this.arrowCounter + 1;
        this.fixScrolling();
    }
},
onArrowUp(ev) {
    ev.preventDefault()
    if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.fixScrolling()
    }
},
fixScrolling(){
    const liH = this.$refs.options[this.arrowCounter].clientHeight;
    console.log(this.$refs.scrollContainer, liH)
    let el = document.getElementById('scroller');
    el.scrollTop = liH * this.arrowCounter;
},
onEnter(ev, products, product) {
    if(products[this.arrowCounter].product_name !== 'others') {
        product.product_name = products[this.arrowCounter].product_name
 product.showList = false
                    product.product_price = parseFloat(products[this.arrowCounter].product_price);
                    product.product_wholesale_price = parseFloat(products[this.arrowCounter].product_wholesale_price);
                product.unit_type = products[this.arrowCounter].unit.unit_type;
    } else {
        product.product_name = products[this.arrowCounter].product_name
 product.showList = false
    }
},

          handleClickOutside(event) {
            
     if (!event.target.classList.contains("jobwork") && !event.target.classList.contains("autocompleteClass")) {
       this.jobworkData.forEach((jobwork)=> {
            jobwork.productData.forEach((product)=>{
                product.showList = false
            })
        })
     }
   },
        onFocus(jobwork, product) {
            product.showList = true;
                         if (jobwork.products.length > 0) {
   jobwork.list_products = jobwork.products;
   let others = jobwork.list_products.find(o => o.product_name === 'others');
   if(!others)
    jobwork.list_products.push({product_name: "others", unit_type: ""})
    
  }
        },
        onChange(jobwork, product) {
                if (product.product_name == '') {
   jobwork.list_products = jobwork.products;
  } else {
    jobwork.list_products = jobwork.products.filter(prod => {
    if (
      prod.product_name.toLowerCase().includes(product.product_name.toLowerCase())
    ) {
      return prod
    }
  })
  }

  

        },
selectProduct (lproduct, product)  {
    if(lproduct.product_name !== 'others') {
        product.product_name = lproduct.product_name
 product.showList = false
                    product.product_price = parseFloat(lproduct.product_price);
                    product.product_wholesale_price = parseFloat(lproduct.product_wholesale_price);
                product.unit_type = lproduct.unit.unit_type;
    } else {
        product.product_name = lproduct.product_name
 product.showList = false
    }

},
        async fetchData(endpoint, responseDataKey, extractFromTableName = false) {
            const response = await axios.get(this.apiUrl + endpoint);
            this[responseDataKey] = extractFromTableName ? response.data.TableName : response.data;

        },
        async fetchProducts(jobwork) {
            jobwork.list_products = []
            jobwork.productData.forEach((product)=>{
                product.showList = false
            })
            const response = await axios.get(`${this.apiUrl}/products`);
            console.log(response)
            if (response.data && response.data.products) {
                jobwork.products = response.data.products;
            }
            if(this.showPass) {
                 jobwork.productData = []
            jobwork.productData.push({
                product_name: '',
                other_productname: '',
                product_price: '',
                showList: false,
                product_wholesale_price: '',
                product_description: '',
                product_quantity: '',
                unit_type: '',
                amount: ''
            });
            }
           

        },
        async fetchResponseunit() {
            const response = await axios.get(this.apiUrl + "/get/unit");
            this.responseunit = response.data.TableName
        },
        addJobwork() {
            this.jobworkData.push({
                jobwork_name: '',
                jobwork_description: '',
                products: [],
               
                list_products: [],
                productData: [{
                    product_name: '',
                    other_productname: '',
                    product_price: '',
                    showList: false,
                    product_wholesale_price: '',
                    product_description: '',
                    product_quantity: '',
                    unit_type: '',
                    amount: ''
                }]
            });
        },
        removeJobwork(jobIndex) {
            this.jobworkData.splice(jobIndex, 1);
        },
        addProduct(jobIndex) {
            this.jobworkData[jobIndex].productData.push({
                product_name: '',
                other_productname: '',
                product_price: '',
                showList: false,
                product_wholesale_price: '',
                product_description: '',
                product_quantity: '',
                unit_type: '',
                amount: ''
            });
        },
        removeProduct(jobIndex, proIndex) {
            this.jobworkData[jobIndex].productData.splice(proIndex, 1);
        },
        showError(errorMessage) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        },
        async approveOrUnApproveQuote(status) {
            const requestData = {
                quotation_id: this.quotationData.quotation_id,
                approved_by: localStorage.getItem("userId"),
                approved_status: status
                }   
            const response = await axios.put(this.apiUrl + "/approved/" + requestData.quotation_id, requestData);
            this.selectedTerms = [];

            if(response.data.approved_flag == 1) {
                const pdfResponse = await axios.get(`${this.apiUrl}/pdf/${this.quotationData.quotation_id}`, {
                responseType: 'blob'
            });



            const pdfBlob = new Blob([pdfResponse.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

  
            window.open(pdfUrl, '_blank');
            }
            

          
            this.$router.push({ name: 'quotation' });
        },
        async submitData() {
            this.loading = true
            let errorsValid = 0
            this.validate_fields.forEach((quote)=> {
                if(this.quotationData[quote] == '' && this.quotationData['totalamount'] == 0) {
                    
                    errorsValid += 1
                    return false
                }
            })

            if(errorsValid === 0) {
                if(this.userRole === 'salesperson') {
                    this.quotationData.salesperson_id = this.salesPersonID
                }
                 const requestData = {
                quotationData: this.quotationData,
                jobworkData: this.jobworkData
                }   
        
            
            const response = await axios.post(this.apiUrl + "/quotation", requestData);
        
           
            this.selectedTerms = [];

            this.$router.push({ name: 'quotation' });

            } else {
                this.showError("Please Fill All Fields!..")
            }
           
            setTimeout(this.loading=false, 3000)


        },
        closeDialog() {
            this.closeDialogAndNavigate();
        },
        closeDialogAndNavigate() {
            this.$emit('closeDialog');
            this.$router.push({ name: 'quotation' });
        },
        updateTermsAndConditions() {
            this.quotationData.terms_conditions = this.selectedTerms;
        },

        updateTotalPrice() {
            if(this.selecteddiscount === "Discountbypercentage") {
                    this.quotationData.less_amount = 0
                } else if(this.selecteddiscount === "Discountbyamount"){
                    this.quotationData.less_value = 0
                }
            if (this.quotationData.rate !== '') {
                
                let totalAmountExclGst = 0;
                let rate = parseFloat(this.quotationData.rate);
                let multiplier = 1;
                if (rate < 0) {
                    rate = Math.abs(rate);
                    multiplier = -1;
                }
                this.jobworkData.forEach(jobwork => {
                    jobwork.productData.forEach(product => {
                        const price = this.quotationData.selectedpricemethod === 'ProductPrice' ? parseFloat(product.product_price) : parseFloat(product.product_wholesale_price);
                        const quantity = parseFloat(product.product_quantity);
                        let amount = (price * quantity).toFixed(2);
                        amount = (parseFloat(amount) + (parseFloat(amount) * (rate / 100) * multiplier)).toFixed(2);
                        product.amount = amount;
                        totalAmountExclGst += parseFloat(amount);
                    });
                });
                const total_amount_wo_gst = totalAmountExclGst
                const additionalValue = parseFloat(this.quotationData.additional_value) || 0;
                totalAmountExclGst += additionalValue;
                
                const discountPercentage = parseFloat(this.quotationData.less_value) || 0;
                const discountAmount = total_amount_wo_gst * (discountPercentage / 100)
                const gstdiscountSMount = total_amount_wo_gst - discountAmount
                
                    const discountedTotalAmountExclGst =  totalAmountExclGst - discountAmount;
                const lessTotalAmount =  parseFloat(this.quotationData.less_amount) || 0;
                
                
                
                //new Assign
                const finalDiscountedTotalAmountExclGst =  discountedTotalAmountExclGst - lessTotalAmount;
                const gst = parseFloat(this.quotationData.gst);
                const totalAmountInclGst = finalDiscountedTotalAmountExclGst + (gstdiscountSMount * gst / 100);
                const gstAmount = gstdiscountSMount * gst / 100
                this.quotationData.amount_wo_gst = finalDiscountedTotalAmountExclGst.toFixed(2)
                this.quotationData.gst_amount = gstAmount.toFixed(2)
                this.quotationData.totalamount = totalAmountInclGst.toFixed(2);
                //lessvalueAmount

                const lessValuePercentage = parseFloat(this.quotationData.less_value) || 0;
                const lessValueAmount = totalAmountExclGst * (lessValuePercentage / 100);
                this.quotationData.lessvalue_amount = lessValuePercentage > 0 ?lessValueAmount.toFixed(2): '';
            } else {

                let totalAmountExclGst = 0;
                this.jobworkData.forEach(jobwork => {
                    jobwork.productData.forEach(product => {
                        const price = this.quotationData.selectedpricemethod === 'ProductPrice' ? parseFloat(product.product_price) : parseFloat(product.product_wholesale_price);
                        const quantity = parseFloat(product.product_quantity);
                        const amount = (price * quantity).toFixed(2);
                        product.amount = amount;
                        totalAmountExclGst += parseFloat(amount);
                    });
                });

                const total_amount_wo_gst = totalAmountExclGst
                const lessValuePercentage = parseFloat(this.quotationData.less_value) || 0;
                const lessValueAmount = totalAmountExclGst * (lessValuePercentage / 100);
                this.quotationData.lessvalue_amount = lessValuePercentage > 0 ?lessValueAmount.toFixed(2): '';
                const additionalValue = parseFloat(this.quotationData.additional_value) || 0;
                totalAmountExclGst += additionalValue;
                const discountPercentage = parseFloat(this.quotationData.less_value) || 0;
                const discountAmount = total_amount_wo_gst * (discountPercentage / 100);
                const discountedTotalAmountExclGst = totalAmountExclGst - discountAmount;
                const gstdiscountSMount = total_amount_wo_gst - discountAmount
                const lessTotalAmount =  parseFloat(this.quotationData.less_amount) || 0;
                  //new Assign
                const finalDiscountedTotalAmountExclGst =  discountedTotalAmountExclGst - lessTotalAmount;
                const gst = parseFloat(this.quotationData.gst);
                const totalAmountInclGst = finalDiscountedTotalAmountExclGst + (gstdiscountSMount * gst / 100);
                const gstAmount = gstdiscountSMount * gst / 100
                this.quotationData.amount_wo_gst = finalDiscountedTotalAmountExclGst
                this.quotationData.gst_amount = gstAmount.toFixed(2)
             
                this.quotationData.totalamount = totalAmountInclGst.toFixed(2);
            }
        },



        handleGstChange() {
            this.updateTotalPrice();
        },
        calculateInitialAmount() {
            this.jobworkData.forEach(jobwork => {
                jobwork.productData.forEach(product => {
                    const price = parseFloat(product.product_price);
                    const quantity = parseFloat(product.product_quantity);
                    product.amount = (price * quantity).toFixed(2);
                });
            });
        },
        calculatetotalamount() {
            let totalamount = 0;
            this.jobworkData.forEach(jobwork => {
                jobwork.productData.forEach(product => {
                    totalamount += parseFloat(product.amount) || 0;
                });
            });
            this.quotationData.totalamount = totalamount.toFixed(2);
        },
        async updatequotation() {

            this.loading = true

            const quotationId = this.quotationData.quotation_id;
            const requestData = {
                quotationData: this.quotationData,
                jobworkData: this.jobworkData
            };
            
            await axios.put(`${this.apiUrl}/updatequotation/${quotationId}`, requestData)

            this.$router.push('/quotation')
            
            setTimeout(this.loading=false, 3000)

        },

    },
    beforeUnmount() {
   document.removeEventListener('click', this.handleClickOutside);
   
 },
 
    async mounted() {
        document.addEventListener('click', this.handleClickOutside);
       
        
        this.userRole = localStorage.getItem('userRole')
        let today = new Date()
        
        this.quotationData.date = today.getFullYear() + '-'
             + ('0' + (today.getMonth()+1)).slice(-2) + '-'
             + ('0' + today.getDate()).slice(-2);
      
        await this.fetchData('/get/jobwork', 'responsejobwork', true);
        await this.fetchData('/get/product', 'responseproduct', true);
        await this.fetchData('/get/company', 'responsecompany', true);

        await this.fetchData('/getcos', 'responseuser');
        await this.fetchData('/get/terms_condition', 'responseterms', true);
        await this.fetchData('/getsales', 'responsesales');

        await this.fetchResponseunit()
        if (this.$route.query && this.$route.query.data) {
            this.quotationData = JSON.parse(this.$route.query.data)
            let quotationDate = new Date(this.quotationData.date)
            if(this.quotationData.less_amount > 0 ) {
                this.selecteddiscount = "Discountbyamount"
            } 
            this.quotationData.date = quotationDate.getFullYear() + '-'
             + ('0' + (quotationDate.getMonth()+1)).slice(-2) + '-'
             + ('0' + quotationDate.getDate()).slice(-2);
            this.quotationData.terms_conditions = JSON.parse(this.quotationData.terms_conditions)
            this.jobworkData = this.quotationData.jobworkData
            this.jobworkData.forEach(async (jobwork) => {
                jobwork.list_products = []
                jobwork.productData.forEach((product)=> {
                    product.showList = false
                })
                await this.fetchProducts(jobwork)
            })
            this.showPass = false
        } else {
            this.showPass = true
        }
    },
    watch: {
        'quotationData.rate': function () {
            this.updateTotalPrice();
        },
        'quotationData.gst': function () {
            this.updateTotalPrice();
        },
        'jobworkData': {
            handler: function () {
                this.updateTotalPrice();
            },
            deep: true
        },
        'jobworkData.*.productData.*.product_price': function () {
            this.updateTotalPrice();
        },
        'jobworkData.*.productData.*.product_wholesale_price': function () {
            this.updateTotalPrice();
        },
        'jobworkData.*.productData.*.product_quantity': function () {
            this.updateTotalPrice();
        },

    },


};
</script>



<style scoped>
.button2 {

    color: #F5F5FA;
    border: 2px solid #9389e7;
    background-color: #213785;
    border: none;
    color: white;
    padding: 5px 12px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
    float: right;
}

.button2:hover {
    background-color: #463bac;
    color: white;
}

.total {
    float: right;
}

.ul {
    list-style: none;
}

.edit-dialogs {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    max-height: 80%;
}

.jowworkcontent {
    background-color: #eeeef5;
}
.autocompleteClass {
    position:relative;
}
.autocompleteClass ul {
    position: absolute;
    background: white;
    width: 100%;
    padding: 0px !important;
    border-radius: 5px;
    height: 150px;
    overflow:auto; 
   
}
.autocompleteClass ul li {
    list-style: none;
    padding: 3px 12px;
    cursor: pointer;
}
.autocompleteClass ul li:hover, .autocompleteClass ul li.is-active {
    background: gray;
    color: #f1f1f1;
}
.errorText {
    color: red;
}
</style>
