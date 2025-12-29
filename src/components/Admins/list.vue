<template>
  <div v-if="this.$route.name=='Admin'" class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Toolbar-->

    <!--end::Toolbar-->
    <!--begin::Post-->
    <div class="post d-flex flex-column-fluid" id="kt_post">
      <!--begin::Container-->
      <div id="kt_content_container" class="container-xxl">
        <!--begin::Category-->

        <div class="card card-flush">
          <!--begin::Card header-->

          <div class="card-header align-items-center py-5 gap-2 gap-md-5">
            <h1>{{$t('admins')}}</h1>

            <!--begin::Card title-->
            <div class="card-title">
              <!--begin::Search-->
              <div class="d-flex align-items-center position-relative my-1">
                <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                <span class="svg-icon svg-icon-1 position-absolute ms-4">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
														<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
														<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
													</svg>
												</span>
                <!--end::Svg Icon-->

                <input type="text" v-model="search" data-kt-ecommerce-category-filter="search" class="form-control form-control-solid w-250px ps-14" :placeholder="$t('search')" />
              </div>
              <!--end::Search-->
            </div>
            <!--end::Card title-->
            <!--begin::Card toolbar-->
            <div class="card-toolbar">
              <!--begin::Add customer-->
              <router-link :to="{name: 'AdminCreate'}">
                <button class="btn btn-primary">{{$t('add')}}</button>
              </router-link>
              <!--end::Add customer-->
            </div>
            <!--end::Card toolbar-->
          </div>
          <!--end::Card header-->
          <!--begin::Card body-->
          <div class="card-body pt-0">
            <!--begin::Table-->
            <table class="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_category_table">
              <!--begin::Table head-->
              <thead>
              <!--begin::Table row-->
              <tr class=" text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
<!--                <th class="w-10px pe-2">-->
<!--                  <div class="form-check form-check-sm form-check-custom form-check-solid me-3">-->
<!--                    <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_ecommerce_category_table .form-check-input" value="1" />-->
<!--                  </div>-->
<!--                </th>-->
                <th >{{$t('name')}}</th>
                <th >{{$t('email')}}</th>
                <th >{{$t('mobile')}}</th>
                <th >{{$t('role')}}</th>
                <th >{{$t('status')}}</th>
                <th >{{$t('operations')}}</th>
              </tr>
              <!--end::Table row-->
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->.
              <tbody class="fw-bold text-gray-600">
              <!--begin::Table row-->
              <tr v-for="(list ,index) in filteredList" :key="list">
                <th >{{list.name}}</th>
                <th >{{list.email}}</th>
                <th>{{list.mobile}}</th>
                <th >{{list.role.name}}</th>
                <th>{{$t(list.status)}}</th>

                <th>
                  <router-link :to="{name: 'AdminUpdate' , params: {id:list.id} }" class="btn btn-info btn-circle">
                  {{$t('edit')}} <i class="fas fa-edit"></i>
                  </router-link>
                  <a v-if="list.status == 'active'" style="width: 128px;height:42px" @click.prevent="activate(list.id)" class="btn btn-success btn-circle">
                    {{$t('deactivate')}} <i class="fas fa-check"></i>
                  </a>

                  <a v-if="list.status != 'active'" style="width: 128px;height:42px" @click.prevent="activate(list.id)" class="btn btn-danger btn-circle">
                    {{$t('activate')}} <i class="fas  fa-times" ></i>
                  </a>
                  <delete  :id="list.id"  link="admin/user/delete" method="POST" @deleted="remove(index)" ></delete>

                  <!--end::Menu-->
                </th>
                <!--end::Action=-->
              </tr>
              <!--end::Table row-->

              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->

            <pagination v-model="data.page" :records="data.records" :per-page="data.items" @paginate="getResults(data.page)"/>

          </div>
          <!--end::Card body-->
        </div>
        <!--end::Category-->
      </div>
      <!--end::Container-->
    </div>
    <!--end::Post-->
  </div>
  <router-view></router-view>

</template>

<script>
import Delete from '../../components/Shared/Delete';

export default {
  components: {
    Delete,
  },
  mounted() {
    this.getResults(1);
  },
  data() {
    return {
      loading:1,
      data:{
        page: 1,
        records:'',
        items:''
      },
      search:'',

      postList : [],
    }
  },

  methods: {
    getResults(page = 1) {
      this.data.page = page;
      this.$axios.post('admin/user?page='+this.data.page)
          .then(response => {
            if(response.data.code == 200) {
              this.postList = response.data.data.data;
              this.data.records = response.data.data.total;
              this.data.page = page;
              this.data.items = response.data.data.per_page;
              this.loading = 0;
            }

          });
    },
    remove(index) {
      this.postList.splice(index,1);
    },
    activate(id){
      this.$axios.post('admin/user/change-status',{
        user_id:id
      })
          .then(response => {
            if(response.data.code == 201) {
              this.errors = response.data.data;
            }
            if(response.data.code == 200)  {
              this.$toast.success(response.data.messages);
              this.getResults(this.data.page );
              // this.$router.push({ name: 'Event' })

            }   else {
              // this.$toast.error(response.data.message);
            }

          });
    }
  },
  watch: {
    $route() {
      this.getResults(this.data.page);
    },
    '$i18n.locale': function () {
      this.getResults(this.data.page);
    }
  },
  computed: {
    filteredList() {
      return this.postList.filter(post => {
        console.log("post",post)
        if(post.name.toLowerCase().includes(this.search.toLowerCase())){
          return post.name.toLowerCase().includes(this.search.toLowerCase())
        }
        if(post.role.name.toLowerCase().includes(this.search.toLowerCase())){
          return post.role.name.toLowerCase().includes(this.search.toLowerCase())
        }
        if(post.email.toLowerCase().includes(this.search.toLowerCase())){
          return post.email.toLowerCase().includes(this.search.toLowerCase())
        }
        if(post.mobile.toString().toLowerCase().includes(this.search.toLowerCase())){
          return post.mobile.toString().toLowerCase().includes(this.search.toLowerCase())
        }
        if(post.id.toString().toLowerCase().includes(this.search.toLowerCase())){
          return post.id.toString().toLowerCase().includes(this.search.toLowerCase())
        }              
      })
    }
  },
}
</script>

<style scoped>

</style>