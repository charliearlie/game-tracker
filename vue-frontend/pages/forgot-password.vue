<template>
  <c-box max-w="400px" mx="auto" p="32px">
    <div class="heading">
      <c-heading as="h1" fontSize="48px" :text-align="'center'"
        >Forgotten password</c-heading
      >
    </div>
    <form>
      <c-form-control is-required my="8px">
        <c-form-label for="email">Email:</c-form-label>
        <c-input
          id="email"
          placeholder="Enter email address"
          v-model="email"
          variant="filled"
          size="lg"
        />
      </c-form-control>
      <c-button
        @click="logUserIn"
        backgroundColor="indigo.300"
        color="white"
        left-icon="email"
        my="16px"
        size="lg"
        variant="solid"
        width="100%"
        >Send me an email</c-button
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
      email: '',
      errors: [],
    }
  },
  methods: {
    async sendEmail() {
      const res = await this.$apollo.mutate({
        mutation: login,
        variables: {
          email: this.email,
        },
      })

      this.errors = res.data.login.errors
    },
  },
}
</script>

<style lang="scss"></style>
