<template>
  <div>
    <div v-if="getIdentity=='player'"><vplayersider></vplayersider></div>
    <div v-else-if="getIdentity=='ceo'"><vceosider></vceosider></div>
    <div v-else-if="getIdentity=='coach'"><vcoachsider></vcoachsider></div>
    <div v-else-if="getIdentity=='gm'"><vgmsider></vgmsider></div>
    <div v-else-if="getIdentity=='admin'"><vadminside></vadminside></div>
  </div>
</template>

<script>
  import vadminside from './AdminSider.vue';
  import vceosider from './CeoSider.vue';
  import vcoachsider from './CoachSider.vue';
  import vgmsider from './GmSider.vue';
  import vplayersider from './PlayerSider.vue';
  export default {
      data() {
        return {

        }
      },
      props: {
      }
      ,
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
      },
      components: {
        vceosider,
        vcoachsider,
        vgmsider,
        vplayersider,
        vadminside
      },
      computed: {
        getIdentity() {
          return this.$store.state.identity;
        }
      },
      
  }
</script>

<style>
.router-link-active {
  text-decoration: none;
}
</style>
