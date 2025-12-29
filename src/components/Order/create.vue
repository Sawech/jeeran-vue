<template>
  <div
    v-if="this.$route.name == 'OrderCreate'"
    class="content d-flex flex-column flex-column-fluid"
    id="kt_content"
  >
    <div class="post d-flex flex-column-fluid" id="kt_post">
      <div id="kt_content_container" class="container-xxl">
        <form
          id="kt_ecommerce_add_category_form"
          class="form d-flex flex-column flex-lg-row"
          data-kt-redirect="../../demo1/dist/apps/ecommerce/catalog/categories.html"
        >
          <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div class="card card-flush py-4">
              <div class="card-header">
                <div v-for="(errorArray, index) in errors" :key="index">
                  <span class="text-danger">{{ errorArray[0] }} </span>
                </div>
                <br />
                <div class="card-title"></div>
              </div>

              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("clients") }}
                    <select
                      class="form-select"
                      v-model="form.user_id"
                      name="user_id"
                      @change="checkData"
                      data-placeholder="Select an option"
                      data-kt-ecommerce-catalog-add-category="condition_type"
                    >
                      <option
                        v-for="user in users"
                        :value="user.id"
                        :key="user.id"
                      >
                        {{ user.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("status") }}
                    <select
                      class="form-select"
                      v-model="form.status"
                      name="status"
                      data-placeholder="Select an option"
                      data-kt-ecommerce-catalog-add-category="condition_type"
                    >
                      <option value="new">{{ $t("new") }}</option>
                      <option value="waiting_payment">
                        {{ $t("waitingPayment") }}
                      </option>
                      <option value="cut_case">{{ $t("cutCase") }}</option>
                      <option value="sewing_case">
                        {{ $t("sewingCase") }}
                      </option>
                      <option value="button_case">
                        {{ $t("buttonCase") }}
                      </option>
                      <option value="ready_to_deliver">
                        {{ $t("ready_to_deliver") }}
                      </option>
                      <option value="delivered">{{ $t("delivered") }}</option>
                    </select>
                  </div>

                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("depositAmount") }}
                    <input
                      type="text"
                      name="deposit_amount"
                      v-model="form.deposit_amount"
                      class="form-control mb-2"
                      :placeholder="$t('depositAmount')"
                    />
                  </div>
                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("amount") }}
                    <input
                      type="text"
                      name="amount"
                      v-model="form.amount"
                      class="form-control mb-2"
                      :placeholder="$t('amount')"
                    />
                  </div>

                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("deliveryDate") }}
                    <input
                      type="date"
                      name="delivery_date"
                      v-model="form.delivery_date"
                      class="form-control mb-2"
                      :placeholder="$t('deliveryDate')"
                    />
                  </div>
                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("paymentType") }}
                    <select
                      class="form-select"
                      v-model="form.payment_way"
                      name="payment_way"
                      data-placeholder="Select an option"
                      data-kt-ecommerce-catalog-add-category="condition_type"
                    >
                      <option value="cash">{{ $t("cash") }}</option>
                      <option value="electronic_payment">
                        {{ $t("electronic_payment") }}
                      </option>
                      <option value="bank_transfer">
                        {{ $t("bank_transfer") }}
                      </option>
                    </select>
                  </div>

                  <div
                    v-if="form.payment_way == 'electronic_payment'"
                    class="col-md-6"
                    style="padding: 10px"
                  >
                    {{ $t("electronic_payment") }}
                    <input
                      type="text"
                      name="operation_number"
                      v-model="form.operation_number"
                      class="form-control mb-2"
                      placeholder="رقم العملية"
                    />
                  </div>

                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("description") }}
                    <textarea
                      name="description"
                      v-model="form.description"
                      class="form-control mb-2"
                      :placeholder="$t('description')"
                    />
                  </div>
                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("financial_notes") }}
                    <textarea
                      name="financial_notes"
                      v-model="form.financial_notes"
                      class="form-control mb-2"
                      :placeholder="$t('financial_notes')"
                    />
                  </div>

                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("payment_image") }}
                    <input type="file" ref="image" class="form-control mb-2" />
                  </div>
                </div>

                <div v-if="form.user_id" class="row">
                  <div class="col-md-6" style="padding: 10px">
                    {{ $t("type") }}
                    <select
                      class="form-select"
                      @change="getData"
                      v-model="form.order_type"
                      name="order_type"
                      data-placeholder="Select an option"
                      data-kt-ecommerce-catalog-add-category="condition_type"
                    >
                      <option value="category">
                        {{ $t("categoryOrder") }}
                      </option>
                      <option value="fabric">{{ $t("fabricOrder") }}</option>
                      <option value="design">{{ $t("designOrder") }}</option>
                    </select>
                  </div>

                  <div
                    v-if="form.order_type"
                    class="col-md-6"
                    style="padding: 10px"
                  >
                    <span>{{ text }}</span>
                    <select
                      class="form-select"
                      @change="getCategory()"
                      v-model="form.type_id"
                      name="form.type_id"
                      data-placeholder="Select an option"
                      data-kt-ecommerce-catalog-add-category="condition_type"
                    >
                      <option
                        v-for="option in options"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                  <div
                    v-if="form.order_type == 'category' && form.type_id"
                    class="col-md-6"
                    style="padding: 10px"
                  >
                    <span>{{ $t("chose_fabric") }}</span>
                    <select
                      class="form-select"
                      v-model="form.fabric_id"
                      name="form.type_id"
                      data-placeholder="Select an option"
                      data-kt-ecommerce-catalog-add-category="condition_type"
                    >
                      <option
                        v-for="option in options2"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div v-if="userSizes" class="col-md-12">
                  <div
                    v-for="size in userSizes.size_types"
                    :key="size.id"
                    class="col-md-3"
                  >
                    <span
                      >{{ size.name }} :
                      <span v-if="size.size_type_admin.length">{{
                        size.size_type_admin[0].value
                      }}</span>
                    </span>
                  </div>
                </div>
                <div class="mb-10 fv-row" v-for="gown in gowns" :key="gown">
                  <div v-if="gown.type == 'options'">
                    <div class="row">
                      <div class="col-md-6">
                        {{ gown.name }}
                        <img
                          class="m-2"
                          v-if="gown.images.length"
                          :src="gown.images[0].image"
                        />
                      </div>
                      <div class="col-md-6">
                        <div
                          v-for="option in gown.size_gown_options"
                          :key="option"
                        >
                          <input
                            type="radio"
                            :value="option.id"
                            v-model="gown.value"
                          />
                          <span>{{ option.name }}</span>
                          <img
                            class="m-4"
                            v-if="option.image"
                            :src="option.image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="gown.type == 'text'">
                    {{ gown.name }}
                    <carousel :items-to-show="1.5">
                      <slide v-for="slide in gown.images" :key="slide">
                        <img
                          style="width: 400px"
                          class="m-2"
                          v-if="gown.images.length"
                          :src="slide.image"
                        />
                      </slide>

                      <template #addons>
                        <navigation />
                        <pagination />
                      </template>
                    </carousel>

                    <div v-for="option in gown.size_gown_options" :key="option">
                      <input
                        type="text"
                        v-model="option.value"
                        class="form-control mb-2"
                        :placeholder="option.name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{ name: 'Order' }" class="btn btn-light me-5">
                {{ $t("cancel") }}
              </router-link>
              <button
                type="submit"
                @click.prevent="create"
                id="kt_ecommerce_add_category_submit"
                class="btn btn-primary"
              >
                <span class="indicator-label">{{ $t("save") }}</span>
                <span class="indicator-progress"
                  >Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span
                ></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {},
  setup() {},
  computed: {},
  data() {
    return {
      languages: this.$dashboardData.allLanguages,
      showLang: this.$dashboardData.languageUniversal,
      form: {
        role_id: 1,
      },
      errors: [],
      users: [],
      options: [],
      text: "",
      category: "",
      gowns: [],
      check: false,
      publicPath: process.env.BASE_URL,
      userSizes: {},
      options2: [],
    };
  },

  mounted() {
    this.getUsers();
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    create() {
      if (this.form.order_type == "category") {
        this.form.category_id = this.form.type_id;
      }
      if (this.form.order_type == "fabric") {
        this.form.fabric_id = this.form.type_id;
      }
      if (this.form.order_type == "design") {
        this.form.design_id = this.form.type_id;
      }
      this.form.payment_image = this.$refs.image.files[0];

      if (
        this.form.order_type == "category" ||
        this.form.order_type == "fabric"
      ) {
        let arr = [];
        this.gowns.forEach((value) => {
          if (value.type == "options") {
            arr.push({
              size_gown_option_id: value.value,
              value: 1,
            });
          } else {
            console.log("dddddddd");
            value.size_gown_options.forEach((value2) => {
              arr.push({
                size_gown_option_id: value2.id,
                value: value2.value,
              });
            });
          }
        });
        this.form.order_details = arr;
      }

      console.log("fooooorm", this.form);

      const formData = this.$serialize(this.form, this.$serializeOptios);
      if (this.check) {
        this.$axios
          .post("admin/order/save-order", formData)
          .then((response) => {
            if (response.data.code == 201) {
              this.errors = response.data.data;
            }
            if (response.data.code == 200) {
              this.$toast.success(response.data.messages);
              this.form = [];
              this.errors = [];
              this.form.langs = this.languages;
              // this.$router.push({ name: 'Event' })
            }
            // if(response.data.code == 201) {
            //   this.$toast.error(response.data.message);
            // }
          });
      } else {
        this.$toast.error("العميل لديه مستحقات لا يمكن استكمال الطلب");
      }
    },
    getUsers() {
      this.$axios.get("admin/user/all-user").then((response) => {
        this.users = response.data.data;
      });
    },
    checkData() {
      this.form.type_id = "";
      this.userSizes = [];
      this.gowns = [];
      if (this.$role != "admin") {
        this.$axios
          .post("admin/order/check-create", { user_id: this.form.user_id })
          .then((response) => {
            if (response.data.code == 200) {
              this.check = true;
            } else {
              this.check = false;
              this.$toast.error(response.data.messages);
            }
          });
      } else {
        this.check = true;
      }
    },
    getData() {
      this.options = [];
      this.gowns = [];
      this.form.type_id = "";
      if (this.form.order_type == "category") {
        this.text = this.$t("categories");
        this.$axios.get("admin/all-category").then((response) => {
          this.options = response.data.data;
        });
        this.$axios.get("list/fabric").then((response) => {
          this.options2 = response.data.data;
        });
      }
      if (this.form.order_type == "design") {
        this.text = this.$t("designs");

        this.$axios.get("list/design").then((response) => {
          this.options = response.data.data;
        });
      }
      if (this.form.order_type == "fabric") {
        this.text = this.$t("fabrics");

        this.$axios.get("list/fabric").then((response) => {
          this.options = response.data.data;
        });
      }
    },
    getCategory() {
      this.gowns = [];
      if (this.form.order_type == "category") {
        this.$axios
          .post("admin/size-type-category/category", {
            category_id: this.form.type_id,
            user_id: this.form.user_id,
          })
          .then((response) => {
            if (response.data.code == 200) {
              this.userSizes = response.data.data;
              if (this.userSizes.size_types.length) {
                if (!this.userSizes.size_types[0].size_type_admin.length) {
                  this.form.type_id = "";
                  this.userSizes = [];
                  this.gowns = [];
                  this.$toast.error("لا يوجد مقاسات لهذا الثوب");
                } else {
                  this.$axios
                    .post("admin/category/fetch", {
                      id: this.form.type_id,
                    })
                    .then((response) => {
                      this.category = response.data.data;
                      if (this.category.type == "gown") {
                        this.$axios.post("list/size-gown").then((response) => {
                          this.gowns = response.data.data;
                        });
                      }
                    });
                }
              }
            }
          });
      }

      if (this.form.order_type == "fabric") {
        this.$axios
          .post("list/size-gown", {
            type: "text",
          })
          .then((response) => {
            this.gowns = response.data.data;
          });
      }
    },
  },
  watch: {
    $route() {
      this.form = {};
    },
  },
};
</script>

<style scoped></style>
