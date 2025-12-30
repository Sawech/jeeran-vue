<template>
  <div class="d-flex flex-column flex-root">
    <!--begin::Authentication - Register -->
    <div
      class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
      :style="{
        backgroundImage:
          'url(' +
          `${publicPath}assets/media/illustrations/sketchy-1/14.png ` +
          ')',
      }"
    >
      <!--begin::Content-->
      <div
        class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20"
      >
        <!--begin::Logo-->
        <router-link to="/login" class="mb-12">
          <img alt="Logo" :src="`${publicPath}logo.png`" class="h-40px" />
        </router-link>
        <!--end::Logo-->
        <!--begin::Wrapper-->
        <div class="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
          <!--begin::Form-->
          <form
            class="form w-100"
            novalidate="novalidate"
            id="kt_register_form"
            action="#"
          >
            <!--begin::Heading-->
            <div class="text-center mb-10">
              <h1 class="text-dark mb-3">إنشاء حساب جديد</h1>
              <div
                v-if="successMessage"
                class="alert alert-success"
                role="alert"
              >
                {{ successMessage }}
              </div>
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
              <div class="text-gray-400 fw-bold fs-4">
                لديك حساب؟
                <router-link to="/login" class="link-primary fw-bolder"
                  >تسجيل الدخول</router-link
                >
              </div>
            </div>
            <!--begin::Heading-->

            <!--begin::Input group-->
            <div class="fv-row mb-10">
              <label class="form-label fw-bolder text-dark fs-6">{{
                $t("name")
              }}</label>
              <input
                class="form-control form-control-lg form-control-solid"
                type="text"
                v-model="form.name"
                :placeholder="$t('name')"
                required
              />
              <div v-if="errors.name" class="text-danger mt-2">
                {{ errors.name[0] }}
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="fv-row mb-10">
              <label class="form-label fw-bolder text-dark fs-6">{{
                $t("email")
              }}</label>
              <input
                class="form-control form-control-lg form-control-solid"
                type="email"
                v-model="form.email"
                :placeholder="$t('email')"
                required
              />
              <div v-if="errors.email" class="text-danger mt-2">
                {{ errors.email[0] }}
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="fv-row mb-10">
              <label class="form-label fw-bolder text-dark fs-6">{{
                $t("mobile")
              }}</label>
              <input
                class="form-control form-control-lg form-control-solid"
                type="text"
                v-model="form.mobile"
                :placeholder="$t('mobile')"
                required
              />
              <div v-if="errors.mobile" class="text-danger mt-2">
                {{ errors.mobile[0] }}
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="fv-row mb-10">
              <label class="form-label fw-bolder text-dark fs-6">{{
                $t("password")
              }}</label>
              <input
                class="form-control form-control-lg form-control-solid"
                type="password"
                v-model="form.password"
                :placeholder="$t('password')"
                required
              />
              <div v-if="errors.password" class="text-danger mt-2">
                {{ errors.password[0] }}
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="fv-row mb-10">
              <label class="form-label fw-bolder text-dark fs-6">{{
                $t("password_confirmation")
              }}</label>
              <input
                class="form-control form-control-lg form-control-solid"
                type="password"
                v-model="form.password_confirmation"
                :placeholder="$t('password_confirmation')"
                required
              />
              <div v-if="errors.password_confirmation" class="text-danger mt-2">
                {{ errors.password_confirmation[0] }}
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="button"
                @click="register"
                :disabled="loading"
                class="btn btn-lg btn-primary w-100 mb-5"
              >
                <span v-if="!loading" class="indicator-label">{{
                  $t("create_account")
                }}</span>
                <span v-if="loading" class="indicator-progress">
                  جاري الإنشاء...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
            <!--end::Actions-->
          </form>
          <!--end::Form-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Authentication - Register-->
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      form: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        password_confirmation: "",
        role_id: 1, // Assuming role_id 1 is for regular users
      },
      errors: {},
      loading: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    register() {
      this.loading = true;
      this.errors = {};
      this.successMessage = "";
      this.errorMessage = "";

      console.log("Registration attempt with data:", this.form);

      this.$axios
        .post("admin/user/add", this.form)
        .then((response) => {
          // Check if response exists
          if (!response) {
            throw new Error("No response from server");
          }

          console.log("Registration response object:", response);
          console.log("Response status:", response.status);
          console.log("Response data:", response.data);

          // Check if response.data exists
          if (!response.data) {
            throw new Error("Response data is empty");
          }

          if (response.data.code == 201) {
            // Validation errors
            this.errors = response.data.data || {};
            console.log("Validation errors:", this.errors);
          } else if (response.data.code == 200) {
            // Success
            this.successMessage =
              response.data.messages || "تم إنشاء الحساب بنجاح";
            this.form = {
              name: "",
              email: "",
              mobile: "",
              password: "",
              password_confirmation: "",
              role_id: 1,
            };
          } else {
            this.errorMessage =
              response.data.message || "حدث خطأ أثناء إنشاء الحساب";
            console.log("Error response:", response.data);
          }
        })
        .catch((error) => {
          console.error("Full error object:", error);
          console.error("Error name:", error.name);
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);

          if (error.response) {
            // Server responded with error status
            console.error("Error response exists:", error.response);
            console.error("Error response status:", error.response.status);
            console.error("Error response data:", error.response.data);

            if (error.response.status === 422) {
              this.errors =
                error.response.data?.errors || error.response.data?.data || {};
            } else if (error.response.data?.message) {
              this.errorMessage = error.response.data.message;
            } else {
              this.errorMessage = `خطأ في الخادم (${error.response.status})`;
            }
          } else if (error.request) {
            // Request made but no response
            console.error("Error request:", error.request);
            this.errorMessage =
              "لا يوجد اتصال بالخادم. يرجى التحقق من الاتصال بالإنترنت";
          } else {
            // Other errors
            console.error("Other error:", error);
            this.errorMessage = error.message || "حدث خطأ غير متوقع";
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
