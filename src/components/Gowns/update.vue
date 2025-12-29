<template>
  <div v-if="this.$route.name=='GownsUpdate'" class="content d-flex flex-column flex-column-fluid" id="kt_content">

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
                <div class="mb-10 fv-row">
                  <div v-for="(lang,index) in form.translations" :key="index" v-show="showLang == lang.locale || languages.length == 1">
                    <input type="text" name="category_name" v-model="lang.name" class="form-control mb-2" :placeholder="$t('name')" />
                  </div>
                </div>
                <div class="mb-10 fv-row">
                  <select class="form-select"  v-model="form.type" name="condition_type" data-placeholder="Select an option" data-kt-ecommerce-catalog-add-category="condition_type">
                    <option value="options" >{{$t('options')}}</option>
                    <option value="text" >{{$t('text')}}</option>
                  </select>
                </div>
                <div class="mb-10 fv-row">
                    <input type="text" name="category_name" v-model="form.sort" class="form-control mb-2" :placeholder="$t('sort')" />
                </div>
                <div>
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

                <div class="mt-3 mb-5">
                  <div class="form-group d-flex justify-content-between">
                    <label class="col-form-label">{{$t('sizeGownOptions')}}</label>
                    <button class="btn btn-success" @click.prevent="addRow" type="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
                  </div>
                  <table class="table">
                    <thead>

                    </thead>
                    <tbody>
                    <tr v-for="(row,index) in form.size_gown_options" :key="row">
                      <td v-for="lang in row.translations " :key="lang">
                        <input v-show="showLang == lang.locale || languages.length == 1" type="text" :name="name+lang.language_universal" v-model="lang.name" class="form-control mb-2" :placeholder="$t('name')"/>
                      </td>
                      <td>
                        <input type="file" v-show="form.type == 'options'" @change="uploadFileAttachement($event,index,row)"
                        />
                        <img style="width:300px;height:250px" v-if="row.showImaage != 'no'" :src="row.image" v-show="form.type == 'options'">
                      </td>
                      <td>
                        <input type="file" v-show="form.type == 'options'" @change="uploadFileAttachement2($event,index,row)"
                        />
                        <img style="width:300px;height:250px" v-if="row.showImaageFull != 'no'"  :src="row.image_full" v-show="form.type == 'options'">
                      </td>
                      <td><i class="fas fa-times pt-2 text-danger" @click.prevent="removeRow(row,index)"></i></td>
                    </tr>
                    </tbody>
                  </table>
                </div>


              </div>
            </div>

            <div class="d-flex justify-content-end">
              <router-link :to="{name: 'Gowns'}" class="btn btn-light me-5">
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
      oldFiles:[],
      langs:this.$dashboardData.allLanguages,
    }
  },

  mounted() {
    if(!this.id){
      this.$router.push({ name: 'Gowns' })
    }else {
      this.edit();
    }
  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    edit() {
      this.$axios.post('admin/size-gown/fetch?id='+this.id)
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

      });

      this.form.size_gown_options.forEach((value,index) => {
        value.translations.forEach((value2) => {
          this.form.size_gown_options[index]['name_'+value2.locale] = value2.name;
        });
      });

      this.form.sizeGownOptions = this.form.size_gown_options;
      const formData = this.$serialize(
          this.form,
          this.$serializeOptios
      );


      this.$axios.post('/admin/size-gown/edit',formData)
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
    uploadFileAttachement(event,index) {
      this.form.size_gown_options[index].image = event.target.files[0];
      this.form.size_gown_options[index].showImaage = "no";

    },
    uploadFileAttachement2(event,index) {
      this.form.size_gown_options[index].image_full = event.target.files[0];
      this.form.size_gown_options[index].showImaageFull = "no";
    },
    removeRow(row,index){
      this.form.size_gown_options.splice(index, 1);

    },
    uploadFiles(fileObject) {
      this.form.images.push(fileObject.file)
    },
    /*removeFiles(fileObject) {
      const selectedFile = this.form.images.findIndex( file => file.name === fileObject.name)
      this.form.images.splice(selectedFile, 1)
    },*/
    removeFiles(fileObject) {
      
      console.log(fileObject.name);
      let selectedFile = this.form.images.findIndex(file => file.name === fileObject.name)
      if(selectedFile == -1){

        selectedFile =  this.form.images.findIndex(obj => obj.image === fileObject.name)
        
        this.oldFiles.splice(selectedFile, 1)


      }
      this.form.images.splice(selectedFile, 1)
    },     
    addRow(){
      if (typeof(this.form.size_gown_options) == "undefined") {
        this.form.size_gown_options = [];
      }
      let rowLangs = [];
       console.log(this.langs);
      this.langs.forEach((value) => {
        rowLangs.push({ 'name': '', 'locale': value.language_universal });
      });
      this.form.size_gown_options.push( {translations : rowLangs});
      console.log(this.form.sizeGownOptions)

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