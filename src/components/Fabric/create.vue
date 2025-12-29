<template>
  <div v-if="this.$route.name== 'FabricsCreate'" class="content d-flex flex-column flex-column-fluid" id="kt_content">

    <div class="post d-flex flex-column-fluid" id="kt_post">
      <div id="kt_content_container" class="container-xxl">

        <form id="kt_ecommerce_add_category_form" class="form d-flex flex-column flex-lg-row" data-kt-redirect="../../demo1/dist/apps/ecommerce/catalog/categories.html">

          <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">

            <div class="card card-flush py-4">
              <div class="card-header">
                <div v-for="(errorArray, index) in errors" :key="index">
                  <span class="text-danger">{{ errorArray[0]}} </span>
                </div><br>
                <div class="card-title">

                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li v-for="language in languages" class="nav-item" :key="language.id" @click="changeLang(language.language_universal)" ><a @click.prevent="changeLang(language.language_universal)" class="nav-link" :class="{'active': showLang == language.language_universal}" :id="language.name+'-tab'" data-toggle="tab" :href="'#'+language.languageName" role="tab" :aria-controls="language.languageName" aria-selected="false">{{$t(language.language_universal)}}</a></li>
                  </ul>                </div>
              </div>


              <div class="card-body pt-0">
                <div v-for="(lang,index) in form.langs" :key="index" v-show="showLang == lang.language_universal || languages.length == 1" class="mb-10 fv-row">
                  <div>
                    <input type="text" name="category_name" v-model="form['name_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('name')" />
                  </div>
                  <div>
                    <input type="text" name="title" v-model="form['title_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('titleFabric')" />
                  </div>
                  <div>
                    <input type="text" name="raw_material" v-model="form['raw_material_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('raw_material')" />
                  </div>
                  <div>
                    <input type="text" name="supplier" v-model="form['supplier_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('supplier')" />
                  </div>
                  <div>
                    <input type="text" name="item" v-model="form['item_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('item')" />
                  </div>

                  <div>
                    <input type="text" name="color" v-model="form['color_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('color')" />
                  </div>

                  <div>
                    <input type="text" name="source_country" v-model="form['source_country_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('source_country')" />
                  </div>

                  <div>
                    <input type="text" name="type" v-model="form['type_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('type')" />
                  </div>

                  <div >
                    <textarea type="text" name="category_name" v-model="form['description_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('description')" > </textarea>
                </div>
                </div>

                <div>
                  <input type="text" name="number_filed" v-model="number" class="form-control mb-2" :placeholder="$t('number')" />
                </div>
                <br>
                <div class="w-100 w-md-200px">
                  <input type="file" ref="image">
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{name: 'Fabrics'}" class="btn btn-light me-5">
                {{$t('cancel')}}
              </router-link>
              <button type="submit" @click.prevent="create" id="kt_ecommerce_add_category_submit" class="btn btn-primary">
                <span  class="indicator-label">{{$t('save')}}</span>
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
      languages:this.$dashboardData.allLanguages,
      showLang:this.$dashboardData.languageUniversal,
      form : {
        langs : this.$dashboardData.allLanguages,
      },
      errors:[],
      number:''

    }
  },

  mounted() {

  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    create() {
      this.form.image = this.$refs.image.files[0];
      this.form.number = this.number;
      const formData = this.$serialize(
          this.form,
          this.$serializeOptios
      );
      this.$axios.post('admin/fabric/add',formData)
            .then(response => {
              if(response.data.code == 201) {
                this.errors = response.data.data;
              }
              if(response.data.code == 200)  {
                this.$toast.success(response.data.messages);
                this.form = [] ;
                this.errors = [];
                this.form.langs = this.languages;
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