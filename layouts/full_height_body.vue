<template>
  <div>
    <nuxt />
  </div>
</template>

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
