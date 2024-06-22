<template>
    <div class="fix  p-3">
        
        <div class="quotation-content">
            <ul class="breadcrumb">
            <li><router-link to="/quotation" >Home</router-link></li>
            <li><router-link to="/quotation" >Estimate</router-link></li>
          </ul>

            <div class="d-flex justify-content-between">
                <h2 class="" style="font-family: displaybold; font-size: 32px; font-weight: 600; margin-left: 10px;">
                    Estimate</h2>
                <button class="addbutton mb-5" @click="openDialogBox">+ Add Estimate</button>
            </div>

            <div v-if="responsequotation && responsequotation.length > 0" >
    
        
                <DataTable v-model:filters="filters" :value="responsequotation" removableSort filterDisplay="row"
                    tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
                        <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                </div>
            </template>
            
            <Column field="document_no" header="Document Number" sortable style="min-width: 12rem"  @click="editquotation(rowData)">
                <template #body="rowData">
                    <div class="action-icons flex pe-auto cursor-pointer text-decoration-underline" @click="editquotation(rowData)">
                     {{  rowData.data.document_no }}
                   

                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                        class="p-column-filter" />
                </template>
            </Column>
                    <Column field="est_caption" header="Quotation Name" sortable style="min-width: 12rem">

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="address" header="Address" sortable style="min-width: 12rem">

                      
                        </Column>
                    <Column field="date" header="Quotation Date" sortable style="min-width: 12rem">

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="company_name" header="Company Name" sortable style="min-width: 12rem">

<template #filter="{ filterModel, filterCallback }">
    <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
        class="p-column-filter" />
</template>
</Column>
<Column field="customer_name" header="Customer Name" sortable style="min-width: 12rem">

<template #filter="{ filterModel, filterCallback }">
    <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
        class="p-column-filter" />
</template>
</Column>
<Column field="preparedby_name" header="Prepared by" sortable style="min-width: 12rem">

<template #filter="{ filterModel, filterCallback }">
    <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
        class="p-column-filter" />
</template>
</Column>
<Column field="salesperson_name" header="Sales Person" sortable style="min-width: 12rem">

<template #filter="{ filterModel, filterCallback }">
    <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
        class="p-column-filter" />
</template>
</Column>
                    <Column field="totalamount" header="Quotation Amount" sortable style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="quotation_id" header="Action" style="width: 10%">
                        <template #body="rowData">
                            <div class="action-icons flex">
                              <a :href="apiUrl+'/pdf/'+rowData.data.quotation_id" v-if="rowData.data.approved_status=='Approved'">  <i class="bi bi-download mx-3" ></i></a>

                                <i class="bi bi-pencil mx-3" @click="editquotation(rowData)"></i>

                                <i class="bi bi-trash3 i-plain2 dustbin mx-3" @click="deletequotation(rowData)"></i>

                            </div>
                        </template>
                    </Column>




                </DataTable>
            </div>
        </div>


        <div v-if="showDialog" class="edit-dialog">
            <h3 style="font-family: inter ; color: #1E293B; font-size: 32px;" class="py-2">Edit Details</h3>
            <div class="dialog-content p-3 ">
               
                <label for="est_caption">Quotation Name </label>
                <input type="text" autocomplete="off" id="est_caption" class="form-control w-100 my-3" v-model="editedItem.est_caption"
                    placeholder="Enter est_caption ">

                <label for="totalamount">Quotation Price </label>
                <input type="text" autocomplete="off" id="totalamount" class="form-control w-100 my-3" v-model="editedItem.totalamount"
                    placeholder="Enter totalamount ">
            </div>
            <div class="float-end">
                <button class=" addbutton2 my-4" @click="showDialog = false">Cancel</button>
                <button class=" addbutton my-4" @click="updatequotation">Save Changes</button>
            

            </div>
           
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
export default {
    name: 'Quotation-page',
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            responsequotation: [],
            userRole: '',
            showDialog: false,
            editedItem: {},
            loading:false,
            filters: {
                document_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
                est_caption: { value: null, matchMode: FilterMatchMode.CONTAINS  },
                company_name: { value: null, matchMode: FilterMatchMode.CONTAINS  },
                date: { value: null, matchMode: FilterMatchMode.CONTAINS  },
                
                customer_name: { value: null, matchMode: FilterMatchMode.CONTAINS  },
                
                preparedby_name: { value: null, matchMode: FilterMatchMode.CONTAINS  },
                
                salesperson_name: { value: null, matchMode: FilterMatchMode.CONTAINS  },
                totalamount: {
                    value: null, matchMode: FilterMatchMode.CONTAINS 
                },
            }



        };
    },



    methods: {
        clearFilter () {
     this.filters = {
                est_caption: { value: null, matchMode: FilterMatchMode.CONTAINS  },
                totalamount: {
                    value: null, matchMode: FilterMatchMode.CONTAINS 
                },
            }
      },
   
        openDialogBox() {
           

            this.$router.push({ name: 'quotationdialogbox' });
        },
        async fetchResponsequotation(){
          this.loading=true
                const response = await axios.get(this.apiUrl + "/quotation" );
                this.responsequotation = response.data.quotations;
            - setTimeout(this.loading=false, 3000)
           
        },

        
        async deletequotation(rowData) {
           
                const quotationId = rowData.data.quotation_id
                 await axios.delete(`${this.apiUrl}/deletequotation/${quotationId}`);
                
                 this.fetchResponsequotation()
           
        },


        
        editquotation(rowData) {
            let rData = JSON.stringify(rowData.data)
           
      this.$router.push({name: 'editestimates',  query: { data: rData}})
        },
     

    },

    mounted() {

        this.userRole = localStorage.getItem('userRole')
      this.fetchResponsequotation()

      

    }, 


};
</script>



<style scoped>
.buttonn {
    background-color: #aea6f8;
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

.button2 {
    background-color: #7364FF;
    color: #F5F5FA;
    border: 2px solid #9389e7;
}

.button2:hover {
    background-color: #4d3ce6;
    color: white;
}

.total {
    float: right;
}

.ul {
    list-style: none;
}
</style>
