<template>
    <div class="fix p-3">
        <div v-if="loading" class="spinner ">
      <div class="spinner-border " role="status">

      </div>
    </div>
        <div v-else class=" ">
            <ul class="breadcrumb">
             <li><router-link to="/quotation" >Home</router-link></li>
             <li><router-link to="/unit" >Unit</router-link></li>
            
          </ul>
            <div  class="d-flex justify-content-between  ">
                <h2 class=" " style="font-family: displaybold; font-size: 32px; font-weight: 600; margin-left: 11px;">
                    Unit</h2>
                <button class="addbutton mb-5" @click="openDialogBox">+ Add Unit</button>

            </div>
            <div>
                <div  class="unit-content  container-fluid">
                <div v-if="responseunit && responseunit.length > 0" >
                    
                    <DataTable v-model:filters="filters" :value="responseunit" removableSort filterDisplay="row"
                        tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" >
                            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                </div>
            </template>
                        <Column field="unit_type" header="Unit Type" sortable style="width: 25%" >

                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                    class="p-column-filter" />
                            </template>
                        </Column>
                        <Column field="unit_text" header="Unit Text" sortable style="width: 25%">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                    class="p-column-filter" />
                            </template>
                        </Column>
                        <Column header="Action"  style="width: 10%">
                            <template #body="rowData">
                                <div class="action-icons flex">

                                    <i class="bi bi-pencil" @click="editunit(rowData)"></i>

                                    <i class="bi bi-trash3 i-plain2 dustbin mx-2" @click="deleteunit(rowData)"></i>

                                </div>
                            </template>
                        </Column>




                    </DataTable>
                </div>

            </div>
            </div>


            <div v-if="showDialog" class="edit-dialog">
                <h3 style="font-family: inter; color: #1E293B; font-size: 32px;" class="py-2">Edited Details</h3>
                <div class="dialog-content p-3 ">
                  
                    <label for="unit_type">Unit Type</label>
                    <input type="text" autocomplete="off" id="unit_type" class="form-control  my-3" style="width: 450px;" v-model="editedItem.unit_type"
                        placeholder="Enter unit Type">
                    <label for="unit_text">Unit Text</label>
                    <input type="text" autocomplete="off" id="unit_text" class="form-control  my-3" style="width: 450px;" v-model="editedItem.unit_text"
                        placeholder="Enter unit Text">
                </div>
                <div class="float-end">
                    <button class=" addbutton2 my-4" @click="showDialog = false">Cancel</button>
                    <button class=" addbutton my-4" @click="updateunit">Save Changes</button>
               

                </div>
               
            </div>
        </div>
    </div>
    <div v-if="showDialog" class="dim-overlay"></div>
</template>

<script>

import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';


export default {
    name: 'unit-page',

    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,
            responseunit: [],
            showDialog: false,
            editedItem: {},
            loading:false,


            filters: {
                unit_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
                unit_text: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
            }
        }
    },

    methods: {
clearFilter () {
     this.filters = {
                unit_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
                unit_text: {
                    value: null, matchMode: FilterMatchMode.CONTAINS
                },
            }},
        openDialogBox() {

            this.$router.push({ name: 'unitdialogbox' });
        },

        async fetchResponseunit() {
            this.loading=true
           
                const response = await axios.get(this.apiUrl + "/get/unit");
                this.responseunit = response.data.TableName;
                setTimeout(this.loading=false, 3000)
           
        },

        async deleteunit(rowData) {
            

                const unitId = rowData.data.unit_id

                await axios.delete(`${this.apiUrl}/deleteunit/${unitId}`);

                this.fetchResponseunit();
          
        },
        editunit(rowData) {


            let rData = JSON.stringify(rowData.data)
      this.$router.push({name: 'editunit',  query: { data: rData}})
        },
        async updateunit() {
            


                const unitId = this.editedItem.unit_id;


                await axios.put(`${this.apiUrl}/updateunit/${unitId}`, this.editedItem)

                this.fetchResponseunit()

                this.editedItem = {};
                this.showDialog = false;

        
           
        }

    },
    mounted() {
        this.fetchResponseunit();


    }
}

</script>

<style scoped>



</style>