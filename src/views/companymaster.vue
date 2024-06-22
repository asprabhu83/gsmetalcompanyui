<template>
  <div class="fix p-3">
    <div v-if="loading" class="spinner ">
      <div class="spinner-border " role="status">

      </div>
    </div>


    <div v-else class=" container-fluid">
      <ul class="breadcrumb">
             <li><router-link to="/quotation" >Home</router-link></li>
            <li><router-link to="/company" >Company</router-link></li>
      </ul>
      <div class="d-flex justify-content-between">


        <h2 class="" style="font-family: displaybold; font-size: 32px; font-weight: 600; margin-left: 10px; ">Company
        </h2>
        <button class="addbutton mb-5" @click="openDialogBox">+ Add Company</button>
      </div>

      <div v-if="responsecompany && responsecompany.length > 0" >
        <DataTable v-model:filters="filters" :value="responsecompany" removableSort filterDisplay="row"
          tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
              <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                </div>
            </template>
          <Column field="company_name" header="Company Name" sortable  style="min-width: 12rem">

            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>


          <Column field="address1" header="Address" sortable  style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column field="city" header="City" sortable  style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>

          <Column field="company_email_id" header="Email Id" sortable  style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column field="company_phone_no" header="Phone Number" sortable  style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column field="company_website" header="Website" sortable  style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column field="editImage" header="Product Image" sortable  style="min-width: 12rem">
            <template #body="rowData">
              <img :src="rowData.data.editImage" alt="product image" style="max-width: 60px; max-height: 50px;">
            </template>
          </Column>
          <Column header="Action" >
            <template #body="rowData">
              <div class="action-icons flex">

                <i class="bi bi-pencil" @click="editCompany(rowData)"></i>

                <i class="bi bi-trash3 i-plain2 dustbin mx-2" @click="deletecompany(rowData)"></i>

              </div>
            </template>
          </Column>



        </DataTable>
      </div>


    </div>
    <div v-if="showDialog" class="edit-dialog">
      <h3 style="font-family: inter ; color: #1E293B; font-size: 32px;" class="py-2">Edit Details</h3>
      <div class=" p-3">
        <div class="row">
          <div class="col-md-4">
            <label for="editedCompanyName">Company Name</label>
            <input type="text" autocomplete="off" id="editedCompanyName" class="form-control w-100 my-2" v-model="editedItem.company_name">
            <label for="editedAddress1">Address 1</label>
            <input type="text" autocomplete="off" id="editedAddress1" class="form-control w-100 my-2" v-model="editedItem.address1">
            <label for="editedAddress2">Address 2</label>
            <input type="text" autocomplete="off" id="editedAddress2" class="form-control w-100 my-2" v-model="editedItem.address2">
            <label for="editedCity">City</label>
            <input type="text" autocomplete="off" id="editedCity" class="form-control w-100 my-2" v-model="editedItem.city">
            <label for="editedCompanyGSTNumber">Company GST Number</label>
            <input type="text" autocomplete="off" id="editedCompanyGSTNumber" class="form-control w-100 my-2"
              v-model="editedItem.company_gst_number">
          </div>
          <div class="col-md-4">
            <label for="editedZipCode">Zip Code</label>
            <input type="text" autocomplete="off" id="editedZipCode" class="form-control w-100 my-2" v-model="editedItem.zip_code">
            <label for="editedCompanyEmail">Company Email</label>
            <input type="email" id="editedCompanyEmail" class="form-control w-100 my-2"
              v-model="editedItem.company_email_id">
            <label for="editedCompanyPhoneNumber">Company Phone Number</label>
            <input type="text" autocomplete="off" id="editedCompanyPhoneNumber" class="form-control w-100 my-2"
              v-model="editedItem.company_phone_no">
            <label for="editedCompanyWebsite">Company Website</label>
            <input type="text" autocomplete="off" id="editedCompanyWebsite" class="form-control w-100 my-2"
              v-model="editedItem.company_website">
              <label for="editedCompanyBankName">Bank Name</label>
            <input type="text" autocomplete="off" id="editedCompanyBankName" class="form-control w-100 my-2"
              v-model="editedItem.bank_name">

          </div>
          <div class="col-md-4">

           
            <label for="editedCompanyBankAccountNo">Bank Account No</label>
            <input type="text" autocomplete="off" id="editedCompanyBankAccountNo" class="form-control w-100 my-2"
              v-model="editedItem.bank_ac_no">
            <label for="editedCompanyBankBranch">Bank Branch</label>
            <input type="text" autocomplete="off" id="editedCompanyBankBranch" class="form-control w-100 my-2"
              v-model="editedItem.bank_branch">
            <label for="editedCompanyIFSC">IFSC</label>
            <input type="text" autocomplete="off" id="editedCompanyIFSC" class="form-control w-100 my-2" v-model="editedItem.ifsc_number">
            
            <label for="editedCompanyLogo">Company Logo</label>
            <input type="file" id="editedCompanyLogo" class="form-control w-100 my-2" @change="handleEditedFileChange">
            <img :src="editedItem.company_logo" alt="Company Logo" style="max-width: 50px; max-height: 50px;">
           

          </div>
          
          
        </div>

      </div>
      <div class="float-end">
        <button class=" addbutton2 my-4" @click="showDialog = false">Cancel</button>
        <button class=" addbutton my-4" @click="updateCompany">Save Changes</button>
       
      </div>
    </div>
  </div>
  <div v-if="showDialog" class="dim-overlay"></div>
</template>

<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
export default {
  name: 'companymaster-page',
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_BASE_URL,

      responsecompany: [],
      showDialog: false,
      editedItem: {},
      loading:false,
      filters: {
        company_name: { value: null, matchMode: FilterMatchMode.CONTAINS },

        address1: { value: null, matchMode: FilterMatchMode.CONTAINS },
        city: { value: null, matchMode: FilterMatchMode.CONTAINS },

        company_email_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company_phone_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company_website: { value: null, matchMode: FilterMatchMode.CONTAINS },

      }
    };
  },

  methods: {
     clearFilter () {
     this.filters = {
        company_name: { value: null, matchMode: FilterMatchMode.CONTAINS },

        address1: { value: null, matchMode: FilterMatchMode.CONTAINS },
        city: { value: null, matchMode: FilterMatchMode.CONTAINS },

        company_email_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company_phone_no: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company_website: { value: null, matchMode: FilterMatchMode.CONTAINS },

      }

},
    openDialogBox() {
this.$router.push({ name: 'companydialogbox' });
    },

 async fetchResponsecompany() {
  this.loading=true
      const response = await axios.get(this.apiUrl + "/get/company");
        this.responsecompany = response.data.TableName;
        setTimeout(this.loading=false, 3000)
},
handleEditedFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.editedItem.company_logo = reader.result;
      };
      reader.readAsDataURL(file);
    },

async deletecompany(rowData) {
      const companyId = rowData.data.company_id
         await axios.delete(`${this.apiUrl}/deletecom/${companyId}`);
        this.fetchResponsecompany();
     },
    editCompany(rowData) {
      let rData = JSON.stringify(rowData.data)
      this.$router.push({name: 'editcompany',  query: { data: rData}})
      // this.editedItem = { ...rowData.data, company_logo: rowData.data.editImage };
      
    },
    
  },
  mounted() {
    this.fetchResponsecompany();
  }
};
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