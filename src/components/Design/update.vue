<template>
  <div v-if="this.$route.name=='DesignUpdate'" class="content d-flex flex-column flex-column-fluid" id="kt_content">

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

                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li v-for="language in languages" class="nav-item" :key="language.id" @click="changeLang(language.language_universal)" ><a @click.prevent="changeLang(language.language_universal)" class="nav-link" :class="{'active': showLang == language.language_universal}" :id="language.name+'-tab'" data-toggle="tab" :href="'#'+language.languageName" role="tab" :aria-controls="language.languageName" aria-selected="false">{{$t(language.language_universal)}}</a></li>
                  </ul>                </div>
              </div>


              <div class="card-body pt-0">
                <div v-for="(lang,index) in form.translations" :key="index" v-show="showLang == lang.locale || languages.length == 1" class="mb-10 fv-row">
                  <div >
                    <input type="text" name="category_name" v-model="lang.name" class="form-control mb-2" :placeholder="$t('name')" />
                  </div>
                  <div >
                    <textarea type="text" name="category_name" v-model="lang.description" class="form-control mb-2" :placeholder="$t('description')" > </textarea>
                  </div>
                </div>

                <div>
                  <input-upload-files
                      :is-update="true"
                      :old-files="oldFiles"
                      file-id="file1"
                      type="file"
                      :multiple="true"
                      @upload-file="uploadFiles"
                      @remove-file="removeFiles"
                  />
                </div>

              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{name: 'Design'}" class="btn btn-light me-5">
                {{$t('cancel')}}
              </router-link>
              <button type="submit" @click.prevent="update"  id="kt_ecommerce_add_category_submit" class="btn btn-primary">
                <span @click.prevent="update" class="indicator-label">{{$t('save')}}</span>
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

import InputUploadFiles from '@/components/Shared/InputUploadFiles';

export default {
  components: {
    InputUploadFiles
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
      oldFiles:[]

    }
  },

  mounted() {
    if(!this.id){
      this.$router.push({ name: 'Design' })
    }else {
      this.edit();
    }
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    edit() {
      this.$axios.post('admin/design/fetch?id='+this.id)
          .then(response => {
            this.form = response.data.data;
            if (this.form.images && this.form.images.length > 0) {
              this.form.images.forEach((fileName) => {
                this.oldFiles.push({
                  name: fileName.image
                })
              });
            } else {
              this.form.image = [];
            }
            this.loading = 0;

          });
    },
    update() {
      this.form.translations.forEach((value) => {
        this.form['name_'+value.locale] =value.name;
        this.form['description_'+value.locale] =value.description;


      });
      
      
    
    //this.form.images = this.$refs.image.files[0];

      const formData = this.$serialize(
          this.form,
          this.$serializeOptios
      );
      this.$axios.post('/admin/design/edit',formData)
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
    /*uploadFiles(fileObject) {
      console.log(fileObject);
      this.form.image.push(fileObject.file)
    },
    removeFiles(fileObject) {
      const selectedFile = this.form.image.findIndex( file => file.name === fileObject.name)
      this.form.image.splice(selectedFile, 1)
    },*/

uploadFiles(fileObject) {
      console.log(fileObject);
      this.form.images.push(fileObject.file)
    },
    removeFiles(fileObject) {
      
      console.log(fileObject.name);
      let selectedFile = this.form.images.findIndex(file => file.name === fileObject.name)
      if(selectedFile == -1){

        selectedFile =  this.form.images.findIndex(obj => obj.image === fileObject.name)
        
        this.oldFiles.splice(selectedFile, 1)


      }
      this.form.images.splice(selectedFile, 1)
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