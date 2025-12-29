<template>
  <div v-if="this.$route.name=='MessageShow'" class="content d-flex flex-column flex-column-fluid" id="kt_content">

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
                  {{$t('name')}} :{{form.name}}
                </div>
                <div class="mb-10 fv-row">
                  {{$t('created_at')}} :{{form.created_at}}
                </div>
                <div class="mb-10 fv-row">
                  {{$t('mobile')}} :{{form.mobile}}
                </div>
                <div class="mb-10 fv-row">
                  {{$t('messages')}} :{{form.message}}
                </div>


              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{name: 'Messages'}" class="btn btn-light me-5">
                {{$t('cancel')}}
              </router-link>
<!--              <button type="submit" @click.prevent="update"  id="kt_ecommerce_add_category_submit" class="btn btn-primary">-->
<!--                <span class="indicator-label">{{$t('save')}}</span>-->
<!--                <span class="indicator-progress">Please wait...-->
<!--												<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>-->
<!--              </button>-->
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
        id:this.$route.params.id,

      },
      loading:1,
      errors:[]

    }
  },

  mounted() {
    if(!this.id){
      this.$router.push({ name: 'Messages' })
    }else {
      this.edit();
    }
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    edit() {
      this.$axios.post('admin/dashboard/message/fetch?id='+this.id)
          .then(response => {
            this.form = response.data.data;
            this.loading = 0;

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