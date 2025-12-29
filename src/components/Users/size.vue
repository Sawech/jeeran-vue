<template>
  <div
    v-if="this.$route.name == 'UserSize'"
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
                <div class="mb-10 fv-row">
                  {{ $t("categories") }}
                  <select
                    class="form-select"
                    v-model="form.category_id"
                    @change="getSizes()"
                    name="condition_type"
                    data-placeholder="Select an option"
                    data-kt-ecommerce-catalog-add-category="condition_type"
                  >
                    <option
                      v-for="category in categories"
                      :value="category.id"
                      :key="category"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div v-for="size in sizes" :key="size" class="mb-10 fv-row">
                  <input
                    type="text"
                    name="name"
                    v-model="size.value"
                    class="form-control mb-2"
                    :placeholder="size.name"
                  />
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{ name: 'User' }" class="btn btn-light me-5">
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
  computed: {},
  data() {
    return {
      id: this.$route.params.id,

      languages: this.$dashboardData.allLanguages,
      showLang: this.$dashboardData.languageUniversal,
      form: {
        user_id: this.$route.params.id,
      },
      loading: 1,
      errors: [],
      categories: [],
      sizes: [],
    };
  },

  mounted() {
    if (!this.id) {
      this.$router.push({ name: "User" });
    } else {
      this.getCategories();
    }
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    update() {
      this.form.user_id = this.id;
      this.form.size_type_category_user = this.sizes;

      // Log the exact request
      console.log(
        "📤 Sending request to:",
        "/admin/size-type-category-user/add"
      );
      console.log("📤 Request headers:", this.$axios.defaults.headers);
      console.log("📤 Request data:", this.form);

      this.$axios
        .post("/admin/size-type-category-user/add", this.form)
        .then((response) => {
          // Add logging for what backend received
          console.log("✅ Full response:", response);
          console.log("✅ Response headers:", response.headers);

          if (response.data.code == 201) {
            this.errors = response.data.data;
          }
          if (response.data.code == 200) {
            this.$toast.success(response.data.messages);
            this.errors = [];
            this.$router.push({ name: "User" });
          }
        })
        .catch((error) => {
          console.log("❌ Error:", error);
          console.log("❌ Response data:", error.response?.data);
          console.log("❌ Request config:", error.config);
        });
    },
    getCategories() {
      this.$axios.get("admin/all-category").then((response) => {
        this.categories = response.data.data;
        this.loading = 0;
      });
    },
    getSizes() {
      console.log("========== GET SIZES CALLED ==========");
      console.log("📋 Category ID selected:", this.form.category_id);
      console.log("📋 User ID:", this.id);

      this.$axios
        .post("admin/size-type-category/category", {
          category_id: this.form.category_id,
          user_id: this.id,
        })
        .then((response) => {
          console.log("✅ getSizes response:", response.data);
          console.log("✅ Size types received:", response.data.data.size_types);

          this.sizes = response.data.data.size_types;

          this.sizes.forEach((value, index) => {
            if (value.size_type_admin.length) {
              this.sizes[index].value = value.size_type_admin[0].value;
            }
          });

          console.log("📦 Final sizes array:", this.sizes);
          console.log("📦 Sizes count:", this.sizes.length);
          console.log("======================================");
        })
        .catch((error) => {
          console.log("❌ Error in getSizes:", error);
          console.log("❌ Error response:", error.response?.data);
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
