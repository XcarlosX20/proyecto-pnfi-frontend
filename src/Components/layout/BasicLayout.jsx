import Footer from './Footer'
import Header from './Header'

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default BasicLayout
