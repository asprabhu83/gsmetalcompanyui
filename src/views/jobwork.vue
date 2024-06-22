<template>
    <div>
        <div class="fix p-3">
            
            <div v-if="loading" class="spinner ">
                <div class="spinner-border " role="status">

                </div>
            </div>
            <div  v-else>
                <ul class="breadcrumb">
             <li><router-link to="/quotation" >Home</router-link></li>
            <li><router-link to="/jobwork" >Jobwork</router-link></li>
          </ul>
                    <div class="d-flex justify-content-between">
              
                
                <h2 class="" style="font-family: displaybold; font-size: 32px; font-weight: 600; margin-left: 17px;">
                    Jobwork</h2>
                <button class="addbutton mb-5" @click="openDialogBox">+ Add Jobwork</button>
                      </div>


                   <div class="jobwork-content   container-fluid">


                <div v-if="responsejobwork && responsejobwork.length > 0">
                    <DataTable v-model:filters="filters" :value="responsejobwork" removableSort  filterDisplay="row"
                         paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
                            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                </div>
            </template>
                        <Column field="jobwork_name" header="Jobwork Name" sortable style="min-width: 12rem">

                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()"
                                    class="p-column-filter" />
                            </template>
                        </Column>
                       
                        <Column header="Action" style="width: 10%">
                            <template #body="rowData">
                                <div class="action-icons flex">

                                    <i class="bi bi-pencil" @click="editjobwork(rowData)"></i>

                                    <i class="bi bi-trash3 i-plain2 dustbin mx-2" @click="deletejobwork(rowData)"></i>

                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

            </div>
            </div>
            <div v-if="showDialog" class="edit-dialog">
                <h3 style="font-family: inter ; color: #1E293B; font-size: 32px;" class="py-2">Edit Details</h3>
                <div class="dialog-content p-3 ">
                    <label for="jobwork_name">Jobwork Name</label>
                    <input type="text" autocomplete="off" id="jobwork_name" class="form-control  my-3" style="width: 450px;"
                        v-model="editedItem.jobwork_name" placeholder="Enter jobwork_name ">
                    <label for="jobwork_description">Jobwork Description </label>
                    <textarea class="form-control" v-model="editedItem.jobwork_description" rows="1"></textarea>
                </div>
                <div class="float-end">
                    <button class=" addbutton2 my-4" @click="showDialog = false">Cancel</button>
                    <button class=" addbutton my-4" @click="updatejobwork">Save Changes</button>

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
    name: 'jobwork-page',
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_BASE_URL,



            responsejobwork: [],
            showDialog: false,
            editedItem: {},
            loading: false,
            filters: {
                jobwork_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
               
            }
        }
    },

    methods: {
         clearFilter () {
     this.filters = {
                jobwork_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                jobwork_description: { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
},
        openDialogBox() {
        
            this.$router.push({ name: 'jobworkdialogbox' });
        },



        async fetchResponsejobwork() {
            this.loading = true

            const response = await axios.get(this.apiUrl + "/get/jobwork");
            this.responsejobwork = response.data.TableName;
            this.loading = false

        },

        async deletejobwork(rowData) {

            const jobworkId = rowData.data.jobwork_id
            await axios.delete(`${this.apiUrl}/deletejob/${jobworkId}`);

            this.fetchResponsejobwork();

        },
        editjobwork(rowData) {

            let rData = JSON.stringify(rowData.data)
      this.$router.push({name: 'editjobwork',  query: { data: rData}})
        },

        async updatejobwork() {



            const jobworkId = this.editedItem.jobwork_id;

            await axios.put(`${this.apiUrl}/updatejob/${jobworkId}`, this.editedItem)

            this.fetchResponsejobwork();

            this.editedItem = {};
            this.showDialog = false;

        }
    },
    mounted() {
        this.fetchResponsejobwork();
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