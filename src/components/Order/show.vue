<template>
  <div
    v-if="this.$route.name == 'OrderShow'"
    class="content d-flex flex-column flex-column-fluid"
    id="kt_content"
  >
    <div class="post d-flex flex-column-fluid" id="kt_post">
      <div v-if="!loading" id="kt_content_container" class="container-xxl">
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <div class="card card-flush py-4">
            <div class="card-header">
              <div v-for="(errorArray, index) in errors" :key="index">
                <span class="text-danger">{{ errorArray[0] }} </span>
              </div>
              <br />
              <div class="card-title"></div>
            </div>

            <div class="mb-14">
              <!--begin::Table container-->
              <div class="table-responsive">
                <!--begin::Table-->
                <table
                  class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
                >
                  <!--begin::Table head-->
                  <thead></thead>
                  <!--end::Table head-->
                  <!--begin::Table body-->
                  <tbody class="border-bottom border-dashed">
                    <tr class="fw-bold fs-6 text-gray-800 text-center">
                      <td class="text-start ps-6 fs-4">{{ $t("client") }}</td>
                      <td>{{ form.user?.name }}</td>
                      <td></td>
                    </tr>
                    <tr
                      v-if="form.payment_image != null"
                      class="fw-bold fs-6 text-gray-800 text-center"
                    >
                      <td class="text-start ps-6 fs-4">{{ $t("download") }}</td>
                      <td>
                        <a :href="form.payment_image"
                          ><i class="fa fa-download"></i
                        ></a>
                      </td>
                      <td></td>
                    </tr>
                    <tr class="text-center">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("type") }}
                        </div>
                      </td>
                      <td v-if="form.order_type == 'category'">
                        {{ $t("categoryOrder") }} -
                        <span v-if="form.category">{{
                          form.category.name
                        }}</span>
                      </td>
                      <td v-if="form.order_type == 'design'">
                        {{ $t("designOrder") }} -
                        <span v-if="form.design">{{ form.design.name }}</span>
                      </td>
                      <td v-if="form.order_type == 'fabric'">
                        {{ $t("fabricOrder") }} -
                        <span v-if="form.fabric">{{ form.fabric.name }}</span>
                      </td>
                      <td></td>
                    </tr>
                    <tr class="text-center" v-if="form.fabric_id">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("fabric") }}
                        </div>
                      </td>
                      <td>{{ form.fabric?.name }}</td>
                      <td></td>
                    </tr>
                    <tr
                      class="text-center"
                      v-if="$role == 'admin' || $role == 'seller'"
                    >
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("depositAmount") }}
                        </div>
                      </td>
                      <td>
                        {{ form.deposit_amount }}
                      </td>
                      <td></td>
                    </tr>
                    <tr
                      class="text-center"
                      v-if="$role == 'admin' || $role == 'seller'"
                    >
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("amount") }}
                        </div>
                      </td>
                      <td>
                        {{ form.amount }}
                      </td>
                      <td></td>
                    </tr>
                    <tr
                      class="text-center"
                      v-if="$role == 'admin' || $role == 'seller'"
                    >
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("deservedAmount") }}
                        </div>
                      </td>
                      <td>
                        {{ form.deserved_amount }}
                      </td>
                      <td></td>
                    </tr>

                    <tr class="text-center">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("deliveryDate") }}
                        </div>
                      </td>
                      <td>
                        {{ form.delivery_date }}
                      </td>
                      <td></td>
                    </tr>

                    <tr
                      class="text-center"
                      v-if="$role == 'admin' || $role == 'seller'"
                    >
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("paymentType") }}
                        </div>
                      </td>
                      <td>
                        {{ $t(form.payment_way) }}
                      </td>
                      <td></td>
                    </tr>
                    <tr
                      v-if="form.payment_way == 'electronic_payment'"
                      class="text-center"
                    >
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("operation_number") }}
                        </div>
                      </td>
                      <td>
                        {{ form.operation_number }}
                      </td>
                      <td></td>
                    </tr>

                    <tr class="text-center">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("description") }}
                        </div>
                      </td>
                      <td>
                        {{ form.description }}
                      </td>
                      <td></td>
                    </tr>

                    <tr class="text-center">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("financial_notes") }}
                        </div>
                      </td>
                      <td>
                        {{ form.financial_notes }}
                      </td>
                      <td></td>
                    </tr>
                    <tr class="text-center">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("status") }}
                        </div>
                      </td>
                      <td>
                        <span v-if="form.status == 'new'">
                          {{ $t("new") }}</span
                        >
                        <span v-if="form.status == 'delivered'">
                          {{ $t("delivered") }}</span
                        ><span v-if="form.status == 'ready_to_deliver'">
                          {{ $t("ready_to_deliver") }}</span
                        >
                        <span v-if="form.status == 'button_case'"
                          >في {{ $t("buttonCase") }} منذ
                          {{ form.status_at }}</span
                        >
                        <span v-if="form.status == 'sewing_case'"
                          >في {{ $t("sewingCase") }} منذ
                          {{ form.status_at }}</span
                        >
                        <span v-if="form.status == 'cut_case'"
                          >في {{ $t("cutCase") }} منذ {{ form.status_at }}</span
                        >
                        <span v-if="form.status == 'waiting_payment'"
                          >في {{ $t("waitingPayment") }} منذ
                          {{ form.status_at }}</span
                        >
                      </td>
                      <td></td>
                    </tr>

                    <tr class="text-center print">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("print") }}
                        </div>
                      </td>
                      <td @click.prevent="download">
                        <i class="fa fa-download"></i>
                      </td>
                      <td></td>
                    </tr>

                    <tr v-if="form.buttons" class="text-center">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("buttons") }}
                        </div>
                      </td>
                      <td>
                        <div v-if="form.buttons.jaap_num">
                          <strong>{{ $t("Jaap") }}:</strong>
                          {{ form.buttons.jaap_num || 0 }} /
                          <strong>{{ $t("Neck") }}:</strong>
                          {{ form.buttons.neck.button || 0 }} ,
                          <strong>{{ $t("nbr") }}:</strong>
                          {{ form.buttons.neck.number || 0 }} /
                          <strong>{{ $t("Japz") }}:</strong>
                          {{ form.buttons.japz.button || 0 }} ,
                          <strong>{{ $t("nbr") }}:</strong>
                          {{ form.buttons.japz.number || 0 }} /
                          <strong>{{ $t("Cabk") }}:</strong>
                          {{ form.buttons.cabk.button || 0 }} ,
                          <strong>{{ $t("nbr") }}:</strong>
                          {{ form.buttons.cabk.number || 0 }}
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <!-- ✅ Add null check for form.details -->
                    <template
                      v-if="form.details && typeof form.details === 'object'"
                    >
                      <template
                        v-for="(detailArray, detailKey) in form.details"
                        :key="detailKey"
                      >
                        <tr
                          v-for="option in detailArray"
                          :key="option.size_gown_id"
                          class="text-center"
                        >
                          <td class="text-start ps-6">
                            <div class="fw-bold fs-4 text-gray-800">
                              {{ option.size_gown_name }}
                            </div>
                          </td>
                          <td>
                            {{ $t(option.size_gown_option_image) }}
                            <span v-if="option.size_gown_type == 'text'">
                              - {{ option.order_value }}
                            </span>
                          </td>
                          <td>
                            <img
                              v-if="option.size_gown_option_image"
                              class="logo-print"
                              :src="
                                '/assets/assets/' +
                                option.size_gown_option_image +
                                '.png'
                              "
                            />
                          </td>
                        </tr>
                      </template>
                    </template>

                    <!-- ✅ Add null check for userSizes.size_types -->
                    <tr
                      v-for="size in userSizes.size_types || []"
                      :key="size.id"
                      class="text-center"
                    >
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ size.name }}
                        </div>
                      </td>
                      <td>
                        <span
                          v-if="
                            size.size_type_user && size.size_type_user.length
                          "
                          >{{ size.size_type_user[0].value }}</span
                        >
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                  <!--end::Table body-->
                </table>
              </div>

              <!-- PRINT SECTION -->
              <div v-show="false" id="divToPrint" class="table-responsive">
                <!--begin::Table-->
                <table
                  class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
                >
                  <thead></thead>
                  <tbody class="border-bottom border-dashed">
                    <tr class="text-center">
                      <td>
                        {{ $t("client") }}
                        <br />
                        {{ form.user?.name }}
                      </td>

                      <td>
                        {{ $t("type") }}
                        <br />
                        <span v-if="form.order_type == 'category'"
                          >{{ $t("categoryOrder") }} -
                          <span v-if="form.category">{{
                            form.category.name
                          }}</span></span
                        >
                        <span v-if="form.order_type == 'design'"
                          >{{ $t("designOrder") }} -
                          <span v-if="form.design">{{
                            form.design.name
                          }}</span></span
                        >
                        <span v-if="form.order_type == 'fabric'"
                          >{{ $t("fabricOrder") }} -
                          <span v-if="form.fabric">{{
                            form.fabric.name
                          }}</span></span
                        >
                      </td>
                      <td colspan="2">
                        {{ $t("status") }}
                        <br />
                        <span v-if="form.status == 'new'">
                          {{ $t("new") }}</span
                        >
                        <span v-if="form.status == 'delivered'">
                          {{ $t("delivered") }}</span
                        >
                        <span v-if="form.status == 'ready_to_deliver'"
                          >في {{ $t("ready_to_deliver") }} منذ
                          {{ form.status_at }}</span
                        >
                        <span v-if="form.status == 'button_case'"
                          >في {{ $t("buttonCase") }} منذ
                          {{ form.status_at }}</span
                        >
                        <span v-if="form.status == 'sewing_case'"
                          >في {{ $t("sewingCase") }} منذ
                          {{ form.status_at }}</span
                        >
                        <span v-if="form.status == 'cut_case'"
                          >في {{ $t("cutCase") }} منذ {{ form.status_at }}</span
                        >
                        <span v-if="form.status == 'waiting_payment'"
                          >في {{ $t("waitingPayment") }} منذ
                          {{ form.status_at }}</span
                        >
                      </td>
                    </tr>

                    <tr
                      class="text-center"
                      v-if="$role == 'admin' || $role == 'seller'"
                    >
                      <td>
                        {{ $t("depositAmount") }}<br />{{ form.deposit_amount }}
                      </td>

                      <td>{{ $t("amount") }}<br />{{ form.amount }}</td>

                      <td>
                        {{ $t("deservedAmount") }}<br />{{
                          form.deserved_amount
                        }}
                      </td>

                      <td>
                        {{ $t("financial_notes") }}<br />{{
                          form.financial_notes
                        }}
                      </td>
                    </tr>

                    <tr
                      class="text-center"
                      v-if="$role == 'admin' || $role == 'seller'"
                    >
                      <td>
                        {{ $t("deliveryDate") }}<br />{{ form.delivery_date }}
                      </td>

                      <td>
                        {{ $t("paymentType") }}<br />{{ $t(form.payment_way) }}
                      </td>

                      <td v-if="form.payment_way == 'electronic_payment'">
                        {{ $t("operation_number") }}<br />{{
                          form.operation_number
                        }}
                      </td>

                      <td
                        colspan="2"
                        v-if="form.payment_way != 'electronic_payment'"
                      >
                        {{ $t("description") }}<br />{{ form.description }}
                      </td>
                      <td v-if="form.payment_way == 'electronic_payment'">
                        {{ $t("description") }}<br />{{ form.description }}
                      </td>
                    </tr>

                    <tr class="text-center print">
                      <td class="text-start ps-6">
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ $t("print") }}
                        </div>
                      </td>
                      <td @click.prevent="download">
                        <i class="fa fa-download"></i>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <!-- User Sizes Table -->
                <table
                  class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
                >
                  <thead></thead>
                  <tbody class="border-bottom border-dashed">
                    <tr>
                      <td
                        v-for="size in userSizes.size_types || []"
                        :key="size.id"
                        class="text-start ps-6"
                      >
                        <div class="fw-bold fs-4 text-gray-800">
                          {{ size.name }}
                        </div>
                        <span
                          v-if="
                            size.size_type_user && size.size_type_user.length
                          "
                          >{{ size.size_type_user[0].value }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Details Table - 5 Columns Layout -->
                <table
                  v-if="form.details && typeof form.details === 'object'"
                  class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
                >
                  <thead></thead>
                  <tbody class="border-bottom border-dashed">
                    <template
                      v-for="(row, rowIndex) in getDetailRows(form.details, 5)"
                      :key="rowIndex"
                    >
                      <!-- Title Row -->
                      <tr class="text-center">
                        <td
                          v-for="(item, colIndex) in row"
                          :key="`title-${colIndex}`"
                          class="fw-bold fs-5 text-gray-800"
                        >
                          {{ item.size_gown_name }}
                          <br />
                          {{ $t(item.size_gown_option_image) }}
                          <span v-if="item.size_gown_type == 'text'">
                            - {{ item.order_value }}
                          </span>
                        </td>
                        <td
                          v-for="n in 5 - row.length"
                          :key="`empty-title-${n}`"
                        ></td>
                      </tr>
                      <!-- Image Row -->
                      <tr class="text-center">
                        <td
                          v-for="(item, colIndex) in row"
                          :key="`img-${colIndex}`"
                        >
                          <img
                            v-if="item.size_gown_option_image"
                            class="logo-print"
                            :src="
                              '/assets/assets/' +
                              item.size_gown_option_image +
                              '.png'
                            "
                          />
                        </td>
                        <td
                          v-for="n in 5 - row.length"
                          :key="`empty-img-${n}`"
                        ></td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <!-- Buttons Table - 7 Columns Layout -->
                <table
                  v-if="form.buttons"
                  class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
                >
                  <thead></thead>
                  <tbody class="border-bottom border-dashed">
                    <tr class="text-center">
                      <td class="fw-bold fs-5 text-gray-800">
                        {{ $t("Jaap") }}<br />
                        {{ form.buttons.jaap_num || 0 }}
                      </td>
                      <td class="fw-bold fs-5 text-gray-800">
                        {{ $t("Neck") }}<br />
                        {{ form.buttons.neck?.button || 0 }}
                      </td>
                      <td class="fw-bold fs-5 text-gray-800">
                        {{ $t("nbr") }}<br />
                        {{ form.buttons.neck?.number || 0 }}
                      </td>
                      <td class="fw-bold fs-5 text-gray-800">
                        {{ $t("Japz") }}<br />
                        {{ form.buttons.japz?.button || 0 }}
                      </td>
                      <td class="fw-bold fs-5 text-gray-800">
                        {{ $t("nbr") }}<br />
                        {{ form.buttons.japz?.number || 0 }}
                      </td>
                      <td class="fw-bold fs-5 text-gray-800">
                        {{ $t("Cabk") }}<br />
                        {{ form.buttons.cabk?.button || 0 }}
                      </td>
                      <td class="fw-bold fs-5 text-gray-800">
                        {{ $t("nbr") }}<br />
                        {{ form.buttons.cabk?.number || 0 }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{ name: 'Order' }" class="btn btn-light me-5">
                {{ $t("cancel") }}
              </router-link>
            </div>
          </div>
        </div>
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
    // ✅ Add this computed property to handle the even indices safely
    getEvenIndices() {
      return (details) => {
        if (!details || !Array.isArray(details)) {
          return [];
        }
        return details.map((_, i) => i).filter((i) => i % 2 === 0);
      };
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
        details: [],
      },
      loading: 1,
      errors: [],
      userSizes: {
        size_types: [],
      },
      printStyle: `body {opacity: 0}
            @media print {
            body {
                opacity: 1;
            }
            table {width: 100%; table-layout: fixed;}
            table,th,td {border: 1px solid #aaa; border-collapse: collapse;}
            table th, table td {font-size: 10pt; padding: 5pt; font-family: sans-serif; word-wrap: break-word;}
            img{
                width: 80px;
                height: 80px;
                object-fit: contain;
                display: block;
                margin: 0 auto;
            }
            .print {
                display:none;
            }
            @page {
                size: A4 landscape;
                margin: 10mm;
            }
        }`,
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
          console.log("show response =", response.data.data);
          this.form = response.data.data;

          if (!this.form.details) {
            this.form.details = [];
          }
          if (this.form.buttons) {
            console.log("Order buttons:", this.form.buttons);
            console.log("Jaap num:", this.form.buttons.jaap_num);
            console.log("Neck button:", this.form.buttons.neck?.button);
            console.log("Neck count:", this.form.buttons.neck?.number);
          }

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

                  if (!this.userSizes.size_types) {
                    this.userSizes.size_types = [];
                  }
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
        }
      });
    },
    download() {
      let dir = document.getElementsByTagName("html")[0].getAttribute("dir");
      let divContents = document.getElementById("divToPrint").innerHTML;
      let printWindow = window.open("", "_blank", "");
      printWindow.document.write(
        "<html dir=" +
          dir +
          "><head><title>Print</title><style>" +
          this.printStyle
      );
      printWindow.document.write("</style></head><body>");
      printWindow.document.write(divContents);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    },
    getDetailPairs(details) {
      if (!details || typeof details !== "object") {
        return [];
      }

      // Flatten all detail items into a single array
      const allItems = [];
      Object.values(details).forEach((detailArray) => {
        if (Array.isArray(detailArray)) {
          allItems.push(...detailArray);
        }
      });

      // Group into pairs for 2-column layout
      const pairs = [];
      for (let i = 0; i < allItems.length; i += 2) {
        pairs.push([allItems[i], allItems[i + 1]].filter(Boolean));
      }

      return pairs;
    },
    getDetailRows(details, columns) {
      if (!details || typeof details !== "object") {
        return [];
      }

      // Flatten all detail items into a single array
      const allItems = [];
      Object.values(details).forEach((detailArray) => {
        if (Array.isArray(detailArray)) {
          allItems.push(...detailArray);
        }
      });

      // Group into rows based on column count
      const rows = [];
      for (let i = 0; i < allItems.length; i += columns) {
        rows.push(allItems.slice(i, i + columns));
      }

      return rows;
    },
  },
  watch: {
    $route() {
      this.form = {
        details: [],
      };
      this.userSizes = {
        size_types: [],
      };
    },
  },
};
</script>

<style scoped>
.logo-print {
  height: 40px;
  width: 40px;
}
</style>
