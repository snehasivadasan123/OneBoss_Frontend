import UseKeyForm from "@/features/auth/components/UseKeyForm"
import React from 'react'
import Layout from "@/features/auth/components/Layout"

const page = () => {
  return (
    <div>
      <Layout mode="forgot-password">
        <UseKeyForm />
      </Layout>
    </div>
  )
}

export default page