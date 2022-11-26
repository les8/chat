<template>
  <div class="wrapper">
    <ul id="messages"></ul>
    <fotm id="form">
      <input v-model="msg" type="text" autocomplete="off" />
      <input type="submit" value="Send" @click="onSubmit"/>
    </fotm>
  </div>
</template>

<script>
const socket = io();

export default {
  name: "App",
  data() {
    return {
      msg: "",
    };
  },
  created() {
      socket.on('connect', () => {
      console.log('Client connected');
    });
  },
  methods: {
    onSubmit() {
      if (this.msg) {
        socket.emit('chat message', this.msg);

        const message = this.msg;

        socket.on('chat message', (message) => {
        console.log(message);

        this.msg = '';
      });
      };
    },
  },
};
</script>

<style lang="scss">
  @import './assets/nullstyle.scss';
</style>
