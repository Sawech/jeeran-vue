<template>
  <div v-if="type === 'image'">
    <file-upload
        v-model="images"
        :input-id="fileId"
        ref="upload1"
        class="custom-file form-control"
        :drop="true"
        accept="image/*"
        @input-file="inputImage"
        :multiple="multiple">
      <div class="custom-file-label"> {{ $t('dropFiles') }}</div>
    </file-upload>

    <div class="row">
      <div v-for="image in images" :key="image" class="col-lg-3 col-md-4 col-sm-6 form-group"
           style="position:relative; ">
        <div class="border">
          <button type="button" @click.prevent="removeImage(image)" class="close AClass"><span>&times;</span></button>
          <img v-if="image.thumb" :src="image.thumb"/>
          <p class="text-center"><small class="text-dark">{{ image.name }}</small></p>
        </div>
      </div>
    </div>

    <div v-if="isUpdate" class="row">
      <div v-for="oldImage in oldImages" :key="oldImage" class="col-md-3 form-group" style="position:relative; ">
        <button type="button"  @click.prevent="removeImage(oldImage)" class="close AClass">
          <span>&times;</span>
        </button>
        <img  v-if="oldImage.thumb" :src="oldImage.thumb" />
      </div>
    </div>
  </div>

  <div v-if="type === 'file'">
    <file-upload
        v-model="Attachfiles"
        :input-id="fileId"
        ref="upload2"
        class="custom-file form-control"
        :drop="true"
        @input-file="inputFile"
        :multiple="multiple">
      <div class="custom-file-label"> {{ $t('dropFiles') }}</div>
    </file-upload>

    <div class="row">
      <div v-for="Attachfile in Attachfiles" :key="Attachfile" class="col-lg-3 col-md-4 col-sm-6 form-group"
           style="position:relative; ">
        <div class="border">
          <button type="button" @click.prevent="removeFile(Attachfile)" class="close AClass">
            <span>&times;</span>
          </button>

          <div v-if="Attachfile.type.substr(0, 6) == 'image/'">
            <img :src="Attachfile.thumb" class="img-fluid"/>
          </div>
          <div v-if="Attachfile.type.substr(0, 6) != 'image/' && Attachfile.name.split('.').slice(-1)[0]">
            <img :src="getFileIcon(Attachfile.name)" class="img-fluid"/>
            <p class="text-center"><small class="text-dark">{{ Attachfile.name }}</small></p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isUpdate" class="row">
      <div v-for="oldFile in oldFiles" :key="oldFile" class="col-lg-3 col-md-4 col-sm-6 form-group" style="position:relative; ">
        <div class="border">
          <button type="button" @click.prevent="removeFile(oldFile)" class="close AClass">
            <span>&times;</span>
          </button>
          <div>
            <img :src="oldFile.name" class="img-fluid"/>
            <!--<p class="text-center"><small class="text-dark">{{ oldFile.name }}</small></p>-->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'InputUploadFiles',
  props: {
    type: String,
    multiple: Boolean,
    oldImages : [],
    oldFiles : [],
    index:Number,
    isUpdate : {
      type: Boolean,
      default : false
    },
    fileId : {
      type: String,
      default : 'fileId'
    },
  },
  data() {
    return {
      images: [],
      Attachfiles: [],
      publicPath: process.env.BASE_URL,
     icons : [
       'after-effects',
       'ai',
       'audition',
       'avi',
       'bridge',
       'css',
       'csv',
       'dbf',
       'doc',
       'docx',
       'dreamweaver',
       'dwg',
       'exe',
       'file',
       'fireworks',
       'fla',
       'flash',
       'html',
       'illustrator',
       'indesign',
       'iso',
       'js',
       'jpg',
       'json',
       'mp3',
       'mp4',
       'pdf',
       'photoshop',
       'png',
       'ppt',
       'prelude',
       'premiere',
       'psd',
       'rtf',
       'search',
       'svg',
       'txt',
       'xls',
       'xml',
       'zip',
       'zip-1',
       'xlsx',
       'xls',
       'psd',
     ]
    }
  },
  methods: {
    getFileIcon(filename) {
      if (filename !== undefined) {
        const fileExt = filename.split('.').pop();
        if (this.icons.includes(fileExt) === false) {
          return `${this.publicPath}./assets/images/icons-input-files/file.png`;
        }
        return `${this.publicPath}./assets/images/icons-input-files/${fileExt}.png`;
      }
    },
    inputFile: function (newFile, oldFile) {
      if (newFile && newFile.error === "" && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
        this.$emit('upload-file', newFile,this.index)

        newFile.blob = ''
        let URL = (window.URL || window.webkitURL)
        if (URL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        newFile.thumb = ''
        newFile.thumb = newFile.blob
      }
    },
    inputImage: function (newFile, oldFile) {
      if (newFile && newFile.error === "" && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
        this.$emit('upload-image', newFile)
        newFile.blob = ''
        let URL = (window.URL || window.webkitURL)
        if (URL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },
    removeImage: function (image) {
      this.$refs.upload1.remove(image);
      this.$emit('remove-image', image)
    },
    removeFile: function (file) {
      this.$emit('remove-file', file)
      this.$refs.upload2.remove(file);
    }
  }
}
</script>
