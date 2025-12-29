<template>
  <div v-if="this.$route.name=='UserUpdate'" class="content d-flex flex-column flex-column-fluid" id="kt_content">

    <div class="post d-flex flex-column-fluid" id="kt_post">
      <div v-if="!loading" id="kt_content_container" class="container-xxl">

        <form id="kt_ecommerce_add_category_form" class="form d-flex flex-column flex-lg-row" data-kt-redirect="../../demo1/dist/apps/ecommerce/catalog/categories.html">

          <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">

            <div class="card card-flush py-4">
              <div class="card-header">
                <div v-for="(errorArray, index) in errors" :key="index">
                  <span class="text-danger">{{ errorArray[0]}} </span>
                </div><br>
                <div class="card-title">

                               </div>
              </div>


              <div class="card-body pt-0">
                <div class="mb-10 fv-row">
                  <input type="text" name="name" v-model="form.name" class="form-control mb-2" :placeholder="$t('name')" />

                </div>
                <div class="mb-10 fv-row">
                  <input type="email" name="email" v-model="form.email" class="form-control mb-2" :placeholder="$t('email')" />

                </div>
                <div class="mb-10 fv-row">
                  <input type="text" name="mobile" v-model="form.mobile" class="form-control mb-2" :placeholder="$t('mobile')" />

                </div>
                <div class="mb-10 fv-row">
                  <input type="password" name="password" v-model="form.password" class="form-control mb-2" :placeholder="$t('password')" />

                </div>
                <div class="mb-10 fv-row">
                  <input type="password" name="password_confirmation" v-model="form.password_confirmation" class="form-control mb-2" :placeholder="$t('password_confirmation')" />

                </div>


              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{name: 'User'}" class="btn btn-light me-5">
                {{$t('cancel')}}
              </router-link>
              <button type="submit" @click.prevent="update"  id="kt_ecommerce_add_category_submit" class="btn btn-primary">
                <span class="indicator-label">{{$t('save')}}</span>
                <span class="indicator-progress">Please wait...
												<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
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
  components: {

  },
  props: {
  },
  setup () {
  },
  computed: {

  },
  data() {
    return {
      id:this.$route.params.id,

      languages:this.$dashboardData.allLanguages,
      showLang:this.$dashboardData.languageUniversal,
      form : {
        user_id:this.$route.params.id,
        role_id:1
      },
      loading:1,
      errors:[]

    }
  },

  mounted() {
    if(!this.id){
      this.$router.push({ name: 'User' })
    }else {
      this.edit();
    }
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    edit() {
      this.$axios.post('admin/user/fetch?id='+this.id)
          .then(response => {
            this.form = response.data.data;
            this.loading = 0;

          });
    },
    update() {
         this.form.user_id = this.id;
      this.form.role_id = 1;

      this.$axios.post('/admin/user/edit',this.form)
          .then(response => {
            if(response.data.code == 201) {
              this.errors = response.data.data;
            }
            if(response.data.code == 200)  {
              this.$toast.success(response.data.messages);
              this.errors = [];
              // this.$router.push({ name: 'Event' })

            }   else {
              // this.$toast.error(response.data.message);
            }

          });
    },

  },
  watch:{
    $route (){
      this.form = {};
    }
  }

}
</script>

<style scoped>

</style>