<template>
  <div
    v-if="this.$route.name == 'OrderUpdate'"
    class="content d-flex flex-column flex-column-fluid"
    id="kt_content"
  >
    <div class="post d-flex flex-column-fluid" id="kt_post">
      <div v-if="!loading" id="kt_content_container" class="container-xxl">
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
                  <div class="col-md-6">
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
                  <div class="col-md-6">
                    {{ $t("depositAmount") }}

                    <input
                      type="text"
                      name="deposit_amount"
                      v-model="form.deposit_amount"
                      class="form-control mb-2"
                      :placeholder="$t('depositAmount')"
                    />
                  </div>
                  <div class="col-md-6">
                    {{ $t("amount") }}

                    <input
                      type="text"
                      name="amount"
                      v-model="form.amount"
                      class="form-control mb-2"
                      :placeholder="$t('amount')"
                    />
                  </div>
                  <div class="col-md-6">
                    {{ $t("deliveryDate") }}
                    <input
                      type="date"
                      name="delivery_date"
                      v-model="form.delivery_date"
                      class="form-control mb-2"
                      :placeholder="$t('deliveryDate')"
                      :min="today"
                    />
                  </div>
                  <div class="col-md-6">
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
                  <div class="col-md-6">
                    {{ $t("description") }}

                    <textarea
                      name="description"
                      v-model="form.description"
                      class="form-control mb-2"
                      :placeholder="$t('description')"
                    />
                  </div>

                  <div class="col-md-6">
                    {{ $t("financial_notes") }}

                    <textarea
                      name="financial_notes"
                      v-model="form.financial_notes"
                      class="form-control mb-2"
                      :placeholder="$t('financial_notes')"
                    />
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
                      <span v-if="size.size_type_admin.length"></span>
                      {{ size.size_type_admin[0].value }}
                    </span>
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
                @click.prevent="update"
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
export default {
  components: {},
  props: {},
  setup() {},
  computed: {
    today() {
      const now = new Date();
      return now.toISOString().split("T")[0];
    },
  },
  data() {
    return {
      id: this.$route.params.id,

      languages: this.$dashboardData.allLanguages,
      showLang: this.$dashboardData.languageUniversal,
      form: {
        user_id: this.$route.params.id,
        role_id: 1,
      },
      loading: 1,
      errors: [],
      userSizes: {},
    };
  },

  mounted() {
    if (!this.id) {
      this.$router.push({ name: "Order" });
    } else {
      this.edit();
    }
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    edit() {
      this.$axios
        .post("admin/order/fetch?order_id=" + this.id)
        .then((response) => {
          this.form = response.data.data;
          this.loading = 0;
          if (this.form.order_type == "category") {
            this.$axios
              .post("admin/size-type-category/category", {
                category_id: this.form.category_id,
                user_id: this.form.user_id,
              })
              .then((response) => {
                if (response.data.code == 200) {
                  this.userSizes = response.data.data;
                }
              });
          }
        });
    },
    update() {
      this.form.order_id = this.id;
      this.$axios.post("/admin/order/edit", this.form).then((response) => {
        if (response.data.code == 201) {
          this.errors = response.data.data;
        }
        if (response.data.code == 200) {
          this.$toast.success(response.data.messages);
          this.errors = [];
          // this.$router.push({ name: 'Event' })
        } else {
          // this.$toast.error(response.data.message);
        }
      });
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
