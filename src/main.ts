import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';   
import "primeflex/primeflex.css";
import ToastService from 'primevue/toastservice';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "primeicons/primeicons.css";
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import Paginator from 'primevue/paginator';
import ColumnGroup from 'primevue/columngroup';  
const app = createApp(App);
app.use(PrimeVue);
app.use(store).use(router).use(ToastService).component('ColumnGroup' , ColumnGroup).component('Toast', Toast).component('Button',Button).component('Checkbox', Checkbox).component('Paginator' , Paginator).component('DataTable', DataTable).component('Row', Row).component('Column', Column).component('InputText', InputText).mount('#app');
