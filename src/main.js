import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import i18n from './i18n'
import axios from "./plugins/axios";
import Pagination from "v-pagination-3";
import Toaster from "@meforma/vue-toaster";
import Swal from "sweetalert2";
import FileUpload from "vue-upload-component";

import { serialize } from "object-to-formdata";

import { createI18n } from "vue-i18n";

// if(localStorage.getItem('languageUniversal') == 'ar') {
//     require('./assets/css/style.bundle.rtl.css') ;
// }else {
//     require('./assets/css/style.bundle.css') ;
// }
const serializeOptios = {
  /**
   * include array indices in FormData keys
   * defaults to false
   */
  indices: true,

  /**
   * treat null values like undefined values and ignore them
   * defaults to false
   */
  nullsAsUndefineds: false,

  /**
   * convert true or false to 1 or 0 respectively
   * defaults to false
   */
  booleansAsIntegers: false,

  /**
   * store arrays even if they're empty
   * defaults to false
   */
  allowEmptyArrays: false,
};

const messages = {
  en: {
    message: "hello i18n !!",
    deleteBox: {
      areYouSure: "Are you sure?",
      revertThis: "إYou won't be able to revert this!",
      deleteIt: "Yes, delete it!",
      cancel: "Cancel",
    },
    categories: "Categories",
    cancel: "Cancel",
    name: "Name",
    type: "Type",
    save: "Save",
    operations: "Operations",
    delete: "Delete",
    edit: "Edit",
    search: "Search",
    add: "Add",
    fabrics: "Fabrics",
    photo: "Photo",
    description: "Description",
    designs: "Designs",
    sizeTypes: "Size Types",
    dropFiles: "Drop files anywhere to upload or",
    users: "Users",
    mobile: "Mobile",
    email: "Email",
    password: "Password",
    password_confirmation: "Password confirmation",
    status: "Status",
    admins: "Admins",
    role: "Role",
    user: "User",
    admin: "Admin",
    seller: "Seller",
    shear_operator: "Shear Operator",
    sewing_operator: "Sewing Operator",
    button_operator: "Button Operator",
    order: "Orders",
    new: "New",
    created_at: "Created at",
    depositAmount: "Deposit amount",
    amount: "Amount",
    deservedAmount: "Deserved Amount",
    category: "Category",
    design: "Design",
    fabric: "Fabric",
    ready_to_deliver: "Ready to Deliver",
    delivered: "Delivered",
    buttonCase: "Button Case",
    deliveryDate: "Delivery Date",
    waitingPayment: "Waiting Payment",
    sewingCase: "Sewing Case",
    cutCase: " Cut Case ",
    sizeGown: "Size Gown",
    sizeGownOptions: "Size Gown Options",
    dashboard: "Dashboard",
    profile: "My Profile",
    signOut: " Sign Out",
    languages: "Languages",
    ar: "Arabic",
    en: "English",
    messages: "Messages",
    settings: "Settings",
    about_us: "About us",
    info: "Site Information",
    reports: "Reports",
    generalSettings: "General Settings",
    clients: "Clients",
    phone: "Phone",
    sizes: "sizes",
    sizeTypesCategories: "Size Types Categories",
    terms_conditions: "Terms And Conditions",
    whatsapp: "Whatsapp",
    monthly: " Monthly Orders",
    daily: "Daily Orders",
    weekly: "Weekly Orders",
    fabricOrder: "Fabric Order",
    categoryOrder: " Category Order",
    designOrder: " Design Order",
    raw_material: "Raw Material",
    supplier: "Supplier",
    number: "Number",
    color: "Color",
    source_country: " Source Country",
    item: "Item",
    titleFabric: " Title",
    paymentPhoto: "Payment Photo",
    client: "Client",
    orderNumber: "Order Number",
    orderStatus: "Order Status",
    latitude: "Latitude",
    longitude: "Longitude",
    bank_info: "Bank Info",
    download: "Download",
    print: "Print",
    id: "ID",
    paymentType: "Payment Type",
    cash: "Cash",
    electronic_payment: "Electronic Payment",
    bank_transfer: "Bank Transfer",
    operation_number: "Operation Number",
    activate: "Activate",
    deactivate: "Deactivate",
    active: "Active",
    inactive: "Inactive",
    buttons: "Buttons",
    Jaap: "",
  },
  ar: {
    message: "hello i18n !!",
    deleteBox: {
      areYouSure: "هل انت متأكد؟",
      revertThis: "لا تستطيع ارجاع هذا!",
      deleteIt: "نعم حذف العنصر!",
      cancel: "الغاء",
    },
    cancel: "رجوع",
    categories: "نوع التفصيل",
    name: "الاسم",
    type: "النوع",
    save: "حفظ",
    operations: "العمليات",
    delete: "حذف",
    edit: "تعديل",
    search: "بحث",
    add: "اضافة",
    fabrics: "الأقمشة والعروض",
    photo: "الصورة",
    description: "الوصف",
    designs: "التصاميم",
    sizes: "المقاسات",
    sizeTypes: "انواع المقاسات",
    sizeTypesCategories: "مقاسات الملابس",
    dropFiles: "رفع ملف",
    users: "المستخدمين",
    mobile: "الجوال",
    email: "البريد الالكتروني",
    password: "كلمة المرور",
    continue: "دخول",
    password_confirmation: "تأكيد كلمة المرور",
    status: "الحالة",
    admins: "المديرين والعمال",
    role: "الدور",
    user: "عميل",
    admin: "مسؤل",
    seller: "بائع",
    shear_operator: "عامل القص",
    sewing_operator: "عامل الخياطة",
    button_operator: "عامل الازرار",
    order: "الطلبات",
    new: "جديد وقيد المراجعة",
    created_at: "تاريخ الاضافة",
    depositAmount: "المدفوع",
    amount: "المبلغ الاجمالي",
    deservedAmount: "المبلغ المتبقي",
    category: "القسم",
    design: "التصميم",
    fabric: "القماش",
    ready_to_deliver: "جاهز للتسليم",
    delivered: "تم التسليم",
    buttonCase: "مرحلة الازرار",
    deliveryDate: "موعد التسليم",
    waitingPayment: "انتظار الدفع",
    sewingCase: "مرحلة الخياطة ",
    cutCase: "مرحلة القص ",
    sizeGown: " تفاصيل الثوب",
    sizeGownOptions: "اختيارات المقاسات",
    dashboard: "الرئيسية",
    profile: "الحساب",
    signOut: "تسجيل الخروج",
    languages: "اللغات",
    ar: "العربية",
    en: "الانجليزية",
    messages: "رسائل التواصل",
    settings: "الاعدادات",
    about_us: "عن التطبيق",
    reports: "تقارير واحصائيات",
    generalSettings: "الاعدادات العامة",
    info: "معلومات التواصل",
    clients: "العملاء",
    client: "اسم العميل",
    terms_conditions: "الشروط والاحكام",
    phone: "الجوال",
    whatsapp: "واتس اب",
    monthly: "الطلبات الشهرية",
    daily: "الطلبات اليومة",
    weekly: "الطلبات الاسبوعة",
    fabricOrder: "طلب قماش",
    categoryOrder: "طلب ثوب",
    designOrder: "طلب تصميم",
    raw_material: "الخامة",
    supplier: "المورد",
    number: "الرقم",
    color: "اللون",
    source_country: "بلد المصدر",
    item: "الصنف",
    titleFabric: "اسم القماش",
    paymentPhoto: "صورة الدفع",
    orderNumber: "رقم الطلب ",
    orderStatus: "ارسال الطلب",
    latitude: "موقع المحل خط العرض",
    longitude: "موقع المحل خط الطول",
    bank_info: "معلومات البنك",
    download: "تحميل صورة الطلب",
    print: "طباعة",
    id: "المعرف",
    location_url: "موقغ المحل",
    employeeCount: "العمال",
    adminsCount: "المديرين",
    paymentType: "طريقة الدفع",
    cash: "كاش",
    electronic_payment: "دفع الكتروني",
    bank_transfer: "تحويل بنكي",
    operation_number: "رقم العملية",
    activate: "تفعيل",
    deactivate: "الغاء تفعيل",
    active: "مفعل",
    inactive: "غير مفعل",
    financial_notes: "ملاحظات مالية",
    options: "متعدد",
    text: "مدخل نصي",
    gown: "ثوب",
    other: "اخرى",
    sort: "الترتيب",
    chose_fabric: "اختر نوع القماش",
    payment_image: "صورة التحويل البنكى",
    contentMessage: "محتوى الرسالة",
    show: "عرض الطلب",
    buttons: "أزرار",
    Jaap: "رقم زر الجيب",
    Neck: "رقم زر الرقبة",
    Japz: "رقم زر الجبزور",
    Cabk: "رقم زر الكبك",
    nbr: "العدد",
    rak00: "قلاب فرنسي",
    rak11: "قلاب مفتوح",
    rak22: "قلاب عادي",
    rak33: "قلاب صيني",
    rak55: "قلاب مغلق",
    rak66: "قلاب دائري",
    djab11: "سحاب عادي",
    djab22: "سحاب مربع",
    djab33: "ازرار عادي",
    djab44: "مخفي عادي",
    djab55: "ازرار مربع",
    djab66: "مخفي مربع",
    sadr00: "صدر 1",
    sadr11: "صدر 2",
    sadr33: "صدر 3",
    sadr44: "صدر 4",
    sadr55: "صدر 5",
    sadr66: "صدر 6",
    sadr77: "صدر 7",
    sadr88: "صدر 8",
    kom1: "كم 1",
    kom2: "كم 2",
    kom3: "كم 3",
    kom4: "كم 4",
    kom5: "كم 5",
    djib_djenb1: "جيب جنب 1",
    djib_djenb2: "جيب جنب 2",
  },
};

const i18n = createI18n({
  locale: localStorage.getItem("languageUniversal"), // set locale
  fallbackLocale: "ar", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

let app = createApp(App);
app.component("FileUpload", FileUpload);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$Swal = Swal;
app.config.globalProperties.$role = localStorage.getItem("role");
app.config.globalProperties.$fullName = localStorage.getItem("fullName");
app.config.globalProperties.$email = localStorage.getItem("email");
app.config.globalProperties.$serialize = serialize;
app.config.globalProperties.$serializeOptios = serializeOptios;
app.config.globalProperties.$dashboardData = JSON.parse(
  localStorage.getItem("dashboard")
);

console.log(app.config.globalProperties.$dashboardData);

app.component("pagination", Pagination);

app.use(i18n);
app
  .use(store)
  .use(router)
  .use(Toaster, { position: "top-right", duration: 4000 })
  .mount("#app");
