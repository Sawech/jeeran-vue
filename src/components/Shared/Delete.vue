<template>
  <button
    @click.prevent="remove()"
    type="button"
    class="btn btn-danger btn-circle"
  >
    {{ $t("delete") }} <i class="fas fa-trash"></i>
  </button>
</template>

<script>
export default {
  name: "Delete",
  props: {
    id: Number,
    link: String,
    method: String,
  },
  methods: {
    remove() {
      this.$Swal
        .fire({
          title: this.$t("deleteBox.areYouSure"),
          text: this.$t("deleteBox.revertThis"),
          cancelButtonText: this.$t("cancel"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.$t("deleteBox.deleteIt"),
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios({
              method: this.method,
              url: !this.id ? this.link : this.link + "?order_id=" + this.id,
            }).then((response) => {
              if (response.data.code == 200) {
                this.$emit("deleted");
                this.$toast.success(response.data.messages);
              } else {
                this.$toast.error(response.data.messages);
              }
            });
          }
        });
    },
  },
};
</script>
