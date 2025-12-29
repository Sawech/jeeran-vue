<template>
  <div v-if="this.$route.name=='GownsCreate'" class="content d-flex flex-column flex-column-fluid" id="kt_content">

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
                <div class="mb-10 fv-row">
                  <div v-for="(lang,index) in form.langs" :key="index" v-show="showLang == lang.language_universal || languages.length == 1">
                    <input type="text" name="category_name" v-model="form['name_' + lang.language_universal ]" class="form-control mb-2" :placeholder="$t('name')" />

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
                  <input-upload-files file-id="file1"  type="file" :multiple="true" @upload-file="uploadFiles" @remove-file="removeFiles"/>
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
                    <tr v-for="(row,index) in form.sizeGownOptions" :key="row">
                      <td v-for="lang in row.langs " :key="lang">
                        <input v-show="showLang == lang.language_universal || languages.length == 1" type="text"  v-model="lang.name" class="form-control mb-2" :placeholder="$t('name')"/>
                      </td>
                      <td>
                        <input type="file" v-show="form.type == 'options'"  @change="uploadFileAttachement($event,index,row)"
                        />
                      </td>
                      <td>
                        <input type="file" v-show="form.type == 'options'" @change="uploadFileAttachement2($event,index,row)"
                        />
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
      languages:this.$dashboardData.allLanguages,
      showLang:this.$dashboardData.languageUniversal,
      langs:this.$dashboardData.allLanguages,
      form : {
        langs : this.$dashboardData.allLanguages,
        images:[],
        sizeGownOptions:[]
      },
      errors:[]

    }
  },

  mounted() {

  },
  methods: {
    changeLang(lang) {
      this.showLang = lang;
    },
    create() {
      this.form.sizeGownOptions.forEach((value,index) => {
        value.langs.forEach((value2) => {
          this.form.sizeGownOptions[index]['name_'+value2.language_universal] = value2.name;
        });
      });
      const formData = this.$serialize(
          this.form,
          this.$serializeOptios
      );
      this.$axios.post('admin/size-gown/add',formData)
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
    uploadFiles(fileObject) {
      this.form.images.push(fileObject.file)
    },
    removeFiles(fileObject) {
      const selectedFile = this.form.images.findIndex( file => file.name === fileObject.name)
      this.form.images.splice(selectedFile, 1)
    },
    addRow(){
     console.log('test')
      if (typeof(this.form.sizeGownOptions) == "undefined") {
        this.form.size_gown_options = [];
      }
     let rowLangs = [];
      this.langs.forEach((value) => {
        rowLangs.push({ 'name': '', 'language_universal': value.language_universal });
      });
      this.form.sizeGownOptions.push( {langs : rowLangs});
      console.log(this.form.sizeGownOptions)

    },

    uploadFileAttachement(event,index) {
      this.form.sizeGownOptions[index].image = event.target.files[0]
    },
    uploadFileAttachement2(event,index) {
      this.form.sizeGownOptions[index].image_full = event.target.files[0]
    },
    removeRow(row,index){
      this.form.sizeGownOptions.splice(index, 1);

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