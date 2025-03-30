import FooterComp from '../components/FooterComp';

export default function RootLayout({ children }) {
  
    return (
      <>
        {children}
        <FooterComp />
      </>
    );
  }
  