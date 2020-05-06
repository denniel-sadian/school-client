<template>
  <div class="cont">
    <div class="first">
      <div>
        <div class="welcome">
          <p><span>Elmore Junior High School</span></p>
          <h1><span>Welcome to the system!</span></h1>
          <p>
            <span
              >Do your grades online! Don't worry about having no personal
              installation of tabulating programs.</span
            >
          </p>
          <p>
            <span
              >View your children's grades even without going to the
              school.</span
            >
          </p>
        </div>
      </div>
      <div><img src="/school.png" /></div>
    </div>
    <div class="second">
      <div>
        <h2>Staff or Student?</h2>
        <p>
          Sign in or sign up to create grading sheets and take exams.
        </p>
        <nuxt-link to="/login" class="w3-button w3-round-xxlarge w3-green"
          ><i class="fas fa-sign-in-alt"></i> Sign In</nuxt-link
        >
        <nuxt-link
          to="/registration/check-code"
          class="w3-button w3-round-xxlarge w3-border w3-border-green w3-hover-green"
          ><i class="fas fa-user-plus"></i> Staff Sign Up</nuxt-link
        >
        <nuxt-link
          to="/registration/check-section-code"
          class="w3-button w3-round-xxlarge w3-border w3-border-green w3-hover-green"
          ><i class="fas fa-user-plus"></i> Student Sign Up</nuxt-link
        >
      </div>
    </div>
    <div class="third">
      <div>
        <h2>Guardian?</h2>
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
  padding-top: 60px;
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'first first'
    'second third';
}

.second,
.third {
  padding: 16px;
}

.first {
  grid-area: first;
  background: #9bd770;
  display: grid;
  grid-template-columns: 50% 50%;
}

.first img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.welcome p:first-child {
  margin: 0px;
  font-size: 18px;
  font-weight: 800;
  color: #375f1b;
  font-family: 'Roboto Slab', serif;
}

.welcome h1 {
  margin-top: 0px;
  color: #1b3409;
  font-weight: 800;
  font-size: 50px;
  text-transform: capitalize;
  font-family: 'Roboto Slab', serif;
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

.w3-button {
  margin: 4px 0px;
}

@media screen and (max-width: 700px) {
  .cont {
    height: unset;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'first'
      'second'
      'third';
  }

  .first {
    padding: 64px 0px;
    display: grid;
    grid-template-columns: 100%;
    text-align: center;
    background: linear-gradient(rgba(0, 0, 0, 0.856), rgba(0, 0, 0, 0.712)),
      url('/school.png');
    background-position: center;
    background-size: cover;
  }

  .first > div:last-child {
    display: none;
  }

  .welcome span {
    background: rgba(0, 0, 0, 0.349);
    padding: 0px 8px;
  }

  .welcome p {
    color: white !important;
  }

  .welcome h1 {
    color: #9bd770;
  }
}
</style>
