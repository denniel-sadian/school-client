<template>
  <div class="cont">
    <div class="first">
      <div>
        <div class="welcome">
          <span>Elmore Junior High School</span>
          <h1>Welcome to the system!</h1>
          <p>
            Do your grades online! Don't worry about having no personal
            installation of tabulating programs.
          </p>
          <p>View your children's grades even without going to the school.</p>
        </div>
      </div>
      <div></div>
    </div>
    <div class="second">
      <div>
        <h1>
          Staff?
        </h1>
        <p>
          Your grading sheets are waiting for you, and your students are praying
          for high grades.
        </p>
        <nuxt-link to="/login" class="w3-button w3-round-xxlarge w3-green"
          ><i class="fas fa-sign-in-alt"></i> Sign In</nuxt-link
        >
        <nuxt-link
          to="/registration/check-code"
          class="w3-button w3-round-xxlarge w3-border w3-border-green w3-hover-green"
          ><i class="fas fa-user-plus"></i> Sign Up</nuxt-link
        >
      </div>
    </div>
    <div class="third">
      <div>
        <h1>Guardian?</h1>
        <p>
          Is it card release already? Did you get a permission code already? See
          the results of your child's progress.
        </p>
        <nuxt-link
          to="/viewing-cards/check-permission"
          class="w3-button w3-round-xxlarge w3-blue"
          ><i class="fas fa-eye"></i> View Cards</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.cont {
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'first first'
    'second third';
}

.cont > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.second,
.third {
  padding: 16px;
}

.first {
  grid-area: first;
  background: #9bd770;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.first > div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome {
  padding: 16px 24px;
}

.welcome p {
  margin-top: 0px;
}

.welcome span {
  font-size: 18px;
  font-family: 'Verdana';
  font-weight: 800;
  color: #375f1b;
}

.welcome h1 {
  margin-top: 0px;
  color: #1b3409;
  font-weight: 800;
  font-size: 4vw;
  text-transform: capitalize;
}

.first > div:last-child {
  background: url('/school.png') no-repeat center;
  background-size: cover;
}

.second {
  grid-area: second;
  background: #375f1b;
  text-align: center;
  color: white;
}

.third {
  grid-area: third;
  background: #1b3409;
  text-align: center;
  color: white;
}

.second h1,
.third h1 {
  font-size: 3vw;
}
</style>
