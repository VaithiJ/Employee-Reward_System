import { Container, Row, Col, Button } from 'react-bootstrap';
import CompanyHeader from '../header/companyheader';
import Three from '../openPage/three';
import React from 'react';
import '../openPage/openpage.module.css'
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer'

const CompanyHome = () => {
  // Define the gradient styles for the headings
  const headingGradient = {
    background: 'linear-gradient(to right, #93FFFF, #F0FD9A)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    color: '#1D16F4'
  };
   const backgroundGradient = { background: 'linear-gradient(to right, #1985FF, #42ECEC)', height: '100%', width: '100%',};
  return (
    <div>
    
    <div style={backgroundGradient}>
      <CompanyHeader/>
      {/* <Three /> */}

      <Container>
        <Row>
          <Col>
            <div className='open'>
              <h1 style={{ fontSize: '2rem', textAlign: 'center', ...headingGradient }}>
                Welcome to the
              </h1>
              <h1 style={{ fontSize: '3rem', textAlign: 'center', ...headingGradient }}>
                Employee Rewards Program
              </h1>
              
              <h2 style={{ fontSize: '2rem', textAlign: 'center', fontWeight: 'bold', marginTop: '2rem', color: '#1D16F4' }}>
              "A well-designed rewards and recognition program can help companies attract top talent and position themselves as an employer of choice".
              </h2>
              <div className="d-flex justify-content-center mt-4">

              </div>

        
            </div>
          </Col>
        </Row>
       
      </Container>
      
    
     <Footer />
     </div>
     </div>
  );
};

export default CompanyHome;
