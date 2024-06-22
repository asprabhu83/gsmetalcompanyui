<template>
    <div class="fix p-3">
        <div v-if="loading" class="spinner ">
      <div class="spinner-border " role="status">

      </div>
    </div>
        <div v-else class="product-content container-fluid ">
            <ul class="breadcrumb">
            <li><router-link to="/quotation" >Home</router-link></li>
            <li><router-link to="/product" >Product</router-link></li>
          </ul>
    
            <div class="d-flex justify-content-between">
                <h2 class="" style="font-family: displaybold; font-size: 32px; font-weight: 600; margin-left: 10px;">
                    Product</h2>
                    <div class="d-flex flex-row-reverse bd-highlight ">
                    <button class="addbutton mb-5" @click="importproducts()">Import Products</button>
                <button class="addbutton mb-5 mr-2" @click="openDialogBox">+ Add Product</button>
                </div>
            </div>

            <div v-if="responseproduct && responseproduct.length > 0" >
                <DataTable v-model:filters="filters" :value="responseproduct" removableSort filterDisplay="row"
                    tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
                        <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                </div>
            </template>
                    <Column field="product_name" header="Product Name" sortable style="width: 25%">

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>


                    <Column field="product_price" header="Product Price" sortable style="width: 25%">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="product_wholesale_price" header=" Wholesale Price" sortable style="width: 25%">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="product_description" header="Product Description" sortable style="width: 25%">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="editImage" header="Product Image" sortable style="width: 25%" >
                        <template #body="rowData">
                            <img :src="rowData.data.editImage" alt="product image" style="max-width: 60px; max-height: 50px;" v-if="rowData.data.editImage">
                        </template>
                    </Column>
                    <Column header="Action" style="width: 10%">
                        <template #body="rowData">
                            <div class="action-icons flex">

                                <i class="bi bi-pencil" @click="editproduct(rowData)"></i>

                                <i class="bi bi-trash3 i-plain2 dustbin mx-2" @click="deleteproduct(rowData)"></i>

                            </div>
                        </template>
                    </Column>


                </DataTable>
            </div>

        </div>
        <div v-if="showDialog" class="edit-dialog">
            <h3 style="font-family: inter ; color: #1E293B; font-size: 32px;" class="py-2">Edit Details</h3>
            <div class="dialog-content p-3 row ">
                <div class="col">
                    <label for="product_name">product Name</label>
                <input type="text" autocomplete="off" id="product_name" class="form-control w-100 my-3" v-model="editedItem.product_name"
                    placeholder="Enter product_name ">
                <label for="product_price">product price </label>
                <input type="text" autocomplete="off" id="product_price" class="form-control w-100 my-3" v-model="editedItem.product_price"
                    placeholder="Enter product_price ">
                <label for="product_wholesale_price">product wholesale price </label>
                <input type="text" autocomplete="off" id="product_wholesale_price" class="form-control w-100 my-3"
                    v-model="editedItem.product_wholesale_price" placeholder="Enter product_wholesale_price ">

                </div>
                <div class="col">
                    <label for="product_description">product description </label>
                    <textarea class="form-control" v-model="editedItem.product_description" rows="3"></textarea>

                <label for="editedproductImage">Product Image</label>
                <input type="file" id="editedproductImage" class="form-control w-100 my-2"
                    @change="handleEditedFileChange">
                <img :src="editedItem.product_image" alt="product Logo" style="max-width: 50px; max-height: 50px;">

                </div>
             


               

            </div>
            <div class="float-end">
                <button class=" addbutton2 my-4" @click="showDialog = false">Cancel</button>
            <button class=" addbutton my-4" @click="updateproduct">Save Changes</button>

            </div>
           
           
        </div>

    </div>
    <div v-if="showDialog" class="dim-overlay"></div>
    <Toast/>
</template>

<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
export default {
    name: 'product-page',
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,



            responseproduct: [],
            showDialog: false,
            editedItem: {},
            loading:false,
            filters: {
                product_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                product_price: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
                product_wholesale_price: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
                product_description: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
            }

        }
    },

    methods: {
        showError(errorMessage) {
            this.$toast.add({ severity: 'success', summary: 'success', detail: errorMessage, life: 3000 });
        },
       clearFilter () {
     this.filters = {
                product_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                product_price: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
                product_wholesale_price: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
                product_description: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
            }},
        openDialogBox() {
           

            this.$router.push({ name: 'productdialogbox' });
        },
        async importproducts() {
            this.loading=true
               await axios.get("https://uploadgs.kavisoftek.in/upload");
               await this.fetchResponseproduct();
               this.showError("Uploaded Successfully!..")
                setTimeout(this.loading=false, 3000)
                
           
        },


        async fetchResponseproduct() {
           this.loading=true
                const response = await axios.get(this.apiUrl + "/get/product");
                this.responseproduct = response.data.TableName;
                setTimeout(this.loading=false, 3000)
           
        },

        handleEditedFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                this.editedItem.product_image = reader.result;
            };
            reader.readAsDataURL(file);
        },



        async deleteproduct(rowData) {
            
                const productId = rowData.data.product_id
                await axios.delete(`${this.apiUrl}/deletepro/${productId}`);
                
                this.fetchResponseproduct();
            
        },
        editproduct(rowData) {
               
            let rData = JSON.stringify(rowData.data )
         
      this.$router.push({name: 'editproduct',  query: { data: rData}})
        },
   
    },
    mounted() {
        this.fetchResponseproduct();
    }
}

</script>

<style scoped>
.progress {
    height: 10px;

    width: 800px;
}

.progress-bar {
    background-color: #7445FF;
}
</style>