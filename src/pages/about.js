import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const About = () => {
  return (
    <Layout>
      <h1>About</h1>
      <p>This is about page</p>
      <p>
        <Link to="/contact">Contact</Link>
      </p>
    </Layout>
  )
}

export default About
