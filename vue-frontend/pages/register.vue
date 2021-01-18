<template>
  <c-box max-w="400px" mx="auto" p="32px">
    <div class="heading">
      <c-heading as="h1" fontSize="48px" :text-align="'center'"
        >Register</c-heading
      >
    </div>
    <c-text
      v-for="error in errors"
      :key="error.field"
      color="red.500"
      fontWeight="bold"
      >{{ error.message }}</c-text
    >
    <form v-if="!isLoggedIn" @submit.prevent="registerUser">
      <c-form-control is-required my="8px">
        <c-form-label for="username">Username</c-form-label>
        <c-input
          id="username"
          placeholder="Username"
          v-model="username"
          variant="filled"
          size="lg"
        />
      </c-form-control>
      <c-form-control is-required my="8px">
        <c-form-label for="email">Email</c-form-label>
        <c-input
          id="email"
          :type="'email'"
          placeholder="Email"
          v-model="email"
          variant="filled"
          size="lg"
        />
      </c-form-control>
      <c-form-control is-required my="8px">
        <c-form-label for="password">Password:</c-form-label>
        <c-input-group size="lg">
          <c-input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="password"
            variant="filled"
            size="lg"
          />
          <c-input-right-element width="4.5rem" mr="8px">
            <c-button size="md" m="8" @click="showPassword = !showPassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </c-button>
          </c-input-right-element>
        </c-input-group>
      </c-form-control>
      <c-form-control is-required my="8px">
        <c-form-label for="confirm-password">Confirm password:</c-form-label>
        <c-input
          id="confirm-password"
          :type="'password'"
          placeholder="Confirm password"
          v-model="confirmPassword"
          variant="filled"
          size="lg"
        />
      </c-form-control>
      <c-button
        my="16px"
        backgroundColor="indigo.300"
        color="white"
        size="lg"
        width="100%"
        variant="solid"
        @click="registerUser"
        >Register</c-button
      >
    </form>
    <c-link as="router-link" to="/login">Already registered?</c-link>
    <h3 v-if="isLoggedIn">You're logged in. Why are you here?</h3>
    <p v-if="me">{{ me.email }}</p>
  </c-box>
</template>

<script>
import gql from 'graphql-tag'
import { register } from '../resolvers/mutations/register'
export default {
  name: 'Register',
  apollo: {
    me: gql`
      query {
        me {
          email
        }
      }
    `,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      errors: [],
    }
  },
  methods: {
    async registerUser() {
      console.log('here')
      if (this.password === this.confirmPassword) {
        const res = await this.$apollo.mutate({
          mutation: register,
          variables: {
            username: this.username,
            email: this.email,
            password: this.password,
          },
        })

        this.errors = res.data.register.errors
        console.log(res.data.register)
      }
    },
  },
  computed: {
    isLoggedIn: function () {
      return this.me?.email ? true : false
    },
  },
}
</script>

<style lang="scss">
.heading {
  transform: rotate(-10deg);
}
</style>
