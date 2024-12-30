import { useState, useContext } from 'react';
import './Sample.css';
const { executeTransaction, EthereumContext, log, queryData } = require('react-solidity-xdc3');

function Sample() {
  const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = useContext(EthereumContext);
  console.log("sample", erc)
  

  const registerFlights = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _flightAddress = "0xA9e6835929f32DD440290b4c81466ff554b82667";
    let _careerFlightNo = "ING695";
    let _serviceProviderName = "Indigo Airlines";
    let response1 = await executeTransaction(erc, provider, 'registerFlights', [_flightAddress, _careerFlightNo, _serviceProviderName]);
    log("registerFlights", "hash", response1.txHash)
    setSubmitting(false);
  }

  const regCompany = async(event) =>{
    event.preventDefault();
    setSubmitting(true);
    let _companyaddress = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db";
    let resp = await executeTransaction(erc,provider,"regCompany",[_companyaddress]);
    log("Registered company","hash", resp.txHash)
    setSubmitting(false);
  }
  const companies = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    
    let address = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db";
    let response1 = await queryData(erc, provider, 'companies', [address]);
    log("submitClaim", "hash", response1)
    setSubmitting(false);
  }

  // const getPriceInfo = async (event) => {
  //   event.preventDefault();
  //   setSubmitting(true);
  //   let response1 = await executeTransaction( provider, 'getPriceInfo', [], 0);
  //   log("getPriceInfo", "hash", response1.txHash)
  //   setSubmitting(false);
  // }

  // const showPrice = async (event) => {
  //   event.preventDefault();
  //   setSubmitting(true);
  //   let response = await queryData(consumer, provider, 'show', []);
  //   log("showPrice", "hash", response)
  //   setSubmitting(false);
  // }

  // const addBook = async (event) => {
  //   event.preventDefault();
  //   setSubmitting(true);
  //   let bookname = "My Second Book";
  //   let response = await executeTransaction(consumer, provider, 'addBooks', [bookname], 0);
  //   log("addBook", "hash", response)
  //   setSubmitting(false);
  // }
  // const retriveBook = async (event) => {
  //   event.preventDefault();
  //   setSubmitting(true);
  //   let bookid = 1;
  //   let response = await queryData(consumer, provider, 'books', [bookid]);
  //   log("retriveBook", "hash", response)
  //   setSubmitting(false);
  // }

  return <div className="Container">
    <div>
      <h1>Register</h1><br></br>
      <form onSubmit={registerFlights}>
        <button type="submit" disabled={submitting}>{submitting ? 'Registering..' : 'Register Flights'}</button>
      </form>
    </div>
    <div>
      <h1>Register Company</h1><br></br>
      <form onSubmit={regCompany}>
        <button type="submit" disabled={submitting}>{submitting ? 'Registering..' : 'Register Company'}</button>
      </form>
    </div>
    <div>
      <h1>Fetch</h1><br></br>
      <form onSubmit={companies}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Fetch comps '}</button>
      </form>
    </div>
    {/*<div>
      <h1>Get Price Info</h1><br></br>
      <form onSubmit={getPriceInfo}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Get Price '}</button>
      </form>
    </div>
    <div>
      <h1>Show Price</h1><br></br>
      <form onSubmit={showPrice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Show Price '}</button>
      </form>
    </div>
    <div>
      <h1>Add Book </h1><br></br>
      <form onSubmit={addBook}>
        <button type="submit" disabled={submitting}>{submitting ? 'Adding Books..' : 'Add Book '}</button>
      </form>
    </div>
    <div>
      <h1>Retrieve Book </h1><br></br>
      <form onSubmit={retriveBook}>
        <button type="submit" disabled={submitting}>{submitting ? 'Retrieving Books..' : 'Show My Book '}</button>
      </form>
    </div>*/}
  </div> 
}



export default Sample;
