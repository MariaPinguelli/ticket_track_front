<template>
  <div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    ...mapMutations(['SET_CURRENT_USER'])
  },
  created() {
    console.log(this.currentUser);
    this.SET_CURRENT_USER(this.currentUser)
  }
};
</script>