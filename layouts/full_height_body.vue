<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  transition: 'page'
}
</script>

<style>
html,
body,
#__nuxt,
#__layout,
#__layout > div {
  height: 100vh;
  padding: 0px;
  margin: 0px;
}

header {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

header > div {
  border: 1px solid #9e9e9e;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  padding: 16px;
}

header h2 {
  text-align: center;
}

.inpt {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 16px;
}

.inpt label {
  font-size: 12px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

.inpt input {
  border-radius: 4px;
  border: 1px solid gray;
  height: 40px;
  transition: 0.3s;
  padding: 0px 8px;
}

.w3-button {
  width: 100%;
  border-radius: 4px;
}

.or {
  display: flex;
  align-items: center;
  padding: 8px 0px;
}

.or hr {
  width: 100%;
  margin: 0px;
  border: 0.5px solid gray;
}

.or span {
  padding: 0px 16px;
}
</style>
