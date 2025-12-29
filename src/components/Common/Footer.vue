<template>
  <!--begin::Footer-->
  <div class="footer py-4 d-flex flex-lg-column" id="kt_footer">
    <!--begin::Container-->
    <div class="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted fw-bold me-1">جميع الحقوق محفوظة لدي©</span>
        <a href="https://rabt.tech/" target="_blank" class="text-gray-800 text-hover-primary">شركة ربط لتقنية المعلومات</a>
      </div>
      <!--end::Copyright-->
      <!--begin::Menu-->
      <ul v-if="$role == 'admin'" class="menu menu-gray-600 menu-hover-primary fw-bold order-1">
        <li class="menu-item">
          <router-link :to="{name: 'SettingsUpdate'}" class="menu-link px-2">{{$t('settings')}}</router-link>
        </li>
        <li class="menu-item">
          <router-link :to="{name: 'Info'}"  class="menu-link px-2">{{$t('info')}}</router-link>
        </li>
        <li class="menu-item">
          <router-link :to="{name: 'Messages'}"  class="menu-link px-2">{{$t('messages')}}</router-link>
        </li>
      </ul>
      <!--end::Menu-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Footer-->
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>