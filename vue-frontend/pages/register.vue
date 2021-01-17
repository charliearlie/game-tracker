<template>
  <c-box p="32px">
    <c-text fontSize="4xl" :text-align="'center'">Register</c-text>
    <form @submit.prevent="registerUser" class="form">
      <c-form-control is-required>
        <c-form-label for="username">Username</c-form-label>
        <c-input
          id="username"
          placeholder="Username"
          v-model="username"
          variant="filled"
          size="lg"
        />
      </c-form-control>
      <c-form-control is-required>
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
      <c-form-control is-required>
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
          <c-input-right-element width="4.5rem">
            <c-button size="md" m="8" @click="showPassword = !showPassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </c-button>
          </c-input-right-element>
        </c-input-group>
      </c-form-control>
      <c-form-control is-required>
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
        variant-color="green"
        size="lg"
        width="100%"
        variant="solid"
        >Register</c-button
      >
    </form>
    <p v-if="me">{{ me.email }}</p>
  </c-box>
</template>

<script>
import gql from 'graphql-tag'
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
    }
  },
  methods: {
    toggleEmail() {
      console.log(this.username)
      console.log(this.$apollo.queries.users)
    },
    registerUser() {
      if (this.password === this.confirmPassword) {
        this.$apollo.mutate({
          mutation: gql`
            mutation Register(
              $username: String!
              $email: String!
              $password: String!
            ) {
              register(
                options: {
                  username: $username
                  email: $email
                  password: $password
                }
              ) {
                user {
                  id
                  email
                }
                errors {
                  message
                }
              }
            }
          `,
          variables: {
            username: this.username,
            email: this.email,
            password: this.password,
          },
        })
      }
    },
  },
}
</script>

<style></style>
