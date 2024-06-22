<template>
    <div class="fix p-3">
        <div v-if="loading" class="spinner ">
            <div class="spinner-border " role="status">

            </div>
        </div>
        <div v-else>
            <ul class="breadcrumb">
             <li><router-link to="/quotation" >Home</router-link></li>
            <li><a href="#">Terms&conditions</a></li>
          </ul>
    
        <div  class="d-flex justify-content-between">
            <h3 class=" " style="font-family: displaybold; font-size: 32px; font-weight: 600; margin-left: 15px;">Terms
                & Condition</h3>
            <button class="addbutton mb-5" @click="openDialogBox">+ Add Terms</button>
        </div>
       


        <div class="tandc-content container-fluid ">

            <div v-if="responseterms && responseterms.length > 0">
                <DataTable v-model:filters="filters" :value="responseterms" removableSort filterDisplay="row"
                    tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
                        <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                </div>
            </template>
                    <Column field="terms_conditions_name" header="Terms and Conditions" sortable style="width: 25%">

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="displayValues" header="Terms Value" sortable style="width: 25%">
                        

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                class="p-column-filter" />
                        </template>
                    </Column>
                    <Column header="Action" style="width: 10%">
                        <template #body="rowData">
                            <div class="action-icons flex">

                                <i class="bi bi-pencil" @click="editterms(rowData)"></i>

                                <i class="bi bi-trash3 i-plain2 dustbin mx-2" @click="deleteterms(rowData)"></i>

                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>


        </div>
        </div>
        <div v-if="showDialog" class="edit-dialog">
            <h3 style="font-family: inter ; color: #1E293B; font-size: 32px;" class="py-2">Edited Details</h3>
            <div class="dialog-content p-3 ">
                <label for="terms_conditions_name">Terms and Conditions*</label>
                <input type="text" autocomplete="off" id="terms_conditions_name" class="form-control  my-3" style="width: 450px;"
                    v-model="editedItem.terms_conditions_name" placeholder="Enter terms_conditions_name ">
                <label for="tc_value">Terms value </label>
                <input type="text" autocomplete="off" id="tc_value" class="form-control  my-3" style="width: 450px;"
                    v-model="editedItem.tc_value" placeholder="Enter tc_value ">
            </div>
            <div class="float-end">
                <button class=" addbutton2 my-4" @click="showDialog = false">Cancel</button>
                <button class=" addbutton my-4" @click="updateterms">Save Changes</button>


            </div>

        </div>
    </div>
    <div v-if="showDialog" class="dim-overlay"></div>

</template>

<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
export default {
    name: 'terms&conditions-page',
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,



            responseterms: [],
            showDialog: false,
            editedItem: {},
            loading: false,

            filters: {
                terms_conditions_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                displayValues: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
            }


        }
    },


    methods: {
         clearFilter () {
     this.filters = {
                terms_conditions_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                displayValues: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
            }
      },
        openDialogBox() {


            this.$router.push({ name: 'termsandconditionsdialogbox' });
        },


        async fetchResponseterms() {
            this.loading = true

            const response = await axios.get(this.apiUrl + "/get/terms_condition");
          
            this.responseterms = response.data.TableName;
            this.responseterms.forEach((terms)=> {
                terms.displayValues = terms.tc_value;
            });
            this.loading = false
        },
        editterms(rowData) {
            
            let rData = JSON.stringify(rowData.data)
      this.$router.push({name: 'edittermsandconditions',  query: { data: rData}})
            
        },
      
        async deleteterms(rowData) {

            const termsId = rowData.data.tc_id
            await axios.delete(`${this.apiUrl}/deletetc/${termsId}`);

            this.fetchResponseterms();

        },
    },
    mounted() {
        this.fetchResponseterms();
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