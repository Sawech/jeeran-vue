<template>
  <div v-if="this.$route.name=='SizeTypeCategoriesUpdate'" class="content d-flex flex-column flex-column-fluid" id="kt_content">

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
                  {{$t('sizeTypes')}}

                  <select class="form-select" multiple   v-model="form.size_type_id" name="condition_type" data-placeholder="Select an option" data-kt-ecommerce-catalog-add-category="condition_type">
                    <option v-for="size in sizes" :value="size.id" :key="size" >{{size.name}}</option>

                  </select>

                </div>
              </div>
            </div>




            <div class="d-flex justify-content-end">
              <router-link :to="{name: 'SizeTypeCategories'}" class="btn btn-light me-5">
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
      errors:[],
      sizes:[]

    }
  },

  mounted() {
    if(!this.id){
      this.$router.push({ name: 'SizeTypeCategories' })
    }else {
      this.edit();
      this.getSizes();

    }
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    edit() {
      this.$axios.post('admin/size-type-category/fetch?category_id='+this.id)
          .then(response => {
            this.form.size_type_id = response.data.data;
            this.form.category_id = this.id;
            this.loading = 0;

          });
    },
    update() {

      this.$axios.post('/admin/size-type-category/add',this.form)
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
    getSizes() {
      this.$axios.get('admin/all-size-type')
          .then(response => {
            this.sizes = response.data.data;

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