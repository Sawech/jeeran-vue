<template>
  <div v-if="this.$route.name=='SettingsUpdate'" class="content d-flex flex-column flex-column-fluid" id="kt_content">

    <div class="post d-flex flex-column-fluid" id="kt_post">
      <div v-if="!loading" id="kt_content_container" class="container-xxl">

        <form id="kt_ecommerce_add_category_form" class="form d-flex flex-column flex-lg-row" data-kt-redirect="../../demo1/dist/apps/ecommerce/catalog/categories.html">

          <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">

            <div class="card card-flush py-4">
            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
              <h1>{{$t('settings')}}</h1>
                <div v-for="(errorArray, index) in errors" :key="index">
                  <span class="text-danger">{{ errorArray[0]}} </span>
                </div><br>
                <div class="card-title">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li v-for="language in languages" class="nav-item" :key="language.id" @click="changeLang(language.language_universal)" ><a @click.prevent="changeLang(language.language_universal)" class="nav-link" :class="{'active': showLang == language.language_universal}" :id="language.name+'-tab'" data-toggle="tab" :href="'#'+language.languageName" role="tab" :aria-controls="language.languageName" aria-selected="false">{{$t(language.language_universal)}}</a></li>
                  </ul>
                </div>
              </div>


              <div class="card-body pt-0">
                <div v-for="attribute in form" class="mb-10 fv-row" :key="attribute">
                  {{$t(attribute.attribute)}}
                  <div v-for="(lang,index) in attribute.translations" :key="index" v-show="showLang == lang.locale || languages.length == 1">
                    <textarea type="text" name="category_name" v-model="lang.value" class="form-control mb-2" :placeholder="$t(attribute.attribute)" ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{name: 'Dashboard'}" class="btn btn-light me-5">
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
        id:this.$route.params.id,

      },
      loading:1,
      errors:[]

    }
  },

  mounted() {
      this.edit();
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    edit() {
      this.$axios.get('admin/dashboard/site-setting')
          .then(response => {
            this.form = response.data.data;
            this.loading = 0;

          });
    },
    update() {
      var data = {};
      this.form.forEach((value) => {
        value.translations.forEach((value2) => {
          data[value.attribute+'_'+value2.locale] = value2.value;
          console.log(data);

        });
      });

      this.$axios.post('/admin/dashboard/edit-setting',data)
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