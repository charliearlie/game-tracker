<template>
  <c-box max-w="400px" mx="auto" p="32px">
    <div class="heading">
      <c-heading as="h1" fontSize="48px" :text-align="'center'"
        >Login</c-heading
      >
    </div>
    <c-text
      v-for="error in errors"
      :key="error.field"
      color="red.500"
      fontWeight="bold"
      >{{ error.message }}</c-text
    >
    <form v-if="!isLoggedIn" @submit.prevent="loginUser">
      <c-form-control is-required my="8px">
        <c-form-label for="username">Username or email</c-form-label>
        <c-input
          id="username"
          placeholder="Username"
          v-model="username"
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
      <c-button
        my="16px"
        backgroundColor="indigo.300"
        color="white"
        size="lg"
        width="100%"
        variant="solid"
        @click="logUserIn"
        >Login</c-button
      >
    </form>
    <c-link as="router-link" to="/register">Not yet registered?</c-link>
  </c-box>
</template>

<script>
import gql from 'graphql-tag'
import { login } from '../resolvers/mutations/login'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      errors: [],
    }
  },
  methods: {
    async logUserIn() {
      const res = await this.$apollo.mutate({
        mutation: login,
        variables: {
          username: this.username,
          password: this.password,
        },
      })

      this.errors = res.data.login.errors
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
