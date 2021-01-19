<template>
  <c-box max-w="400px" mx="auto" p="32px">
    <div class="heading">
      <c-heading as="h1" fontSize="48px" :text-align="'center'"
        >Successfully logged in as {{ user }}</c-heading
      >
    </div>
    <c-text
      v-for="error in errors"
      :key="error.field"
      color="red.500"
      fontWeight="bold"
      >{{ error.message }}</c-text
    >
    <c-link as="router-link" to="/">Go explore</c-link>
  </c-box>
</template>

<script>
import { loginWithToken } from '../../resolvers/mutations/login-with-token'
export default {
  data() {
    return {
      user: '',
    }
  },
  mounted: async function () {
    const res = await this.$apollo.mutate({
      mutation: loginWithToken,
      variables: {
        token: this.$route?.params?.token,
      },
    })

    this.user = res.data?.loginWithToken?.user?.email
    console.log(this.$route?.params?.token)
  },
}
</script>

<style></style>
