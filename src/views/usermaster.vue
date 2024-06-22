<template>
  <div class="fix p-3">
    <div v-if="loading" class="spinner ">
      <div class="spinner-border " role="status">

      </div>
    </div>

    <div v-else class=" ">
      
      <ul class="breadcrumb">
             <li><router-link to="/quotation" >Home</router-link></li>
            <li><router-link to="/user" >Users</router-link></li>
            
      </ul>
      <div class="d-flex justify-content-between">
        <h2 class="" style="font-family: displaybold; font-size: 32px; font-weight: 600; margin-left: 10px;">User</h2>
        <button class="addbutton mb-5" @click="openDialogBox">+ Add User</button>
      </div>

      <div v-if="responseuser && responseuser.length > 0" >
        <DataTable v-model:filters="filters" :value="responseuser" showGridlines  removableSort filterDisplay="row"
          tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
          <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                </div>
            </template>
          <Column field="first_name" header="First Name" sortable  style="min-width: 12rem">

            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column field="last_name" header="Last Name" sortable  style="min-width: 12rem">
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

          <Column field="email_id" header="Email Id" sortable  style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter " />
            </template>
          </Column>
          <Column field="phone_no" header="Phone Number" sortable  style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>

          <Column field="user_role" header="User Role" sortable  style="min-width: 12rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" autocomplete="off" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column header="Action" >
            <template #body="rowData">
              <div class="action-icons flex">

                <i class="bi bi-pencil" @click="edituser(rowData)"></i>

                <i class="bi bi-trash3 i-plain2 dustbin mx-2" @click="deleteuser(rowData)"></i>

              </div>
            </template>
          </Column>




        </DataTable>
      </div>

    </div>
    <div v-if="showDialog" class="edit-dialog">
      <h3 style="font-family: inter ; color: #1E293B; font-size: 32px;" class="py-2">Edit Details</h3>
      <div class="p-3">

        <div class="row">
          <div class="col-md-4">
            <label for="firstName">First Name</label>
            <input type="text" autocomplete="off" id="firstName" class="form-control w-100  my-2" v-model="editedItem.first_name"
              placeholder="Enter first name">
            <label for="lastName">Last Name</label>
            <input type="text" autocomplete="off" id="lastName" class="form-control w-100 my-2" v-model="editedItem.last_name"
              placeholder="Enter last name">

            <label for="address1">Address 1</label>
            <input type="text" autocomplete="off" id="address1" class="form-control w-100  my-2" v-model="editedItem.address1"
              placeholder="Enter address 1">
            <label for="address2">Address 2</label>
            <input type="text" autocomplete="off" id="address2" class="form-control w-100 my-2" v-model="editedItem.address2"
              placeholder="Enter address 2">
            <label for="city">City</label>
            <input type="text" autocomplete="off" id="city" class="form-control w-100 my-2" v-model="editedItem.city" placeholder="Enter city">
            <label for="userRole">User Role</label>
            <select id="userRole" class="form-select w-100 my-2" v-model="editedItem.user_role">
              <option value="admin">Admin</option>
              <option value="salesperson">Salesperson</option>
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="zipCode">Zip Code</label>
            <input type="text" autocomplete="off" id="zipCode" class="form-control w-100 my-2" v-model="editedItem.zip_code"
              placeholder="Enter zip code">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control w-100 my-2" v-model="editedItem.email_id"
              placeholder="Enter email">
            <label for="phoneNumber">Phone Number</label>
            <input type="text" autocomplete="off" id="phoneNumber" class="form-control w-100 my-2" v-model="editedItem.phone_no"
              placeholder="Enter phone number">
            <label for="alternateNumber">Alternate Number</label>
            <input type="text" autocomplete="off" id="alternateNumber" class="form-control w-100 my-2" v-model="editedItem.alter_no"
              placeholder="Enter alternate number">
            <label for="website">Website</label>
            <input type="text" autocomplete="off" id="website" class="form-control w-100 my-2" v-model="editedItem.website"
              placeholder="Enter website">

          </div>
          <div class="col-md-4">
            <label for="bankName">Bank Name</label>
            <input type="text" autocomplete="off" id="bankName" class="form-control w-100 my-2" v-model="editedItem.bank_name"
              placeholder="Enter bank name">
            <label for="bankAccountNo">Bank Account No</label>
            <input type="text" autocomplete="off" id="bankAccountNo" class="form-control w-100 my-2" v-model="editedItem.bank_ac_no"
              placeholder="Enter bank account number">
            <label for="bankBranch">Bank Branch</label>
            <input type="text" autocomplete="off" id="bankBranch" class="form-control w-100 my-2" v-model="editedItem.bank_branch"
              placeholder="Enter bank branch">
            <label for="ifsc">IFSC</label>
            <input type="text" autocomplete="off" id="ifsc" class="form-control w-100 my-2" v-model="editedItem.ifsc_number"
              placeholder="Enter IFSC">
            <label for="customerGSTNumber">Customer GST Number</label>
            <input type="text" autocomplete="off" id="customerGSTNumber" class="form-control w-100 my-2"
              v-model="editedItem.customer_gst_number" placeholder="Enter customer GST number">
          </div>
        </div>
      </div>
      <div class="float-end">
        <button class=" addbutton2 my-4" @click="showDialog = false">Cancel</button>
        <button class=" addbutton my-4" @click="updateuser">Save Changes</button>

      </div>

    </div>
  </div>

  <div v-if="showDialog || showDialogbox" class="dim-overlay"></div>
</template>

<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';

export default {
  name: 'usermaster-page',

  data() {
    return {
      apiUrl: process.env.VUE_APP_API_BASE_URL,

      responseuser: [],
      showDialog: false,
      editedItem: {},
      loading: false,

      filters: {
        first_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        last_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        address1: { value: null, matchMode: FilterMatchMode.CONTAINS },
        city: { value: null, matchMode: FilterMatchMode.CONTAINS },

        email_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        phone_no: { value: null, matchMode: FilterMatchMode.CONTAINS },

        user_role: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }

    };
  },

  methods: {
    
    openDialogBox() {
      this.$router.push({ name: 'adduser' });
    },



    async fetchResponseuser() {
      this.loading = true;
      
        const response = await axios.get(`${this.apiUrl}/get/users`);
        this.responseuser = response.data.TableName;
   
      
        this.loading = false
      
    },

    edituser(rowData) {
      let rData  = JSON.stringify(rowData.data)
      this.$router.push({name: 'edituser',  query: { data: rData}})
    },
    
    async deleteuser(rowData) {


      const UserId = rowData.data.user_id
      const response = await axios.delete(`${this.apiUrl}/deleteuser/${UserId}`);
     
      this.fetchResponseuser();

    },
     clearFilter () {
     this.filters = {
        first_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        last_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        address1: { value: null, matchMode: FilterMatchMode.CONTAINS },
        city: { value: null, matchMode: FilterMatchMode.CONTAINS },

        email_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        phone_no: { value: null, matchMode: FilterMatchMode.CONTAINS },

        user_role: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }

}

  },
  
  mounted() {
    this.fetchResponseuser();
   
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