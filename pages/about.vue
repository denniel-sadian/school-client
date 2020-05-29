<template>
  <div>
    <header class="w3-container">
      <h1>About The System</h1>
      <h4>
        <span class="w3-purple">Bognuyan National High School</span>
      </h4>
    </header>
    <article class="w3-container">
      <div class="w3-content">
        <h2>Lorem</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, amet
          fuga recusandae optio ea magnam quibusdam quod voluptates odio eum
          voluptatibus in est libero iste dolores vitae molestias? Ea, ipsum!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste deleniti
          dolores sit rerum fugit aperiam enim quam nesciunt. Quisquam quam
          culpa dolorum! Ipsa at enim porro ab voluptatibus odit perspiciatis?
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia quo
          delectus ab iure incidunt eos quod animi ea dolore obcaecati libero,
          amet ipsum earum quasi ratione, atque harum, debitis explicabo?
        </p>
      </div>
    </article>
    <article class="w3-container">
      <div class="w3-content">
        <h2>Lorem</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          facilis, ex soluta ipsa aperiam odit perspiciatis alias. Repellendus,
          inventore eaque deleniti officiis ex sit doloremque a esse commodi,
          sed maiores.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
          laborum ut ipsa esse perspiciatis blanditiis cupiditate quas,
          dignissimos nesciunt accusamus minus odit autem ab quasi soluta
          molestiae delectus assumenda quos!
        </p>
      </div>
    </article>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  margin-top: 60px;
  padding: 64px;
  background: linear-gradient(rgba(0, 0, 0, 0.87), rgba(0, 0, 0, 0.733)),
    url('/school.png');
  background-position: center;
  background-size: cover;
  text-align: center;
  color: white;
}

header h1 {
  font-size: 50px;
}

article {
  margin: 32px 0px;
}

article:last-child {
  margin-bottom: 100px;
}
</style>
